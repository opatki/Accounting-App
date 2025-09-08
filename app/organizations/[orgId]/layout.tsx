import { getSingleOrg } from "@/app/utils/supabase/organizations/getSingleOrg"
import OrgNav from "@/app/components/organizations/OrgNav"

export default async function OrgLayout({
  children, params
}: {
  children: React.ReactNode
  params: Promise<{
    orgId: string
  }>
}) {

    const { orgId } = await params
    const [org] = await getSingleOrg(orgId)
    
    return (
        <main className="bg-[#F7F7BF] flex-grow">
            {org ? <>
                <h1 className="text-[#9A3F3F] text-5xl mt-6 ml-6 font-bold">{org.name}</h1>

                <div className="border-t border-[#9A3F3F] text-[#9A3F3F] pt-4 m-5">  
                    <OrgNav orgId={orgId} />
                </div>
                {children}
            </> : 
                <h1 className="text-[#9A3F3F] text-5xl mt-6 ml-6 font-bold">Loading...</h1>
            }
        </main>
    )
}