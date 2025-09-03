"use server"

import { supabase } from './supabase/server'
import { auth } from "@clerk/nextjs/server"
import type { Org } from '../types'

export async function updateOrg(formData: FormData) {
  const { userId } = await auth()

  const id = formData.get("id") as string
  const name = (formData.get("name") as string) || ""
  const description = (formData.get("description") as string) || ""

  const updatedOrg: Partial<Org> = {
    name,
    description,
    user_id: userId as string, // still enforce ownership
  }

  const { data, error } = await supabase
    .from("organizations")
    .update(updatedOrg)
    .eq("id", id)          // update only the matching org
    .eq("user_id", userId) // ensure user can only edit their own orgs

  if (error) {
    console.error("Error updating row:", error)
  } else {
    console.log("Updated data:", data)
  }
}
