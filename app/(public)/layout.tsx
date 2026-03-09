import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageLoader } from '@/components/layout/PageLoader'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PageLoader />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
