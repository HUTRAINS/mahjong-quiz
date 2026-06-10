// 待ち牌の問題データの「型」を定義する
// TypeScriptでは型を定義することで、データの形を強制できる
export type Difficulty = "beginner" | "intermediate" | "advanced";

export type WaitingTileQuestion = {
  id: number;
  tiles: string[];      // 手牌（例: ["1m", "2m", "3m"]）
  answer: string[];     // 正解の待ち牌
  difficulty: Difficulty;
  explanation: string;  // 解説文
};

// 問題データの配列
// export をつけることで他のファイルからこのデータを使えるようになる
export const waitingTileQuestions: WaitingTileQuestion[] = [
  {
    id: 1,
    tiles: ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "1p", "1p", "1p", "5s", "6s"],
    answer: ["4s", "7s"],
    difficulty: "beginner",
    explanation: "両面待ち：5s-6sに対して4sと7sが待ち牌",
  },
  {
    id: 2,
    tiles: ["2m", "3m", "4m", "5m", "6m", "7m", "2p", "3p", "4p", "6p", "7p", "8p", "5s"],
    answer: ["5s"],
    difficulty: "beginner",
    explanation: "単騎待ち：5sが雀頭として1枚だけ待っている",
  },
  {
    id: 3,
    tiles: ["1m", "9m", "1p", "9p", "1s", "9s", "1z", "2z", "3z", "4z", "5z", "6z", "7z"],
    answer: ["1m", "9m", "1p", "9p", "1s", "9s", "1z", "2z", "3z", "4z", "5z", "6z", "7z"],
    difficulty: "advanced",
    explanation: "国士無双：13種の么九牌すべてが待ち牌",
  },
];
