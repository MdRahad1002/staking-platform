'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { faqItems } from '../data'

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const id = `faq-answer-${index}`
  const triggerId = `faq-trigger-${index}`

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 px-0 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896] focus-visible:ring-offset-2 rounded-sm"
      >
        <span
          className={cn(
            'font-semibold text-base transition-colors',
            isOpen ? 'text-[#00C896]' : 'text-[#0A1628] group-hover:text-[#00C896]'
          )}
        >
          {question}
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 flex-shrink-0 transition-all duration-200',
            isOpen ? 'rotate-180 text-[#00C896]' : 'text-gray-400 group-hover:text-[#00C896]'
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id={id}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          'overflow-hidden transition-all duration-300 ease-out',
          isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
        )}
      >
        <p className="text-gray-600 text-base leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx)

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight mb-4"
          >
            Frequently asked questions
          </h2>
          <p className="text-gray-500 text-lg">
            Everything a Canadian staker needs to know, answered plainly.
          </p>
        </div>

        {/* Accordion */}
        <div
          className="divide-y divide-gray-200 border-t border-gray-200"
          role="list"
          aria-label="Frequently asked questions"
        >
          {faqItems.map((item, idx) => (
            <FAQItem
              key={idx}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === idx}
              onToggle={() => toggle(idx)}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
