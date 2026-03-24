# Site Builder — 社内向けノーコード・サイトジェネレーター

パーツ（セクション）を選んで組み合わせ、コーポレートサイトやLPをHTML出力するツールです。

## クイックスタート

```bash
# 依存インストール
npm install

# ローカル開発サーバー起動
npm run dev
```

http://localhost:5173/site-builder/ でアクセス

## GitHub Pagesへデプロイ

### 自動デプロイ（推奨）

1. GitHubにリポジトリを作成（例: `site-builder`）
2. `vite.config.js` の `base` をリポジトリ名に合わせる
3. コードをpush
4. GitHub → Settings → Pages → Source: **GitHub Actions** を選択
5. mainにpushするたびに自動デプロイ

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_ORG/site-builder.git
git push -u origin main
```

### 手動デプロイ

```bash
npm run deploy
```

## パーツを追加する

### 方法1: スクショからClaudeでコード化（推奨）

1. 良いサイトのセクションのスクショをClaudeに貼る
2. 以下のプロンプトで依頼:

```
このセクションをサイトビルダーのパーツとしてHTML化してください。

フォーマット:
- ESモジュール: export default { id, name, category, desc, thumb, fields, render }
- render関数: (v, g) => HTML文字列
- v はユーザー入力変数、g はグローバルカラー { primary, accent, bg, bgLight, textDark, textLight }
- カラーは v.xxxColor || g.primary のようにグローバルフォールバック
- fields の type: text / textarea / color / toggle / select
- showIf で条件付き表示: "toggleKey" または "selectKey:value"
- インラインスタイルのみ、外部CSS依存なし
- フォント: 'Noto Sans JP'

_TEMPLATE.js を参考にしてください。
```

3. 出力を `src/parts/新しいパーツ名.js` として保存
4. `src/parts/index.js` に import と PARTS 配列への追加
5. サムネイルが必要なら `src/components/Thumbnail.jsx` に追加

### 方法2: テンプレートからコピー

```bash
cp src/parts/_TEMPLATE.js src/parts/my-new-part.js
```

編集して `src/parts/index.js` に登録。

## プロジェクト構成

```
site-builder/
├── src/
│   ├── App.jsx              ← ビルダーUI本体
│   ├── main.jsx             ← エントリーポイント
│   ├── styles.css           ← グローバルスタイル
│   ├── components/
│   │   └── Thumbnail.jsx    ← パーツサムネイルSVG
│   ├── parts/
│   │   ├── index.js         ← パーツレジストリ（ここに登録）
│   │   ├── _TEMPLATE.js     ← 新規パーツのテンプレート
│   │   ├── hero-diagonal.js
│   │   ├── hero-split.js
│   │   ├── features-overlap.js
│   │   ├── about-editorial.js
│   │   └── cta-gradient.js
│   └── utils/
│       └── helpers.js       ← ユーティリティ関数
├── .github/
│   └── workflows/
│       └── deploy.yml       ← GitHub Pages自動デプロイ
├── index.html
├── vite.config.js
└── package.json
```

## カテゴリ順序のカスタマイズ

`src/parts/index.js` の `CATEGORY_ORDER` 配列で、左カタログのカテゴリ表示順を変更できます。

## 将来の拡張ポイント

- **LP対応**: `CATEGORY_ORDER` にLP向けカテゴリ（FOMO、権威性、比較表など）を追加
- **テンプレートプリセット**: 業種別のパーツ構成テンプレート（IT企業向け、飲食店向けなど）
- **画像管理**: Unsplash API連携でプレースホルダー画像を検索・挿入
- **レスポンシブ**: パーツのrender関数にメディアクエリを追加
- **エクスポート形式**: HTML以外にNext.js/Astroコンポーネントとして出力
