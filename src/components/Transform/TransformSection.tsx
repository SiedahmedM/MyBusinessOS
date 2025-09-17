"use client"
import React, { useEffect, useMemo, useRef } from "react"
// Typewriter removed here in favor of precise line-by-line reveal
import { StarsBackground } from "@/components/ui/stars-background"
import { TechShowcase } from "@/components/TechShowcase/TechShowcase"
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee/TestimonialsMarquee"

type ServiceKey = "erp" | "crm" | "automation" | "ai"

const SERVICES: Record<ServiceKey, { beforeTitle: string; before: string[]; afterTitle: string; after: string[]; label: string }> = {
  erp: {
    label: "Custom ERP",
    beforeTitle: "Juggling 5 different systems daily",
    before: [
      "Inventory in one app, accounting in another",
      "Manual data entry between systems",
      "No real-time business overview",
    ],
    afterTitle: "Everything connected in one dashboard",
    after: [
      "All business data synchronized",
      "Automated workflows",
      "Complete business visibility",
    ],
  },
  crm: {
    label: "Custom CRM",
    beforeTitle: "Managing leads in spreadsheets and sticky notes",
    before: [
      "Lost leads falling through cracks",
      "No follow-up system",
      "Can't track sales performance",
    ],
    afterTitle: "Organized sales machine that closes more deals",
    after: [
      "Every lead captured and tracked",
      "Automated follow-up sequences",
      "Real-time sales analytics",
    ],
  },
  automation: {
    label: "Process Automation",
    beforeTitle: "Spending hours on repetitive tasks",
    before: ["Manual invoice processing", "Email approvals back and forth", "Data entry consuming whole days"],
    afterTitle: "Automated workflows running 24/7",
    after: ["Instant approvals and processing", "Zero manual data entry", "Team focused on growth, not paperwork"],
  },
  ai: {
    label: "AI Integration",
    beforeTitle: "Customers waiting hours for responses",
    before: ["Support tickets piling up", "Manual data analysis taking weeks", "Missing business insights"],
    afterTitle: "AI handling routine work instantly",
    after: ["24/7 customer support", "Instant data insights", "Predictive business analytics"],
  },
}

type StageHandle = { play: () => Promise<void>; reset: () => void }

