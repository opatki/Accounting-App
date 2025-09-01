import type { OrgCardProps } from '../types/index'

export default function OrgCard({ name, image, description }: OrgCardProps) {
    return (
        <div className={ image ? `bg-[url(${image})] bg-cover bg-center h-64 w-full` : "bg-[#faf3d1]"}>
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    )
}