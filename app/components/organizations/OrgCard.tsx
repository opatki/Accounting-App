import type { OrgCardProps } from '@/app/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"

export default function OrgCard({ org_id, name, description, onEdit, onDelete }: OrgCardProps) {
    return (
        <div className="bg-[#9A3F3F] text-white p-6 rounded-xl border-3 border-[#9A3F3F] hover:shadow-[5px_5px_15px_black] hover:border-white max-w-70">
            <div className="flex justify-end items-center text-xl">
                <div className="mb-2">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onEdit(); }} 
                        className="mx-2 hover:text-[#5A0808] cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(); }} 
                        className="hover:text-[#5A0808] cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
            <Link href={`/organizations/${org_id}`} className="cursor-pointer">
                <h1 className="text-center text-2xl font-bold mb-1">{name}</h1>
                <p className="text-center">{description}</p>
            </Link>
        </div>
    )
}
