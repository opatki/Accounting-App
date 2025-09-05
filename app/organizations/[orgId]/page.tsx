import type { OrganizationPageProps } from "@/app/types"
import { getSingleOrg } from "@/app/utils/supabase/organizations/getSingleOrg"

export default async function Organization({ params }: OrganizationPageProps) {
    const { orgId } = await params
    const [org] = await getSingleOrg(orgId)
    
    
    return (
        <div className="flex justify-center gap-10 items-center my-10">
            <img className="h-80 rounded-2xl border-2 border-[#9A3F3F]" src={org.image ? org.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
            <div className="flex flex-col justify-center items-center gap-8">
                <p className="text-2xl text-center text-[#9A3F3F] max-w-100">{org.description ? org.description : "One of the better organizations"}</p> 
                {org.link ? <a target="_blank" className="text-2xl text-[#9A3F3F] underline hover:text-[#5A0808]" href={org.link}>{org.name}'s Website</a> : ""} 
            </div>
        </div>
    )
}