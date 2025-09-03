"use server"

import { supabase } from './supabase/server'
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function deleteOrg(orgId: string) {
  const { userId } = await auth()
  
  if (!orgId) {
    console.error('No organization ID provided')
    return { error: "No organization ID provided" }
  }

  if (!userId) {
    console.error('User not authenticated')
    return { error: "User not authenticated" }
  }

  try {
    // Verify the user owns this organization before deleting
    const { data: org, error: fetchError } = await supabase
      .from('organizations')
      .select('user_id')
      .eq('id', orgId)
      .single()

    if (fetchError) {
      console.error('Error fetching organization:', fetchError)
      return { error: "Organization not found" }
    }

    if (org.user_id !== userId) {
      console.error('User does not have permission to delete this organization')
      return { error: "Permission denied" }
    }

    // Delete the organization
    const { error: deleteError } = await supabase
      .from('organizations')
      .delete()
      .eq('id', orgId)

    if (deleteError) {
      console.error('Error deleting organization:', deleteError)
      return { error: "Failed to delete organization" }
    }

    console.log('Successfully deleted organization:', orgId)
    
    // Revalidate the page to show updated list
    revalidatePath('/organizations')
    
    return { success: true }

  } catch (error) {
    console.error('Unexpected error in deleteOrg:', error)
    return { error: "An unexpected error occurred" }
  }
}