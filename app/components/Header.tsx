import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Logo from './Logo'


export default function Header() {
    return (
        <header className="p-4 bg-amber-200 flex justify-between">
            <Logo />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </header>
    )
}