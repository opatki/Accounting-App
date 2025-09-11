"use server"

import { supabaseAdmin } from '../server'
import { auth } from "@clerk/nextjs/server"
import type { Org } from '@/app/types'

export async function newOrg(formData: FormData) {

    const { userId } = await auth()
    console.log(userId)
    const org: Partial<Org> = {
      name: (formData.get("name") as string) || "",
      image: (formData.get("image") as string) || "",
      link: (formData.get("link") as string) || "",
      description: (formData.get("description") as string) || "",
      user_id: userId as string || ""
    }

    const { data, error } = await supabaseAdmin
    .from('organizations')
    .insert([org])
        
    if (error) {
        console.error('Error inserting row:', error)
    } else {
        console.log('Inserted data:', data)
    }
  }