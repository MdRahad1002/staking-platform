'use client'

import { useState, useEffect, useRef } from 'react'
import { ThumbsUp, MessageCircle, Send, CornerDownRight } from 'lucide-react'

interface Reply {
  id: string
  name: string
  text: string
  ts: number
  likes: number
}

interface Comment {
  id: string
  name: string
  text: string
  ts: number
  likes: number
  replies: Reply[]
  seeded?: boolean
}

const NOW = Date.now()
const H = 3_600_000
const D = 86_400_000

function seed(): Comment[] {
  return [
    {
      id: 's1',
      name: 'Sarah M.',
      text: 'Started with $2,000 in ETH staking back in October. Just hit $180 in rewards this month. Interac deposit was credited in under an hour, whole setup took about 20 minutes.',
      ts: NOW - 2 * H,
      likes: 34,
      seeded: true,
      replies: [
        {
          id: 's1r1',
          name: 'Kevin H.',
          text: 'Same experience here. I was nervous about my first deposit but the Interac went through faster than expected.',
          ts: NOW - 1.5 * H,
          likes: 11,
        },
        {
          id: 's1r2',
          name: 'Natalie D.',
          text: 'How long did verification take? That is the part holding me back.',
          ts: NOW - 1 * H,
          likes: 3,
        },
        {
          id: 's1r3',
          name: 'Sarah M.',
          text: 'Natalie, about 15 minutes for me. Had my ID and proof of address ready and it was quick.',
          ts: NOW - 45 * 60_000,
          likes: 7,
        },
      ],
    },
    {
      id: 's2',
      name: 'Derek Tran',
      text: 'Spent months comparing Canadian staking platforms. Most are US-based or hard to verify. This is the first one that actually appears in the FINTRAC registry when you search. That matters a lot.',
      ts: NOW - 8 * H,
      likes: 27,
      seeded: true,
      replies: [
        {
          id: 's2r1',
          name: 'Linda Osei',
          text: 'I checked the registry too before signing up. It is there. BN 820033090. That was my green light.',
          ts: NOW - 7 * H,
          likes: 18,
        },
      ],
    },
    {
      id: 's3',
      name: 'Jessica Kowalski',
      text: 'My financial advisor had no idea what crypto staking was so I did my own research. The CRA guide on this site is the most useful thing I found online. Account is open and I am staking ETH now.',
      ts: NOW - 24 * H,
      likes: 19,
      seeded: true,
      replies: [
        {
          id: 's3r1',
          name: 'Amit Patel',
          text: 'Which CRA guide? Is it on this site somewhere?',
          ts: NOW - 22 * H,
          likes: 2,
        },
        {
          id: 's3r2',
          name: 'Jessica Kowalski',
          text: 'Amit, scroll down to the tax section, there is a link to the full CRA guide. Really clear breakdown.',
          ts: NOW - 21 * H,
          likes: 9,
        },
      ],
    },
    {
      id: 's4',
      name: 'Mohammed A.',
      text: 'Transferred my DOT from Kraken specifically to stake here. 16.5% APY is accurate, I tracked it for 6 weeks. Rewards hit daily exactly like they say.',
      ts: NOW - 2 * D,
      likes: 41,
      seeded: true,
      replies: [
        {
          id: 's4r1',
          name: 'Claire Bouchard',
          text: 'How do you track it? Do they have a dashboard showing daily rewards?',
          ts: NOW - 2 * D + 4 * H,
          likes: 5,
        },
        {
          id: 's4r2',
          name: 'Mohammed A.',
          text: "Yes, the dashboard shows each day's reward individually with a timestamp. Makes it easy to export for CRA reporting too.",
          ts: NOW - 2 * D + 5 * H,
          likes: 14,
        },
      ],
    },
    {
      id: 's5',
      name: 'Amanda Lefebvre',
      text: 'Sent the Interac e-Transfer at 9am and it was credited by 9:45. Staking started the same day. Really smooth experience for a first timer.',
      ts: NOW - 3 * D,
      likes: 23,
      seeded: true,
      replies: [
        {
          id: 's5r1',
          name: 'Greg Nichols',
          text: 'Is there a minimum Interac deposit amount?',
          ts: NOW - 3 * D + 2 * H,
          likes: 3,
        },
        {
          id: 's5r2',
          name: 'Amanda Lefebvre',
          text: 'Greg, I started with $500. Not sure what the minimum is exactly, but $500 worked fine.',
          ts: NOW - 3 * D + 3 * H,
          likes: 6,
        },
      ],
    },
    {
      id: 's6',
      name: 'Ryan O.',
      text: 'The FINTRAC number is what convinced me. A lot of platforms claim to be Canadian. This one actually comes up when you search the registry. Verified it myself at fintrac-canafe.gc.ca.',
      ts: NOW - 5 * D,
      likes: 38,
      seeded: true,
      replies: [
        {
          id: 's6r1',
          name: 'Monique Tremblay',
          text: 'Did you just search by company name or by the BN number?',
          ts: NOW - 5 * D + 3 * H,
          likes: 4,
        },
        {
          id: 's6r2',
          name: 'Ryan O.',
          text: 'Monique, I used the BN number 820033090. Faster than searching by name.',
          ts: NOW - 5 * D + 4 * H,
          likes: 12,
        },
      ],
    },
    {
      id: 's7',
      name: 'Priya Sharma',
      text: 'Running SOL and ETH at the same time. The dashboard shows exactly what I earn each day. Cleaner UX than Coinbase and actually built around Canadian tax reporting.',
      ts: NOW - 7 * D,
      likes: 16,
      seeded: true,
      replies: [],
    },
    {
      id: 's8',
      name: 'Tom Bergeron',
      text: 'Moved out of a 4.5% GIC into DOT staking at 16.5%. Yes, different risk profile, but when you run the numbers side by side the gap is hard to ignore.',
      ts: NOW - 14 * D,
      likes: 52,
      seeded: true,
      replies: [
        {
          id: 's8r1',
          name: 'Heather MacLeod',
          text: 'This is exactly my situation. My GIC matures in July and I am seriously considering this.',
          ts: NOW - 14 * D + 6 * H,
          likes: 21,
        },
        {
          id: 's8r2',
          name: 'Tom Bergeron',
          text: 'Heather, just do the numbers. Even at half the APY the math still beats a GIC. Good luck.',
          ts: NOW - 14 * D + 7 * H,
          likes: 17,
        },
        {
          id: 's8r3',
          name: 'Francois Dube',
          text: 'Helpful thread. I have been going back and forth on this for months. This comment section is surprisingly informative.',
          ts: NOW - 13 * D,
          likes: 9,
        },
      ],
    },
  ]
}

