"use client"

import { newOrg } from "../utils/newOrg"
import { useState } from "react"
import type { Org } from "../types"
import OrgCard from "../components/OrgCard"

export default function Organizations({ organizations }: { organizations: Org[] }) {
    const [showForm, setShowForm] = useState(false)
    
    return (
        <div>
            <h1 className="text-6xl m-6">Your Organizations</h1>
            {/* <button onClick={() => setShowForm(prev => !prev)}>
                + New Organization
            </button> */}

            <div className="flex justify-center gap-3.5">  
                {organizations.map((org, index) => (
                    <OrgCard key={index} {...org} />
                ))}
            </div>

            {showForm && (
                <form action={newOrg}>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" required />
                <br />

                <label htmlFor="image">Image</label>
                <p>Provide a link to an image of your creator. Be sure to include the http://</p>
                <input id="image" type="text" name="image" />
                <br />

                <label htmlFor="description">Description</label>
                <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
                <textarea id="description" name="description" required></textarea>
                <br />

                <button type="submit">SUBMIT</button>
                </form>
            )}
        </div>
    )
}
