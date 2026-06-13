import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuroraBackground } from '@/components/effects/AuroraBackground'

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <AuroraBackground />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <p className="text-gradient font-display text-8xl font-bold sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-snow">
          This route was code-split out of existence.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-snow/60">
          The page you're looking for doesn't exist — but the homepage renders in under a second.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-gradient-to-r from-primary to-primary-light px-7 text-sm font-medium text-snow shadow-glow-sm transition-shadow hover:shadow-glow-md"
        >
          Back to homepage
        </Link>
      </motion.div>
    </section>
  )
}
