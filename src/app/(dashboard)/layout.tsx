import { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { PanelLeft } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SidebarNav, MobileNav } from "@/components/dashboard/sidebar-nav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r border-zinc-200 bg-white sm:flex">
        <div className="flex h-16 items-center border-b border-zinc-200 px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="ReviewReply"
              width={36}
              height={36}
              className="object-contain mix-blend-multiply"
            />
            <span className="font-semibold text-zinc-950 tracking-tight">ReviewReply</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <SidebarNav />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col sm:pl-60">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-zinc-200 bg-white px-4 sm:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <PanelLeft className="h-4 w-4" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              }
            />
            <SheetContent side="left" className="w-60 p-0">
              <div className="flex h-16 items-center border-b border-zinc-200 px-5">
                <Link href="/" className="flex items-center gap-2.5">
                  <Image
                    src="/logo.png"
                    alt="ReviewReply"
                    width={36}
                    height={36}
                    className="object-contain mix-blend-multiply"
                  />
                  <span className="font-semibold text-zinc-950 tracking-tight">ReviewReply</span>
                </Link>
              </div>
              <div className="py-4">
                <MobileNav />
              </div>
            </SheetContent>
          </Sheet>
          <span className="font-semibold text-sm text-zinc-950">ReviewReply</span>
        </header>

        <main className="flex-1 px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
