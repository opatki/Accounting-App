"use server"

import { supabaseAdmin } from '../server'
import { auth } from '@clerk/nextjs/server'

export async function getSingleOrg(org_id: string) {
    const { userId } = await auth()
    const { data, error } = await supabaseAdmin
        .from('organizations')
        .select()
        .eq("user_id", userId)
        .eq("org_id", org_id)
    if (error) {
        console.error(error)
        return []
    }
    return data
}