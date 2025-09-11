import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Logo from './Logo'
import Link from 'next/link'


export default function Header() {
    return (
        <header className="p-4 bg-[#9A3F3F] flex justify-between">
            <div className="flex items-center gap-10">
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <SignedOut>
                <SignInButton>
                    <button type="button" className="text-white px-4 py-2 cursor-pointer rounded hover:font-bold hover:underline">
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