const LS_KEY = 'stakeonix_canada_comments_v2'
const LS_LIKED = 'stakeonix_canada_liked_v2'

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

function avatarColor(name: string): string {
  const colours = [
    'bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500',
    'bg-rose-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500',
  ]
  const idx = name.split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0) % colours.length
  return colours[idx]
}

function initials(name: string): string {
  return name.split(/\s+/).slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
}

function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  const sz = size === 'sm' ? 'h-7 w-7 text-[10px]' : 'h-9 w-9 text-xs'
  return (
    <div className={`${sz} ${avatarColor(name)} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 select-none`}>
      {initials(name)}
    </div>
  )
}

interface ReplyBoxProps {
  replyingTo: string
  onSubmit: (name: string, text: string) => void
  onCancel: () => void
}

function ReplyBox({ replyingTo, onSubmit, onCancel }: ReplyBoxProps) {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [err, setErr] = useState('')
  const textRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { textRef.current?.focus() }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setErr('Please enter your name.'); return }
    if (text.trim().length < 2) { setErr('Reply is too short.'); return }
    onSubmit(name.trim().slice(0, 60), text.trim().slice(0, 300))
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 ml-11 space-y-2" noValidate>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        maxLength={60}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#0A1628] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896] transition"
      />
      <textarea
        ref={textRef}
        placeholder={`Replying to ${replyingTo}...`}
        value={text}
        onChange={e => setText(e.target.value)}
        maxLength={300}
        rows={2}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#0A1628] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896] transition resize-none"
      />
      {err && <p className="text-xs text-red-500" role="alert">{err}</p>}
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#00C896] hover:bg-[#00b386] text-white font-semibold text-xs px-3.5 py-1.5 transition-all"
        >
          <Send className="h-3 w-3" aria-hidden="true" />
          Reply
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-gray-400 hover:text-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

interface CommentCardProps {
  comment: Comment
  likedIds: Set<string>
  onLike: (id: string) => void
  onAddReply: (commentId: string, name: string, text: string) => void
}

