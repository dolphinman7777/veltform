export const consultationTopics = [
  "General",
  "Kitchen Garden",
  "Botanical Library",
  "Living Space",
  "Design support",
  "Retrofitting",
] as const;

export type EnquiryState = {
  status: "idle" | "sent" | "error";
  message?: string;
};
