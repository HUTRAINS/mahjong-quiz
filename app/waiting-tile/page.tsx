import Link from "next/link";

export default function WaitingTilePage() {
  return (
    <main className="min-h-screen bg-green-900 text-white flex flex-col items-center justify-center p-8">
      
      {/* 戻るボタン */}
      <div className="w-full max-w-2xl mb-6">
        <Link href="/" className="text-green-400 hover:text-green-200 text-sm transition">
          ← トップに戻る
        </Link>
      </div>

      {/* タイトル */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">🎯 待ち牌クイズ</h1>
        <p className="text-green-200">テンパイの形から待ち牌を当てよう！</p>
      </div>

      {/* クイズエリア（仮） */}
      <div className="bg-green-800 border border-green-600 rounded-2xl p-8 w-full max-w-2xl text-center">
        <p className="text-green-300 text-lg mb-4">問題エリア（近日実装予定）</p>
        <div className="text-5xl mb-6">🀇🀈🀉🀊🀋</div>
        <p className="text-green-200">この手牌の待ち牌はなんでしょう？</p>
      </div>

    </main>
  );
}
