// src/app/layout.tsx
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: '1noblehealthcare',
  description: 'Quality healthcare services with compassion and innovation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container mx-auto p-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
