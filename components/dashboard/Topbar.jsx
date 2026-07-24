"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import SignalPulse from "@/components/SignalPulse";

// One random line per time-of-day bucket. Picking a random line (not just
// a random time-of-day check) is what keeps the header feeling alive on
// repeat visits instead of showing the exact same "Good morning" every day.
const GREETINGS = {
  morning: [
    "Good morning. Let's see who commented overnight.",
    "Morning. Your triggers never sleep — let's check the log.",
    "Rise and shine — time to see what fired while you were out.",
  ],
  afternoon: [
    "Good afternoon. Here's what's been happening.",
    "Afternoon check-in — let's see the numbers.",
    "Hope it's a good one. Here's today so far.",
  ],
  evening: [
    "Good evening. Let's wrap up the day's activity.",
    "Evening — here's how today's triggers performed.",
    "Winding down? Here's your day at a glance.",
  ],
  night: [
    "Working late? Here's the latest activity.",
    "Burning the midnight oil — here's what's new.",
    "Quiet hours. Let's check in on your triggers.",
  ],
};

function getTimeBucket(hour) {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 22) return "evening";
  return "night";
}

export default function Topbar({ onNewCampaign }) {
  // Start with a static, deterministic title so server and client render
  // the same markup on the first pass, then swap in the time/random
  // greeting on mount (client-only Date + Math.random would otherwise
  // cause a hydration mismatch if computed during render).
  const [greeting, setGreeting] = useState("Overview");

  useEffect(() => {
    const bucket = getTimeBucket(new Date().getHours());
    const options = GREETINGS[bucket];
    setGreeting(options[Math.floor(Math.random() * options.length)]);
  }, []);

  return (
    <div className="flex items-center justify-between border-b border-base-border px-6 py-5 lg:px-10">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight text-ink">
          {greeting}
        </h1>
        <div className="mt-1 flex items-center gap-2 text-xs text-ink-muted">
          <SignalPulse size="sm" color="success" />
          Listening for comments in real time
        </div>
      </div>

      <button
        onClick={onNewCampaign}
        className="flex items-center gap-2 rounded-lg bg-signal px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-signal-soft"
      >
        <Plus size={16} />
        New trigger
      </button>
    </div>
  );
}