const Stage = React.forwardRef<StageHandle, { content: { beforeTitle: string; before: string[]; afterTitle: string; after: string[] } }>(
  ({ content }, ref) => {
    const stageRef = useRef<HTMLDivElement | null>(null)
    const beforeColRef = useRef<HTMLDivElement | null>(null)
    const afterColRef = useRef<HTMLDivElement | null>(null)
    const svgRef = useRef<SVGSVGElement | null>(null)
    const starRef = useRef<HTMLDivElement | null>(null)
    const hasRun = useRef(false)
    const isMobileRef = useRef<boolean>(false)

    useEffect(() => {
      const mq = window.matchMedia('(max-width: 640px)')
      const set = () => { isMobileRef.current = mq.matches }
      set()
      mq.addEventListener ? mq.addEventListener('change', set) : mq.addListener(set as any)
      return () => {
        mq.removeEventListener ? mq.removeEventListener('change', set) : mq.removeListener?.(set as any)
      }
    }, [])

    // Reveal title words grouped by visual line wraps
    function revealTitleByLines(container: HTMLElement, done?: () => void){
      // group words by their offsetTop to detect wrapped lines
      const words = Array.from(container.querySelectorAll<HTMLElement>('.tw-word'))
      if (!words.length) { done && done(); return }
      const lines: HTMLElement[][] = []
      let currentTop: number | null = null
      words.forEach((el) => {
        const top = Math.round(el.offsetTop)
        if (currentTop === null || Math.abs(top - currentTop) > 2){
          lines.push([el])
          currentTop = top
        } else {
          lines[lines.length-1].push(el)
        }
      })

      const revealLine = (idx: number) => {
        if (idx >= lines.length) { done && done(); return }
        const line = lines[idx]
        let i = 0
        const step = () => {
          if (i >= line.length) { setTimeout(() => revealLine(idx+1), 80); return }
          line[i].classList.add('revealed')
          i += 1
          setTimeout(step, 45)
        }
        step()
      }
      revealLine(0)
    }

    function revealLinesSequentially(root: HTMLElement, selector: string, done?: () => void) {
      const lines: HTMLElement[] = Array.from(root.querySelectorAll(selector)) as HTMLElement[]
      let i = 0
      const step = () => {
        if (i >= lines.length) { done && done(); return }
        lines[i].classList.add('revealed')
        i += 1
        setTimeout(step, 110)
      }
      step()
    }

    function fireStarThenRevealAfter(){
      const stage = stageRef.current, beforeCol = beforeColRef.current, afterCol = afterColRef.current, svg = svgRef.current, star = starRef.current
      if (!stage || !beforeCol || !afterCol || !svg || !star) return
      // On small screens, skip star to avoid layout jitter; reveal title/bullets directly
      if (isMobileRef.current) {
        const titleWrap = afterCol.querySelector('.after-title') as HTMLElement | null
        if (titleWrap) {
          revealTitleByLines(titleWrap, () => {
            const root = stageRef.current
            if (root) revealLinesSequentially(root, '.after-col .line')
          })
        }
        return
      }
      const sb = beforeCol.getBoundingClientRect()
      const sa = afterCol.getBoundingClientRect()
      const stg = stage.getBoundingClientRect()
      // Use a consistent horizontal lane across the stage for all rows
      const laneY = Math.round(Math.min(96, Math.max(64, stg.height * 0.32))) // between 64–96px from top
      const start = { x: sb.right - stg.left - 8, y: laneY }
      const end   = { x: sa.left - stg.left + 8,  y: laneY }

      svg.setAttribute('width', String(stg.width))
      svg.setAttribute('height', String(stg.height))
      svg.innerHTML = ''
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      const lg = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
      lg.setAttribute('id','grad'); lg.setAttribute('x1','0%'); lg.setAttribute('y1','0%'); lg.setAttribute('x2','100%'); lg.setAttribute('y2','0%')
      const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop'); s1.setAttribute('offset','0%'); s1.setAttribute('stop-color','#FFD52E')
      const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop'); s2.setAttribute('offset','100%'); s2.setAttribute('stop-color','#ffffff')
      lg.appendChild(s1); lg.appendChild(s2); defs.appendChild(lg)
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', `M ${start.x},${start.y} L ${end.x},${end.y}`)
      path.setAttribute('fill','none')
      path.setAttribute('stroke','url(#grad)')
      path.setAttribute('stroke-width','2')
      path.setAttribute('stroke-opacity','0.18')
      svg.appendChild(defs); svg.appendChild(path)

      const duration = 820
      const startTime = performance.now()
      function lerp(t: number, a: any, b: any){ return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t } }
      function animate(now: number){
        const t = Math.min(1, (now - startTime)/duration)
        const p = lerp(t, start, end)
        star.style.transform = `translate(${p.x}px, ${p.y}px)`
        star.style.opacity = '1'
        if (t < 1) requestAnimationFrame(animate)
        else {
          // Explosion cue on after column
          afterCol.classList.add('after-explode')
          star.classList.add('star-burst')
          setTimeout(() => {
            afterCol.classList.remove('after-explode')
            star.classList.remove('star-burst')
            if (svg) svg.innerHTML = ''
            star.style.opacity = '0'
            // move offscreen to avoid accidental visibility on resize
            star.style.transform = `translate(-9999px,-9999px)`
          }, 380)
          // Show after title word-by-word, line by line
          const titleWrap = afterCol.querySelector('.after-title') as HTMLElement | null
          if (titleWrap) {
            revealTitleByLines(titleWrap, () => {
              const root = stageRef.current
              if (root) revealLinesSequentially(root, '.after-col .line')
            })
          }
        }
      }
      // Wait one frame to ensure layout is stable before animating
      requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(animate)))
    }

    useEffect(() => {
      const el = stageRef.current
      if (!el) return
      // No auto-observer; playback is orchestrated by parent via ref
    }, [])

    function reset(){
      hasRun.current = false
      const root = stageRef.current
      if (root) root.querySelectorAll('.line').forEach(el => el.classList.remove('revealed'))
      if (svgRef.current) svgRef.current.innerHTML = ''
      if (starRef.current) { starRef.current.classList.remove('star-burst'); starRef.current.setAttribute('style','') }
      afterColRef.current?.classList.remove('after-explode')
      const titleWrap = afterColRef.current?.querySelector('.after-title') as HTMLElement | undefined
      if (titleWrap) titleWrap.querySelectorAll('.tw-word').forEach(w => w.classList.remove('revealed'))
    }

    async function play(): Promise<void> {
      if (hasRun.current) return
      hasRun.current = true
      const root = stageRef.current
      if (root) revealLinesSequentially(root, '.before-col .line', () => fireStarThenRevealAfter())
      // Adjusted timing: before (~330ms) + star(~820ms) + title lines (~900ms) + bullets (~330ms)
      return new Promise((res) => setTimeout(res, 2500))
    }

    React.useImperativeHandle(ref, () => ({ play, reset }))

    return (
      <div ref={stageRef} className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-12 md:gap-24 items-start min-h-[260px] sm:min-h-[300px] mb-8 sm:mb-20 transform-text-stage stage-wrap">
        {/* Mobile merged card wrapper (desktop uses contents layout) */}
        <div className="stage-mobile sm:contents">
          {/* Before text */}
          <div ref={beforeColRef} className="before-col stage-section">
            <div className="sm:hidden mb-2"><span className="chip before">Before</span></div>
            <h3 className="line mt-2 font-semibold text-white text-lg sm:text-xl">{content.beforeTitle}</h3>
            <ul className="mt-2 pl-5 text-white/85 text-sm sm:text-base space-y-1.5 list-disc">
              {content.before.map((b) => (
                <li key={b} className="line">{b}</li>
              ))}
            </ul>
          </div>
          {/* Mobile connector between Before and After */}
          <div className="mobile-connector sm:hidden">
            <span className="conn-dot" aria-hidden></span>
            <span className="conn-line" aria-hidden></span>
            <span className="conn-arrow" aria-hidden></span>
            <span className="chip after">After</span>
          </div>

          {/* After text */}
          <div ref={afterColRef} className="after-col stage-section">
            {/* After title built from words to allow line-by-line groups */}
            <h3 className="mt-2 font-semibold text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl after-title flex flex-wrap gap-x-2 leading-tight">
              {content.afterTitle.split(' ').map((w, i) => (
                <span key={i} className="tw-word opacity-0 translate-y-[4px] transition-all duration-200">{w}</span>
              ))}
            </h3>
            <ul className="mt-2 pl-5 text-white/85 text-sm sm:text-base space-y-1.5 list-disc">
              {content.after.map((a) => (
                <li key={a} className="line">{a}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Shooting star layer */}
        <div className="pointer-events-none absolute inset-0 z-30">
          <svg ref={svgRef} className="absolute inset-0" />
          <div ref={starRef} className="star-shoot" />
        </div>
      </div>
    )
  }
)

