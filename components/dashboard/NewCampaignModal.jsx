"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { createCampaign } from "@/lib/api";

export default function NewCampaignModal({ open, onClose, onCreated }) {
  const [triggerWord, setTriggerWord] = useState("");
  const [destinationLink, setDestinationLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const campaign = await createCampaign({ triggerWord, destinationLink });
      onCreated(campaign);
      setTriggerWord("");
      setDestinationLink("");
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-base-border bg-base-surface p-6 shadow-glow"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                New trigger
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-ink-faint transition hover:bg-base-raised hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-muted">
                  Trigger word
                </label>
                <input
                  required
                  value={triggerWord}
                  onChange={(e) => setTriggerWord(e.target.value)}
                  placeholder="PRICE"
                  className="w-full rounded-lg border border-base-border bg-base px-3.5 py-2.5 font-mono text-sm text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-muted">
                  Destination link
                </label>
                <input
                  required
                  type="url"
                  value={destinationLink}
                  onChange={(e) => setDestinationLink(e.target.value)}
                  placeholder="https://yourshop.com/pricing"
                  className="w-full rounded-lg border border-base-border bg-base px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none"
                />
              </div>

              {error && <p className="text-xs text-alert">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-signal py-3 text-sm font-medium text-white transition hover:bg-signal-soft disabled:opacity-60"
              >
                {isSubmitting && <Loader2 size={15} className="animate-spin" />}
                {isSubmitting ? "Creating..." : "Create trigger"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
