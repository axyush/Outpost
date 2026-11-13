export const landingCopy = {
  hero: {
    eyebrow: "Early access",
    headline: {
      before: "An",
      accent: "outpost",
      after: "for whatever you're building",
    },
    subtitle:
      "A shared workspace where AI agents help you think, build, and make progress alongside your team.",
    primaryAction: "Start building free",
    secondaryAction: "See how it works",
  },
  audience: {
    label: "A workspace for",
    groups: [
      "Product teams",
      "Founders",
      "Solo builders",
      "Agencies",
      "Consultants",
    ],
  },
  features: {
    eyebrow: "One connected workspace",
    heading: "One agent, one workspace, your whole team",
    rows: [
      {
        id: "canvas",
        icon: "canvas",
        title: "Canvas",
        description:
          "An infinite whiteboard where the agent draws flowcharts, ERDs, architecture diagrams and org charts shape by shape, and edits them in place when you ask.",
        bullets: [
          "Flowcharts, ERDs, architecture and org charts",
          "Built shape by shape, right on the canvas",
          "Ask for changes and the agent edits in place",
        ],
        mock: {
          title: "Checkout flow",
          nodes: ["Cart", "Payment", "Confirm"],
          branch: "Payment failed",
        },
      },
      {
        id: "docs",
        icon: "docs",
        title: "Docs",
        description:
          "A block editor where the agent turns a diagram into a written spec, and rewrites or summarizes sections on command.",
        bullets: [
          "Turn a diagram into a written spec",
          "Rewrite any section on command",
          "Summarize the details that matter",
        ],
        mock: {
          title: "Checkout — product spec",
          section: "Overview",
          paragraph:
            "A fast, reliable checkout helps customers complete their purchase with confidence.",
          subheading: "Payment and confirmation",
        },
      },
      {
        id: "team-board",
        icon: "team-board",
        title: "Team board",
        description:
          "A kanban board of every workspace in your org, with live cursors so teammates can jump in together.",
        bullets: [
          "Every workspace in your organization",
          "Live cursors show who’s working with you",
          "Jump in and move work forward together",
        ],
        mock: {
          columns: [
            { title: "Up next", cards: ["Map onboarding", "Review API"] },
            { title: "In progress", cards: ["Checkout flow", "Write spec"] },
            { title: "Done", cards: ["Team kickoff"] },
          ],
        },
      },
    ],
  },
  howItWorks: {
    eyebrow: "A simple way to get there",
    heading: "From first thought to finished work",
    steps: [
      {
        title: "Describe it",
        description:
          "Tell the agent what you’re thinking, planning, or trying to figure out.",
      },
      {
        title: "Watch the agent draw",
        description:
          "See your ideas take shape on a shared canvas, one clear step at a time.",
      },
      {
        title: "Keep iterating together",
        description:
          "Refine the work with your agent and teammates until it’s ready to move forward.",
      },
    ],
  },
  pricing: {
    eyebrow: "Straightforward plans",
    heading: "Room to build, at every stage",
    placeholder: "Pricing is taking shape. Check back soon.",
  },
  closing: {
    eyebrow: "Your next idea has a place to land",
    heading: "Ready to see where it goes?",
    action: "Start building free",
  },
  footer: "Made with 💖 by Ayush",
} as const;
