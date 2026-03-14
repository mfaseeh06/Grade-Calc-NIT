import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NIT GPA Calculator',
  description: 'Calculate your GPA and CGPA according to NIT\'s grading policy',
  generator: 'Faseeh',
  icons: {
    icon: [
      {
        url: 'null',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'null',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: 'null',
        type: 'image/svg+xml',
      },
    ],
    apple: 'null',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
