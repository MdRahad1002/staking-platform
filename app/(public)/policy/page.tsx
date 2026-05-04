import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | StakeOnix',
  description: 'Read the StakeOnix Privacy Policy to understand how we collect, use, and protect your personal information on our crypto staking platform.',
  alternates: { canonical: 'https://www.stakeonix.com/policy' },
}

export default function PolicyPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 13, 2026</p>

        <div className="space-y-8 prose prose-invert max-w-none">
          {[
            {
              title: '1. Information We Collect',
              content: `We collect information you provide directly to us, such as when you create an account, make a deposit, request a withdrawal, or contact us for support. This includes:
              
              • Personal identification information (name, email address)
              • Financial information (transaction history, wallet addresses)
              • Device and usage information (IP address, browser type, pages visited)
              • KYC verification documents (where required by regulations)`,
            },
            {
              title: '2. How We Use Your Information',
              content: `We use the information we collect to:
              
              • Provide, maintain, and improve our services
              • Process transactions and send related information
              • Send technical notices, updates, security alerts
              • Respond to comments and questions and provide customer service
              • Monitor and analyze trends, usage and activities
              • Detect and prevent fraudulent transactions and other illegal activities
              • Comply with legal obligations`,
            },
            {
              title: '3. Information Sharing',
              content: `We do not share your personal information with third parties except in the following circumstances:
              
              • With your consent
              • To comply with laws or respond to lawful requests
              • To protect the rights and safety of our users and the public
              • In connection with a merger, acquisition, or sale of assets`,
            },
            {
              title: '4. Data Security',
              content: `We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. We use industry-standard SSL encryption, two-factor authentication, and regular security audits.`,
            },
            {
              title: '5. Cookies',
              content: `We use cookies and similar tracking technologies to operate the platform, keep your account secure, remember your preferences, and understand how you use our services.

For full details on the types of cookies we use, how long they last, and how to control or delete them, please read our dedicated Cookie Policy at www.stakeonix.com/cookies.

Strictly necessary cookies (login session, CSRF protection) are required for the platform to work. You can opt out of non-essential cookies via your browser settings without affecting your ability to use StakeOnix.`,
            },
            {
              title: '6. Your Rights',
              content: `You have the right to:
              
              • Access and update your personal information
              • Delete your account and personal data
              • Opt out of marketing communications
              • Request a copy of your data`,
            },
            {
              title: '7. Contact Us',
              content: `If you have any questions about this Privacy Policy, please contact us at: info@stakeonix.com
              
              ONIX HOLDINGS LIMITED (Canada Head Office)
              130 King St W, Toronto, ON M5X 2A2, Canada
              Phone: +1 (613) 366-4391

              ONIX HOLDINGS LIMITED (United Kingdom)
              Company No. 03449482 - Registered in England & Wales
              Ashley Road, Altrincham, Cheshire, WA14 2DT, United Kingdom
              Phone: +44 (0) 56 0384 6173

              Email: info@stakeonix.com`,
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
