type Vec = [number, number, number];

type Paint = {
  top: string;
  front: string;
  side: string;
  stroke: string;
  strokeWidth: number;
};

type Face = {
  points: Vec[];
  fill: string;
  stroke: string;
  strokeWidth: number;
  depth: number;
  lines: Vec[][];
  lineStroke: string;
  lineWidth: number;
};

export type ExplodedPath = {
  d: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
  lines: { d: string; stroke: string; width: number }[];
};

export type ExplodedCallout = {
  id: string;
  title: string;
  detail: string;
  anchor: [number, number];
  elbow: [number, number];
  label: [number, number];
};

export type ExplodedPlate = {
  viewBox: string;
  guides: { d: string }[];
  faces: ExplodedPath[];
  callouts: ExplodedCallout[];
};

const FOCAL = 860;

const L = 300;
const D = 188;
const WALL = 108;
const RISE = 68;
const POST = 13;
const STUD = 7.5;
const PLATE_H = 8;
const PLATE_T = 10;
const SILL_H = 11;
const PAD = 22;
const PAD_H = 7;
const GAP = 56;

const zPad = 0;
const zSill = PAD_H + GAP + 48;
const zWall = zSill + SILL_H + GAP;
const zPlate = zWall + WALL;
const zWallTop = zPlate + PLATE_H;
const zRoof = zWallTop + GAP;
const zRidge = zRoof + RISE;
const SOLAR_LIFT = 48;

const wood: Paint = {
  top: "#efd7b4",
  front: "#e0c094",
  side: "#cda774",
  stroke: "#5c4634",
  strokeWidth: 1.05,
};

const concrete: Paint = {
  top: "#e6e6e6",
  front: "#d0d0d0",
  side: "#bdbdbd",
  stroke: "#6a6a6a",
  strokeWidth: 1,
};

const slab: Paint = {
  top: "#f7f7f7",
  front: "#ececec",
  side: "#e2e2e2",
  stroke: "#b9b9b9",
  strokeWidth: 0.9,
};

const framePaint: Paint = {
  top: "#f6f0e6",
  front: "#efe6d8",
  side: "#e4d9c8",
  stroke: "#5c4634",
  strokeWidth: 0.9,
};

