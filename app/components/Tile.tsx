// app/components/Tile.tsx
"use client";

import { TileData } from "@/app/lib/tileData";

type Props = {
  tile: TileData;
  size?: number;
};

export default function Tile({ tile, size = 48 }: Props) {
  const W = size;
  const H = Math.round(size * (66 / 48));
  const scale = size / 48;

  return (
    <svg
      width={W}
      height={H}
      viewBox="0 0 48 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 側面（立体感） */}
      <rect x="3" y="5" width="44" height="60" rx="5"
        fill={tile.dora ? "#c09060" : "#c4a055"} />
      <rect x="41" y="5" width="5" height="55" rx="2"
        fill={tile.dora ? "#a07040" : "#a88840"} />
      <rect x="3" y="57" width="44" height="5" rx="2"
        fill={tile.dora ? "#906030" : "#907030"} />

      {/* 本体 */}
      <rect x="2" y="2" width="41" height="57" rx="4"
        fill={tile.dora ? "#fff0f0" : "#faf8f3"}
        stroke={tile.dora ? "#d4a090" : "#c0a870"}
        strokeWidth="0.7" />

      {/* ハイライト */}
      <rect x="4" y="3" width="28" height="2" rx="1"
        fill="rgba(255,255,255,0.75)" />
      <rect x="3" y="4" width="2" height="50" rx="1"
        fill="rgba(255,255,255,0.45)" />

      {/* 内枠 */}
      <rect x="5" y="5" width="34" height="50" rx="2"
        fill="none"
        stroke="rgba(160,130,70,0.3)"
        strokeWidth="0.5" />

      {/* 柄 */}
      {tile.suit === "man" && <ManzuFace num={tile.num} dora={tile.dora} />}
      {tile.suit === "pin" && <PinzuFace num={tile.num} dora={tile.dora} />}
      {tile.suit === "sou" && <SouzuFace num={tile.num} dora={tile.dora} />}
      {tile.suit === "ji"  && <JihaiFace label={tile.label} />}
    </svg>
  );
}

// ── 萬子 ──
const KANJI = ["一","二","三","四","伍","六","七","八","九"];

function ManzuFace({ num, dora }: { num: number; dora: boolean }) {
  const numColor = dora ? "#cc0000" : (num === 5 ? "#cc0000" : "#111111");
  return (
    <>
      <text x="21" y="37" fontSize="19" fill={numColor}
        textAnchor="middle" fontWeight="bold"
        fontFamily="'Hiragino Mincho ProN','Yu Mincho','MS Mincho',serif">
        {KANJI[num - 1]}
      </text>
      <text x="21" y="50" fontSize="10" fill={dora ? "#cc0000" : "#111111"}
        textAnchor="middle" fontWeight="bold"
        fontFamily="'Hiragino Mincho ProN','Yu Mincho','MS Mincho',serif">
        萬
      </text>
      {dora && (
        <text x="35" y="13" fontSize="7" fill="#cc0000"
          textAnchor="middle" fontWeight="bold">⑤</text>
      )}
    </>
  );
}

// ── 筒子 ──
const PIN_POS: Record<number, [number, number][]> = {
  1: [[20,30]],
  2: [[20,21],[20,39]],
  3: [[20,18],[20,30],[20,42]],
  4: [[14,22],[26,22],[14,40],[26,40]],
  5: [[20,16],[14,29],[26,29],[14,43],[26,43]],
  6: [[14,18],[26,18],[14,30],[26,30],[14,42],[26,42]],
  7: [[20,14],[14,26],[26,26],[14,36],[26,36],[14,46],[26,46]],
  8: [[14,16],[26,16],[14,26],[26,26],[14,36],[26,36],[14,46],[26,46]],
  9: [[13,15],[20,15],[27,15],[13,27],[20,27],[27,27],[13,39],[20,39],[27,39]],
};

function PinzuFace({ num, dora }: { num: number; dora: boolean }) {
  const outer = dora ? "#cc2200" : "#1a1a6a";
  const inner = dora ? "#ff8060" : "#4444cc";
  const center = dora ? "#ff4030" : "#cc0000";
  return (
    <>
      {(PIN_POS[num] ?? []).map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="7"  fill={outer} />
          <circle cx={cx} cy={cy} r="5"  fill="#f0ece0" />
          <circle cx={cx} cy={cy} r="3"  fill={inner} />
          <circle cx={cx} cy={cy} r="1.5" fill={center} />
        </g>
      ))}
      {dora && (
        <text x="35" y="13" fontSize="7" fill="#cc0000"
          textAnchor="middle" fontWeight="bold">⑤</text>
      )}
    </>
  );
}

