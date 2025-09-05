import { getAllEntries } from "@/app/utils/supabase/journal-entries/getAllEntries"
import { getLines } from "@/app/utils/supabase/journal-entries/getLines"
import JournalEntries from "@/app/pages/JournalEntries"
import { JournalEntriesPageProps } from "@/app/types"

export default async function JournalEntriesPage({ params }: JournalEntriesPageProps) {
  const { orgId } = await params  // no need for await, params is just an object
  const entries = await getAllEntries(orgId)

  const complete_entries = entries
    ? await Promise.all(
        entries.map(async (entry) => {
          const lines = await getLines(entry.entry_id)
          return { ...entry, lines }
        })
      )
    : []

  console.log(complete_entries)

  return (
     <JournalEntries entries={complete_entries} /> 
  )
}
