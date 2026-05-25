export default function Home() {
  return (
    <main className="min-h-screen bg-green-900 text-white flex flex-col items-center justify-center p-8">
      
      {/* ヘッダー */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">🀄 麻雀クイズ道場</h1>
        <p className="text-green-200 text-xl">
          点棒計算・待ち牌を学んでレベルアップ！
        </p>
      </div>

      {/* クイズメニュー */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        
        {/* 点棒計算クイズ */}
        <div className="bg-green-800 border border-green-600 rounded-2xl p-6 hover:bg-green-600 cursor-pointer transition">
          <div className="text-4xl mb-3">💰</div>
          <h2 className="text-2xl font-bold mb-2">点棒計算</h2>
          <p className="text-green-200 text-sm">
            符・翻数から点数を計算する練習。
            初心者から上級者まで対応。
          </p>
          <div className="mt-4 text-green-400 text-sm font-medium">
            準備中 →
          </div>
        </div>

        {/* 待ち牌クイズ */}
        <div className="bg-green-800 border border-green-600 rounded-2xl p-6 hover:bg-green-600 cursor-pointer transition">
          <div className="text-4xl mb-3">🎯</div>
          <h2 className="text-2xl font-bold mb-2">待ち牌クイズ</h2>
          <p className="text-green-200 text-sm">
            テンパイの形から待ち牌を当てよう。
            両面・嵌張・単騎など全種類対応。
          </p>
          <div className="mt-4 text-green-400 text-sm font-medium">
            準備中 →
          </div>
        </div>

      </div>

      {/* フッター */}
      <p className="mt-12 text-green-600 text-sm">
        麻雀クイズ道場 — 副業エンジニアへの道
      </p>

    </main>
  );
}