// ── 索子 ──
const SOU_LAYOUT: Record<number, number[]> = {
  2: [1, 1],
  3: [1, 1, 1],
  4: [2, 2],
  5: [2, 1, 2],
  6: [2, 2, 2],
  7: [3, 1, 3],
  8: [3, 2, 3],
  9: [3, 3, 3],
};

function Bamboo({ cx, sy, sh, dora }: {
  cx: number; sy: number; sh: number; dora: boolean;
}) {
  const bc = dora ? "#cc2200" : "#1e7a20";
  const bd = dora ? "#991500" : "#0f5214";
  const bh = dora ? "#ff7060" : "#50c050";
  return (
    <g>
      <rect x={cx - 3} y={sy} width="6" height={sh} rx="2"
        fill={bc} stroke={bd} strokeWidth="0.5" />
      <rect x={cx - 4} y={sy + Math.round(sh * 0.3)} width="8" height="2.5"
        rx="1" fill={bd} />
      <rect x={cx - 4} y={sy + Math.round(sh * 0.65)} width="8" height="2.5"
        rx="1" fill={bd} />
      <rect x={cx - 2} y={sy + 2} width="1.5" height={sh - 8}
        rx="1" fill={bh} />
    </g>
  );
}

function Bird({ dora }: { dora: boolean }) {
  const bc = dora ? "#cc0000" : "#1e7a20";
  const bd = dora ? "#991500" : "#0f5214";
  return (
    <g>
      <ellipse cx="20" cy="30" rx="8" ry="6" fill={bc} />
      <circle cx="26" cy="22" r="5" fill={bc} />
      <polygon points="30,20 35,22 30,24" fill="#e8a020" />
      <circle cx="28" cy="21" r="1.2" fill="#fff" />
      <circle cx="28.5" cy="21" r="0.6" fill="#111" />
      <path d="M14,27 Q10,18 18,20 Q14,24 20,25" fill={bd} />
      <path d="M12,30 Q6,28 8,34 Q12,30 14,34" fill={bd} />
      <line x1="18" y1="36" x2="16" y2="43"
        stroke={bd} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="36" x2="24" y2="43"
        stroke={bd} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function SouzuFace({ num, dora }: { num: number; dora: boolean }) {
  if (num === 1) {
    return (
      <>
        <Bird dora={dora} />
        {dora && (
          <text x="35" y="13" fontSize="7" fill="#cc0000"
            textAnchor="middle" fontWeight="bold">⑤</text>
        )}
      </>
    );
  }

  const layout = SOU_LAYOUT[num] ?? [];
  const cols = layout.length;
  const colXs = cols === 1 ? [20] : cols === 2 ? [15, 28] : [11, 20, 29];
  const maxRows = Math.max(...layout);
  const stickH = Math.min(22, Math.floor(48 / maxRows) - 3);

  return (
    <>
      {layout.map((rowsInCol, ci) => {
        const cx = colXs[ci];
        const colTotalH = rowsInCol * stickH + (rowsInCol - 1) * 3;
        const colStartY = Math.round((66 - 9 - colTotalH) / 2) + 2;
        return Array.from({ length: rowsInCol }, (_, r) => (
          <Bamboo
            key={`${ci}-${r}`}
            cx={cx}
            sy={colStartY + r * (stickH + 3)}
            sh={stickH}
            dora={dora}
          />
        ));
      })}
      {dora && (
        <text x="35" y="13" fontSize="7" fill="#cc0000"
          textAnchor="middle" fontWeight="bold">⑤</text>
      )}
    </>
  );
}

// ── 字牌 ──
const JIHAI_COLOR: Record<string, string> = {
  東: "#111", 南: "#111", 西: "#111", 北: "#111",
  發: "#1a7a1a", 中: "#cc0000",
};

function JihaiFace({ label }: { label: string }) {
  if (label === "白") return null; // 白は何も描かない
  return (
    <text x="21" y="38" fontSize="21" fill={JIHAI_COLOR[label] ?? "#111"}
      textAnchor="middle" fontWeight="bold"
      fontFamily="'Hiragino Mincho ProN','Yu Mincho','MS Mincho',serif">
      {label}
    </text>
  );
}
