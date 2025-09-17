'use client'
import { memo, useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How long does a custom software project take?',
    answer:
      'Custom business software typically takes 4-8 weeks depending on complexity. We provide a detailed timeline during our discovery phase and keep you updated throughout the process.',
  },
  {
    question: "What's included in your development process?",
    answer:
      "Every project includes discovery & planning, custom development, testing, training for your team, and 2 months of support after launch.",
  },
  {
    question: 'How do you ensure the software fits our business needs?',
    answer:
      'We start every project with a comprehensive discovery phase where we map your current processes, identify pain points, and design a solution that matches exactly how your business operates.',
  },
  {
    question: 'Do you provide ongoing support and updates?',
    answer:
      'Yes. All projects include 2 months of post-launch support. We also offer maintenance packages for ongoing updates, security patches, and feature enhancements.',
  },
  {
    question: 'How is pricing determined for custom software?',
    answer:
      'Pricing is based on project scope, complexity, and features needed. After our discovery call, we provide a detailed fixed-price proposal with no surprises or hidden costs.',
  },
  {
    question: 'Can you integrate with our existing systems?',
    answer:
      'Absolutely. We specialize in connecting your new software with existing tools like QuickBooks, Salesforce, or any other business systems you currently use.',
  },
]

export const FAQSection = memo(function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-16 md:py-20 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="faq-title text-3xl md:text-4xl font-sans font-semibold tracking-tighter2 text-white text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="faq-box divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-xl">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div key={faq.question} className="group">
                <button
                  className="w-full flex items-center justify-between gap-6 px-5 md:px-6 py-5 text-left hover:bg-white/2 transition-colors"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <div>
                    <h3 className="faq-q text-sm md:text-base font-medium text-white/95">{faq.question}</h3>
                    <div
                      className={`faq-a mt-2 text-sm leading-relaxed pr-2 ${
                        isOpen ? 'text-white/80' : 'hidden'
                      }`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className={`faq-icon relative grid place-items-center h-8 w-8 rounded-md border border-white/15 text-white/80 transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <span className="absolute h-[1.5px] w-3.5 bg-white/80" />
                    <span className="absolute h-3.5 w-[1.5px] bg-white/80" />
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
})
