

    'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { LandingHeader } from '@/components/landing-header'
import { ArrowRight, ArrowUpRight, Brain, GraduationCap, Grid, ShieldCheck, Sparkles } from 'lucide-react'

const CSS = `
@keyframes fadeUp  {from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes floatY  {0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes dotPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(1.7)}}
@keyframes shimmer {0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}
@keyframes ticker  {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes blink   {0%,100%{opacity:1}50%{opacity:0}}
@keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes orb     {0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-20px,15px) scale(1.06)}}
@keyframes orb2    {0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(18px,-12px) scale(.96)}}
@keyframes ripple  {0%{transform:scale(0);opacity:.5}100%{transform:scale(4);opacity:0}}
@keyframes wordIn  {from{opacity:0;transform:translateY(20px) rotateX(-40deg)}to{opacity:1;transform:translateY(0) rotateX(0)}}
@keyframes glow    {0%,100%{box-shadow:0 0 20px rgba(249,115,22,.3)}50%{box-shadow:0 0 40px rgba(249,115,22,.6)}}

.reveal    {opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}
.reveal.in {opacity:1;transform:translateY(0)}
.reveal-d1.in{transition-delay:.1s}.reveal-d2.in{transition-delay:.2s}
.reveal-d3.in{transition-delay:.3s}.reveal-d4.in{transition-delay:.4s}

.skill-dot{animation:dotPulse 2.4s ease infinite}

.shimmer-wrap{position:relative;overflow:hidden}
.shimmer-wrap::after{content:'';position:absolute;inset:0;
  background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.55) 50%,transparent 65%);
  animation:shimmer 3.5s ease-in-out infinite;pointer-events:none}

.cta-glow{animation:ctaPulse 2.5s ease infinite}
@keyframes ctaPulse{0%{box-shadow:0 0 0 0 rgba(236,127,19,.4)}70%{box-shadow:0 0 0 14px rgba(236,127,19,0)}100%{box-shadow:0 0 0 0 rgba(236,127,19,0)}}

.type-cursor::after{content:'|';animation:blink 1s step-end infinite;color:#ec7f13}
.grid-line-bg{background-image:linear-gradient(rgba(236,127,19,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(236,127,19,.04) 1px,transparent 1px);background-size:48px 48px}

.ripple-btn{position:relative;overflow:hidden}
.ripple-btn .rpl{position:absolute;border-radius:50%;background:rgba(255,255,255,.28);
  width:100px;height:100px;margin-top:-50px;margin-left:-50px;
  animation:ripple .65s ease-out forwards;pointer-events:none}

.magnetic{transition:transform .22s cubic-bezier(.22,1,.36,1)}

.skill-tag{transition:all .18s cubic-bezier(.22,1,.36,1);cursor:pointer;border:1px solid transparent;user-select:none}
.skill-tag:hover{transform:translateY(-3px) scale(1.12)}
.skill-tag.lit{background:#f97316!important;color:#fff!important;border-color:#ea580c;
  box-shadow:0 6px 20px rgba(249,115,22,.35);transform:translateY(-4px) scale(1.12)}

.mosaic-card{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease}
.mosaic-card:hover{transform:translateY(-10px) scale(1.02);box-shadow:0 32px 64px rgba(0,0,0,.2)}

.scroll-prog{position:fixed;top:0;left:0;height:3px;z-index:9999;
  background:linear-gradient(90deg,#f97316,#fb923c);pointer-events:none;transition:width .1s linear}

.feat-card{transform-style:preserve-3d;transition:transform .12s ease,box-shadow .3s ease;will-change:transform}

.word-reveal{display:inline-block;opacity:0;animation:wordIn .5s cubic-bezier(.22,1,.36,1) forwards}

.score-ring-fill{transition:stroke-dashoffset .6s cubic-bezier(.22,1,.36,1)}

.hover-word{display:inline-block;transition:color .2s,transform .2s;cursor:default}
.hover-word:hover{color:#f97316;transform:translateY(-3px) scale(1.04)}

.drag-wrap{user-select:none}
.drag-handle-btn{cursor:col-resize}

.feature-highlight{transition:all .3s ease}
.feature-highlight:hover{border-color:rgba(249,115,22,.4)!important;background:rgba(255,247,237,.5)!important}

.scroll-indicator{animation:floatY 2s ease-in-out infinite}
`

