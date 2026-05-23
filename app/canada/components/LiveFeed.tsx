'use client'

import { useState, useEffect } from 'react'

const FEED = [
  { name: 'Mike T.',    city: 'Toronto',      asset: 'ETH', amount: '1.8',  action: 'staked' },
  { name: 'Sarah K.',   city: 'Vancouver',    asset: 'SOL', amount: '12.4', action: 'staked' },
  { name: 'David L.',   city: 'Calgary',      asset: 'SOL', amount: '6.0',  action: 'staked' },
  { name: 'Priya M.',   city: 'Mississauga',  asset: 'ETH', amount: '0.5',  action: 'staked' },
  { name: 'James W.',   city: 'Ottawa',       asset: 'DOT', amount: '45',   action: 'staked' },
  { name: 'Aisha R.',   city: 'Montreal',     asset: 'ADA', amount: '2400', action: 'staked' },
  { name: 'Kevin H.',   city: 'Edmonton',     asset: 'SOL', amount: '8.3',  action: 'staked' },
  { name: 'Natalie B.', city: 'Winnipeg',     asset: 'ETH', amount: '2.1',  action: 'staked' },
  { name: 'Omar F.',    city: 'Brampton',     asset: 'SOL', amount: '20',   action: 'staked' },
  { name: 'Chloe D.',   city: 'Halifax',      asset: 'ADA', amount: '5000', action: 'staked' },
  { name: 'Raj S.',     city: 'Surrey',       asset: 'DOT', amount: '120',  action: 'staked' },
  { name: 'Emma P.',    city: 'Kitchener',    asset: 'ETH', amount: '0.75', action: 'staked' },
  { name: 'Andre C.',   city: 'Quebec City',  asset: 'SOL', amount: '15',   action: 'staked' },
  { name: 'Yuki T.',    city: 'Burnaby',      asset: 'ETH', amount: '3.2',  action: 'staked' },
  { name: 'Hassan A.',  city: 'Scarborough',  asset: 'SOL', amount: '9.5',  action: 'staked' },
]

function randomMinutesAgo(max = 18) {
  return Math.floor(Math.random() * max) + 1
}

export function LiveFeed() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [minutesAgo, setMinutesAgo] = useState(randomMinutesAgo())

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % FEED.length)
        setMinutesAgo(randomMinutesAgo())
        setVisible(true)
      }, 400)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const entry = FEED[index]

  return (
    <div
      className={`flex items-center gap-3 transition-opacity duration-400 ${visible ? 'opacity-100' : 'opacity-0'}`}
      aria-live="polite"
      aria-label="Recent staking activity"
    >
      {/* Pulse dot */}
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>

      <p className="text-xs sm:text-sm text-white/55 whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="text-white/80 font-semibold">{entry.name}</span>
        {' from '}
        <span className="text-white/80 font-semibold">{entry.city}</span>
        {' just staked '}
        <span className="text-emerald-400 font-bold">{entry.amount} {entry.asset}</span>
        <span className="text-white/30 ml-2">&middot; {minutesAgo} min ago</span>
      </p>
    </div>
  )
}
