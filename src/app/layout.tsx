'use client'

import { Toaster } from '@/components/ui/toaster'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>{children}
        <Toaster />
        </body>
      </html>
    </QueryClientProvider>
    
  )
}