// ── Typewriter ──────────────────────────────────────────────────────────────
const WORDS = ['verified identity.', 'living credential.', 'trusted profile.', 'career foundation.']
function Typewriter() {
  const [wi, setWi] = useState(0)
  const [chars, setChars] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const w = WORDS[wi]
    const t = setTimeout(() => {
      if (!del) { if (chars < w.length) setChars(c => c + 1); else setTimeout(() => setDel(true), 1800) }
      else { if (chars > 0) setChars(c => c - 1); else { setDel(false); setWi(i => (i + 1) % WORDS.length) } }
    }, del ? 38 : 62)
    return () => clearTimeout(t)
  }, [chars, del, wi])
  return <span className="text-primary type-cursor">{WORDS[wi].slice(0, chars)}</span>
}

// ── useReveal ───────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: .12 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return ref
}

// ── 3D Tilt Card ────────────────────────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - .5
    const y = (e.clientY - r.top) / r.height - .5
    el.style.transform = `perspective(800px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.04)`
    el.style.boxShadow = `${-x * 24}px ${-y * 24}px 48px rgba(0,0,0,.1)`
  }
  const onLeave = () => { if (ref.current) { ref.current.style.transform = ''; ref.current.style.boxShadow = '' } }
  return <div ref={ref} className={`feat-card ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>
}

// ── Ripple Button ───────────────────────────────────────────────────────────
function RippleBtn({ children, className = '', href }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const fire = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const s = document.createElement('span'); s.className = 'rpl'
    s.style.top = e.clientY - r.top + 'px'; s.style.left = e.clientX - r.left + 'px'
    el.appendChild(s); setTimeout(() => s.remove(), 700)
  }
  return <button ref={ref} className={`ripple-btn ${className}`} onClick={fire}>{children}</button>
}

// ── Magnetic ────────────────────────────────────────────────────────────────
function Magnetic({ children, strength = .3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px,${(e.clientY - r.top - r.height / 2) * strength}px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return <div ref={ref} className="magnetic" onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>
}

// ── Drag Slider ─────────────────────────────────────────────────────────────
function DragSlider() {
  const [pos, setPos] = useState(42)
  const dragging = useRef(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const calc = useCallback((cx: number) => {
    const el = wrapRef.current; if (!el) return
    const r = el.getBoundingClientRect()
    setPos(Math.min(Math.max(((cx - r.left) / r.width) * 100, 4), 96))
  }, [])
  useEffect(() => {
    const up = () => { dragging.current = false }
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return
      calc('touches' in e ? e.touches[0].clientX : e.clientX)
    }
    window.addEventListener('mouseup', up); window.addEventListener('touchend', up)
    window.addEventListener('mousemove', move); window.addEventListener('touchmove', move as any)
    return () => {
      window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up)
      window.removeEventListener('mousemove', move); window.removeEventListener('touchmove', move as any)
    }
  }, [calc])
  return (
    <div ref={wrapRef} className="drag-wrap relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200 select-none" style={{ aspectRatio: '4/3', cursor: 'col-resize' }}>
      {/* OLD */}
      <div className="absolute inset-0 bg-gray-50 flex flex-col gap-4 p-8">
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        {[100, 100, 75].map((w, i) => <div key={i} className="h-2 bg-gray-200 rounded" style={{ width: `${w}%` }} />)}
        <div className="flex gap-2 mt-2">{[60, 80, 55].map((w, i) => <div key={i} className="h-6 bg-gray-200 rounded-full" style={{ width: w }} />)}</div>
        <div className="mt-auto text-xs font-mono uppercase tracking-widest text-gray-400 text-center">Legacy Static Doc</div>
      </div>
      {/* NEW */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="absolute inset-0 bg-white flex flex-col gap-4 p-8" style={{ width: `${10000 / pos}%` }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-orange-400 shadow flex-shrink-0" />
            <div><div className="h-3 w-24 bg-gray-100 rounded mb-1" /><div className="h-2 w-16 bg-gray-50 rounded" /></div>
          </div>
          {[100, 85, 70].map((w, i) => <div key={i} className="h-2 bg-orange-50 rounded" style={{ width: `${w}%` }} />)}
          <div className="flex gap-1.5 mt-1">
            {['React', 'Design', 'Strategy'].map(s => <span key={s} className="text-[9px] bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full font-semibold">{s}</span>)}
          </div>
          <div className="mt-auto space-y-2">
            <div className="flex justify-between text-xs font-mono text-gray-500"><span>Trust Score</span><span className="text-primary font-bold">98.4</span></div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full" style={{ width: '98%' }} /></div>
          </div>
        </div>
      </div>
      {/* divider */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-primary z-20 shadow-[0_0_14px_rgba(249,115,22,.7)]" style={{ left: `${pos}%` }}>
        <div className="drag-handle-btn absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full shadow-xl flex items-center justify-center border-2 border-white z-30"
          onMouseDown={() => { dragging.current = true }} onTouchStart={() => { dragging.current = true }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 4L2 8L5 12M11 4L14 8L11 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3 left-3 z-10 bg-white/80 text-[9px] font-mono uppercase tracking-widest text-gray-400 px-2 py-0.5 rounded">Before</div>
      <div className="absolute bottom-3 z-10 bg-orange-500/90 text-white text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded" style={{ left: `calc(${pos}% + 8px)` }}>After</div>
    </div>
  )
}

// ── Interactive Resume Card ─────────────────────────────────────────────────
function ResumeCard() {
  const [active, setActive] = useState<string | null>(null)
  const [score, setScore] = useState(78)
  const [endorsed, setEndorsed] = useState<string[]>([])
  const skills = [
    { l: 'Product Design', o: true },
    { l: 'React', o: false },
    { l: 'Leadership', o: true },
    { l: 'Figma', o: false },
    { l: 'Strategy', o: false },
  ]
  const circum = 2 * Math.PI * 31.5
  const offset = circum * (1 - score / 100)

  const toggleSkill = (label: string) => {
    const isOn = endorsed.includes(label)
    if (isOn) {
      setEndorsed(e => e.filter(x => x !== label))
      setScore(s => Math.max(72, s - 4))
    } else {
      setEndorsed(e => [...e, label])
      setScore(s => Math.min(99, s + 4))
    }
    setActive(label)
    setTimeout(() => setActive(null), 1800)
  }

  return (
    <div className="shimmer-wrap relative bg-white rounded-2xl p-8 w-full border border-gray-100 shadow-2xl overflow-hidden">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-orange-400 shadow-lg shadow-orange-200" />
        <div>
          <div className="h-3.5 w-28 bg-gray-200 rounded-full mb-2" />
          <div className="h-2.5 w-20 bg-gray-100 rounded-full" />
        </div>
      </div>
      {[{ label: 'Experience', lines: [100, 88, 72] }, { label: 'Education', lines: [90, 65] }].map(({ label, lines }) => (
        <div key={label} className="mb-4">
          <div className="text-[9px] font-bold tracking-[.14em] uppercase text-gray-300 mb-2">{label}</div>
          {lines.map((w, i) => <div key={i} className="h-2.5 bg-gray-100 rounded-full mb-1.5" style={{ width: `${w}%` }} />)}
        </div>
      ))}
      <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 mt-1">
        <span className="w-1.5 h-1.5 bg-primary rounded-full skill-dot" />
        <span className="text-[9px] font-bold uppercase tracking-widest text-orange-700">Identity Verified</span>
      </div>
      {/* clickable skills */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {skills.map(s => (
          <button key={s.l} onClick={() => toggleSkill(s.l)}
            className={`skill-tag text-[9px] font-semibold px-2.5 py-1 rounded-md ${endorsed.includes(s.l) ? 'lit' : s.o ? 'bg-orange-50 text-orange-700' : 'bg-gray-50 text-gray-600'}`}>
            {endorsed.includes(s.l) ? '✓ ' : ''}{s.l}
          </button>
        ))}
      </div>
      {active && (
        <p className="text-[9px] text-orange-500 mt-1.5 font-medium" style={{ animation: 'fadeUp .2s ease both' }}>
          {endorsed.includes(active) ? `✓ ${active} endorsed` : `${active} removed`} — score updated to {score}
        </p>
      )}
      {/* score ring */}
      <div className="absolute bottom-6 right-6 w-20 h-20 bg-white rounded-full shadow-xl flex flex-col items-center justify-center border border-gray-100 cursor-pointer group"
        onClick={() => setScore(s => s >= 99 ? 72 : Math.min(99, s + 3))} title="Click to boost">
        <svg className="absolute inset-1" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="30" fill="none" stroke="#f0ede8" strokeWidth="5" />
          <circle cx="36" cy="36" r="30" fill="none" stroke="#f97316" strokeWidth="5"
            strokeLinecap="round" strokeDasharray={circum} strokeDashoffset={offset}
            transform="rotate(-90 36 36)" className="score-ring-fill" />
        </svg>
        <span className="text-lg font-bold text-gray-900 font-mono relative z-10">{score}</span>
        <span className="text-[7px] uppercase tracking-widest text-gray-400 relative z-10">score</span>
        <span className="absolute inset-0 rounded-full bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      {/* chip */}
      <div className="absolute bottom-6 left-6 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-green-400 to-green-600 grid place-items-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-800">Skills Verified</div>
          <div className="text-[8px] text-gray-400">{endorsed.length + 3} endorsements</div>
        </div>
      </div>
    </div>
  )
}

// ── Progress bar ────────────────────────────────────────────────────────────
function ProgBar({ w }: { w: number }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setWidth(w), 200); io.disconnect() } }, { threshold: .3 })
    if (ref.current) io.observe(ref.current); return () => io.disconnect()
  }, [w])
  return (
    <div ref={ref} className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full" style={{ width: `${width}%`, transition: 'width 1.3s cubic-bezier(.22,1,.36,1)' }} />
    </div>
  )
}

// ── Animated headline words ─────────────────────────────────────────────────
function AnimatedHeadline({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className} style={{ perspective: '600px' }}>
      {words.map((word, i) => (
        <span key={i} className="hover-word mr-[0.25em]">{word}</span>
      ))}
    </span>
  )
}

// ── Main ────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [prog, setProg] = useState(0)
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal(), r5 = useReveal()

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = CSS
    document.head.appendChild(style)
    const onScroll = () => {
      const d = document.documentElement
      setProg((d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { document.head.removeChild(style); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-primary selection:text-white font-display overflow-x-hidden">
      {/* scroll progress */}
      <div className="scroll-prog" style={{ width: `${prog}%` }} />

      <LandingHeader />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white grid-line-bg">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[130px]" style={{ animation: 'orb 12s ease-in-out infinite' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-primary/5 rounded-full blur-[100px]" style={{ animation: 'orb2 9s ease-in-out infinite' }} />
        </div>

        <div className="container max-w-7xl mx-auto px-6 z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div className="flex flex-col gap-8" style={{ animation: 'fadeUp .7s ease both' }}>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 w-fit">
              <span className="skill-dot w-2 h-2 bg-primary rounded-full inline-block" />
              <span className="text-xs font-semibold text-orange-700 tracking-widest uppercase">Skills-First Identity Layer</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-gray-900">
              <AnimatedHeadline text="Build a resume." />
              <br />
              <AnimatedHeadline text="Turn it into a" />
              <br />
              <Typewriter />
            </h1>

            <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
              Transition from self-reported claims to a structured, verified professional
              source of truth. The foundation for the next generation of work.
            </p>

            {/* interactive feature pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: '🔐 Verified Identity', tip: 'Blockchain-backed proof' },
                { label: '🤝 Peer Endorsements', tip: 'Colleague-verified skills' },
                { label: '🧠 AI-Powered Review', tip: 'Smart resume analysis' },
                { label: '📄 PDF Import', tip: 'Import existing resume' },
              ].map(({ label, tip }) => (
                <div key={label} className="group relative">
                  <div className="feature-highlight text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 cursor-default">
                    {label}
                  </div>
                  {/* tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {tip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <Link href="/builder">
                  <RippleBtn className="cta-glow bg-primary text-white h-14 px-8 rounded-xl text-lg font-bold hover:scale-105 transition-transform flex items-center gap-2 group">
                    Build Resume Free
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </RippleBtn>
                </Link>
              </Magnetic>
              <Magnetic>
                <RippleBtn className="border border-gray-200 h-14 px-8 rounded-xl text-lg font-bold hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-700">
                  Explore Network
                </RippleBtn>
              </Magnetic>
            </div>
          </div>

          {/* RIGHT — interactive card */}
          <div className="relative hidden lg:block" style={{ animation: 'fadeUp .9s .2s ease both' }}>
            {/* floating dots */}
            {[{ t: '-10px', l: '-10px', s: 10, d: '0s' }, { t: '45%', r: '-20px', s: 13, d: '1s' }, { b: '-10px', l: '48%', s: 8, d: '1.8s' }].map((p, i) => (
              <div key={i} className="skill-dot absolute bg-primary rounded-full shadow-[0_0_16px_rgba(236,127,19,.6)]"
                style={{ width: p.s, height: p.s, top: (p as any).t, left: (p as any).l, right: (p as any).r, bottom: (p as any).b, animationDelay: p.d }} />
            ))}
            <p className="text-[11px] text-gray-400 text-center mb-3 font-mono tracking-wide flex items-center justify-center gap-1.5">
              <Sparkles size={11} className="text-orange-400" />
              Click skills to endorse · Click score to boost
            </p>
            {/* shadow card */}
            <div className="absolute top-6 left-6 w-full h-full rounded-2xl bg-orange-100/40 border border-orange-200/30 rotate-2" />
            <ResumeCard />
          </div>
        </div>

        {/* scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs font-mono tracking-widest uppercase text-gray-400">Scroll</span>
          <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-gray-400 rounded-full" style={{ animation: 'floatY 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ── TICKER — pauses on hover ── */}
      <div className="bg-gray-900 border-y border-gray-800 py-3 overflow-hidden group">
        <div className="flex gap-16 whitespace-nowrap group-hover:[animation-play-state:paused]"
          style={{ animation: 'ticker 28s linear infinite' }}>
          {Array(2).fill(['Verified Identity', 'Blockchain Proof', 'Peer Endorsement', 'AI Resume Review', 'Skills Network', 'Institutional Certs', 'Zero-Trust Hiring', 'Global Protocol']).flat().map((t, i) => (
            <span key={i} className="text-xs font-mono uppercase tracking-[.18em] text-gray-400 flex items-center gap-4 hover:text-primary transition-colors cursor-default">
              <span className="w-1 h-1 bg-primary rounded-full" />{t}
            </span>
          ))}
        </div>
      </div>

      {/* ── NARRATIVE ── */}
      <section className="py-32 relative bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div ref={r1} className="reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 leading-tight text-gray-900">
              Traditional resumes rely on{' '}
              <span className="text-primary italic">self-reported claims...</span>
            </h2>
            <p className="text-xl leading-relaxed text-gray-600 opacity-60 mb-8">
              The document erodes as the world changes. Digital dust becomes the foundation for something stronger.
            </p>
            <div className="flex justify-center gap-2">
              {[20, 40, 60, 80, 100].map((op, i) => (
                <span key={i} className="w-2 h-2 bg-primary rounded-full inline-block"
                  style={{ opacity: op / 100, animation: `dotPulse ${1.6 + i * .2}s ease infinite`, animationDelay: `${i * .15}s` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLO GRID ── */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={r2} className="reveal flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h3 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">Verification Layer</h3>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">The SOLO Grid</h2>
              <p className="text-lg text-gray-500 mt-4">A perfectly aligned set of data blocks representing a structured profile. Pure, immutable, and verified.</p>
            </div>
            <div className="hidden md:block text-primary" style={{ animation: 'spinSlow 20s linear infinite' }}>
              <Grid size={48} strokeWidth={1.5} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, id: 'SOL-0921-X', title: 'Verified Identity', desc: 'Blockchain-backed proof of personhood and professional history.', w: 100, d: 'reveal-d1' },
              { icon: GraduationCap, id: 'TYPE: ACADEMIC_CERT', title: 'Institutional Proof', desc: 'Direct credentials issued by verified institutions and learning platforms.', w: 85, d: 'reveal-d2' },
              { icon: Brain, id: 'SKILL: QUANT_FINANCE', title: 'Validated Skills', desc: 'Competency data derived from actual work and peer-reviewed contributions.', w: 92, d: 'reveal-d3' },
            ].map(({ icon: Icon, id, title, desc, w, d }) => (
              <div key={title} ref={r3} className={`reveal ${d}`}>
                <TiltCard className="bg-white rounded-xl p-8 group cursor-default relative overflow-hidden border border-gray-200 shadow-sm h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex justify-between items-start mb-12 relative">
                    <Icon className="text-primary w-10 h-10" strokeWidth={1.5} />
                    <div className="text-[10px] font-mono text-gray-400">{id}</div>
                  </div>
                  <h4 className="text-xl font-bold mb-2 relative text-gray-900">{title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed relative">{desc}</p>
                  <div className="mt-8 pt-8 border-t border-gray-100 relative"><ProgBar w={w} /></div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DRAG SLIDER ── */}
      <section className="py-32 overflow-hidden relative bg-white">
        <div className="container max-w-7xl mx-auto px-6">
          <div ref={r4} className="reveal text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">From Flat to Deep</h2>
            <p className="text-xl text-gray-500 mb-2">Drag the slider to experience the transformation.</p>
            <p className="text-sm text-gray-400 font-mono tracking-widest">← drag →</p>
          </div>
          <DragSlider />
        </div>
      </section>

      {/* ── MOSAIC ── */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center text-gray-900">Engineered for the Whole Ecosystem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Learners', desc: 'Take complete ownership of your verified professional data.', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0eCSoe9RWy6Bw_GNquToGqsj_JDxbMmJB_5IwGhEEjeHC8RJBT-ZSRR6MftXEudfnh5POt1cMnnlRo0Ybftx2GIB_J_NpxpK7wltLgF7XF2KkyszXoZlOhddC_BpccJ48qHWIL7a1jZM2FHQNKoV8JvqsWf0F2RmQ7bx_8B8_kku5v1FSMgK9FB9T_JAalMYYYKNH4zAe0UwbWxbCwMf43aBUNfL_kEeYcU6XvKKoloeQG_duIHPSlOR0NU3hphiQk29Kkdov0Ifk', alt: 'Learners' },
              { title: 'Employers', desc: 'Hire with confidence using zero-trust verification protocols.', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATQScZ4Taz6vLp59b73TrFAPPaOVTJhMqiq8V1U5YS3d1rLD60q-u2IBH3sJiL7sQjwBYg6SKT7jQibjgOhPIWo-xFhRLLLc0d4cyXgXv1HxoGWsuKUjgd9_7_SS25wEUJqk6w4Gr6xTD_EvlROaG9meEsLQtJcOHCKiBk4ruhyysXT4fet0VciC7XXgyd3APnllwlZTQbX9sNnUt768J5ieO130zpQo0ckBNq52eY-fMVVfETIjvrw85SzMuAnngDsGxbE9yr3nh3', alt: 'Employers' },
              { title: 'Institutions', desc: 'Issue tamper-proof credentials directly to students.', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNl1ku3ORucl05F7WZT_3fAhHJg7rfgru1D2OHMAfHmgDSUVpVvLyEXDRuIy-6OWwqbJs76QxgIG5Y-eHdMZVsygQKV3-M6qq9Mg0SaMfVt2oyYPv41ZcSyKJ1LtII2mdCG3PT0eHb8ubb-u7TWukViURPg5XyfrrmGetvCVO19Tq5JD9_6W0-n-3PEA1c_RBSqxbxXJB6SBiD2kPTqAKFRvTfvbVV0Uyty2YX4HEJVS_Qsxe-5do86FZMWmKIKHA8o8xS-ftcCXAp', alt: 'Institutions' },
              { title: 'Developers', desc: 'Build on top of the global verified professional layer.', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyHzPIzEi98G3vjgH21BNT9fPh79x3AtrlRVyjxSP5MVttfOGMlFk_RZXUpizYnvwk5sTbpqhRmnQpbfoWm_q9ketvJUEa1N9GBfGhSNbzjuhQ0zhbRfLTtP8JcKFHmuyZ3Kd9dE0ra6AQ38EgdCATLlDtWJ6zECm31z4w47MXCVHQpyQzcj4227W-6gqvX_30Mqe4yN-TIgZuIxmev66uTJpblOkZ4Ccf0nJhp_9EkZD1fp638JOvqjr1uFZYjb4LCuJFXWLDbf1H', alt: 'Developers' },
            ].map(({ title, desc, src, alt }) => (
              <div key={title} className="mosaic-card group relative h-80 overflow-hidden rounded-xl bg-gray-900 border border-gray-800 cursor-pointer">
                <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90" alt={alt} src={src} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/60 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/60 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
                  <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <footer className="py-40 bg-gray-900 border-t border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(236,127,19,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(236,127,19,.15) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
        <div ref={r5} className="reveal container max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-900/30 border border-orange-800/40 rounded-full px-4 py-1.5 mb-10">
            <span className="skill-dot w-2 h-2 bg-primary rounded-full inline-block" />
            <span className="text-xs font-semibold text-orange-400 tracking-widest uppercase">Join 42,000+ professionals</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-12 leading-tight text-white">
            Ready to own your<br /><span className="text-primary italic">identity?</span>
          </h2>
          <div className="flex flex-col items-center gap-6">
            <Magnetic strength={.2}>
              <Link href="/builder">
                <RippleBtn className="cta-glow flex min-w-[240px] items-center justify-center gap-3 rounded-xl h-16 px-10 bg-primary text-white text-xl font-bold hover:scale-105 transition-all group">
                  Build Resume Free
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </RippleBtn>
              </Link>
            </Magnetic>
            <a className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-medium" href="#">
              Explore SOLO Network <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="mt-40 pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 uppercase tracking-[0.2em] px-6 lg:px-20">
          <div>© {new Date().getFullYear()} SOLO NETWORK PROTOCOL</div>
          <div className="flex gap-10">
            {['Documentation', 'Privacy', 'Terms'].map(l => <a key={l} className="hover:text-primary transition-colors" href="#">{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  )
}