import type { OrgCardProps } from '../types/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteOrg } from "../utils/deleteOrg"

export default function OrgCard({ id, name, description, onEdit, onDelete }: OrgCardProps) {
    
    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this organization?")) {
            const formData = new FormData()
            formData.append("id", id)
            
            const result = await deleteOrg(id)
            
            if (result?.error) {
                alert(`Error: ${result.error}`)
            } else {
                // Refresh the page to show updated list
                window.location.reload()
            }
        }
    }
    
    return (
        <div className="bg-[#9A3F3F] text-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer max-w-70">
            <div className="flex justify-end items-center text-xl">
                <div className="mb-2">
                    <button onClick={onEdit} className="mx-2 hover:text-[#5A0808] cursor-pointer">
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button onClick={onDelete} className="hover:text-[#5A0808] cursor-pointer">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
            <h1 className="text-center text-2xl font-bold mb-1">{name}</h1>
            <p className="text-center">{description}</p>
        </div>
    )
}