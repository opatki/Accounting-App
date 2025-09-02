import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Logo from './Logo'


export default function Header() {
    return (
        <header className="p-4 bg-[#9A3F3F] flex justify-between">
            <Logo />
            <SignedOut>
                <SignInButton>
                <button type="button" className="text-white px-4 py-2 cursor-pointer rounded hover:bg-[#5A0808]">
                    Sign in
                </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </header>
    )
}