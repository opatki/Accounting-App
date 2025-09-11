"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase/server";
import type { LineRow, JournalEntryLineWithJoin } from "@/app/types";

export default function StatementOfEquity({ params }: {params: Promise<{ orgId: string }>}) {
  const [rows, setRows] = useState<LineRow[]>([]);
  const [filter, setFilter] = useState<"month" | "quarter" | "year" | "all">("all");

  useEffect(() => {
    async function fetchData() {
      const { orgId } = await params
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

  // Equity components
  const equityAccounts = filteredRows.filter(r => r.account_type === "Equity");
  const dividends = filteredRows.filter(r => r.account_type === "Dividend");
  const revenues = filteredRows.filter(r => r.account_type === "Revenue");
  const expenses = filteredRows.filter(r => r.account_type === "Expense");

  const totalInvestments = equityAccounts.reduce((acc, e) => acc + (e.credit - e.debit), 0);
  const totalDividends = dividends.reduce((acc, d) => acc + d.debit, 0);
  const netIncome = revenues.reduce((acc, r) => acc + r.credit, 0) - expenses.reduce((acc, e) => acc + e.debit, 0);

  // For simplicity, assume beginning equity = 0
  const beginningEquity = 0;
  const endingEquity = beginningEquity + totalInvestments + netIncome - totalDividends;

  const today = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const filterLabel = filter === "month" ? "Month" : filter === "quarter" ? "Quarter" : filter === "year" ? "Year" : "All";

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
          <h1>Statement of Stockholder&apos;s Equity</h1>
          {filterLabel !== "All" && <p className="text-[0.6em]">For {filterLabel} Ending {today}</p>}
        </div>

        <div className="p-6 text-[#9A3F3F]">
          <div className="flex justify-between">
            <span>Beginning Equity</span>
            <span>{beginningEquity.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Add: Investments</span>
            <span>{totalInvestments.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Add: Net Income</span>
            <span>{netIncome.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Less: Dividends</span>
            <span>{totalDividends.toLocaleString()}</span>
          </div>

          <div className="font-bold flex justify-between border-t pt-4 text-xl">
            <span>Ending Stockholder&apos;s Equity</span>
            <span>${endingEquity.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </>
  );
}
