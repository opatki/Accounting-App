"use client"

import { SignUp } from "@clerk/nextjs"

export default function Page() {
    return (
        <div className="flex justify-center my-10">
            <SignUp />
        </div>
    )
}