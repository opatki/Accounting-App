"use server"

import Organizations from "../pages/Organizations"
import { getAllOrgs } from "../utils/supabase/organizations/getAllOrgs"

export default async function OrganizationsPage() {
  const organizations = await getAllOrgs()
  return <Organizations organizations={organizations} />
}