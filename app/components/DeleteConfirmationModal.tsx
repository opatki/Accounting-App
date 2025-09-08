import type { DeleteConfirmationModalProps } from "../types"

export default function DeleteConfirmationModal({
    isOpen,
    orgName,
    onConfirm,
    onCancel
}: DeleteConfirmationModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-black cursor-pointer"
                    onClick={onCancel}
                >
                    ✕
                </button>

                <div className="text-center">
                    <h3 className="text-xl font-semibold text-[#9A3F3F] mb-4">
                        Delete Organization
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete <strong>"{orgName}"</strong>? 
                        This action cannot be undone.
                    </p>

                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={onCancel}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="bg-[#9A3F3F] hover:bg-[#5A0808] text-white px-4 py-2 rounded-lg font-semibold cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}