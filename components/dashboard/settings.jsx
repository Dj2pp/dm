import { createClient } from "@/lib/server";
import ConnectInstagramButton from "@/components/dashboard/ConnectInstagramButton";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="px-6 py-8 lg:px-10">
      <h1 className="mb-6 font-display text-xl font-semibold text-ink">Settings</h1>

      <div className="max-w-md space-y-6">
        <div className="rounded-2xl border border-base-border bg-base-surface p-6">
          <p className="mb-1 text-xs text-ink-faint">Account email</p>
          <p className="text-sm text-ink">{user?.email}</p>
        </div>

        <div className="rounded-2xl border border-base-border bg-base-surface p-6">
          <p className="mb-3 text-xs text-ink-faint">Instagram connection</p>
          <ConnectInstagramButton connected={!!user?.user_metadata?.instagram_account_id} />
        </div>
      </div>
    </div>
  );
}