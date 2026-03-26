import Link from "next/link"
import Image from "next/image"
import { Star, CheckCircle2 } from "lucide-react"
import TiltCard from "@/components/ui/tilt-card"
import ContactModal from "@/components/contact-modal"
import FaqModal from "@/components/faq-modal"
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 font-sans selection:bg-zinc-200">

      {/* Navigation */}
      <header className="w-full flex items-center justify-between px-4 lg:px-12 py-4 md:py-6 bg-[#FAFAFA]">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="ReviewReply" width={40} height={40} className="object-contain rounded-xl" />
          <span className="font-semibold text-lg md:text-xl tracking-tight">ReviewReply</span>
        </div>

        <nav className="hidden md:flex items-center gap-3">
          <FaqModal />
        </nav>

        <div className="flex items-center gap-3 md:gap-6">
          <Link href="/login" className="text-sm font-medium hover:text-zinc-600 transition-colors">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-black text-white text-xs md:text-sm font-medium px-4 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-zinc-800 transition-colors"
          >
            Get started free
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center w-full">

        {/* Hero Section */}
        <section className="w-full max-w-[1000px] px-6 py-10 md:py-16 flex flex-col items-center text-center">

          <h1 className="text-[2.4rem] sm:text-[3.2rem] md:text-[5.5rem] leading-[1.05] tracking-tight font-medium mb-6 md:mb-8">
            <span className="text-black">Connect Once.</span><br/>
            <span className="text-black">Every Review Answered.</span><br/>
            <span className="text-black">Forever.</span>
          </h1>

          <p className="text-base md:text-lg text-black max-w-2xl mb-8 md:mb-10 font-medium leading-relaxed">
            Link your Google Business Profile in 60 seconds. From that moment, every review across every location gets a personalized, on-brand reply — posted automatically, 24/7, without you lifting a finger.
          </p>

          <Link
            href="/signup"
            className="bg-black text-white text-[15px] font-medium px-8 py-3.5 rounded-full hover:bg-zinc-800 transition-transform hover:scale-105 duration-200"
          >
            Start Free Trial
          </Link>

        </section>


        {/* Logos Section */}
        <section className="w-full max-w-[1000px] px-6 mb-16 md:mb-32">
          <p className="text-center text-xs md:text-sm font-medium text-zinc-400 mb-6 md:mb-8 tracking-wide">TRUSTED BY LEADING MULTI-LOCATION BRANDS</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12 md:gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-bold text-base md:text-xl tracking-tight">BrightPath Dental</span>
            <span className="font-medium text-base md:text-xl font-serif">Greenleaf Bistro</span>
            <span className="font-black italic text-base md:text-xl tracking-tighter uppercase">QuickTune Auto</span>
            <span className="font-semibold text-sm md:text-lg tracking-widest uppercase">CoreBase Fitness</span>
            <span className="font-light text-base md:text-xl tracking-wide">The Driftwood Collection</span>
            <span className="font-extrabold text-base md:text-xl lowercase">smilecraft clinics</span>
          </div>
        </section>

        {/* Value Prop Details */}
        <section className="w-full max-w-[1000px] px-6 mb-16 md:mb-32 grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-4 md:mb-6">Our AI crafts the perfect reply in your exact tone.</h2>
            <p className="text-base md:text-lg text-zinc-500 mb-6 md:mb-8 leading-relaxed">
              Positive reviews get thanked with genuine gratitude and a subtle nudge to come back. Negative ones get real empathy, a clear acknowledgment of the issue, and a path toward resolution — no copy-paste templates, no robotic responses.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-black shrink-0 mt-0.5" />
                <span className="text-zinc-600 font-medium text-sm md:text-base">Posted automatically on Google in under 15 seconds.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-black shrink-0 mt-0.5" />
                <span className="text-zinc-600 font-medium text-sm md:text-base">Full control over your custom brand tone from one place.</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[360px] md:h-[400px] w-full mt-6 md:mt-0 perspective-[1000px] group">
            <TiltCard className="w-full h-full">
              {/* Card 1 - Back (Dental) */}
              <div className="absolute top-0 left-4 right-4 bg-white/40 p-5 rounded-2xl shadow-sm border border-zinc-200 backdrop-blur-sm -rotate-6 translate-y-8 group-hover:-translate-x-24 md:group-hover:-translate-x-48 group-hover:-rotate-[15deg] transition-all duration-500 ease-out z-0">
                 <div className="flex justify-between items-center mb-2">
                   <div className="flex text-yellow-500 text-sm">★★★★★</div>
                   <span className="text-xs text-zinc-400">2d ago</span>
                 </div>
                 <p className="text-zinc-600 text-xs font-medium mb-3 line-clamp-2">&quot;Dr. Patel was so gentle with my daughter&apos;s first filling. The front desk staff...&quot;</p>
                 <div className="bg-zinc-100 rounded-lg p-3">
                    <span className="text-[10px] font-bold text-zinc-900 block mb-1">Summit Smiles Dental</span>
                    <p className="text-[10px] text-zinc-500 line-clamp-2">Thank you so much! We know dental visits can be scary for kids, so we always try to make it fun and painless...</p>
                 </div>
              </div>

              {/* Card 2 - Middle (Fitness) */}
              <div className="absolute top-0 left-2 right-2 bg-white/70 p-5 rounded-2xl shadow-md border border-zinc-200 backdrop-blur-md rotate-3 translate-y-4 group-hover:translate-x-24 md:group-hover:translate-x-48 group-hover:rotate-[15deg] transition-all duration-500 ease-out z-10">
                 <p className="text-zinc-700 text-sm font-medium mb-3 line-clamp-2">&quot;Best HIIT class in the city. The coach really pushed me today! Will definitely be back.&quot;</p>
                 <div className="bg-zinc-100/80 rounded-lg p-3 mb-3">
                    <span className="text-xs font-bold text-zinc-900 block mb-1">IronForge Gym</span>
                    <p className="text-xs text-zinc-600 line-clamp-2">Love to hear it! Our coaches pride themselves on the energy they bring. See you next session!</p>
                 </div>
                 <div className="flex justify-between items-center">
                   <div className="flex text-yellow-500 text-sm">★★★★★</div>
                   <span className="text-xs text-zinc-400">5h ago</span>
                 </div>
              </div>

              {/* Card 3 - Front (Cafe) */}
              <div className="absolute top-0 left-0 right-0 bg-white p-5 md:p-6 rounded-2xl shadow-xl border border-zinc-100 z-20 group-hover:-translate-y-8 group-hover:shadow-2xl transition-all duration-500 ease-out">
                 <div className="flex text-yellow-500 mb-2">★★★★★</div>
                 <p className="text-zinc-800 text-sm font-medium mb-4">&quot;The harvest bowl was perfectly balanced, and the staff was incredibly kind even during the lunch rush. The dressing is to die for!&quot;</p>
                 <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-zinc-900">The Copper Spoon</span>
                      <span className="text-xs text-zinc-400 ml-auto">14s ago</span>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-600">Thank you so much for the wonderful review! We&apos;re thrilled to hear you enjoyed the harvest bowl. Our team always strives to provide great service, no matter how busy it gets. We can&apos;t wait to welcome you back again soon!</p>
                 </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* ROI / Stats */}
        <section className="w-full max-w-[800px] px-6 mb-10 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-500/20 blur-[100px] -z-10 rounded-full"></div>

           <TiltCard className="bg-black/90 backdrop-blur-3xl border border-white/10 text-white rounded-[2rem] p-6 md:p-12 text-center shadow-2xl shadow-indigo-500/10 overflow-hidden relative group">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-emerald-500/0 opacity-0 group-hover:opacity-10 group-hover:from-indigo-500/20 group-hover:via-purple-500/10 group-hover:to-emerald-500/20 transition-all duration-1000 ease-out pointer-events-none"></div>

             <h2 className="text-xl md:text-3xl font-medium tracking-tight mb-3 relative z-10">How it improves your business</h2>
             <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto mb-6 md:mb-8 relative z-10 font-light">
               One connection. Zero ongoing work. Real results.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-left relative z-10">
                <div className="p-4 md:p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-default group/stat relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-3xl md:text-4xl font-semibold mb-1 md:mb-2 text-white">5-9%</div>
                  <div className="text-sm md:text-base font-medium mb-1 md:mb-2 text-zinc-200">Higher Revenue</div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light group-hover/stat:text-zinc-300 transition-colors">Even a 0.1-star rating lift drives more foot traffic and higher revenue (proven by Harvard research).</p>
                </div>
                <div className="p-4 md:p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-default group/stat relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-3xl md:text-4xl font-semibold mb-1 md:mb-2 text-white">100%</div>
                  <div className="text-sm md:text-base font-medium mb-1 md:mb-2 text-zinc-200">Response Rate</div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light group-hover/stat:text-zinc-300 transition-colors">You respond to every review without lifting a finger. Your local Google ranking improves naturally.</p>
                </div>
                <div className="p-4 md:p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-default group/stat relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-3xl md:text-4xl font-semibold mb-1 md:mb-2 text-white">0</div>
                  <div className="text-sm md:text-base font-medium mb-1 md:mb-2 text-zinc-200">Hours Wasted</div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light group-hover/stat:text-zinc-300 transition-colors">Your junior staff and management stop wasting hours on repetitive, mundane review replies.</p>
                </div>
             </div>
           </TiltCard>
        </section>

        {/* Final CTA / Why Google Reviews */}
        <section className="w-full max-w-[800px] px-6 mb-16 md:mb-20 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[120px] -z-10 rounded-full"></div>

           <TiltCard className="bg-black/95 backdrop-blur-3xl border border-white/10 text-white rounded-[2rem] p-6 md:p-12 shadow-2xl shadow-blue-900/20 overflow-hidden relative group">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-violet-500/0 to-fuchsia-500/0 opacity-0 group-hover:opacity-10 group-hover:from-blue-500/20 group-hover:via-violet-500/10 group-hover:to-fuchsia-500/20 transition-all duration-1000 ease-out pointer-events-none"></div>

             <div className="relative z-10 flex flex-col items-center text-center">
               <div className="flex gap-1 mb-4 md:mb-5">
                 <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-yellow-500" />
                 <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-yellow-500" />
                 <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-yellow-500" />
                 <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-yellow-500" />
                 <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-yellow-500" />
               </div>

               <h2 className="text-xl md:text-4xl font-medium tracking-tight mb-4 md:mb-5 leading-tight text-white">
                 Google Reviews Run Your Reputation.<br/>
                 Who&apos;s Running Yours?
               </h2>

               <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-light mb-4">
                 <strong className="text-white font-medium">93% of customers read reviews before they ever walk through your door.</strong> Google rewards businesses that respond — pushing you higher in local search, above competitors who stay silent.
               </p>

               <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-4 w-full">
                 <p className="text-sm text-zinc-400 leading-relaxed m-0">
                   The data is clear: <strong className="text-white font-medium">112+ responded reviews</strong> is the threshold where businesses start pulling ahead.
                 </p>
               </div>

               <p className="text-sm text-zinc-400 leading-relaxed font-light mb-6 md:mb-7">
                 The problem? Most multi-location brands can&apos;t keep up. <strong className="text-white">ReviewReply does it for you — every review, every location, instantly.</strong>
               </p>

               <Link
                 href="/signup"
                 className="inline-flex items-center justify-center bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-zinc-200 transition-transform hover:scale-105 duration-200"
               >
                 Take Control Free
               </Link>
             </div>
           </TiltCard>
        </section>

      </main>

      <footer className="w-full bg-[#FAFAFA] border-t border-zinc-200 py-8 md:py-12">
        <div className="container mx-auto px-6 max-w-[1000px] flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-2">
             <Image src="/logo.png" alt="ReviewReply" width={36} height={36} className="object-contain rounded-lg" />
             <span className="font-semibold tracking-tight text-zinc-900">ReviewReply</span>
           </div>

           <div className="flex items-center gap-5 md:gap-8 text-sm font-medium text-zinc-500">
             <Link href="/privacy" className="hover:text-zinc-900">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-zinc-900">Terms of Service</Link>
             <ContactModal />
           </div>
        </div>
      </footer>
    </div>
  )
}
