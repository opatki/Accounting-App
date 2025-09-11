// Data Types
export type Org = {
    org_id: string
    name: string
    description: string
    image?: string
    link?: string
    user_id: string
}

// Page Types
export type OrganizationPageProps = {
    params: Promise<{
        orgId: string
    }>
}

export type OrgCardProps = {
    org_id: string
    name: string
    description: string
    onEdit: () => void
    onDelete: () => void
}

export type DeleteConfirmationModalProps = {
    isOpen: boolean
    orgName: string
    onConfirm: () => void
    onCancel: () => void
}

export type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>

export type JournalEntry = {
  entry_id: string
  created_at: string
  date: string
  description: string
  org_id: string
  lines: JournalEntryLine[] | null
}

export type JournalEntryLine = {
  line_id?: string
  created_at?: string
  account_name: string
  account_type: string
  debit: number 
  credit: number 
  entry_id?: string
}

export type JournalEntriesPageProps = {
    params: Promise<{
        orgId: string
    }>
    searchParams?: Promise<{
        startDate?: string
        endDate?: string
        [key: string]: string | string[] | undefined
    }>
}

export type LineRow = {
  account_name: string;
  account_type: string;
  debit: number;
  credit: number;
  date: string;
}


export type JournalEntryLineWithJoin = {
  account_name?: string | null;
  account_type?: string | null;
  debit?: number | null;
  credit?: number | null;
  journal_entries?: { date?: string; org_id?: string } | null;
}