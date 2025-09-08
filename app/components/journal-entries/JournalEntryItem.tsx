import type { JournalEntry } from "../../types"
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function JournalEntryItem({
  entry,
  prevEntry,
  onDelete,
  onEdit,
}: {
  entry: JournalEntry
  prevEntry?: JournalEntry
  onDelete?: (entry_id: string) => void
  onEdit?: (entry: JournalEntry) => void
}) {
  const dateObj = new Date(entry.date)
  const year = dateObj.getFullYear()
  const monthDay = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })

  return (
    <div className="text-[#9A3F3F] text-[0.85em]">
      {!prevEntry || new Date(prevEntry.date).getFullYear() !== year ? (
        <div className="grid grid-cols-[9.99%_72.1%_8.9%_2%] border-t">
          <p className="font-bold text-center border-r border-b border-[#9A3F3F]">{year}</p>
          <p className="border-r border-[#9A3F3F]"></p>
          <p className="border-r border-[#9A3F3F]"></p>
          <p></p>
        </div>
      ) : null}

      <div className="grid grid-cols-[9.99%_72.1%_8.9%_9%] group">
        <div className="text-center border-r border-[#9A3F3F] py-2">
          <p>{monthDay}</p>
          <button className="hidden group-hover:inline mt-3 m-1 hover:text-[#5A0808] cursor-pointer" onClick={() => onEdit?.(entry)}>
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button
            className="hidden group-hover:inline mt-3 m-1 hover:text-[#5A0808] cursor-pointer"
            onClick={() => onDelete?.(entry.entry_id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>

        <div className="col-span-3">
          {entry.lines?.map((line) => (
            <div
              key={line.line_id}
              className="grid grid-cols-[80.1%_9.9%_9.9%] border-t border-[#9A3F3F]"
            >
              <p className={`py-1 px-2 border-r ${line.credit > 0 ? "pl-9" : ""}`}>{line.account_name}</p>
              <p className="py-1 text-center border-r">{line.debit > 0 ? line.debit.toLocaleString() : ""}</p>
              <p className="py-1 text-center">{line.credit > 0 ? line.credit.toLocaleString() : ""}</p>
            </div>
          ))}
          <p className="bg-[#E6CFA9] px-2 py-1 border-t border-[#9A3F3F]">{entry.description}</p>
        </div>
      </div>
    </div>
  )
}
