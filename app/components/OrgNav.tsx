"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function OrgNav({ orgId }: { orgId: string }) {
  const pathname = usePathname()

  const links = [
    { href: `/organizations/${orgId}`, label: "Details" },
    { href: `/organizations/${orgId}/journal`, label: "Journal" },
    { href: `/organizations/${orgId}/ledger`, label: "Ledger" },
    { href: `/organizations/${orgId}/trial-balance`, label: "Trial Balance" },
    { href: `/organizations/${orgId}/financial-statements`, label: "Financial Statements" },
  ];

  return (
    <nav className="flex gap-7 mx-5">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`cursor-pointer hover:underline ${
              isActive ? "font-bold text-[#9A3F3F] underline" : "text-gray-700"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}