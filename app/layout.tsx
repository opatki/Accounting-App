import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import  Header  from './components/Header'
import  Footer  from './components/Footer'
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import './globals.css'

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Bookify',
  description: 'Solves all your accounting problems',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}