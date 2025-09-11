"use server"

import { supabaseAdmin } from '../server'
import { auth } from '@clerk/nextjs/server'

export async function getAllOrgs() {
    const { userId } = await auth()
    const { data, error } = await supabaseAdmin
        .from('organizations')
        .select()
        .eq("user_id", userId)
    if (error) {
        console.error(error)
        return []
    }
    return data
}