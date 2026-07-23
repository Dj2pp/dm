import { createClient } from "@/lib/supabaseClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

async function authorizedFetch(path, options = {}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export function fetchCampaigns() {
  return authorizedFetch("/api/campaigns", { method: "GET" });
}

export function fetchAnalytics() {
  return authorizedFetch("/api/analytics", { method: "GET" });
}

export function fetchActivity() {
  return authorizedFetch("/api/activity", { method: "GET" });
}

export function createCampaign({ triggerWord, destinationLink }) {
  return authorizedFetch("/api/campaigns", {
    method: "POST",
    body: JSON.stringify({
      trigger_word: triggerWord,
      destination_link: destinationLink,
    }),
  });
}

export function getInstagramConnectUrl() {
  return authorizedFetch("/api/instagram/oauth/start-url", { method: "GET" });
}