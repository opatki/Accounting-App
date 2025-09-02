import type { OrgCardProps } from '../types/index'

export default function OrgCard({ name, image, description }: OrgCardProps) {
    return (
        <div className="bg-[#9A3F3F] text-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer max-w-70">
            <h1 className="text-2xl font-bold mb-1">{name}</h1>
            <p className="">{description}</p>
        </div>
    )
}