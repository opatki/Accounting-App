import type { JournalEntryLine } from "../../types"

export default function JournalEntryLineInput({
  index,
  line,
}: {
  index: number
  line: Partial<JournalEntryLine>
}) {
  return (
    <div className="grid grid-cols-[16.63%_63.57%_9.9%_9.9%] border-b border-[#9A3F3F]">
      {/* Account Type */}
      <input
        type="text"
        name={`lines[${index}][account_type]`}
        required
        placeholder="Ex: Asset"
        defaultValue={line.account_type || ""}
        className="border-r border-[#9A3F3F] px-2 py-1 focus:outline-none col-span-1"
      />

      {/* Account Name */}
      <input
        type="text"
        name={`lines[${index}][account_name]`}
        required
        placeholder="Cash"
        defaultValue={line.account_name || ""}
        className={`border-r border-[#9A3F3F] px-2 py-1 focus:outline-none col-span-1 ${
          line.credit && line.credit > 0 ? "pl-9" : ""
        }`}
      />

      {/* Debit */}
      <input
        type="number"
        name={`lines[${index}][debit]`}
        defaultValue={line.debit && line.debit > 0 ? line.debit : ""}
        className="border-r border-[#9A3F3F] text-center px-2 py-1 focus:outline-none col-span-1"
      />

      {/* Credit */}
      <input
        type="number"
        name={`lines[${index}][credit]`}
        defaultValue={line.credit && line.credit > 0 ? line.credit : ""}
        className="text-center px-2 py-1 focus:outline-none col-span-1"
      />
    </div>
  )
}
