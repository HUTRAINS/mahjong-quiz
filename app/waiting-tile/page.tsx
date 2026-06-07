// app/waiting-tile/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Tile from "@/app/components/Tile";
import { TileData, drawHand, buildWall, shuffleWall } from "@/app/lib/tileData";

// 正解候補（14枚目＝アガリ牌）を山牌から4枚選ぶ
function makeChoices(hand: TileData[], wall: TileData[]): TileData[] {
  // 簡易的に：山牌の先頭から4枚をシャッフルして選択肢にする
  // ※ 将来的にはアガリ判定ロジックに差し替え予定
  const remaining = wall.filter(
    (t) => !hand.some((h) => h.id === t.id)
  );
  const shuffled = shuffleWall(remaining);
  // 重複idを除いて4枚
  const seen = new Set<string>();
  const choices: TileData[] = [];
  for (const t of shuffled) {
    if (!seen.has(t.id) && choices.length < 4) {
      seen.add(t.id);
      choices.push(t);
    }
  }
  return choices;
}

type Phase = "playing" | "correct" | "wrong";

export default function WaitingTilePage() {
  const [hand, setHand] = useState<TileData[]>([]);
  const [choices, setChoices] = useState<TileData[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("playing");

  // 暫定の正解（choicesの0番目）※将来アガリ判定ロジックに差し替え
  const [answerIndex, setAnswerIndex] = useState(0);

  function newQuestion() {
    const newHand = drawHand();
    const wall = shuffleWall(buildWall());
    const newChoices = makeChoices(newHand, wall);
    setHand(newHand);
    setChoices(newChoices);
    setSelected(null);
    setPhase("playing");
    setAnswerIndex(0); // 暫定：choices[0]が正解
  }

  useEffect(() => {
    newQuestion();
  }, []);

  function handleSelect(tile: TileData, index: number) {
    if (phase !== "playing") return;
    setSelected(tile.id);
    setPhase(index === answerIndex ? "correct" : "wrong");
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      {/* ヘッダー */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
          ← トップに戻る
        </Link>
        <h1 className="text-xl font-bold text-gray-800">待ち牌クイズ</h1>
        <div className="w-16" />
      </div>

      {/* 問題文 */}
      <p className="text-gray-600 text-sm mb-4">
        この手牌のアガリ牌はどれ？
      </p>

      {/* 手牌表示 */}
      <div className="bg-green-800 rounded-xl p-4 mb-8 flex flex-wrap gap-1 justify-center shadow-inner">
        {hand.map((tile, i) => (
          <Tile key={i} tile={tile} size={44} />
        ))}
      </div>

      {/* 選択肢 */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8">
        {choices.map((tile, i) => {
          const isSelected = selected === tile.id;
          const isAnswer = i === answerIndex;

          let borderColor = "border-gray-300";
          if (phase !== "playing") {
            if (isAnswer) borderColor = "border-green-500";
            else if (isSelected) borderColor = "border-red-400";
          }

          return (
            <button
              key={tile.id}
              onClick={() => handleSelect(tile, i)}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 bg-white transition-all ${borderColor} ${
                phase === "playing" ? "hover:border-blue-400 hover:shadow" : ""
              }`}
            >
              <Tile tile={tile} size={40} />
              <span className="text-xs text-gray-600">{tile.label}</span>
            </button>
          );
        })}
      </div>

      {/* 結果表示 */}
      {phase !== "playing" && (
        <div className={`text-center mb-6 px-6 py-3 rounded-xl ${
          phase === "correct"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}>
          <p className="text-lg font-bold">
            {phase === "correct" ? "✓ 正解！" : "✗ 不正解"}
          </p>
          <p className="text-sm mt-1">
            {phase === "correct"
              ? "アガリ牌を当てました！"
              : `正解は「${choices[answerIndex]?.label}」でした`}
          </p>
        </div>
      )}

      {/* 次の問題ボタン */}
      <button
        onClick={newQuestion}
        className="px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 active:scale-95 transition-all"
      >
        {phase === "playing" ? "スキップ" : "次の問題"}
      </button>
    </main>
  );
}
