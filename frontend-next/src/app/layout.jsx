import './globals.css'
import { AuthProvider } from '../hooks/useAuth'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LanternEffect from '@/components/ui/LanternEffect'

export const metadata = {
  title: 'SkillTrail',
  description: 'Your learning journey',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-paper bg-void-black">
        <AuthProvider>
          <LanternEffect />
          <main>
            {children}
          </main>
          <Footer />
          <Navbar />
        </AuthProvider>
      </body>
    </html>
  )
}
