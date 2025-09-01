import type { OrganizationPageProps } from "@/app/types"

export default async function Organization({ params }: OrganizationPageProps) {
    const { orgId } = await params
    console.log(orgId)
    return (
        <h1>This is Organization Page for org {orgId}</h1>
    )
}