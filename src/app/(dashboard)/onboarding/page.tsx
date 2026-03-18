"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2, Store, MessageSquare } from "lucide-react"
import { saveBrandSettings, confirmLocations } from "./actions"
import { toast } from "sonner"

function OnboardingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stepParam = searchParams.get("step")
  const errorParam = searchParams.get("error")

  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(stepParam === 'brand' ? 2 : stepParam === 'locations' ? 3 : 1)

  useEffect(() => {
    if (errorParam) {
      toast.error(`Failed to connect: ${errorParam.replace(/_/g, ' ')}. Please ensure you grant all requested permissions.`)
    }
  }, [errorParam])

  async function handleBrandSubmit(formData: FormData) {
    setLoading(true)
    const result = await saveBrandSettings(formData)
    if (result.success) {
      toast.success("Brand voice saved!")
      setCurrentStep(3)
    } else {
      toast.error(result.error ?? "Failed to save settings. Please try again.")
    }
    setLoading(false)
  }

  async function handleLocationsSubmit() {
    setLoading(true)
    await confirmLocations()
    router.push("/locations")
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="bg-orb bg-indigo-500 w-[500px] h-[500px] top-[-100px] left-[-100px]"></div>
      <div className="bg-orb bg-rose-500 w-[400px] h-[400px] bottom-[-100px] right-[-100px]"></div>

      <div className="w-full max-w-2xl z-10">
        
        {/* Progress Tracker */}
        <div className="mb-8 flex justify-between items-center px-8 relative">
          <div className="absolute left-10 right-10 top-1/2 h-0.5 bg-white/10 -z-10 -translate-y-1/2"></div>
          
          <div className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground'}`}>1</div>
            <span className="text-xs text-muted-foreground tracking-wider uppercase font-semibold">Connect</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground'}`}>2</div>
            <span className="text-xs text-muted-foreground tracking-wider uppercase font-semibold">Voice</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground'}`}>3</div>
            <span className="text-xs text-muted-foreground tracking-wider uppercase font-semibold">Confirm</span>
          </div>
        </div>

        {/* STEP 1: Connect GBP */}
        {currentStep === 1 && (
          <Card className="glass border-0 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <Store className="w-8 h-8 text-indigo-400" />
              </div>
              <CardTitle className="text-3xl">Connect your Business</CardTitle>
              <CardDescription className="text-base mt-2">
                ReviewReply needs access to your Google Business Profile to read and reply to reviews automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {errorParam && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/20 border border-destructive/50 flex items-start gap-3 text-sm text-destructive-foreground">
                  <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                  <p>Failed to connect: {errorParam.replace(/_/g, ' ')}. Please ensure you grant all requested permissions.</p>
                </div>
              )}
              
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400"/> What we will do:</h3>
                <ul className="text-sm text-muted-foreground space-y-2 ml-7">
                  <li className="list-disc">Discover your mapped business locations</li>
                  <li className="list-disc">Sync your historical reviews</li>
                  <li className="list-disc">Enable realtime notifications for new reviews</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button render={<a href="/api/auth/google" />} nativeButton={false} size="lg" className="w-full text-md h-12">
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Connect Google Business Profile
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* STEP 2: Brand Voice */}
        {currentStep === 2 && (
          <Card className="glass border-0 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-emerald-400" />
              </div>
              <CardTitle className="text-3xl">Set your AI Voice</CardTitle>
              <CardDescription className="text-base mt-2">
                Tell our LLM exactly how you want it to reply to your customers.
              </CardDescription>
            </CardHeader>
            <form action={handleBrandSubmit}>
              <CardContent className="pt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand / Business Name</Label>
                  <Input id="brandName" name="brandName" className="bg-white/5 border-white/10" placeholder="e.g. Joe's Coffee" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tone">Primary Tone</Label>
                  <Select name="tone" defaultValue="Professional & warm">
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professional & warm">Professional & Warm</SelectItem>
                      <SelectItem value="Casual & friendly">Casual & Friendly</SelectItem>
                      <SelectItem value="Enthusiastic & energetic">Enthusiastic & Energetic</SelectItem>
                      <SelectItem value="Formal & polite">Formal & Polite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toneCustom">Custom Tone Instructions <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                  <Textarea 
                    id="toneCustom" 
                    name="toneCustom" 
                    className="bg-white/5 border-white/10 resize-none h-20" 
                    placeholder="e.g. Always use emojis. Never say 'sorry'." 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resolutionOffers">Resolution Offers <span className="text-muted-foreground font-normal">(For 1-3 star reviews)</span></Label>
                  <Textarea 
                    id="resolutionOffers" 
                    name="resolutionOffers" 
                    className="bg-white/5 border-white/10 resize-none h-20" 
                    placeholder="e.g. We always offer a complimentary remake of your order." 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="negativeReviewEmail">Support Email <span className="text-muted-foreground font-normal">(For escalations)</span></Label>
                  <Input id="negativeReviewEmail" name="negativeReviewEmail" type="email" className="bg-white/5 border-white/10" placeholder="support@brand.com" />
                </div>

              </CardContent>
              <CardFooter>
                <Button type="submit" size="lg" className="w-full text-md h-12" disabled={loading}>
                  {loading ? "Saving settings..." : "Save Brand Settings"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {/* STEP 3: Confirm Locations */}
        {currentStep === 3 && (
          <Card className="glass border-0 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl">You&apos;re all set!</CardTitle>
              <CardDescription className="text-base mt-2">
                ReviewReply has synced your locations and is ready to monitor your reviews automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <div className="glass-card p-6 w-full max-w-sm text-center">
                <Store className="w-12 h-12 mx-auto text-primary mb-3 opacity-80" />
                <h4 className="font-semibold text-xl mb-1">Auto-reply is ON</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We&apos;ll start intercepting new reviews immediately. You can review and modify generated replies in the dashboard.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <form action={handleLocationsSubmit} className="w-full">
                <Button type="submit" size="lg" className="w-full text-md h-12" disabled={loading}>
                  {loading ? "Finishing..." : "Go to Dashboard"}
                </Button>
              </form>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingContent />
    </Suspense>
  )
}
