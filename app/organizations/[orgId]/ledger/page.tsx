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

export default function Ledger() {
  const [rows, setRows] = useState<LineRow[]>([]);
  const [filter, setFilter] = useState<"month" | "quarter" | "year" | "all">("month");

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("journal_entry_lines")
        .select("account_name, account_type, debit, credit, journal_entries(date)")
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

  // Date filtering
  const now = new Date();
  let cutoff = new Date();

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

  // Group rows by account
  const groupedRows = filteredRows.reduce<Record<string, LineRow[]>>((acc, entry) => {
    if (!acc[entry.account_name]) acc[entry.account_name] = [];
    acc[entry.account_name].push(entry);
    return acc;
  }, {});

  const renderAccounts = [];
  for (const key in groupedRows) {
    const value = groupedRows[key];
    renderAccounts.push(
      <div
        key={key}
        className="border rounded-xl shadow p-4 m-4 w-80 relative"
      >
        <h2 className="text-lg font-bold text-center mb-2">{key}</h2>
        <div className="absolute left-1/2 top-13 bottom-4 border-l"></div>
        <div className="border-t border-b">
          {value.map((entry, idx) => {
            const dateObj = new Date(entry.date);
            const monthDay = dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })

            return (
              <div key={idx} className="grid grid-cols-2 text-sm py-1">
                <div className="text-left pl-2">
                  {entry.debit > 0 ? (
                    <div className="flex justify-between mr-3">
                      <p>{monthDay}</p>
                      <p>{entry.debit.toLocaleString()}</p>
                    </div>
                  ) : null}
                </div>
                <div className="text-right pr-2">
                  {entry.credit > 0 ? (
                    <div className="flex justify-between ml-3">
                      <p>{entry.credit.toLocaleString()}</p>
                      <p>{monthDay}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Balance */}
        {(() => {
          const totalDebit = value.reduce((acc, e) => acc + e.debit, 0);
          const totalCredit = value.reduce((acc, e) => acc + e.credit, 0);
          const balance = Math.abs(totalDebit - totalCredit);
          const accountType = value[0]?.account_type;

          return totalDebit > totalCredit ||
            (balance === 0 && (accountType === "Asset" || accountType === "Expense")) ? (
            <div className="border-t mt-2 pt-1 grid grid-cols-2 text-sm font-semibold">
              <div className="text-right pr-3 pt-1">
                Bal. {balance.toLocaleString()}
              </div>
              <div></div>
            </div>
          ) : (
            <div className="border-t mt-2 pt-1 grid grid-cols-2 text-sm font-semibold">
              <div></div>
              <div className="text-left pl-3 pt-1">
                Bal. {balance.toLocaleString()}
              </div>
            </div>
          );
        })()}
      </div>
    );
  }

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
      {/* Dropdown */}
      <div className="flex justify-start m-6">
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "month" | "quarter" | "year" | "all")
          }
          className="border rounded px-3 py-2 shadow text-[#9A3F3F] font-semibold"
        >
          <option value="month">Past Month</option>
          <option value="quarter">Past Quarter</option>
          <option value="year">Past Year</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className="border-3 border-[#9A3F3F] mx-5 mb-5">
        <div className="bg-[#9A3F3F] text-center text-3xl text-white p-5 font-bold">
          <h1>General Ledger</h1>
            {filterLabel !== "All" && <p className="text-[0.6em]">
                For {filterLabel} Ending {today}
            </p>}
        </div>

        <div className="flex justify-center items-center flex-wrap text-[#9A3F3F] mb-5">
          {renderAccounts}
        </div>
      </div>
    </>
  );
}
