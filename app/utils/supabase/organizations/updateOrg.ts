"use server"

import { supabase } from '../server'
import { auth } from "@clerk/nextjs/server"
import type { Org } from '@/app/types'

export async function updateOrg(formData: FormData) {
  const { userId } = await auth()

  const org_id = formData.get("org_id") as string
  const name = (formData.get("name") as string) || ""
  const image = (formData.get("image") as string) || ""
  const description = (formData.get("description") as string) || ""
  const link = (formData.get("link") as string) || ""


  const updatedOrg: Partial<Org> = {
    name,
    description,
    image,
    link,
    user_id: userId as string, // still enforce ownership
  }

  const { data, error } = await supabase
    .from("organizations")
    .update(updatedOrg)
    .eq("org_id", org_id)          // update only the matching org
    .eq("user_id", userId) // ensure user can only edit their own orgs

  if (error) {
    console.error("Error updating row:", error)
  } else {
    console.log("Updated data:", data)
  }
}
