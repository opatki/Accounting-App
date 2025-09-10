"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase/server";

type LineRow = {
  account_name: string;
  account_type: string;
  debit: number;
  credit: number;
  date: string;
};

export default function BalanceSheet({ params }: { params: Promise<{ orgId: string }> }) {
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
        ? data.map((d: any) => ({
            account_name: String(d.account_name),
            account_type: String(d.account_type),
            debit: d.debit == null ? 0 : Number(d.debit),
            credit: d.credit == null ? 0 : Number(d.credit),
            date: d.journal_entries ? String(d.journal_entries.date) : "",
          }))
        : [];

      setRows(normalized);
    }

    fetchData();
  }, []);

  function groupAccounts(rows: LineRow[], type: string) {
    const grouped: Record<string, number> = {};

    rows
      .filter((r) => r.account_type === type)
      .forEach((r) => {
        let balance = 0;

        if (type === "Asset" || type === "Expense" || type === "Dividend") {
          // Debit normal accounts
          balance = r.debit - r.credit;
        } else {
          // Credit normal accounts
          balance = r.credit - r.debit;
        }

        if (!grouped[r.account_name]) grouped[r.account_name] = 0;
        grouped[r.account_name] += balance;
      });

    return grouped;
  }

  const assetGroups = groupAccounts(rows, "Asset");
  const liabilityGroups = groupAccounts(rows, "Liability");
  const equityGroups = groupAccounts(rows, "Equity");

  // --- Net Income calculation ---
  const totalRevenues = rows
    .filter((r) => r.account_type === "Revenue")
    .reduce((acc, r) => acc + r.credit - r.debit, 0);

  const totalExpenses = rows
    .filter((r) => r.account_type === "Expense")
    .reduce((acc, r) => acc + r.debit - r.credit, 0);

  const netIncome = totalRevenues - totalExpenses;

  // Inject Net Income into Equity
  equityGroups["Net Income"] = (equityGroups["Net Income"] || 0) + netIncome;

  const totalAssets = Object.values(assetGroups).reduce((a, b) => a + b, 0);
  const totalLiabilities = Object.values(liabilityGroups).reduce((a, b) => a + b, 0);
  const totalEquity = Object.values(equityGroups).reduce((a, b) => a + b, 0);

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="border-3 border-[#9A3F3F] mx-5 mb-5">
      <div className="bg-[#9A3F3F] text-center text-3xl text-white p-5 font-bold">
        <h1>Balance Sheet</h1>
        <p className="text-[0.6em]">{today}</p>
      </div>

      <div className="p-6 text-[#9A3F3F] grid grid-cols-2 gap-10">
        <div>
          <h2 className="font-bold text-lg mb-2">Assets</h2>
          <ul>
            {Object.entries(assetGroups).map(([name, bal]) => (
              <li key={name} className="flex justify-between">
                <span>{name}</span>
                <span>{bal.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="font-bold flex justify-between border-t pt-2">
            <span>Total Assets</span>
            <span>${totalAssets.toLocaleString()}</span>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-2">Liabilities</h2>
          <ul>
            {Object.entries(liabilityGroups).map(([name, bal]) => (
              <li key={name} className="flex justify-between">
                <span>{name}</span>
                <span>{bal.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="font-bold flex justify-between border-t pt-2 mb-4">
            <span>Total Liabilities</span>
            <span>${totalLiabilities.toLocaleString()}</span>
          </div>

          <h2 className="font-bold text-lg mb-2">Equity</h2>
          <ul>
            {Object.entries(equityGroups).map(([name, bal]) => (
              <li key={name} className="flex justify-between">
                <span>{name}</span>
                <span>{bal.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="font-bold flex justify-between border-t pt-2">
            <span>Total Equity</span>
            <span>${totalEquity.toLocaleString()}</span>
          </div>

          <div className="font-bold flex justify-between border-t pt-4 text-xl">
            <span>Total Liabilities & Equity</span>
            <span>${(totalLiabilities + totalEquity).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
