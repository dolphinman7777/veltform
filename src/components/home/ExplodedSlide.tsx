import { explodedPlate } from "@/components/home/explodedPlate";
import { site } from "@/content/site";

export function ExplodedSlide() {
  return (
    <section className="exploded-slide" id="structure" aria-labelledby="structure-title">
      <header className="exploded-head mono">
        <span>Structure</span>
        <span className="brand-natural">{site.name}</span>
      </header>

      <div className="exploded-copy">
        <h2 className="exploded-headline mono" id="structure-title">
          the frame, <span className="data-mint">taken apart</span>
        </h2>
        <p className="mono">
          The timber greenhouse above, separated on the vertical axis into pads, sill, wall frame, roof, and the photovoltaic array.
        </p>
      </div>

      <figure className="exploded-plate">
        <svg
          className="exploded-drawing"
          viewBox={explodedPlate.viewBox}
          role="img"
          aria-labelledby="structure-drawing-title"
        >
          <title id="structure-drawing-title">
            Exploded axonometric of the timber greenhouse: pads, sill and floor, wall frame, roof frame, and eight photovoltaic modules
          </title>
          {explodedPlate.guides.map((guide) => (
            <path key={guide.d} className="exploded-guide" d={guide.d} />
          ))}
          {explodedPlate.faces.map((face) => (
            <g key={face.d}>
              <path d={face.d} fill={face.fill} stroke={face.stroke} strokeWidth={face.strokeWidth} />
              {face.lines.map((line) => (
                <path key={line.d} d={line.d} fill="none" stroke={line.stroke} strokeWidth={line.width} />
              ))}
            </g>
          ))}
          {explodedPlate.callouts.map((callout) => {
            const [lx, ly] = callout.label;
            const towardLeft = callout.label[0] < callout.anchor[0];
            const textX = towardLeft ? lx - 16 : lx + 16;
            const anchorText = towardLeft ? "end" : "start";
            return (
              <g key={callout.id} className="exploded-callout">
                <polyline
                  points={`${callout.anchor[0].toFixed(1)},${callout.anchor[1].toFixed(1)} ${callout.elbow[0].toFixed(1)},${callout.elbow[1].toFixed(1)} ${lx.toFixed(1)},${ly.toFixed(1)}`}
                  fill="none"
                />
                <circle cx={lx} cy={ly} r="11" />
                <text x={lx} y={ly + 3.4} textAnchor="middle" fontSize="9">
                  {callout.id}
                </text>
                <text className="exploded-callout-title" x={textX} y={ly - 2} textAnchor={anchorText} fontSize="12">
                  {callout.title}
                </text>
                <text className="exploded-callout-detail" x={textX} y={ly + 12} textAnchor={anchorText} fontSize="10">
                  {callout.detail}
                </text>
              </g>
            );
          })}
        </svg>
        <figcaption className="exploded-caption mono">exploded axonometric · assemblies separated vertically</figcaption>
      </figure>
    </section>
  );
}
