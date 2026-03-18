import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Terms of Service",
  description: "ReviewReply Terms of Service — the rules and conditions governing your use of the platform.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 font-sans">
      {/* Navigation */}
      <header className="w-full flex items-center justify-between px-6 lg:px-12 py-6 bg-[#FAFAFA] border-b border-zinc-200">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="ReviewReply" width={40} height={40} className="object-contain mix-blend-multiply" />
          <span className="font-semibold text-xl tracking-tight">ReviewReply</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors">
          Back to home
        </Link>
      </header>

      <main className="max-w-[760px] mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-sm text-zinc-400 mb-12">Last updated: March 17, 2026</p>

        <div className="space-y-10 text-zinc-700 leading-relaxed">

          <p>If you do not agree to these Terms, do not use the Service.</p>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">1. The Service</h2>
            <p className="mb-3">ReviewReply is an automated review reply platform. When you connect your Google Business Profile, the Service reads incoming customer reviews and uses artificial intelligence to generate and post replies on your behalf — automatically, in the brand tone you configure.</p>
            <p>The Service is designed for business owners, managers, and authorized representatives of businesses listed on Google Business Profile.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">2. Eligibility</h2>
            <p className="mb-3">You must be at least 18 years old and capable of forming a binding legal agreement to use the Service. By creating an account, you represent that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You are at least 18 years of age</li>
              <li>You have the authority to connect the Google Business Profile(s) you link to ReviewReply</li>
              <li>You are authorized to post replies on behalf of the business(es) you connect</li>
              <li>All information you provide is accurate and complete</li>
            </ul>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">3. Account Registration</h2>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">3.1 Account Creation</h3>
            <p className="mb-6">You may create an account using an email address and password, or by signing in with Google. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">3.2 One Account Per User</h3>
            <p className="mb-6">Each account is intended for a single user or business entity. You may not share your account credentials with others. If multiple people at your organization need access, contact us about multi-user access (planned for a future release).</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">3.3 Account Security</h3>
            <p>You agree to notify us immediately at support@reviewreply.com if you suspect unauthorized access to your account. We are not liable for losses arising from unauthorized use of your account.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">4. Google Business Profile Authorization</h2>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">4.1 OAuth Connection</h3>
            <p className="mb-3">The Service requires you to authorize access to your Google Business Profile through Google&apos;s OAuth 2.0 protocol. By connecting your account, you grant ReviewReply permission to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Read your business location information</li>
              <li>Read customer reviews on your business listings</li>
              <li>Post, edit, and delete review replies on your behalf</li>
            </ul>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">4.2 Your Responsibility</h3>
            <p className="mb-6">You represent and warrant that you have the legal authority to grant these permissions for every Google Business Profile and location you connect to ReviewReply. If you are connecting a profile owned by another party (e.g., as an agency or franchise manager), you confirm you have their explicit authorization.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">4.3 Revoking Access</h3>
            <p>You may disconnect your Google Business Profile at any time through the ReviewReply dashboard or by revoking access directly in your Google Account settings. Disconnecting will immediately stop all auto-replies for the associated locations.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">5. AI-Generated Replies</h2>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.1 Automated Posting</h3>
            <p className="mb-6">The core function of ReviewReply is to generate and post review replies automatically without requiring your approval for each reply. By enabling auto-reply on a location, you authorize ReviewReply to post AI-generated replies to Google on your behalf immediately and without prior review.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.2 Content Quality</h3>
            <p className="mb-3">We make commercially reasonable efforts to generate replies that are appropriate, professional, and aligned with the brand tone you configure. However, AI-generated content is inherently imperfect. We do <strong className="text-zinc-900">not</strong> guarantee that every reply will be:</p>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Factually accurate in all details</li>
              <li>Perfectly matched to your intended tone</li>
              <li>Free from errors or awkward phrasing</li>
              <li>Appropriate for every possible context or scenario</li>
            </ul>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.3 Your Responsibility for Content</h3>
            <p className="mb-6">Once a reply is posted to Google, it is publicly associated with your business. You are ultimately responsible for all content posted on your Google Business Profile, including AI-generated replies posted by ReviewReply. We strongly recommend that you periodically review your auto-replies through the dashboard.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.4 Content Controls</h3>
            <p className="mb-3">You may at any time:</p>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Delete any individual reply (removed from Google immediately)</li>
              <li>Pause auto-replies for specific locations or globally</li>
              <li>Modify your brand tone settings to adjust future replies</li>
              <li>Disconnect your Google Business Profile entirely</li>
            </ul>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.5 No Liability for AI Content</h3>
            <p>To the fullest extent permitted by law, ReviewReply shall not be held liable for any damages, losses, claims, or disputes arising from the content of AI-generated replies, including but not limited to: customer complaints about reply content, reputational harm, or any legal claims related to statements made in auto-replies.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">6. Pricing and Payment</h2>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">6.1 Free Trial</h3>
            <p className="mb-6">New users receive a 30-day free trial with full access to all features across all connected locations. No credit card is required to start the trial. At the end of the trial period, auto-replies will pause until you subscribe.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">6.2 Subscription Pricing</h3>
            <p className="mb-3">After the free trial, the Service is billed at <strong className="text-zinc-900">$29 per location per month</strong>. Each connected location with auto-reply enabled constitutes one billable unit. For example:</p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>1 location = $29/month</li>
              <li>5 locations = $145/month</li>
              <li>20 locations = $580/month</li>
            </ul>
            <p className="mb-6">Each location includes unlimited reviews and unlimited auto-replies with no per-reply fees.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">6.3 Billing</h3>
            <p className="mb-6">Subscriptions are billed monthly in advance through Stripe. You authorize us to charge the payment method on file for all applicable fees. If you add locations during a billing cycle, fees are prorated. If you remove locations, your next invoice is adjusted accordingly.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">6.4 Price Changes</h3>
            <p className="mb-6">We reserve the right to change our pricing. If we change pricing, we will provide at least 30 days&apos; notice via email before the new price takes effect. You may cancel your subscription before the new pricing applies.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">6.5 Failed Payments</h3>
            <p className="mb-6">If a payment fails, we will attempt to charge your payment method again over the following days. If payment remains unsuccessful after multiple attempts, your subscription will be suspended and auto-replies will pause. Your data will be retained for 90 days to allow you to resolve the payment issue and reactivate.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">6.6 Refunds</h3>
            <p>We do not offer refunds for partial months of service. If you cancel mid-cycle, you will retain access until the end of your current billing period. If you believe you have been charged in error, contact us at billing@reviewreply.com within 30 days of the charge.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">7. Cancellation and Termination</h2>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">7.1 Cancellation by You</h3>
            <p className="mb-3">You may cancel your subscription at any time through the billing settings in your dashboard or via the Stripe Customer Portal. Upon cancellation:</p>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Auto-replies will continue until the end of your current billing period</li>
              <li>After your billing period ends, auto-replies will stop</li>
              <li>Replies already posted to Google will remain on Google Maps unless you manually delete them before canceling</li>
              <li>Your account data will be retained for 90 days in case you wish to reactivate, then permanently deleted</li>
            </ul>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">7.2 Termination by Us</h3>
            <p className="mb-3">We reserve the right to suspend or terminate your account at any time if:</p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>You violate these Terms</li>
              <li>You use the Service to post spam, misleading, defamatory, or illegal content</li>
              <li>You connect Google Business Profiles you are not authorized to manage</li>
              <li>Your account is used for fraudulent activity</li>
              <li>You attempt to reverse-engineer, scrape, or abuse the Service</li>
            </ul>
            <p className="mb-6">We will make reasonable efforts to notify you before termination, except in cases of serious violations where immediate action is necessary.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">7.3 Effect of Termination</h3>
            <p>Upon termination, your access to the Service will cease immediately. We may delete your account data at our discretion. Replies already posted to Google will remain unless you delete them prior to termination.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">8. Acceptable Use</h2>
            <p className="mb-3">You agree <strong className="text-zinc-900">not</strong> to use the Service to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Connect Google Business Profiles you do not own or are not authorized to manage</li>
              <li>Generate replies that are intentionally misleading, defamatory, harassing, or illegal</li>
              <li>Post fake or fabricated reviews or manipulate review content</li>
              <li>Violate Google&apos;s Terms of Service or Google Business Profile policies</li>
              <li>Circumvent usage limits, rate limits, or security measures</li>
              <li>Reverse-engineer, decompile, or attempt to extract the source code of the Service</li>
              <li>Resell, sublicense, or redistribute the Service without our written consent</li>
              <li>Use the Service in any way that could harm, disable, or impair our infrastructure</li>
            </ul>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">9. Intellectual Property</h2>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">9.1 Our Property</h3>
            <p className="mb-6">The Service, including its design, code, features, documentation, branding, and all related intellectual property, is owned by ReviewReply and protected by applicable intellectual property laws. These Terms do not grant you any ownership rights in the Service.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">9.2 Your Content</h3>
            <p className="mb-6">You retain ownership of your brand settings, tone configurations, and example replies that you provide to the Service. By providing this content, you grant us a limited, non-exclusive license to use it solely for the purpose of generating review replies on your behalf.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">9.3 AI-Generated Replies</h3>
            <p>Replies generated by the AI and posted to Google on your behalf are considered your content once posted. You are free to use, modify, or delete them as you see fit.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">10. Third-Party Services</h2>
            <p className="mb-3">The Service integrates with third-party platforms including Google (Business Profile API), Anthropic (AI model provider), Stripe (payment processing), and Supabase (infrastructure). Your use of these integrations is also subject to the respective terms and policies of those providers.</p>
            <p>We are not responsible for the availability, accuracy, or policies of third-party services.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">11. Disclaimer of Warranties</h2>
            <p className="mb-3 text-zinc-600 text-sm uppercase tracking-wide font-medium">The Service is provided "as is" and "as available" without warranties of any kind, whether express, implied, or statutory. We disclaim all warranties including, without limitation, warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
            <p className="text-zinc-600 text-sm uppercase tracking-wide font-medium">We do not warrant that the Service will be uninterrupted, error-free, or secure; that AI-generated replies will be accurate or appropriate; or that the Service will meet your specific requirements.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">12. Limitation of Liability</h2>
            <p className="mb-3 text-zinc-600 text-sm uppercase tracking-wide font-medium">To the fullest extent permitted by law, ReviewReply shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of revenue, reputational harm, loss of data, or customer disputes arising from AI-generated replies.</p>
            <p className="text-zinc-600 text-sm uppercase tracking-wide font-medium">Our total aggregate liability for any claims shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">13. Indemnification</h2>
            <p className="mb-3">You agree to indemnify, defend, and hold harmless ReviewReply, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your connection of Google Business Profiles you were not authorized to manage</li>
              <li>Any content posted to Google through the Service on your behalf</li>
              <li>Any third-party claims related to AI-generated replies on your business listings</li>
            </ul>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">14. Dispute Resolution</h2>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">14.1 Governing Law</h3>
            <p className="mb-6">These Terms are governed by the laws of the United Arab Emirates, without regard to conflict of law principles.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">14.2 Informal Resolution</h3>
            <p className="mb-6">Before filing any formal dispute, you agree to contact us at legal@reviewreply.com and attempt to resolve the matter informally within 30 days.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">14.3 Jurisdiction</h3>
            <p>Any disputes not resolved informally shall be submitted to the exclusive jurisdiction of the courts of Dubai, United Arab Emirates.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">15. Changes to These Terms</h2>
            <p>We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on this page and updating the "Last updated" date. For significant changes, we will send an email notification at least 15 days before the new Terms take effect. Your continued use of the Service after updated Terms become effective constitutes your acceptance of the changes.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">16. General Provisions</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong className="text-zinc-900">Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and ReviewReply regarding the Service.</li>
              <li><strong className="text-zinc-900">Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.</li>
              <li><strong className="text-zinc-900">Waiver:</strong> Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision.</li>
              <li><strong className="text-zinc-900">Assignment:</strong> You may not assign your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations without restriction.</li>
              <li><strong className="text-zinc-900">Force Majeure:</strong> We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, government actions, or failures of third-party services.</li>
            </ul>
          </section>

        </div>
      </main>

      <footer className="w-full bg-[#FAFAFA] border-t border-zinc-200 py-8 mt-16">
        <div className="max-w-[760px] mx-auto px-6 flex items-center justify-between text-sm text-zinc-400">
          <span>© 2026 ReviewReply. All rights reserved.</span>
          <Link href="/" className="hover:text-zinc-900 transition-colors">Back to home</Link>
        </div>
      </footer>
    </div>
  )
}
