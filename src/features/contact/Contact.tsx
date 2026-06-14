import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Copy, Check, Send, Loader2 } from 'lucide-react'
import { LinkedInIcon } from '@/components/ui/icons'
import type { IconComponent } from '@/types'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/effects/Reveal'
import { Card } from '@/components/ui/card'
import { Input, Textarea } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/effects/MagneticButton'
import { useForm } from '@/hooks/useForm'
import { copyText } from '@/lib/utils'
import { site } from '@/config/site'

interface ContactFormValues extends Record<string, string> {
  name: string
  email: string
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const { values, errors, touched, status, setValue, onBlur, handleSubmit, reset } =
    useForm<ContactFormValues>(
      { name: '', email: '', message: '' },
      {
        name: (v) => (v.trim().length < 2 ? 'Please tell me your name.' : undefined),
        email: (v) => (!EMAIL_RE.test(v) ? 'That email doesn’t look right.' : undefined),
        message: (v) => (v.trim().length < 10 ? 'A few more words would help (10+ chars).' : undefined),
      },
      async (data) => {
        // No backend by design — compose a mailto draft so the message
        // lands in the visitor's own mail client, fully transparent.
        const subject = encodeURIComponent(`Portfolio inquiry from ${data.name}`)
        const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`)
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
        await new Promise((resolve) => setTimeout(resolve, 600))
      },
    )

  return (
    <section id="contact" aria-label="Contact" className="relative overflow-hidden py-28 lg:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      {/* Ambient glow anchoring the closing section */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-full lg:w-[50rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="section-shell relative">
        <SectionHeading
          align="center"
          eyebrow="Contact"
          title="Let's Build Something Exceptional"
          description="Open to senior frontend roles, remote or hybrid teams, ambitious products and conversations about making the web faster."
        />

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact details */}
          <div className="flex flex-col gap-4">
            <ContactDetail
              icon={Mail}
              label="Email"
              value={site.email}
              href={`mailto:${site.email}`}
              copyable
            />
            <ContactDetail icon={Phone} label="Phone" value={site.phone} href={site.phoneHref} />
            <ContactDetail
              icon={LinkedInIcon}
              label="LinkedIn"
              value="in/vashisthnitish"
              href={site.linkedin}
              external
            />
            <ContactDetail
              icon={MapPin}
              label="Availability"
              value={`${site.location} | ${site.availability}`}
            />
          </div>

          {/* Form */}
          <Reveal delay={0.15} className="min-w-0">
            <Card className="relative overflow-hidden p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <SuccessState key="success" onReset={reset} />
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, y: -16 }}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                    className="flex flex-col gap-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Your name"
                        name="name"
                        autoComplete="name"
                        value={values.name}
                        onChange={(e) => setValue('name', e.target.value)}
                        onBlur={() => onBlur('name')}
                        error={touched.name ? errors.name : undefined}
                      />
                      <Input
                        label="Email address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => setValue('email', e.target.value)}
                        onBlur={() => onBlur('email')}
                        error={touched.email ? errors.email : undefined}
                      />
                    </div>
                    <Textarea
                      label="Tell me about your project"
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={(e) => setValue('message', e.target.value)}
                      onBlur={() => onBlur('message')}
                      error={touched.message ? errors.message : undefined}
                    />
                    <MagneticButton className="self-start" strength={0.2}>
                      <Button type="submit" size="lg" disabled={status === 'submitting'}>
                        {status === 'submitting' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" aria-hidden />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send size={16} aria-hidden />
                            Send Message
                          </>
                        )}
                      </Button>
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-72 flex-col items-center justify-center gap-4 text-center"
      role="status"
    >
      <motion.svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
        <motion.circle
          cx="36"
          cy="36"
          r="32"
          stroke="url(#success-gradient)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
        <motion.path
          d="M22 37 L32 47 L51 27"
          stroke="#06B6D4"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="success-gradient" x1="0" y1="0" x2="72" y2="72">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </motion.svg>
      <h3 className="font-display text-xl font-semibold text-snow">Message drafted!</h3>
      <p className="max-w-sm text-sm text-snow/60">
        Your mail client should have opened with everything pre-filled. If not, write to me directly
        at <a href={`mailto:${site.email}`} className="text-primary-light underline-offset-4 hover:underline">{site.email}</a>.
      </p>
      <Button variant="outline" size="sm" onClick={onReset} className="mt-2">
        Send another
      </Button>
    </motion.div>
  )
}

function ContactDetail({
  icon: Icon,
  label,
  value,
  href,
  external = false,
  copyable = false,
}: {
  icon: IconComponent
  label: string
  value: string
  href?: string
  external?: boolean
  copyable?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    if (await copyText(value)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  const inner = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-primary-light transition-colors duration-300 group-hover:text-accent-cyan">
        <Icon size={18} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-snow/40">{label}</span>
        <span className="block break-words text-sm leading-relaxed text-snow/85 [overflow-wrap:anywhere]">
          {value}
        </span>
      </span>
    </>
  )

  return (
    <Reveal className="min-w-0 overflow-hidden">
      <Card className="group flex items-center gap-4 p-4 transition-colors duration-300 hover:border-primary-light/35">
        {href ? (
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="flex min-w-0 flex-1 items-center gap-4"
          >
            {inner}
          </a>
        ) : (
          <span className="flex min-w-0 flex-1 items-center gap-4">{inner}</span>
        )}
        {copyable && (
          <button
            onClick={copy}
            aria-label={copied ? 'Copied' : `Copy ${label.toLowerCase()}`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-snow/50 transition-colors hover:border-primary-light/40 hover:text-snow"
          >
            {copied ? <Check size={14} className="text-accent-cyan" aria-hidden /> : <Copy size={14} aria-hidden />}
          </button>
        )}
      </Card>
    </Reveal>
  )
}
