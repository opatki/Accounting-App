"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function FinancialStatementsNav({ orgId }: { orgId: string }) {
  const pathname = usePathname()

  const links = [
    { href: `/organizations/${orgId}/financial-statements`, label: "Income Statement" },
    { href: `/organizations/${orgId}/financial-statements/statement-of-stockholders-equity`, label: "Statement of Stockholder's Equity" },
    { href: `/organizations/${orgId}/financial-statements/balance-sheet`, label: "Balance Sheet" }
  ]

  return (
    <nav className="flex justify-end gap-7 mx-5 border-b border-[#9A3F3F] mb-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`bg-[#9A3F3F] mb-1 rounded py-2 px-3 cursor-pointer hover:underline ${
              isActive ? "font-bold text-white underline" : "text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}