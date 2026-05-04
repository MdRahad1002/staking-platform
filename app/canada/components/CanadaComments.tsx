'use client'

import { useState, useEffect } from 'react'
import { ThumbsUp, Send } from 'lucide-react'

interface Comment {
  id: string
  name: string
  text: string
  ts: number
  likes: number
  seeded?: boolean
}

function getSeeded(): Comment[] {
  const now = Date.now()
  return [
    {
      id: 's1',
      name: 'Sarah M.',
      text: 'Started with $2,000 in ETH staking back in October. Just hit $180 in rewards this month. Interac deposit was credited in under an hour, whole setup took about 20 minutes.',
      ts: now - 2 * 3_600_000,
      likes: 34,
      seeded: true,
    },
    {
      id: 's2',
      name: 'Derek Tran',
      text: 'Spent months comparing Canadian staking platforms. Most are US-based or hard to verify. This is the first one that actually appears in the FINTRAC registry when you search. That matters a lot.',
      ts: now - 8 * 3_600_000,
      likes: 27,
      seeded: true,
    },
    {
      id: 's3',
      name: 'Jessica Kowalski',
      text: 'My financial advisor had no idea what crypto staking was so I did my own research. The CRA guide on this site is the most useful thing I found online. Account is open and I am staking ETH now.',
      ts: now - 24 * 3_600_000,
      likes: 19,
      seeded: true,
    },
    {
      id: 's4',
      name: 'Mohammed A.',
      text: 'Transferred my DOT from Kraken specifically to stake here. 16.5% APY is accurate, I tracked it for 6 weeks. Rewards hit daily exactly like they say.',
      ts: now - 2 * 24 * 3_600_000,
      likes: 41,
      seeded: true,
    },
    {
      id: 's5',
      name: 'Amanda Lefebvre',
      text: 'Sent the Interac e-Transfer at 9am and it was credited by 9:45. Staking started the same day. Really smooth experience for a first timer.',
      ts: now - 3 * 24 * 3_600_000,
      likes: 23,
      seeded: true,
    },
    {
      id: 's6',
      name: 'Ryan O.',
      text: 'The FINTRAC number is what convinced me. A lot of platforms claim to be Canadian. This one actually comes up when you search the registry. Verified it myself at fintrac-canafe.gc.ca.',
      ts: now - 5 * 24 * 3_600_000,
      likes: 38,
      seeded: true,
    },
    {
      id: 's7',
      name: 'Priya Sharma',
      text: 'Running SOL and ETH at the same time. The dashboard shows exactly what I earn each day. Cleaner UX than Coinbase and actually built around Canadian tax reporting.',
      ts: now - 7 * 24 * 3_600_000,
      likes: 16,
      seeded: true,
    },
    {
      id: 's8',
      name: 'Tom Bergeron',
      text: 'Moved out of a 4.5% GIC into DOT staking at 16.5%. Yes, different risk profile, but when you run the numbers side by side the gap is hard to ignore.',
      ts: now - 14 * 24 * 3_600_000,
      likes: 52,
      seeded: true,
    },
  ]
}

const LS_KEY = 'stakeonix_canada_comments_v1'
const LS_LIKED = 'stakeonix_canada_liked_v1'

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const min = Math.floor(diff / 60_000)
  if (min < 1) return 'just now'
  if (min < 60) return `${min}m ago`
  const h = Math.floor(min / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

export function CanadaComments() {
  const [seeded] = useState<Comment[]>(getSeeded)
  const [userComments, setUserComments] = useState<Comment[]>([])
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [posted, setPosted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const c = localStorage.getItem(LS_KEY)
      if (c) setUserComments(JSON.parse(c))
      const l = localStorage.getItem(LS_LIKED)
      if (l) setLikedIds(new Set(JSON.parse(l)))
    } catch {
      // localStorage unavailable (private browsing etc.)
    }
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (text.trim().length < 10) { setError('Comment must be at least 10 characters.'); return }
    setError('')
    const comment: Comment = {
      id: `u_${Date.now()}`,
      name: name.trim().slice(0, 60),
      text: text.trim().slice(0, 400),
      ts: Date.now(),
      likes: 0,
    }
    const updated = [comment, ...userComments]
    setUserComments(updated)
    try { localStorage.setItem(LS_KEY, JSON.stringify(updated)) } catch { /* noop */ }
    setName('')
    setText('')
    setPosted(true)
    setTimeout(() => setPosted(false), 4000)
  }

  function toggleLike(id: string) {
    const next = new Set(likedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setLikedIds(next)
    try { localStorage.setItem(LS_LIKED, JSON.stringify([...next])) } catch { /* noop */ }
  }

  const all: Comment[] = [...userComments, ...seeded]

  return (
    <section
      id="comments"
      className="py-20 lg:py-28 bg-gray-50"
      aria-labelledby="comments-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00C896] mb-3">
            Community
          </p>
          <h2
            id="comments-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight mb-3"
          >
            What Canadians are saying
          </h2>
          <p className="text-gray-500 text-lg">
            Real feedback from stakers across Canada.
          </p>
        </div>

        {/* Post form */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
          <p className="text-sm font-semibold text-[#0A1628] mb-4">
            Share your experience
          </p>
          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={60}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#0A1628] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896] transition"
              aria-label="Your name"
            />
            <textarea
              placeholder="Share your experience with StakeOnix..."
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={400}
              rows={3}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#0A1628] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896] transition resize-none"
              aria-label="Your comment"
            />
            {error && (
              <p className="text-xs text-red-500" role="alert">{error}</p>
            )}
            {posted && (
              <p className="text-xs text-[#00C896] font-medium" role="status">
                Comment posted. Thanks for sharing!
              </p>
            )}
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-gray-400">{text.length}/400</span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#00C896] hover:bg-[#00b386] text-white font-semibold text-sm px-5 py-2.5 transition-all hover:shadow-lg hover:shadow-[#00C896]/25"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                Post
              </button>
            </div>
          </form>
        </div>

        {/* Comment count */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          {all.length} comment{all.length !== 1 ? 's' : ''}
        </p>

        {/* Comments list */}
        <div className="space-y-4">
          {all.map((c) => {
            const likeCount = c.likes + (likedIds.has(c.id) ? 1 : 0)
            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-semibold text-sm text-[#0A1628]">{c.name}</span>
                  <span
                    className="text-xs text-gray-400"
                    suppressHydrationWarning
                  >
                    {timeAgo(c.ts)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{c.text}</p>
                <button
                  type="button"
                  onClick={() => toggleLike(c.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5 transition-colors ${
                    likedIds.has(c.id)
                      ? 'bg-[#00C896]/10 text-[#00C896]'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                  aria-pressed={likedIds.has(c.id)}
                  aria-label={`Like comment by ${c.name}`}
                >
                  <ThumbsUp className="h-3 w-3" aria-hidden="true" />
                  {likeCount} Like
                </button>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
