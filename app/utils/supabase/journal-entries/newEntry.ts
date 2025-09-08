"use server"

import { supabase } from "../server"
import { revalidatePath } from "next/cache"

export async function newEntry(formData: FormData) {
    
    const org_id = formData.get("org_id") as string
    const date = formData.get("date") as string
    const description = formData.get("description") as string

    // Collect line inputs
    const lines: {
        account_type: string
        account_name: string
        debit: number
        credit: number
    }[] = []

    // Loop until no more line inputs
    let i = 0
    while (formData.has(`lines[${i}][account_type]`)) {
        lines.push({
        account_type: formData.get(`lines[${i}][account_type]`) as string,
        account_name: formData.get(`lines[${i}][account_name]`) as string,
        debit: Number(formData.get(`lines[${i}][debit]`) || 0),
        credit: Number(formData.get(`lines[${i}][credit]`) || 0),
        })
        i++
    }
    console.log("Lines", lines, org_id, date, description)

    const { data: entry, error } = await supabase
        .from("journal_entries")
        .insert([{ org_id, date, description }])
        .select()
        .single()

    if (error) throw error

    // Step 2: Insert into journal_entry_lines
    const { error: lineError } = await supabase
        .from("journal_entry_lines")
        .insert(
        lines.map((line) => ({
            ...line,
            entry_id: entry.entry_id, // foreign key
        }))
    )

    if (lineError) throw lineError
    revalidatePath(`/organizations/${org_id}/journal`)
}