export const TransformSection: React.FC = () => {
  const list = useMemo(() => (Object.keys(SERVICES) as ServiceKey[]).map(k => SERVICES[k]), [])
  const sectionRef = useRef<HTMLElement | null>(null)
  const sectionVisible = useRef(false)
  const stageRefs = useRef<Array<StageHandle | null>>([])
  const started = useRef(false)

  // Track if section fully left viewport to allow reset
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        sectionVisible.current = e.isIntersecting
        if (e.isIntersecting && !started.current) {
          started.current = true
          // Orchestrate sequential playback regardless of scroll
          ;(async () => {
            for (const ref of stageRefs.current) {
              await ref?.play()
            }
          })()
        }
        // Do NOT reset on simple scroll-away within Home; only reset on unmount/tab change
      })
    }, { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef as any} id="ai-playground" className="relative ai-playground-mobile transform-host">
      {/* Starry background across the entire section, forced full-bleed */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[100vw]">
        <StarsBackground starDensity={0.00045} minRadius={0.8} maxRadius={1.4} mobileTuning className="opacity-30 sm:opacity-40 md:opacity-45" />
      </div>
      <div className="relative z-10 content-wrapper">
        <div className="section-header-mobile">
          <h2 className="font-sans font-semibold tracking-tighter2 text-3xl md:text-4xl text-white">See the Transformation</h2>
          <p className="font-sans text-base md:text-lg text-neutral-200 tracking-tightish">How custom software turns busywork into better work—across your business.</p>
        </div>

        <div className="mobile-content-padding">
          {/* Column badges (desktop only) */}
          <div className="hidden sm:grid grid-cols-2 gap-12 md:gap-24 items-start mb-6">
            <div><span className="big-badge before">Before</span></div>
            <div><span className="big-badge after">After</span></div>
          </div>
          {/* Framed area containing all transformation rows */}
          <div className="transform-frame relative mt-2 mb-10">
            <div className="relative z-10">
              {list.map((c, idx) => (
                <Stage key={idx} content={c} ref={(el) => (stageRefs.current[idx] = el)} />
              ))}
              <div className="cta-wrap">
                <a href="#contact" className="cta-btn" onClick={(e)=>{e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}}>
                  <span className="cta-glyph" aria-hidden>✦</span>
                  Book free 15‑min consultation
                </a>
                <div className="cta-note">No sales pitch — just expert advice.</div>
              </div>
            </div>
          </div>
          {/* Embedded Technology Stack section */}
          <div className="mt-12">
            <TechShowcase embedded />
          </div>
          {/* Embedded Testimonials */}
          <div className="mt-8">
            <TestimonialsMarquee embedded />
          </div>
          <p className="mt-3 text-xs text-white/60">Illustrative examples. We tailor solutions to your operations.</p>
        </div>
      </div>
    </section>
  )
}
