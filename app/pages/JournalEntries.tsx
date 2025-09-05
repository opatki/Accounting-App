"use client"
import { getAllEntries } from "@/app/utils/supabase/journal-entries/getAllEntries"
import type { JournalEntry } from "../types"

export default function JournalEntries({ entries }: {entries: JournalEntry[]}) {
    
    const renderEntries = entries?.map((entry) => (
        <div key={entry.entry_id} className="flex w-full ">
            <p className="border w-1/10">{entry.date}</p>
            <div className="w-9/10">
                <div className="">
                    {entry.lines?.map((line) => (
                        <div key={line.line_id} className="flex justify-between border">
                            <p>{line.account_name}</p>
                            {line.debit > 0 && <p className="border w-1/10 mr-[10%]">{line.debit}</p>}
                            {line.credit > 0 && <p className="border w-1/10">{line.credit}</p>}
                        </div>
                    ))}
                </div>
            <p className="border">{entry.description}</p>
            </div>
        </div>
    ))

    return (
        <div className="mx-5 mb-5">
            <div className="border-3 border-[#9A3F3F] ">
                <h1 className="bg-[#9A3F3F] text-center text-3xl text-white p-5 font-bold brightness-10">General Journal</h1>
                <div className="m-2 border-2 border-[#9A3F3F]">
                    <div className="w-full flex">
                        <p className="w-[10%] bg-[#ff7d7d] text-center text-2x1 border p-4">DATE</p>
                        <p className="w-[72.5%] bg-[#E6CFA9] text-center border p-4">ACCOUNT NAME</p>
                        <p className="w-[8.95%] bg-[#E6CFA9] text-center border p-4">DEBIT</p>
                        <p className="w-[9.1%] text-center border p-4">CREDIT</p>
                    </div>
                    {renderEntries}
                </div>
            </div>
        </div>
    )
}