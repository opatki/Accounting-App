"use server"

import { supabase } from "../server"

export async function deleteEntry(entry_id: string) {
  const { error } = await supabase
    .from("journal_entries")
    .delete()
    .eq("entry_id", entry_id)

  if (error) {
    console.error("Error deleting entry:", error)
    throw error
  }
}
