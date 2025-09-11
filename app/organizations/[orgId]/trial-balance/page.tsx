"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase/server";
import type { LineRow, JournalEntryLineWithJoin } from "@/app/types";


export default function TrialBalance({ params }: {params: Promise<{ orgId: string }>}) {
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

  // Date filtering
  const now = new Date();
  const cutoff = new Date();

  if (filter === "month") {
    cutoff.setMonth(now.getMonth() - 1);
  } else if (filter === "quarter") {
    cutoff.setMonth(now.getMonth() - 3);
  } else if (filter === "year") {
    cutoff.setFullYear(now.getFullYear() - 1);
  }

  const filteredRows =
    filter === "all"
      ? rows
      : rows.filter((row) => {
          const rowDate = new Date(row.date);
          return rowDate >= cutoff && rowDate <= now;
        });

  // Group accounts and calculate balances
  const accountBalances: { account_name: string; account_type: string; debit: number; credit: number }[] = [];

  const grouped = filteredRows.reduce<Record<string, { debit: number; credit: number; type: string }>>((acc, entry) => {
    if (!acc[entry.account_name]) acc[entry.account_name] = { debit: 0, credit: 0, type: entry.account_type };
    acc[entry.account_name].debit += entry.debit;
    acc[entry.account_name].credit += entry.credit;
    return acc;
  }, {});

  for (const [account, values] of Object.entries(grouped)) {
  const totalDebit = values.debit;
  const totalCredit = values.credit;
  const balance = totalDebit - totalCredit; // debit positive, credit negative

  const normalDebitTypes = ["Asset", "Expense", "Dividend"];

  const isNormalDebit = normalDebitTypes.includes(values.type);

  accountBalances.push({
    account_name: account,
    account_type: values.type,
    debit: balance > 0 ? balance : balance === 0 && isNormalDebit ? 0 : 0,
    credit: balance < 0 ? -balance : balance === 0 && !isNormalDebit ? 0 : 0,
  });
}

  const totalDebit = accountBalances.reduce((acc, a) => acc + a.debit, 0);
  const totalCredit = accountBalances.reduce((acc, a) => acc + a.credit, 0);

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
      {/* Filter Dropdown */}
      <div className="flex justify-start m-6">
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

      {/* Header */}
      <div className="border-3 border-[#9A3F3F] mx-5 mb-5">
        <div className="bg-[#9A3F3F] text-center text-3xl text-white p-5 font-bold">
          <h1>Trial Balance</h1>
          {filterLabel !== "All" && <p className="text-[0.6em]">For {filterLabel} Ending {today}</p>}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse text-[#9A3F3F]">
            <thead>
              <tr className="bg-[#E6CFA9]">
                <th className="border px-4 py-2 text-left">Account</th>
                <th className="border px-4 py-2 text-right">Debit</th>
                <th className="border px-4 py-2 text-right">Credit</th>
              </tr>
            </thead>
            <tbody>
              {accountBalances.map((acc) => (
                <tr key={acc.account_name}>
                  <td className="border px-4 py-2">{acc.account_name}</td>
                  <td className="border px-4 py-2 text-right">{acc.debit > 0 ? acc.debit.toLocaleString() : acc.debit === acc.credit ? "0" : ""}</td>
                  <td className="border px-4 py-2 text-right">{acc.credit > 0 ? acc.credit.toLocaleString() : acc.debit === acc.credit ? "0" : "" }</td>
                </tr>
              ))}
              {/* Totals Row */}
              <tr className="font-bold bg-[#E6CFA9]">
                <td className="border px-4 py-2 text-right">Totals</td>
                <td className="border px-4 py-2 text-right">{totalDebit.toLocaleString()}</td>
                <td className="border px-4 py-2 text-right">{totalCredit.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
