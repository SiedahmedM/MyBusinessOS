'use client'
import { memo } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How long does a typical project take?',
    answer: 'Most standard projects are completed within 4-6 weeks. Flexible timelines can extend to 6-10 weeks depending on scope.'
  },
  {
    question: 'Do you offer support after launch?',
    answer: 'Yes. Every build includes training and 2 months of updates. Extended support packages are available as needed.'
  },
  {
    question: 'Can the final cost be outside the estimate range?',
    answer: 'Absolutely. Every project is unique and pricing can end up lower or higher based on specific requirements.'
  }
]

export const FAQSection = memo(function FAQSection() {
  return (
    <section id="faq" className="py-16 bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tighter2 text-neutral-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">{faq.question}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
