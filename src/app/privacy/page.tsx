import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Privacy Policy",
  description: "ReviewReply Privacy Policy — how we collect, use, and protect your information.",
}

export default function PrivacyPolicyPage() {
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
        <h1 className="text-4xl font-semibold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-sm text-zinc-400 mb-12">Last updated: March 17, 2026</p>

        <div className="prose prose-zinc max-w-none space-y-10 text-zinc-700 leading-relaxed">

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">1. Information We Collect</h2>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">1.1 Account Information</h3>
            <p className="mb-3">When you create an account, we collect:</p>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Email address</li>
              <li>Full name</li>
              <li>Password (stored in hashed form — we never see or store your plaintext password)</li>
              <li>Profile photo (if you sign up via Google)</li>
            </ul>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">1.2 Google Business Profile Data</h3>
            <p className="mb-3">When you connect your Google Business Profile, we access the following through Google's official OAuth 2.0 authorization:</p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Your Google Business Profile account identifiers</li>
              <li>Business location names, addresses, and phone numbers</li>
              <li>Customer reviews (reviewer name, star rating, review text, timestamps)</li>
              <li>Review reply content (posted by ReviewReply on your behalf)</li>
            </ul>
            <p>We request only the minimum permissions necessary to read reviews and post replies. We do <strong className="text-zinc-900">not</strong> access your Google Ads, Google Analytics, Gmail, Google Drive, or any other Google service.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2 mt-6">1.3 Payment Information</h3>
            <p className="mb-3">We use Stripe to process payments. Your credit card number, billing address, and payment details are collected and stored directly by Stripe. We never see, store, or have access to your full card number. We receive only:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Last four digits of your card</li>
              <li>Card brand (Visa, Mastercard, etc.)</li>
              <li>Billing email</li>
              <li>Stripe customer and subscription identifiers</li>
            </ul>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2 mt-6">1.4 Usage Data</h3>
            <p className="mb-3">We automatically collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pages visited within the Service</li>
              <li>Feature usage patterns (e.g., locations enabled, replies generated)</li>
              <li>Browser type, device type, and operating system</li>
              <li>IP address</li>
              <li>Timestamps of account activity</li>
            </ul>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2 mt-6">1.5 AI-Generated Content</h3>
            <p className="mb-3">When our AI generates a review reply on your behalf, we store:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The original review text (received from Google)</li>
              <li>The AI-generated reply text</li>
              <li>The AI model used and generation metadata</li>
              <li>Whether the reply was posted, deleted, or failed</li>
            </ul>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">2. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Provide, operate, and maintain the Service</li>
              <li>Connect to your Google Business Profile and read incoming reviews</li>
              <li>Generate AI-powered review replies in your configured brand tone</li>
              <li>Post replies to Google on your behalf automatically</li>
              <li>Process payments and manage your subscription</li>
              <li>Display review history, analytics, and metrics in your dashboard</li>
              <li>Send transactional emails (account confirmation, trial expiry reminders, billing receipts, service alerts)</li>
              <li>Detect and prevent fraud, abuse, or unauthorized access</li>
              <li>Improve and optimize the Service</li>
            </ul>
            <p className="mb-3">We do <strong className="text-zinc-900">not</strong> use your data to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Train AI models (your reviews and replies are not used as training data)</li>
              <li>Serve advertisements</li>
              <li>Sell or rent your personal information to third parties</li>
              <li>Contact you with unsolicited marketing (unless you opt in)</li>
            </ul>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">3. How We Share Your Information</h2>
            <p className="mb-6">We do not sell your personal information. We share data only with the following categories of third parties, solely to operate the Service:</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">3.1 Service Providers</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong className="text-zinc-900">Supabase</strong> — Database hosting, authentication, and backend infrastructure</li>
              <li><strong className="text-zinc-900">Vercel</strong> — Application hosting and deployment</li>
              <li><strong className="text-zinc-900">Google Cloud Platform</strong> — Google Business Profile API access and Pub/Sub messaging infrastructure</li>
              <li><strong className="text-zinc-900">Anthropic</strong> — AI language model provider (receives review text to generate replies; does not retain your data for training)</li>
              <li><strong className="text-zinc-900">Stripe</strong> — Payment processing and subscription management</li>
            </ul>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">3.2 Google</h3>
            <p className="mb-6">When we post a reply on your behalf, the reply content is submitted to Google and becomes publicly visible on Google Maps associated with your business listing. This is the core function of the Service and occurs only with your authorization.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">3.3 Legal Requirements</h3>
            <p className="mb-6">We may disclose your information if required to do so by law, regulation, legal process, or governmental request, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">3.4 Business Transfers</h3>
            <p>If ReviewReply is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you before your information is transferred and becomes subject to a different privacy policy.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">4. Data Storage and Security</h2>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">4.1 Where We Store Data</h3>
            <p className="mb-6">Your data is stored on servers operated by Supabase (hosted on AWS infrastructure). Google OAuth tokens are encrypted at rest using AES-256-GCM encryption before being stored in our database.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">4.2 Security Measures</h3>
            <p className="mb-3">We implement industry-standard security practices including:</p>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Encryption of sensitive data at rest (OAuth tokens, credentials)</li>
              <li>Encryption of data in transit (TLS/HTTPS on all connections)</li>
              <li>Row-Level Security (RLS) policies ensuring users can only access their own data</li>
              <li>Secure OAuth 2.0 flows for Google Business Profile authorization</li>
              <li>Regular security reviews and dependency updates</li>
            </ul>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">4.3 Retention</h3>
            <p className="mb-3">We retain your data for as long as your account is active. If you delete your account:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your profile, locations, brand settings, and review history are permanently deleted within 30 days</li>
              <li>Google OAuth tokens are immediately revoked and deleted</li>
              <li>Stripe retains payment records independently as required by financial regulations</li>
              <li>Replies already posted to Google remain on Google Maps (you can delete them before closing your account)</li>
            </ul>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">5. Your Rights and Choices</h2>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.1 Access and Portability</h3>
            <p className="mb-6">You can view all data we hold about you directly in your ReviewReply dashboard, including your locations, reviews, replies, and account settings.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.2 Correction</h3>
            <p className="mb-6">You can update your profile information and brand tone settings at any time through the dashboard.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.3 Deletion</h3>
            <p className="mb-3">You can delete your account at any time from the Account Settings page. This will:</p>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Permanently delete your profile, locations, settings, and review history from our database</li>
              <li>Revoke Google Business Profile access</li>
              <li>Cancel your Stripe subscription</li>
            </ul>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.4 Disconnect Google</h3>
            <p className="mb-6">You can disconnect your Google Business Profile at any time, which immediately stops all auto-replies and revokes our access to your Google account. You can also revoke access directly from your Google Account permissions at <span className="text-zinc-900 font-medium">myaccount.google.com/permissions</span>.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.5 Pause Auto-Replies</h3>
            <p className="mb-6">You can pause auto-replies globally or per location at any time without deleting your account or disconnecting Google.</p>

            <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.6 Delete Individual Replies</h3>
            <p>You can delete any individual AI-generated reply from your dashboard, which removes it from Google Maps immediately.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">6. Cookies and Tracking</h2>
            <p className="mb-3">We use essential cookies required for the Service to function (authentication session cookies). We do not use advertising cookies or third-party tracking cookies.</p>
            <p>If we introduce analytics tools in the future, we will update this policy and provide opt-out options.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">7. Children&apos;s Privacy</h2>
            <p>ReviewReply is a business tool and is not intended for use by individuals under the age of 18. We do not knowingly collect information from children. If we become aware that we have collected data from a child under 18, we will delete it promptly.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">8. International Data Transfers</h2>
            <p>Your data may be processed in countries other than your country of residence, including the United States, where our infrastructure providers operate. By using the Service, you consent to the transfer of your information to these countries, which may have different data protection laws than your jurisdiction.</p>
          </section>

          <hr className="border-zinc-200" />

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the "Last updated" date. For significant changes, we will send an email notification to the address associated with your account.</p>
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
