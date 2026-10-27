"use server";

import { site } from "@/content/site";
import { consultationTopics, type EnquiryState } from "./topics";

function field(formData: FormData, name: string, max: number) {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export async function sendEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot: real visitors never fill this hidden field.
  if (field(formData, "company", 200)) return { status: "sent" };

  const name = field(formData, "name", 200);
  const email = field(formData, "email", 320);
  const area = field(formData, "area", 200);
  const topic = field(formData, "topic", 100);
  const note = field(formData, "note", 5000);

  if (!name || !email || !topic) {
    return { status: "error", message: "Please add your name, email and a consultation topic." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (!(consultationTopics as readonly string[]).includes(topic)) {
    return { status: "error", message: "Please choose a consultation topic." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Enquiry not sent: RESEND_API_KEY is not configured.");
    return { status: "error", message: `Sorry, the form isn't available right now. Please email ${site.contactEmail}.` };
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Area", area || "—"],
    ["Consultation topic", topic],
    ["Note", note || "—"],
  ];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? `${site.displayName} website <onboarding@resend.dev>`,
      to: [process.env.ENQUIRY_TO ?? site.contactEmail],
      reply_to: email,
      subject: `Enquiry: ${topic} — ${name}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n\n"),
      html: rows
        .map(([k, v]) => `<p><strong>${k}</strong><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`)
        .join(""),
    }),
  });

  if (!response.ok) {
    console.error("Enquiry send failed", response.status, await response.text());
    return { status: "error", message: `Sorry, something went wrong. Please try again or email ${site.contactEmail}.` };
  }

  return { status: "sent" };
}
