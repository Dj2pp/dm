'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthCard from '@/components/auth/auth'
import { createClient } from '@/lib/supabaseClient'

export default function SignupPage() {
  const supabase = createClient()
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // supabase.auth.signUp creates the user AND returns a session
    // (data.session.access_token is your JWT) — no custom JWT code needed here.
    const { error: signupError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    setLoading(false)

    if (signupError) {
      setError(signupError.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <AuthCard
      eyebrow="Create account"
      title="Start sending"
      subtitle="Free tier includes 100 DMs. No card needed."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="text-[#7C5CFC] hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-[#8890A6] mb-1">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-[#0B0D14] border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-xs text-[#8890A6] mb-1">Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-[#0B0D14] border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:border-transparent"
            placeholder="At least 8 characters"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7C5CFC] hover:bg-[#6A4CE0] transition-colors rounded-lg py-2.5 text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthCard>
  )
}
