import { supabase } from "../server"

export async function getAllEntries(org_id: string) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select() 
    .eq("org_id", org_id)   // filter by the specific organization
    .order("date", { ascending: false }) // optional: newest first

  if (error) {
    console.error(error)
    throw new Error("Failed to fetch journal entries")
  }

  return data
}