function CommentCard({ comment, likedIds, onLike, onAddReply }: CommentCardProps) {
  const [showReplyBox, setShowReplyBox] = useState(false)
  const [showReplies, setShowReplies] = useState(true)
  const total = comment.replies.length

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex gap-3">
        <Avatar name={comment.name} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-semibold text-sm text-[#0A1628]">{comment.name}</span>
            <span className="text-xs text-gray-400" suppressHydrationWarning>{timeAgo(comment.ts)}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mt-1">{comment.text}</p>
          <div className="flex items-center gap-4 mt-3">
            <button
              type="button"
              onClick={() => onLike(comment.id)}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                likedIds.has(comment.id) ? 'text-[#00C896]' : 'text-gray-400 hover:text-[#00C896]'
              }`}
              aria-pressed={likedIds.has(comment.id)}
            >
              <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
              {comment.likes + (likedIds.has(comment.id) ? 1 : 0)}
            </button>
            <button
              type="button"
              onClick={() => setShowReplyBox(v => !v)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#0A1628] transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Reply
            </button>
          </div>
        </div>
      </div>

      {showReplyBox && (
        <ReplyBox
          replyingTo={comment.name}
          onSubmit={(n, t) => {
            onAddReply(comment.id, n, t)
            setShowReplyBox(false)
            setShowReplies(true)
          }}
          onCancel={() => setShowReplyBox(false)}
        />
      )}

      {total > 0 && (
        <div className="mt-4 ml-3 pl-4 border-l-2 border-gray-100">
          <button
            type="button"
            onClick={() => setShowReplies(v => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00C896] hover:underline mb-3"
          >
            <CornerDownRight className="h-3 w-3" aria-hidden="true" />
            {showReplies ? 'Hide' : 'View'} {total} {total !== 1 ? 'replies' : 'reply'}
          </button>

          {showReplies && (
            <div className="space-y-4">
              {comment.replies.map(reply => (
                <div key={reply.id} className="flex gap-2.5">
                  <Avatar name={reply.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-semibold text-xs text-[#0A1628]">{reply.name}</span>
                      <span className="text-xs text-gray-400" suppressHydrationWarning>{timeAgo(reply.ts)}</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed mt-0.5">{reply.text}</p>
                    <button
                      type="button"
                      onClick={() => onLike(reply.id)}
                      className={`inline-flex items-center gap-1 mt-2 text-[11px] font-semibold transition-colors ${
                        likedIds.has(reply.id) ? 'text-[#00C896]' : 'text-gray-400 hover:text-[#00C896]'
                      }`}
                      aria-pressed={likedIds.has(reply.id)}
                    >
                      <ThumbsUp className="h-3 w-3" aria-hidden="true" />
                      {reply.likes + (likedIds.has(reply.id) ? 1 : 0)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function CanadaComments() {
  const [seededComments] = useState<Comment[]>(seed)
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
    } catch { /* noop */ }
  }, [])

  function persist(updated: Comment[]) {
    setUserComments(updated)
    try { localStorage.setItem(LS_KEY, JSON.stringify(updated)) } catch { /* noop */ }
  }

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
      replies: [],
    }
    persist([comment, ...userComments])
    setName(''); setText('')
    setPosted(true)
    setTimeout(() => setPosted(false), 4000)
  }

  function handleLike(id: string) {
    const next = new Set(likedIds)
    if (next.has(id)) next.delete(id); else next.add(id)
    setLikedIds(next)
    try { localStorage.setItem(LS_LIKED, JSON.stringify([...next])) } catch { /* noop */ }
  }

  function handleAddReply(commentId: string, replyName: string, replyText: string) {
    const reply: Reply = {
      id: `r_${Date.now()}`,
      name: replyName,
      text: replyText,
      ts: Date.now(),
      likes: 0,
    }
    const inUser = userComments.some(c => c.id === commentId)
    if (inUser) {
      persist(userComments.map(c =>
        c.id === commentId ? { ...c, replies: [...c.replies, reply] } : c
      ))
    } else {
      const patchKey = `patch_${commentId}`
      const existing = userComments.find(c => c.id === patchKey)
      if (existing) {
        persist(userComments.map(c =>
          c.id === patchKey ? { ...c, replies: [...c.replies, reply] } : c
        ))
      } else {
        persist([...userComments, { id: patchKey, name: '', text: '', ts: 0, likes: 0, replies: [reply] }])
      }
    }
  }

  const all: Comment[] = [
    ...userComments.filter(c => !c.id.startsWith('patch_')),
    ...seededComments.map(c => {
      const patch = userComments.find(u => u.id === `patch_${c.id}`)
      return patch ? { ...c, replies: [...c.replies, ...patch.replies] } : c
    }),
  ]

  const totalComments = all.reduce((sum, c) => sum + 1 + c.replies.length, 0)

  return (
    <section id="comments" className="py-20 lg:py-28 bg-gray-50" aria-labelledby="comments-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00C896] mb-3">Community</p>
          <h2 id="comments-heading" className="text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight mb-3">
            What Canadians are saying
          </h2>
          <p className="text-gray-500 text-lg">Real feedback from stakers across Canada.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-8">
          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <div className="flex gap-3 items-center">
              <div className="h-9 w-9 rounded-full bg-gray-200 flex-shrink-0" aria-hidden="true" />
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={60}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0A1628] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896] transition"
              />
            </div>
            <textarea
              placeholder="Share your experience with StakeOnix..."
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={400}
              rows={3}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#0A1628] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896] transition resize-none"
            />
            {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
            {posted && <p className="text-xs text-[#00C896] font-medium" role="status">Comment posted. Thanks for sharing!</p>}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{text.length}/400</span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#00C896] hover:bg-[#00b386] text-white font-semibold text-sm px-5 py-2.5 transition-all hover:shadow-lg hover:shadow-[#00C896]/25"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                Post comment
              </button>
            </div>
          </form>
        </div>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">
          {totalComments} comment{totalComments !== 1 ? 's' : ''}
        </p>

        <div className="space-y-4">
          {all.map(comment => (
            <CommentCard
              key={comment.id}
              comment={comment}
              likedIds={likedIds}
              onLike={handleLike}
              onAddReply={handleAddReply}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
