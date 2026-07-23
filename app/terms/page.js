import Link from "next/link";

export const metadata = {
  title: "Terms of Service — DM Trigger Bot",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-base px-6 py-20 text-ink">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="font-mono text-xs text-signal hover:underline">
          ← Back home
        </Link>

        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-muted">
          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">1. Your account</h2>
            <p>
              You're responsible for keeping your login credentials secure and
              for all activity that happens under your account, including
              campaigns run through any Instagram account you connect.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">2. Plans and DM limits</h2>
            <p>
              The Free plan includes a 3-day trial and 100 automated DMs per
              month. Paid plans increase this limit as described on the
              pricing page. Limits reset at the start of each billing cycle
              and unused DMs do not roll over.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">3. Acceptable use</h2>
            <p>
              You agree not to use DM Trigger Bot to send spam, unsolicited
              commercial messages outside the scope of a genuine trigger
              reply, or content that violates Instagram's or Meta's own
              platform policies. Accounts found in violation may be
              suspended.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">4. Third-party platforms</h2>
            <p>
              DM Trigger Bot connects to Instagram via the Meta Graph API.
              Your use of Instagram remains subject to Meta's own terms.
              We are not responsible for changes Meta makes to that API which
              may affect delivery.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">5. Cancellation</h2>
            <p>
              You may cancel or downgrade your plan at any time from your
              dashboard. Cancellation takes effect at the end of the current
              billing cycle.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">6. Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:support@dmtriggerbot.app" className="text-signal hover:underline">
                support@dmtriggerbot.app
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
