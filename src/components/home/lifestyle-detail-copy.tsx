import type {
  LifestyleDetailListItem,
  LifestyleScenarioDetailCopy,
  LifestyleScenarioListDetail,
} from "@/content/site";

function isListDetail(
  copy: Exclude<LifestyleScenarioDetailCopy, string>,
): copy is LifestyleScenarioListDetail {
  return "items" in copy;
}

function renderListSegments(item: LifestyleDetailListItem) {
  if (typeof item === "string") {
    return item;
  }

  return item.segments.map((segment, segmentIndex) => {
    if (typeof segment === "string") {
      return segment;
    }

    return (
      <a
        key={`${segment.href}-${segmentIndex}`}
        href={segment.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {segment.text}
      </a>
    );
  });
}

export function detailCopyHasContent(copy: LifestyleScenarioDetailCopy): boolean {
  if (typeof copy === "string") {
    return copy.length > 0;
  }

  if (isListDetail(copy)) {
    return (
      Boolean(copy.intro) ||
      (copy.paragraphs?.some((paragraph) => paragraph.length > 0) ?? false) ||
      copy.items.length > 0
    );
  }

  return (
    Boolean(copy.lead) ||
    copy.paragraphs.some((paragraph) => paragraph.length > 0) ||
    Boolean(copy.closing)
  );
}

export function renderDetailCopy(copy: LifestyleScenarioDetailCopy) {
  if (typeof copy === "string") {
    return copy.split(/\n\n+/).map((paragraph, paragraphIndex) => (
      <p key={paragraphIndex}>{paragraph}</p>
    ));
  }

  if (isListDetail(copy)) {
    return (
      <div className="veld-scenario-detail-list">
        {copy.paragraphs?.map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex} className="veld-scenario-detail-list-paragraph">
            {paragraph}
          </p>
        ))}
        {copy.intro ? <p className="veld-scenario-detail-list-intro">{copy.intro}</p> : null}
        {copy.items.length > 0 ? (
          <ul>
            {copy.items.map((item, itemIndex) => (
              <li key={itemIndex}>{renderListSegments(item)}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }

  return (
    <>
      {copy.lead ? (
        <p className="veld-scenario-detail-info-lead">
          <strong>{copy.lead}</strong>
        </p>
      ) : null}
      {copy.paragraphs.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex}>{paragraph}</p>
      ))}
      {copy.closing ? (
        <blockquote className="veld-scenario-detail-closing">
          <p>
            <em>{copy.closing}</em>
          </p>
        </blockquote>
      ) : null}
    </>
  );
}
