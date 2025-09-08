import type { JournalEntry } from "../../types"
import JournalEntryItem from "./JournalEntryItem"
import { deleteEntry } from "../../utils/supabase/journal-entries/deleteEntry"


export default function JournalEntryList({
    entries, 
    onEdit 
}: {
    entries: JournalEntry[]
    onEdit: (entry: JournalEntry) => void
}) {

  async function handleDelete(entry_id: string) {
    await deleteEntry(entry_id)
    // simplest refresh for now
    window.location.reload()
  }

  return (
    <div className="border-3 border-[#9A3F3F]">
      <h1 className="bg-[#9A3F3F] text-center text-3xl text-white p-5 font-bold">
        General Journal
      </h1>
      <div className="m-2 border-2 border-[#9A3F3F]">
        {/* table header */}
        <div className="grid grid-cols-[10%_72.1%_8.9%_9%] text-[#9A3F3F] text-center text-2x1 font-bold bg-[#E6CFA9] border-b border-[#9A3F3F]">
          <p className="border-r px-4 py-1">DATE</p>
          <p className="border-r px-4 py-1">ACCOUNT NAME</p>
          <p className="border-r px-4 py-1">DEBIT</p>
          <p className="px-4 py-1">CREDIT</p>
        </div>

        {entries.map((entry, i) => (
          <JournalEntryItem
            key={entry.entry_id}
            entry={entry}
            prevEntry={entries[i - 1]}
            onDelete={handleDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  )
}
