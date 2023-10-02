'use client'
import { GlobalLayout } from '@/components/layout'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" suppressHydrationWarning={true}>
        <body>
        <GlobalLayout >
          {children}
        </GlobalLayout>
        <Toaster />
        </body>
      </html>
  )
}
