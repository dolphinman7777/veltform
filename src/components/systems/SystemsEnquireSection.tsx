import { site } from "@/content/site";

export function SystemsEnquireSection() {
  return (
    <section className="veld-systems-enquire" aria-label="Enquire">
      <a className="veld-systems-enquire__button mono" href={`mailto:${site.contactEmail}`}>
        Enquire <span aria-hidden="true">&rarr;</span>
      </a>
    </section>
  );
}
