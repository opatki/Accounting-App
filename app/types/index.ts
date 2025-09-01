import type { ReactNode } from "react"

// Data Types
export type Org = {
    name: string
    description: string
    image: string
    user_id: string
}

export type GetModelsParams = {
    category?: string
}

// Page Types
export type OrganizationPageProps = {
    params: Promise<{
        orgId: string
    }>
}

export type OrgCardProps = {
    name: string
    image: string
    description: string
}

export type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>

export type ModelsPageProps = {
    searchParams: {
        q?: string
    }
}

export type ModelDetailPageProps = {
    params: Promise<{
        id: string
    }>
}


export type PillProps = {
    children: ReactNode
    className?: string
}

export type NavLinkProps = {
    href: string
    children: ReactNode
    isActive?: boolean
}