import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — DM Trigger Bot",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-base px-6 py-20 text-ink">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="font-mono text-xs text-signal hover:underline">
          ← Back home
        </Link>

        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-muted">
          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">1. Information we collect</h2>
            <p>
              When you create an account, we collect your email address and a
              hashed password via our authentication provider. When you connect
              an Instagram account, we store the Instagram Business Account ID
              and an access token issued by Meta, used solely to send the
              automated replies you configure.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">2. How we use your information</h2>
            <p>
              We use your data to operate your account, run the trigger
              campaigns you create, enforce your plan's monthly DM limit, and
              show you delivery analytics. We do not sell your data to third
              parties.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">3. Instagram / Meta data</h2>
            <p>
              Access tokens obtained through Instagram/Facebook Login are
              stored securely and used only to send messages on behalf of the
              account you explicitly connected. You can disconnect your
              Instagram account at any time from your dashboard, which
              deletes the stored token.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">4. Data retention</h2>
            <p>
              We retain account and campaign data for as long as your account
              is active. You may request deletion of your account and all
              associated data at any time by contacting support.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">5. Contact</h2>
            <p>
              Questions about this policy can be sent to{" "}
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
