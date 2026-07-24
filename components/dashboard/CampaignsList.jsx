"use client";

import { Link2, Radio } from "lucide-react";

/**
 * CampaignsList
 * -----------------------------------------------------------------------
 * The one dashboard panel wired to REAL data — it renders whatever
 * campaigns[] the parent fetched from GET /api/campaigns. Loading and
 * empty states are handled explicitly rather than just "not showing
 * anything," per the product's own voice: an empty dashboard should tell
 * you what to do next, not just look broken.
 * -----------------------------------------------------------------------
 */
export default function CampaignsList({ campaigns, isLoading, error }) {
  return (
    <div className="rounded-2xl border border-base-border bg-base-surface shadow-card">
      <div className="flex items-center justify-between border-b border-base-border px-6 py-5">
        <div>
          <h3 className="font-display text-base font-semibold text-ink">
            Your triggers
          </h3>
          <p className="text-xs text-ink-faint">Live from your account</p>
        </div>
      </div>

      <div className="divide-y divide-base-border">
        {isLoading && (
          <div className="space-y-3 p-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-lg bg-base-raised" />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="p-6 text-sm text-alert">
            Couldn't load your triggers — {error}. Check that the API server
            is running at the URL set in NEXT_PUBLIC_API_BASE_URL.
          </div>
        )}

        {!isLoading && !error && campaigns.length === 0 && (
          <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-signal/12 text-signal">
              <Radio size={19} />
            </div>
            <p className="text-sm text-ink">No triggers yet</p>
            <p className="max-w-xs text-xs text-ink-faint">
              Create one to start turning comments into automatic DMs.
            </p>
          </div>
        )}

        {!isLoading &&
          !error &&
          campaigns.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between px-6 py-4 transition hover:bg-base-raised/60"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-signal/12 px-2 py-1 font-mono text-xs font-medium text-signal-soft">
                  {c.trigger_word}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-ink-faint">
                  <Link2 size={12} />
                  <span className="max-w-[220px] truncate">
                    {c.destination_link}
                  </span>
                </div>
              </div>

              <span
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  c.is_active
                    ? "bg-success/12 text-success"
                    : "bg-base-raised text-ink-faint"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    c.is_active ? "bg-success" : "bg-ink-faint"
                  }`}
                />
                {c.is_active ? "Active" : "Paused"}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
