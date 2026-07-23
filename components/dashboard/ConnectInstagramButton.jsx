'use client'

import { useState } from 'react'
import { Instagram } from 'lucide-react'
import { getInstagramConnectUrl } from '@/lib/api'

// Drop this anywhere in the dashboard, e.g. next to Topbar's "New trigger"
// button, or as a banner shown when profile.instagram_account_id is null.
export default function ConnectInstagramButton({ connected = false }) {
  const [loading, setLoading] = useState(false)

  async function handleConnect() {
    setLoading(true)
    try {
      // Ask the backend for the Facebook OAuth URL — the backend can't
      // redirect us directly here because this fetch call isn't a
      // top-level page navigation, and the redirect target (Facebook)
      // needs to be a real browser navigation, not a fetch response.
      const { url } = await getInstagramConnectUrl()
      // Now that we have the URL, THIS is the top-level navigation.
      window.location.href = url
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  if (connected) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#131622] px-4 py-2.5 text-sm text-[#8890A6]">
        <Instagram size={16} className="text-[#3ED9C4]" />
        Instagram connected
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg bg-[#7C5CFC] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#6A4CE0] disabled:opacity-50"
    >
      <Instagram size={16} />
      {loading ? 'Redirecting…' : 'Connect Instagram'}
    </button>
  )
}
