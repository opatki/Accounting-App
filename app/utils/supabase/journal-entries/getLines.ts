import { supabase } from "../server"

export async function getLines(entry_id: string) {
  const { data, error } = await supabase
    .from("journal_entry_lines")
    .select() // 👈 you can pull in the lines too if you want
    .eq("entry_id", entry_id)   // filter by the specific organization
    .order("debit", { ascending: false })

  if (error) {
    console.error(error)
    throw new Error("Failed to fetch journal entries")
  }

  return data
}