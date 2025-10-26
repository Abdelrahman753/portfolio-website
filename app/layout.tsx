import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Abdelrahman Mahmoud | DevOps & Cloud Engineer",
  description:
    "DevOps & Cloud Engineer passionate about automation, AWS, and Linux. Explore my projects and experience.",
  keywords: ["DevOps", "Cloud Engineer", "AWS", "Linux", "Docker", "CI/CD", "Automation"],
  authors: [{ name: "Abdelrahman Mahmoud" }],
  openGraph: {
    title: "Abdelrahman Mahmoud | DevOps & Cloud Engineer",
    description: "DevOps & Cloud Engineer passionate about automation, AWS, and Linux.",
    type: "website",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
