"use server"

import Organizations from "../organizations/page"
import { getAllOrgs } from "../utils/getAllOrgs"

export default async function OrganizationsPage() {
  const organizations = await getAllOrgs()
  return <Organizations organizations={organizations} />
}