import { getAllEntries } from "@/app/utils/supabase/journal-entries/getAllEntries"
import { getLines } from "@/app/utils/supabase/journal-entries/getLines"
import JournalEntries from "@/app/pages/JournalEntries"
import { JournalEntriesPageProps } from "@/app/types"

export default async function JournalEntriesPage({ params, searchParams }: JournalEntriesPageProps) {
  const { orgId } = await params  // no need for await, params is just an object
  const { startDate, endDate } = await searchParams || {}
  console.log(startDate, endDate)
  let entries = await getAllEntries(orgId)
  if (startDate && endDate) {
    const startYear = startDate.slice(0,4)
    const startMonth = startDate.slice(5,7)
    const startDay = startDate.slice(8)

    const endYear = endDate.slice(0,4)
    const endMonth = endDate.slice(5,7)
    const endDay = endDate.slice(8)
    
    entries = entries.filter((entry) => {
      const entryYear = entry.date.slice(0,4)
      const entryMonth = entry.date.slice(5,7)
      const entryDay = entry.date.slice(8)

      return ((entryYear >= startYear && entryYear <= endYear) && 
      (entryMonth >= startMonth && entryMonth <= endMonth) && 
      (entryDay >= startDay && entryDay <= endDay))
    })
  }
  

  const complete_entries = entries
    ? await Promise.all(
        entries.map(async (entry) => {
          const lines = await getLines(entry.entry_id)
          return { ...entry, lines }
        })
      )
    : []

  return (
     <JournalEntries entries={complete_entries} org_id={orgId} /> 
  )
}
