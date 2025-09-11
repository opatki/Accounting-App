"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase/server";
import type { LineRow, JournalEntryLineWithJoin } from "@/app/types";


export default function IncomeStatement({ params }: { params: Promise<{ orgId: string }> }) {
  const [rows, setRows] = useState<LineRow[]>([]);
  const [filter, setFilter] = useState<"month" | "quarter" | "year" | "all">("all");

  useEffect(() => {
    async function fetchData() {
      const { orgId } = await params;
      const { data, error } = await supabase
        .from("journal_entry_lines")
        .select("account_name, account_type, debit, credit, journal_entries!inner (date,org_id)")
        .eq("journal_entries.org_id", orgId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      const normalized: LineRow[] = Array.isArray(data)
      ? (data as JournalEntryLineWithJoin[]).map((d) => ({
          account_name: String(d.account_name),
          account_type: String(d.account_type),
          debit: d.debit == null ? 0 : Number(d.debit),
          credit: d.credit == null ? 0 : Number(d.credit),
          date: String(d.journal_entries?.date) ?? "",
        }))
      : [];

      setRows(normalized);
    }

    fetchData();
  }, [params]);

  // Date filter
  const now = new Date();
  const cutoff = new Date();
  if (filter === "month") cutoff.setMonth(now.getMonth() - 1);
  if (filter === "quarter") cutoff.setMonth(now.getMonth() - 3);
  if (filter === "year") cutoff.setFullYear(now.getFullYear() - 1);

  const filteredRows =
    filter === "all"
      ? rows
      : rows.filter((row) => {
          const rowDate = new Date(row.date);
          return rowDate >= cutoff && rowDate <= now;
        });

  // Helper: group by account_name and sum debit/credit
  function aggregateAccounts(rows: LineRow[], type: "Revenue" | "Expense") {
    const grouped: { [key: string]: number } = {};

    rows
      .filter((r) => r.account_type === type)
      .forEach((r) => {
        if (type === "Revenue") {
          grouped[r.account_name] = (grouped[r.account_name] || 0) + r.credit;
        } else {
          grouped[r.account_name] = (grouped[r.account_name] || 0) + r.debit;
        }
      });

    return Object.entries(grouped).map(([account, amount]) => ({
      account_name: account,
      amount,
    }));
  }

  // Aggregated revenues & expenses
  const revenueAccounts = aggregateAccounts(filteredRows, "Revenue");
  const expenseAccounts = aggregateAccounts(filteredRows, "Expense");

  const totalRevenue = revenueAccounts.reduce((acc, r) => acc + r.amount, 0);
  const totalExpenses = expenseAccounts.reduce((acc, e) => acc + e.amount, 0);
  const netIncome = totalRevenue - totalExpenses;

  const today = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const filterLabel =
    filter === "month"
      ? "Month"
      : filter === "quarter"
      ? "Quarter"
      : filter === "year"
      ? "Year"
      : "All";

  return (
    <>
      <div className="flex justify-start mx-6 my-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "month" | "quarter" | "year" | "all")}
          className="border rounded px-3 py-2 shadow text-[#9A3F3F] font-semibold"
        >
          <option value="" disabled>
            Select Accounting Period
          </option>
          <option value="month">Past Month</option>
          <option value="quarter">Past Quarter</option>
          <option value="year">Past Year</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className="border-3 border-[#9A3F3F] mx-5 mb-5">
        <div className="bg-[#9A3F3F] text-center text-3xl text-white p-5 font-bold">
          <h1>Income Statement</h1>
          {filterLabel !== "All" && (
            <p className="text-[0.6em]">
              For {filterLabel} Ending {today}
            </p>
          )}
        </div>

        <div className="p-6 text-[#9A3F3F]">
          <h2 className="font-bold text-lg mb-2">Revenues</h2>
          <ul>
            {revenueAccounts.map((r, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{r.account_name}</span>
                <span>{r.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="font-bold flex justify-between border-t pt-2">
            <span>Total Revenues</span>
            <span>{totalRevenue.toLocaleString()}</span>
          </div>

          <h2 className="font-bold text-lg mt-6 mb-2">Expenses</h2>
          <ul>
            {expenseAccounts.map((e, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{e.account_name}</span>
                <span>{e.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="font-bold flex justify-between border-t pt-2">
            <span>Total Expenses</span>
            <span>{totalExpenses.toLocaleString()}</span>
          </div>

          <div className="font-bold flex justify-between border-t pt-4 text-xl">
            <span>Net Income</span>
            <span>{netIncome.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </>
  );
}