function sub(a: Vec, b: Vec): Vec {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(u: Vec, v: Vec): Vec {
  return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
}

function dot(a: Vec, b: Vec): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function faceDepth(pts: Vec[]): number {
  let x = 0;
  let y = 0;
  let z = 0;
  for (const p of pts) {
    x += p[0];
    y += p[1];
    z += p[2];
  }
  const n = pts.length;
  const dx = x / n - eye[0];
  const dy = y / n - eye[1];
  const dz = z / n - eye[2];
  return dx * dx + dy * dy + dz * dz;
}

function shade(n: Vec, paint: Paint): string {
  const len = Math.hypot(n[0], n[1], n[2]) || 1;
  const x = n[0] / len;
  const y = n[1] / len;
  const z = n[2] / len;
  if (z > 0.45) return paint.top;
  if (y < -0.35) return paint.front;
  if (x < -0.35) return paint.side;
  return paint.front;
}

function normalize(v: Vec): Vec {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

const target: Vec = [150, 100, 260];
const eye: Vec = [-190, -110, 730];
const forward = normalize([target[0] - eye[0], target[1] - eye[1], target[2] - eye[2]]);
const right = normalize(cross(forward, [0, 0, 1]));
const camUp = normalize(cross(right, forward));

function project(p: Vec): [number, number] {
  const rel = sub(p, eye);
  const depth = Math.max(dot(rel, forward), 80);
  const scale = FOCAL / depth;
  return [dot(rel, right) * scale, -dot(rel, camUp) * scale];
}

function buildPlate(): ExplodedPlate {
  const faces: Face[] = [];

  function addFace(
    pts: Vec[],
    paint: Paint,
    fill?: string,
    lines: Vec[][] = [],
    lineStroke = "rgba(255,255,255,0.55)",
    lineWidth = 0.55,
    depthBias = 0,
  ) {
    const n = cross(sub(pts[1], pts[0]), sub(pts[2], pts[0]));
    const mid: Vec = [0, 0, 0];
    for (const p of pts) {
      mid[0] += p[0];
      mid[1] += p[1];
      mid[2] += p[2];
    }
    mid[0] /= pts.length;
    mid[1] /= pts.length;
    mid[2] /= pts.length;
    if (dot(n, sub(eye, mid)) <= 0) return;
    faces.push({
      points: pts,
      fill: fill ?? shade(n, paint),
      stroke: paint.stroke,
      strokeWidth: paint.strokeWidth,
      depth: faceDepth(pts) + depthBias,
      lines,
      lineStroke,
      lineWidth,
    });
  }

  function addBox(x: number, y: number, z: number, w: number, d: number, h: number, paint: Paint) {
    addFace(
      [
        [x, y, z + h],
        [x + w, y, z + h],
        [x + w, y + d, z + h],
        [x, y + d, z + h],
      ],
      paint,
    );
    addFace(
      [
        [x, y, z],
        [x + w, y, z],
        [x + w, y, z + h],
        [x, y, z + h],
      ],
      paint,
    );
    addFace(
      [
        [x, y, z],
        [x, y, z + h],
        [x, y + d, z + h],
        [x, y + d, z],
      ],
      paint,
    );
    addFace(
      [
        [x + w, y, z],
        [x + w, y + d, z],
        [x + w, y + d, z + h],
        [x + w, y, z + h],
      ],
      paint,
    );
    addFace(
      [
        [x, y + d, z],
        [x, y + d, z + h],
        [x + w, y + d, z + h],
        [x + w, y + d, z],
      ],
      paint,
    );
    addFace(
      [
        [x, y, z],
        [x, y + d, z],
        [x + w, y + d, z],
        [x + w, y, z],
      ],
      paint,
    );
  }

  function addBeam(a: Vec, b: Vec, thickness: number, paint: Paint) {
    const dir = sub(b, a);
    const len = Math.hypot(dir[0], dir[1], dir[2]) || 1;
    const helper: Vec = Math.abs(dir[2]) / len > 0.82 ? [1, 0, 0] : [0, 0, 1];
    let p = cross(dir, helper);
    const plen = Math.hypot(p[0], p[1], p[2]) || 1;
    p = [p[0] / plen, p[1] / plen, p[2] / plen];
    let q = cross(dir, p);
    const qlen = Math.hypot(q[0], q[1], q[2]) || 1;
    q = [q[0] / qlen, q[1] / qlen, q[2] / qlen];
    const t = thickness / 2;
    const corner = (end: Vec, su: number, sv: number): Vec => [
      end[0] + (su * p[0] + sv * q[0]) * t,
      end[1] + (su * p[1] + sv * q[1]) * t,
      end[2] + (su * p[2] + sv * q[2]) * t,
    ];
    const ring = (end: Vec): [Vec, Vec, Vec, Vec] => [
      corner(end, 1, 1),
      corner(end, -1, 1),
      corner(end, -1, -1),
      corner(end, 1, -1),
    ];
    const A = ring(a);
    const B = ring(b);
    for (let i = 0; i < 4; i += 1) {
      const j = (i + 1) % 4;
      addFace([A[i], A[j], B[j], B[i]], paint);
    }
    addFace([A[0], A[3], A[2], A[1]], paint);
    addFace([B[0], B[1], B[2], B[3]], paint);
  }

  function stud(x: number, y: number, w: number, d: number) {
    addBox(x, y, zWall, w, d, WALL, wood);
  }

  const half = D / 2;
  const slopeLen = Math.hypot(RISE, half);

  function onFront(x: number, y: number, normal: number, lift: number): Vec {
    const z = zRoof + (y / half) * RISE + lift;
    return [x, y + (-RISE / slopeLen) * normal, z + (half / slopeLen) * normal];
  }

  function onBack(x: number, y: number, normal: number, lift: number): Vec {
    const z = zRidge - ((y - half) / half) * RISE + lift;
    return [x, y + (RISE / slopeLen) * normal, z + (half / slopeLen) * normal];
  }

  function addPanel(x0: number, x1: number, y0: number, y1: number, slope: "front" | "back") {
    const at = slope === "front" ? onFront : onBack;
    const lift = SOLAR_LIFT;
    const thick = 3.2;
    const margin = 4.5;
    const outer = [
      at(x0, y0, 0, lift),
      at(x1, y0, 0, lift),
      at(x1, y1, 0, lift),
      at(x0, y1, 0, lift),
    ] as const;
    const under = [
      at(x0, y0, -thick, lift),
      at(x1, y0, -thick, lift),
      at(x1, y1, -thick, lift),
      at(x0, y1, -thick, lift),
    ] as const;
    addFace([outer[0], outer[1], outer[2], outer[3]], framePaint, "#f4efe4");
    addFace([under[0], under[3], under[2], under[1]], framePaint, "#d9d0c2");
    addFace([outer[0], outer[1], under[1], under[0]], framePaint, "#e7dccb");
    addFace([outer[1], outer[2], under[2], under[1]], framePaint, "#e7dccb");
    addFace([outer[2], outer[3], under[3], under[2]], framePaint, "#e7dccb");
    addFace([outer[3], outer[0], under[0], under[3]], framePaint, "#e7dccb");

    const cell = [
      at(x0 + margin, y0 + margin, 0.35, lift),
      at(x1 - margin, y0 + margin, 0.35, lift),
      at(x1 - margin, y1 - margin, 0.35, lift),
      at(x0 + margin, y1 - margin, 0.35, lift),
    ] as const;
    const lines: Vec[][] = [];
    const cols = 6;
    const rows = 9;
    for (let c = 1; c < cols; c += 1) {
      const u = c / cols;
      lines.push([
        [
          cell[0][0] + (cell[1][0] - cell[0][0]) * u,
          cell[0][1] + (cell[1][1] - cell[0][1]) * u,
          cell[0][2] + (cell[1][2] - cell[0][2]) * u,
        ],
        [
          cell[3][0] + (cell[2][0] - cell[3][0]) * u,
          cell[3][1] + (cell[2][1] - cell[3][1]) * u,
          cell[3][2] + (cell[2][2] - cell[3][2]) * u,
        ],
      ]);
    }
    for (let r = 1; r < rows; r += 1) {
      const v = r / rows;
      lines.push([
        [
          cell[0][0] + (cell[3][0] - cell[0][0]) * v,
          cell[0][1] + (cell[3][1] - cell[0][1]) * v,
          cell[0][2] + (cell[3][2] - cell[0][2]) * v,
        ],
        [
          cell[1][0] + (cell[2][0] - cell[1][0]) * v,
          cell[1][1] + (cell[2][1] - cell[1][1]) * v,
          cell[1][2] + (cell[2][2] - cell[1][2]) * v,
        ],
      ]);
    }
    addFace(
      [cell[0], cell[1], cell[2], cell[3]],
      { ...framePaint, stroke: "rgba(214,228,255,0.7)", strokeWidth: 0.45 },
      slope === "front" ? "#1a3d78" : "#16356c",
      lines,
      "rgba(214,228,255,0.55)",
      0.55,
      -14,
    );
  }

  function gableBraces(x: number) {
    const base: Vec = [x, D / 2, zRoof + 1];
    const crown: Vec = [x, D / 2, zRidge - 5];
    addBeam(base, crown, 5, wood);
    addBeam([x, 18, zRoof + 3], [x, D / 2 - 4, zRoof + RISE * 0.55], 4.2, wood);
    addBeam([x, D - 18, zRoof + 3], [x, D / 2 + 4, zRoof + RISE * 0.55], 4.2, wood);
  }

  // Pads
  const padCenters: Array<[number, number]> = [
    [POST / 2, POST / 2],
    [L - POST / 2, POST / 2],
    [POST / 2, D - POST / 2],
    [L - POST / 2, D - POST / 2],
  ];
  for (const [cx, cy] of padCenters) {
    addBox(cx - PAD / 2, cy - PAD / 2, zPad, PAD, PAD, PAD_H, concrete);
  }

  // Sill and floor
  addBox(POST, POST, zSill, L - POST * 2, D - POST * 2, 4, slab);
  addBox(0, 0, zSill, L, PLATE_T, SILL_H, wood);
  addBox(0, D - PLATE_T, zSill, L, PLATE_T, SILL_H, wood);
  addBox(0, PLATE_T, zSill, PLATE_T, D - PLATE_T * 2, SILL_H, wood);
  addBox(L - PLATE_T, PLATE_T, zSill, PLATE_T, D - PLATE_T * 2, SILL_H, wood);

  // Wall frame
  stud(0, 0, POST, POST);
  stud(L - POST, 0, POST, POST);
  stud(0, D - POST, POST, POST);
  stud(L - POST, D - POST, POST, POST);

  const baysX = 6;
  const innerL = L - POST * 2;
  for (let i = 1; i < baysX; i += 1) {
    const cx = POST + (innerL * i) / baysX - STUD / 2;
    stud(cx, 0, STUD, POST);
    stud(cx, D - POST, STUD, POST);
  }

  const baysY = 4;
  const innerD = D - POST * 2;
  for (let i = 1; i < baysY; i += 1) {
    const cy = POST + (innerD * i) / baysY - STUD / 2;
    stud(0, cy, POST, STUD);
    stud(L - POST, cy, POST, STUD);
  }

  addBox(0, 0, zPlate, L, PLATE_T, PLATE_H, wood);
  addBox(0, D - PLATE_T, zPlate, L, PLATE_T, PLATE_H, wood);
  addBox(0, PLATE_T, zPlate, PLATE_T, D - PLATE_T * 2, PLATE_H, wood);
  addBox(L - PLATE_T, PLATE_T, zPlate, PLATE_T, D - PLATE_T * 2, PLATE_H, wood);

  // Roof frame
  const raftT = 7;
  const xStart = 6;
  const xEnd = L - 6;
  const panelCount = 4;
  const pitch = (xEnd - xStart) / panelCount;
  const rafterXs = Array.from({ length: panelCount + 1 }, (_, i) => xStart + i * pitch);
  const overhang = 12;

  for (const x of rafterXs) {
    const thick = x === rafterXs[0] || x === rafterXs[rafterXs.length - 1] ? 9 : raftT;
    addBeam([x, -overhang, zRoof - (overhang / half) * RISE], [x, half - 6, zRoof + ((half - 6) / half) * RISE], thick, wood);
    addBeam([x, half + 6, zRidge - (6 / half) * RISE], [x, D + overhang, zRoof - (overhang / half) * RISE], thick, wood);
  }

  addBeam([xStart, half, zRidge], [xEnd, half, zRidge], 9, wood);
  gableBraces(rafterXs[0]);
  gableBraces(rafterXs[rafterXs.length - 1]);

  const yFront0 = 10;
  const yFront1 = half - 9;
  const yBack0 = half + 9;
  const yBack1 = D - 10;
  for (let i = 0; i < panelCount; i += 1) {
    const a = rafterXs[i] + raftT / 2 + 3.5;
    const b = rafterXs[i + 1] - raftT / 2 - 3.5;
    addPanel(a, b, yFront0, yFront1, "front");
    addPanel(a, b, yBack0, yBack1, "back");
  }

  const guidePairs: Array<[Vec, Vec]> = [];
  const corners: Array<[number, number]> = [
    [0, 0],
    [L, 0],
    [0, D],
    [L, D],
  ];
  for (const [x, y] of corners) {
    guidePairs.push([
      [x, y, zPad + PAD_H],
      [x, y, zSill],
    ]);
    guidePairs.push([
      [x, y, zSill + SILL_H],
      [x, y, zWall],
    ]);
    guidePairs.push([
      [x, y, zWallTop],
      [x, y, zRoof],
    ]);
  }

  const solarGuides: Array<[number, number, "front" | "back"]> = [
    [rafterXs[0], yFront0, "front"],
    [rafterXs[rafterXs.length - 1], yFront0, "front"],
    [rafterXs[0], yBack1, "back"],
    [rafterXs[rafterXs.length - 1], yBack1, "back"],
  ];
  for (const [x, y, slope] of solarGuides) {
    const roof = slope === "front" ? onFront(x, y, 0, 0) : onBack(x, y, 0, 0);
    const panel = slope === "front" ? onFront(x, y, -3.2, SOLAR_LIFT) : onBack(x, y, -3.2, SOLAR_LIFT);
    guidePairs.push([roof, panel]);
  }

  faces.sort((a, b) => b.depth - a.depth);

  function poly(pts: Vec[]): string {
    return pts
      .map((p, i) => {
        const [sx, sy] = project(p);
        return `${i === 0 ? "M" : "L"}${sx.toFixed(2)} ${sy.toFixed(2)}`;
      })
      .join(" ");
  }

  const projectedFaces: ExplodedPath[] = faces.map((face) => ({
    d: `${poly(face.points)} Z`,
    fill: face.fill,
    stroke: face.stroke,
    strokeWidth: face.strokeWidth,
    lines: face.lines.map((line) => ({
      d: poly(line),
      stroke: face.lineStroke,
      width: face.lineWidth,
    })),
  }));

  const guides = guidePairs.map(([a, b]) => ({ d: poly([a, b]) }));

  const calloutSpecs: Array<{
    id: string;
    title: string;
    detail: string;
    at: Vec;
    dx: number;
    dy: number;
  }> = [
    {
      id: "01",
      title: "photovoltaic array",
      detail: "eight modules",
      at: onFront(xEnd - 16, (yFront0 + yFront1) / 2, 0, SOLAR_LIFT),
      dx: 150,
      dy: -48,
    },
    {
      id: "02",
      title: "roof frame",
      detail: "ridge, rafters, braces",
      at: [xEnd, half, zRidge - 10],
      dx: 168,
      dy: 46,
    },
    {
      id: "03",
      title: "wall frame",
      detail: "posts, studs, plates",
      at: [L * 0.55, 0, zWall + WALL * 0.42],
      dx: 220,
      dy: 70,
    },
    {
      id: "04",
      title: "sill and floor",
      detail: "base ring",
      at: [L * 0.28, 0, zSill + SILL_H / 2],
      dx: -188,
      dy: 8,
    },
    {
      id: "05",
      title: "pads",
      detail: "four corners",
      at: [POST / 2, POST / 2, PAD_H / 2],
      dx: -176,
      dy: 42,
    },
  ];

  const callouts: ExplodedCallout[] = calloutSpecs.map((spec) => {
    const anchor = project(spec.at);
    const label: [number, number] = [anchor[0] + spec.dx, anchor[1] + spec.dy];
    const elbow: [number, number] = [label[0] + (spec.dx < 0 ? 18 : -18), label[1]];
    return {
      id: spec.id,
      title: spec.title,
      detail: spec.detail,
      anchor,
      elbow,
      label,
    };
  });

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const touch = (x: number, y: number) => {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  };

  for (const face of faces) {
    for (const p of face.points) {
      const [sx, sy] = project(p);
      touch(sx, sy);
    }
  }
  for (const callout of callouts) {
    const dir = callout.label[0] < callout.elbow[0] ? -1 : 1;
    touch(callout.label[0] + dir * 168, callout.label[1] - 16);
    touch(callout.label[0], callout.label[1] + 22);
    touch(callout.anchor[0], callout.anchor[1]);
  }

  const pad = 28;
  const viewBox = `${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${(maxX - minX + pad * 2).toFixed(1)} ${(maxY - minY + pad * 2).toFixed(1)}`;

  return { viewBox, guides, faces: projectedFaces, callouts };
}

export const explodedPlate: ExplodedPlate = buildPlate();
