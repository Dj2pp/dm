"use client";

import { useEffect, useState } from "react";
import CampaignsList from "@/components/dashboard/CampaignsList";
import NewCampaignModal from "@/components/dashboard/NewCampaignModal";
import { fetchCampaigns } from "@/lib/api";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchCampaigns()
      .then(setCampaigns)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  function handleCreated(newCampaign) {
    setCampaigns((prev) => [newCampaign, ...prev]);
  }

  return (
    <div className="px-6 py-8 lg:px-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-ink">Campaigns</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-lg bg-signal px-4 py-2.5 text-sm font-medium text-white hover:bg-signal-soft"
        >
          + New trigger
        </button>
      </div>

      <CampaignsList campaigns={campaigns} isLoading={isLoading} error={error} />

      <NewCampaignModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleCreated}
      />
    </div>
  );
}