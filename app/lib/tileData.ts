// app/lib/tileData.ts

export type Suit = "man" | "pin" | "sou" | "ji";

export type TileData = {
  id: string;        // 例: "1m", "5m-dora", "chun"
  suit: Suit;
  num: number;       // 字牌は 0
  dora: boolean;
  label: string;     // 表示用の名前
};

// 萬子
const manzu: TileData[] = [1,2,3,4,5,6,7,8,9].map((n) => ({
  id: `${n}m`,
  suit: "man",
  num: n,
  dora: false,
  label: ["一萬","二萬","三萬","四萬","伍萬","六萬","七萬","八萬","九萬"][n-1],
}));

// 筒子
const pinzu: TileData[] = [1,2,3,4,5,6,7,8,9].map((n) => ({
  id: `${n}p`,
  suit: "pin",
  num: n,
  dora: false,
  label: `${n}筒`,
}));

// 索子
const souzu: TileData[] = [1,2,3,4,5,6,7,8,9].map((n) => ({
  id: `${n}s`,
  suit: "sou",
  num: n,
  dora: false,
  label: `${n}索`,
}));

// 字牌
const jihai: TileData[] = [
  { id: "ton",   suit: "ji", num: 0, dora: false, label: "東" },
  { id: "nan",   suit: "ji", num: 0, dora: false, label: "南" },
  { id: "sha",   suit: "ji", num: 0, dora: false, label: "西" },
  { id: "pei",   suit: "ji", num: 0, dora: false, label: "北" },
  { id: "haku",  suit: "ji", num: 0, dora: false, label: "白" },
  { id: "hatsu", suit: "ji", num: 0, dora: false, label: "發" },
  { id: "chun",  suit: "ji", num: 0, dora: false, label: "中" },
];

// 赤ドラ
const doraTiles: TileData[] = [
  { id: "5m-dora", suit: "man", num: 5, dora: true, label: "赤伍萬" },
  { id: "5p-dora", suit: "pin", num: 5, dora: true, label: "赤5筒" },
  { id: "5s-dora", suit: "sou", num: 5, dora: true, label: "赤5索" },
];

// 全牌データ（34種 + 赤ドラ3種）
export const ALL_TILES: TileData[] = [
  ...manzu,
  ...pinzu,
  ...souzu,
  ...jihai,
  ...doraTiles,
];

// 麻雀の山牌（136枚：各牌4枚、赤ドラは5の代替1枚）
export function buildWall(): TileData[] {
  const wall: TileData[] = [];

  ALL_TILES.forEach((tile) => {
    if (tile.dora) {
      // 赤ドラは1枚だけ
      wall.push(tile);
    } else if (tile.suit === "man" && tile.num === 5) {
      // 5萬は通常3枚（赤ドラ1枚と合わせて4枚）
      wall.push(tile, tile, tile);
    } else if (tile.suit === "pin" && tile.num === 5) {
      wall.push(tile, tile, tile);
    } else if (tile.suit === "sou" && tile.num === 5) {
      wall.push(tile, tile, tile);
    } else {
      // それ以外は4枚
      wall.push(tile, tile, tile, tile);
    }
  });

  return wall;
}

// 山牌をシャッフル
export function shuffleWall(wall: TileData[]): TileData[] {
  const arr = [...wall];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// シャッフルした山牌から13枚引いてソートして返す
export function drawHand(): TileData[] {
  const wall = shuffleWall(buildWall());
  const hand = wall.slice(0, 13);
  return sortHand(hand);
}

// 手牌をソート（萬→筒→索→字牌の順、同種は数字順）
export function sortHand(hand: TileData[]): TileData[] {
  const suitOrder: Record<Suit, number> = { man: 0, pin: 1, sou: 2, ji: 3 };
  return [...hand].sort((a, b) => {
    if (suitOrder[a.suit] !== suitOrder[b.suit]) {
      return suitOrder[a.suit] - suitOrder[b.suit];
    }
    return a.num - b.num;
  });
}
