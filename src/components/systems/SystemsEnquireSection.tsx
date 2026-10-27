import Link from "next/link";

export function SystemsEnquireSection() {
  return (
    <section className="veld-systems-enquire" aria-label="Enquire">
      <Link className="veld-systems-enquire__button mono" href="/enquire">
        Enquire <span aria-hidden="true">&rarr;</span>
      </Link>
    </section>
  );
}
