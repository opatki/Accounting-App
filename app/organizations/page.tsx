"use client"

import { newOrg } from "../utils/newOrg"
import { updateOrg } from "../utils/updateOrg"
import { deleteOrg } from "../utils/deleteOrg"
import { useState, useEffect } from "react"
import type { Org } from "../types"
import OrgCard from "../components/OrgCard"
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"
import { useRouter } from 'next/navigation'

export default function Organizations({ organizations }: { organizations: Org[] }) {
    const [showForm, setShowForm] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [editingOrg, setEditingOrg] = useState<Org | null>(null)
    const [orgToDelete, setOrgToDelete] = useState<Org | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (!showForm) {
            router.refresh()
        }
    }, [showForm, router])


    function handleSubmit() {
        setShowForm(false)
        setEditingOrg(null)
    }

    function handleEdit(org: Org) {
        setEditingOrg(org)
        setShowForm(true)
    }

    function handleDeleteClick(org: Org) {
        setOrgToDelete(org)
        setShowDeleteModal(true)
    }

    async function handleDeleteConfirm() {
        if (orgToDelete) {
            const result = await deleteOrg(orgToDelete.id)
            
            if (result?.error) {
                alert(`Error: ${result.error}`)
            } else {
                // Success - the revalidatePath in deleteOrg will refresh the data
            }
        }
        setShowDeleteModal(false)
        setOrgToDelete(null)
    }

    function handleDeleteCancel() {
        setShowDeleteModal(false)
        setOrgToDelete(null)
    }


    function handleCloseForm() {
        setShowForm(false)
        setEditingOrg(null)
    }


    return (
        <div className="bg-[#F7F7BF] min-h-100">
            
            <div className="flex justify-between items-center">
                <h1 className="text-[#9A3F3F] text-5xl m-6 font-bold">Your Organizations</h1>
                <button className="bg-[#9A3F3F] hover:bg-[#5A0808] mr-6 text-white px-6 py-3 rounded-lg font-semibold" 
                onClick={() => setShowForm(prev => !prev)}>
                    + New Organization
                </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3.5 border-t border-[#9A3F3F] text-[#9A3F3F] pt-4 m-5">  
                {organizations.map((org, index) => (
                    <OrgCard key={index} 
                            id={org.id} 
                            name={org.name} 
                            description={org.description} 
                            onEdit={() => handleEdit(org)}
                            onDelete={() => handleDeleteClick(org)} />
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
                    {/* Close button */}
                    <button
                        className="absolute top-3 right-3 text-gray-600 hover:text-black"
                        onClick={handleCloseForm}
                    >
                        ✕
                    </button>

                    <form action={editingOrg ? updateOrg : newOrg} onSubmit={handleSubmit} className="space-y-4">
                        
                        {editingOrg && (
                            <input type="hidden" name="id" value={editingOrg.id} />
                        )}
                        
                        <div>
                            <label htmlFor="name" className="block font-semibold mb-1">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                required
                                defaultValue={editingOrg?.name || ""}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block font-semibold mb-1"
                            >
                                Description
                            </label>
                            <p className="text-sm text-gray-500">
                                Provide a description of the organization. What is it? What makes
                                it interesting?
                            </p>
                            <textarea
                                id="description"
                                name="description"
                                required
                                defaultValue={editingOrg?.description || ""}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            ></textarea>
                        </div>

                        <button
                        type="submit"
                        className="bg-[#9A3F3F] hover:bg-[#5A0808] text-white px-6 py-2 rounded-lg font-semibold"
                        >
                        {editingOrg ? "UPDATE" : "SUBMIT"}
                        </button>
                    </form>
                    </div>
                </div>
                )}

                <DeleteConfirmationModal
                isOpen={showDeleteModal}
                orgName={orgToDelete?.name || ""}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </div>
    )
}
