import FinancialStatementsNav from "@/app/components/financial-statements/FinancialStatementsNav"

export default async function FinancialStatementsLayout({children, params}: {
  children: React.ReactNode
  params: Promise<{
    orgId: string
  }>
}) {

    const { orgId } = await params
    
    return (
        <div className="mx-5">
            <FinancialStatementsNav orgId={orgId}/>
            {children}
        </div>
    )
}