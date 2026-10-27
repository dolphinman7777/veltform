import { permanentRedirect } from "next/navigation";

// Old address: a permanent (308) redirect passes search ranking to /environments.
export default function ClimatePage() {
  permanentRedirect("/environments");
}
