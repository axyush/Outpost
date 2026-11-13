"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getActivePromptUsage() {
  const { userId, orgId, has } = await auth();
  if (!userId) return null;

  const ownerId = orgId ?? userId;

  // Count prompts used this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const used = await prisma.agentPrompt.count({
    where: {
      ownerId,
      createdAt: {
        gte: startOfMonth,
      },
    },
  });

  // Check if paid or get limit
  const isPaid = Boolean(has?.({ plan: "pro" })); // or your specific clerk plan/permission check
  const limit = isPaid ? 500 : 20;

  return { used, limit, isPaid };
}