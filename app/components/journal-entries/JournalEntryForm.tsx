import { newEntry } from "../../utils/supabase/journal-entries/newEntry"
import { updateEntry } from "../../utils/supabase/journal-entries/updateEntry"
import JournalEntryLineInput from "./JournalEntryLineInput"
import type { JournalEntry, JournalEntryLine } from "../../types"

type Props = {
  org_id: string
  lines: Partial<JournalEntryLine>[]
  setLines: React.Dispatch<React.SetStateAction<Partial<JournalEntryLine>[]>>
  resetForm: () => void
  entry?: JournalEntry | null
}

export default function JournalEntryForm({ org_id, lines, setLines, resetForm, entry }: Props) {
  function addLine() {
    setLines([...lines, { account_type: "", account_name: "", debit: 0, credit: 0 }])
  }

  function deleteLine() {
    setLines((prev) => prev.slice(0, -1))
  }

    async function handleSubmit(formData: FormData) {
        // Extract fields
        const date = formData.get("date") as string
        const description = formData.get("description") as string

        // Gather lines dynamically
        const lines: any[] = []
        let i = 0
        while (formData.has(`lines[${i}][account_type]`)) {
            lines.push({
            account_type: formData.get(`lines[${i}][account_type]`) as string,
            account_name: formData.get(`lines[${i}][account_name]`) as string,
            debit: Number(formData.get(`lines[${i}][debit]`)) || 0,
            credit: Number(formData.get(`lines[${i}][credit]`)) || 0,
            })
            i++
        }

        if (entry) {
            // editing
            await updateEntry(entry.entry_id, {
            date,
            description,
            lines,
            })
        } else {
            // creating
            await newEntry(formData)
        }

        resetForm()
        window.location.reload()
    }

  return (
    <div className="border-4 border-[#9A3F3F] w-full mb-5">
      <div className="grid grid-cols-[10%_15%_57.15%_8.9%_9%] text-[#9A3F3F] text-center text-2x1 font-bold bg-[#E6CFA9] border-b border-[#9A3F3F]">
        <p className="border-r-1 border-[#9A3F3F] py-2">DATE</p>
        <p className="border-r-1 border-[#9A3F3F] py-2">ACCOUNT TYPE</p>
        <p className="border-r-1 border-[#9A3F3F] py-2">ACCOUNT NAME</p>
        <p className="border-r-1 border-[#9A3F3F] py-2">DEBIT</p>
        <p className="py-2">CREDIT</p>
      </div>

      <form action={handleSubmit}>
        <input type="hidden" name="org_id" value={org_id} />

        <div className="grid grid-cols-[9.99%_72.1%_8.9%_9%] text-[#9A3F3F] border-b-2 border-[#9A3F3F]">
            <div className="border-r-2 border-[#9A3F3F] text-center py-2">
            <input
                type="date"
                name="date"
                defaultValue={entry ? entry.date.split("T")[0] : ""}
                required
                className="border p-2 w-9/10 text-[.9em]"
            />
            </div>

            <div className="col-span-3">
                {lines.map((line, i) => (
                <JournalEntryLineInput key={i} index={i} line={line} />
                ))}

                <div className="bg-[#E6CFA9] border-t-2 border-[#9A3F3F]">
                <input
                    type="text"
                    name="description"
                    defaultValue={entry?.description || ""}
                    required
                    placeholder="Description"
                    className="px-2 py-2 w-full focus:outline-none"
                />
                </div>
            </div>
        </div>

        <div className="flex justify-between p-4">
          <div>
            <button type="button" onClick={addLine} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mr-3 cursor-pointer">
              + Add Line
            </button>
            <button type="button" onClick={deleteLine} className="bg-red-400 px-4 py-2 rounded hover:bg-red-500 cursor-pointer">
              - Delete Line
            </button>
          </div>
          <div>
            <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mr-3 cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="bg-[#9A3F3F] text-white px-6 py-2 rounded hover:bg-[#5A0808] cursor-pointer">
                {entry ? "Update Entry" : "Save Entry"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
