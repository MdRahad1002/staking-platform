import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageLoader } from '@/components/layout/PageLoader'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { StickySignupCTA } from '@/components/layout/StickySignupCTA'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PageLoader />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickySignupCTA />
    </div>
  )
}
