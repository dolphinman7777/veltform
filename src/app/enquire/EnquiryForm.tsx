"use client";

import { useActionState } from "react";
import { sendEnquiry } from "./actions";
import { consultationTopics, type EnquiryState } from "./topics";

const initialState: EnquiryState = { status: "idle" };

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);

  if (state.status === "sent") {
    return (
      <div className="veld-enquire-done" role="status">
        <p className="veld-enquire-done__title">Thank you.</p>
        <p className="mono">Your enquiry has been sent. We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form className="veld-enquire-form mono" action={formAction}>
      <label>
        <span>Name</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span>Area</span>
        <input name="area" type="text" placeholder="e.g. Cape Town" autoComplete="address-level2" />
      </label>
      <label>
        <span>Consultation topic</span>
        <select name="topic" required defaultValue="">
          <option value="" disabled>Choose a topic</option>
          {consultationTopics.map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Note</span>
        <textarea name="note" rows={6} />
      </label>
      <label className="veld-enquire-hp" aria-hidden="true">
        <span>Company</span>
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      {state.status === "error" && (
        <p className="veld-enquire-error" role="alert">{state.message}</p>
      )}
      <button className="veld-site-cta" type="submit" disabled={pending}>
        {pending ? "Sending…" : <>Send enquiry &rarr;</>}
      </button>
    </form>
  );
}
