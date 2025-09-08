"use client"
import { useState } from "react"
import type { JournalEntry, JournalEntryLine } from "../types"
import JournalEntryForm from "../components/journal-entries/JournalEntryForm"
import JournalEntryList from "../components/journal-entries/JournalEntryList"

export default function JournalEntries({ entries, org_id }: { entries: JournalEntry[], org_id: string }) {
  const [lines, setLines] = useState<Partial<JournalEntryLine>[]>([])
  const [toggleForm, setToggleForm] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)

  function resetForm() {
    setEditingEntry(null)
    setToggleForm(false)
    setLines([])
  }

  function handleNewEntry() {
    setEditingEntry(null)
    setLines([
      { account_type: "", account_name: "", debit: 0, credit: 0 },
      { account_type: "", account_name: "", debit: 0, credit: 0 },
    ])
    setToggleForm(bool => !bool)
  }

  function handleEditEntry(entry: JournalEntry) {
    setEditingEntry(entry)
    setLines(entry.lines || [])
    setToggleForm(true)
  }

  return (
    <div className="mx-5 mb-5">
      <div className="flex justify-end">
        <button
          onClick={handleNewEntry}
          className="w-[15%] bg-[#9A3F3F] hover:bg-[#5A0808] mb-6 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
        >
          + New Entry
        </button>
      </div>

      {toggleForm && (
        <JournalEntryForm
          org_id={org_id}
          lines={lines}
          setLines={setLines}
          resetForm={resetForm}
          entry={editingEntry}   // pass entry for editing
        />
      )}

      <JournalEntryList entries={entries} onEdit={handleEditEntry} />
    </div>
  )
}
