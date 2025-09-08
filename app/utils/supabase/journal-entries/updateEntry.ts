"use server"

import { supabase } from "../server";
import type { JournalEntryLine } from "../../../types"

export async function updateEntry(entry_id: string, data: { date: string; description: string; lines: JournalEntryLine[] }) {
  // Update the main entry
  const { error: entryError } = await supabase
    .from("journal_entries")
    .update({
      date: data.date,
      description: data.description,
    })
    .eq("entry_id", entry_id)

  if (entryError) throw entryError

  // Remove old lines
  const { error: deleteError } = await supabase
    .from("journal_entry_lines")
    .delete()
    .eq("entry_id", entry_id)

  if (deleteError) throw deleteError

  // Insert new lines
  const { error: insertError } = await supabase.from("journal_entry_lines").insert(
    data.lines.map((line) => ({
      ...line,
      entry_id,
    }))
  )

  if (insertError) throw insertError
}
