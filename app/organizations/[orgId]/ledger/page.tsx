import { supabase } from "@/app/utils/supabase/server";

type LineRow = {
  account_name: string;
  account_type: string;
  debit: number;   // we’ll normalize to number
  credit: number;  // "
  date: string;
};

export default async function Ledger() {
    const { data, error } = await supabase
        .from("journal_entry_lines")
        .select("account_name, account_type, debit, credit, journal_entries(date)")
        .order("created_at", { ascending: true });

    if (error) {
        console.error(error);
        return <div className="text-red-600">Failed to load ledger.</div>;
    }

    // runtime-safe normalization:
    const rows: LineRow[] = Array.isArray(data)
        ? data.map((d: any) => ({
            account_name: String(d.account_name),
            account_type: String(d.account_type),
            // Postgres numeric often comes back as string -> convert to Number and default to 0
            debit: d.debit == null ? 0 : Number(d.debit),
            credit: d.credit == null ? 0 : Number(d.credit),
            date: d.journal_entries ? String(d.journal_entries.date) : "",
        }))
        : [];

    // now rows is safely typed — you can reduce / group it
    const groupedRows = rows.reduce<Record<string, LineRow[]>>((acc, entry) => {
        if (!acc[entry.account_name]) acc[entry.account_name] = [];
        acc[entry.account_name].push(entry);
        return acc;
    }, {});

    const renderAccounts = []

    for (const key in groupedRows) {
        if (groupedRows.hasOwnProperty(key)) {
            const value = groupedRows[key]
            renderAccounts.push(
                <div key={renderAccounts.length} className="border rounded-xl shadow p-4 m-4 w-80 relative">
                    {/* Account title */}
                    <h2 className="text-lg font-bold text-center mb-2">{key}</h2>

                    {/* Vertical divider spanning everything */}
                    <div className="absolute left-1/2 top-13 bottom-4 border-l"></div>

                    {/* Entries */}
                    <div className="border-t border-b">
                        {value.map((entry, idx) => {
                            const dateObj = new Date(entry.date)
                            const monthDay = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })

                            return <div key={idx} className="grid grid-cols-2 text-sm py-1">
                                {/* Debit side */}
                                <div className="text-left pl-2">
                                {entry.debit > 0 ? (
                                    <div className="flex justify-between mr-3">
                                        <p>{monthDay}</p>
                                        <p>{entry.debit.toLocaleString()}</p>
                                    </div>
                                ) : null}
                                </div>

                                {/* Credit side */}
                                <div className="text-right pr-2">
                                {entry.credit > 0 ? (
                                    <div className="flex justify-between ml-3">
                                        <p>{entry.credit.toLocaleString()}</p>
                                        <p>{monthDay}</p>
                                    </div>
                                ) : null}
                                </div>
                            </div>
                        })}
                    </div>

                    {/* Balance */}
                    {(() => {
                        const totalDebit = value.reduce((acc, e) => acc + e.debit, 0)
                        const totalCredit = value.reduce((acc, e) => acc + e.credit, 0)
                        const balance = Math.abs(totalDebit - totalCredit)
                        const accountType = value[0]?.account_type;

                        const renderBalance = totalDebit > totalCredit || (balance === 0 && (accountType === "Asset" || accountType === "Expense")) ? 
                        // Balance on debit side
                        (
                            <div className="border-t mt-2 pt-1 grid grid-cols-2 text-sm font-semibold">
                            <div className="text-right pr-3 pt-1">Bal. {balance.toLocaleString()}</div>
                            <div></div>
                            </div>
                        ) :
                        // Balance on credit side
                        (
                            <div className="border-t mt-2 pt-1 grid grid-cols-2 text-sm font-semibold">
                            <div></div>
                            <div className="text-left pl-3 pt-1">Bal. {balance.toLocaleString()}</div>
                            </div>
                        )
                        return renderBalance
                    })()}
                </div>
            )
        }
    }

    // ...render grouped T-accounts
    return (
        <div className="border-3 border-[#9A3F3F] mx-5 mb-5">
            <h1 className="bg-[#9A3F3F] text-center text-3xl text-white p-5 font-bold">
                General Ledger
            </h1>
            <div className="flex justify-center items-center flex-wrap text-[#9A3F3F] mb-5">
                {renderAccounts}
            </div>
        </div>
    ) 
}
