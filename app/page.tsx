import GetStarted from "./pages/GetStarted"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import OrganizationsPage from "./organizations/page"

export default function Home() {
  return (
    <>
      <SignedOut>
        <GetStarted />
      </SignedOut>
      <SignedIn>
        <OrganizationsPage />
      </SignedIn>
    </>
  )
}