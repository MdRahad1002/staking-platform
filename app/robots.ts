import { MetadataRoute } from 'next'

const APP_URL = 'https://www.stakeonix.ca'

// Private areas no crawler (search or AI) should index
const DISALLOW = [
  '/api/',
  '/dashboard/',
  '/admin/',
  '/deposit/',
  '/withdraw/',
  '/settings/',
  '/orders/',
  '/referrals/',
  '/notify/',
  '/ticket/',
  '/plan/',
  '/bill/',
  '/support/',
  '/worker/',
  '/autopilot/',
  '/trade/',
]

// AI / LLM crawlers we explicitly welcome so StakeOnix can be cited by
// ChatGPT, Claude, Gemini, Perplexity, Copilot, Apple Intelligence, etc.
const AI_BOTS = [
  'GPTBot',            // OpenAI training
  'OAI-SearchBot',     // ChatGPT search
  'ChatGPT-User',      // ChatGPT user browsing
  'ClaudeBot',         // Anthropic training
  'anthropic-ai',      // Anthropic
  'Claude-User',       // Claude user browsing
  'Claude-SearchBot',  // Claude search
  'Google-Extended',   // Gemini / Vertex AI grounding & training
  'Applebot-Extended', // Apple Intelligence
  'PerplexityBot',     // Perplexity index
  'Perplexity-User',   // Perplexity user browsing
  'CCBot',             // Common Crawl (feeds many LLMs)
  'Amazonbot',         // Amazon / Alexa
  'meta-externalagent',// Meta AI
  'cohere-ai',         // Cohere
  'YouBot',            // You.com
  'DuckAssistBot',     // DuckDuckGo AI
  'Bytespider',        // ByteDance / TikTok AI
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      { userAgent: 'Googlebot', allow: '/', disallow: DISALLOW },
      // Explicitly allow AI assistants to read public content
      { userAgent: AI_BOTS, allow: '/', disallow: DISALLOW },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
    host: APP_URL,
  }
}
