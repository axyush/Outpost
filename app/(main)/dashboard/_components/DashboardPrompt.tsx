"use client";

import { createWorkspace } from "@/actions/workspace";
import { Button } from "@/components/ui/button";
import { useUpgradeDialog } from "@/components/UpgradeDialog";
import { useFetch } from "@/Hooks/use-fetch";
import { UPGRADE_REASONS } from "@/lib/plan-limits";
import { submitOnEnter } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const MAX_NAME_LENGTH = 48;

const EXAMPLE_PROMPTS = [
  "Design a blog database and document each table",
  "Map out a user onboarding flow",
  "Plan the architecture for a chat app",
];

function nameFromPrompt(prompt: string) {
  const firstLine = prompt.trim().split("\n")[0];
  const name =
    firstLine.length <= MAX_NAME_LENGTH
      ? firstLine
      : firstLine.slice(0, MAX_NAME_LENGTH).replace(/\s+\S*$/, "");
  const clean = name.replace(/[\s.,:;!?-]+$/, "");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

export function DashboardPrompt() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const { fn: createWorkspaceFn, loading } = useFetch(createWorkspace);
  const openUpgrade = useUpgradeDialog();
  const busy = loading ?? false;

  const handleSubmit = async () => {
    const trimmed = prompt.trim();
    if (!trimmed || busy) return;

    const result = await createWorkspaceFn(nameFromPrompt(trimmed), trimmed);
    if (!result) return;
    if ("limit" in result) return openUpgrade(UPGRADE_REASONS[result.limit]);
    toast.success("Workspace Created!");
    router.push(
      `/workspace/${result.workspace.id}?prompt=${encodeURIComponent(trimmed)}`,
    );
  };

  return (
    <section className="topo-bg mx-auto mb-16 w-full max-w-5xl px-6 py-14 text-center">
      <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
        What are we planning today?
      </h2>
      <p className="mt-3 text-base text-muted-foreground md:text-lg">
        Describe it, and the agent drafts the doc and the canvas for you.
      </p>

      <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-white/12 bg-card/80 p-4 text-left shadow-2xl shadow-black/40 backdrop-blur transition focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={submitOnEnter(handleSubmit)}
          placeholder="e.g. Design the database for a food delivery app and document it"
          rows={3}
          disabled={busy}
          autoFocus
          className="field-sizing-content max-h-64 min-h-20 w-full resize-none bg-transparent px-2 pt-1 text-base leading-6 outline-none placeholder:text-muted-foreground/70 md:text-lg"
        />

        <div className="mt-2 flex items-center justify-between gap-2 pl-2">
          <span className="text-xs text-muted-foreground/70">
            Shift + Enter for a new line
          </span>

          <div className="flex items-center gap-1.5">
            <Button
              size="icon"
              onClick={handleSubmit}
              disabled={!prompt.trim() || busy}
              aria-label="Create workspace"
              className="size-9 rounded-full shadow-lg shadow-primary/25"
            >
              <ArrowUp className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2.5">
        {EXAMPLE_PROMPTS.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setPrompt(example)}
            disabled={busy}
            className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground md:text-sm"
          >
            {example}
          </button>
        ))}
      </div>
    </section>
  );
}
