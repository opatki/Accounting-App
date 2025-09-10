"use client"
import { useState } from "react"
import type { JournalEntry, JournalEntryLine } from "../types"
import JournalEntryForm from "../components/journal-entries/JournalEntryForm"
import JournalEntryList from "../components/journal-entries/JournalEntryList"
import { useRouter } from "next/navigation"

export default function JournalEntries({ entries, org_id }: { entries: JournalEntry[], org_id: string }) {
  const [lines, setLines] = useState<Partial<JournalEntryLine>[]>([])
  const [toggleForm, setToggleForm] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const router = useRouter()
  const [selectedValue, setSelectedValue] = useState('')
  

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    setSelectedValue(value)

    const today = new Date()
    let startDate: string = ''
    let endDate: string = ''

    const month = today.getMonth() + 1
    const year = today.getFullYear()

    switch (value) {
      case 'month':
        startDate = `${year}-${month}-01`
        endDate = `${year}-${month}-31`
        break;
      case 'quarter':
        if (month <= 3) {
          startDate = `${year}-01-01`
          endDate = `${year}-03-31`
        } else if (month <= 6) {
          startDate = `${year}-04-01`
          endDate = `${year}-06-31`
        } else if (month <= 9) {
          startDate = `${year}-07-01`
          endDate = `${year}-09-31`
        } else {
          startDate = `${year}-10-01`
          endDate = `${year}-12-31`
        }
        break;
      case 'year':
        startDate = `${year}-01-01`
        endDate = `${year}-12-31`
        break;
      default:
        router.push(`/organizations/${org_id}/journal`)
        return
    }

    if (value) {
      router.push(`/organizations/${org_id}/journal?startDate=${startDate}&endDate=${endDate}`);
    }
  }

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
      <div className="flex items-center justify-between">
        <select value={selectedValue} onChange={handleChange} className="text-[#9A3F3F] border border-[#9A3F3F] p-2 rounded font-semibold">
          <option value="" disabled>
                Select Accounting Period
          </option>
          <option value="month">Past Month</option>
          <option value="quarter">Past Quarter</option>
          <option value="year">Past Year</option>
          <option value="all">All</option>
        </select>
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
