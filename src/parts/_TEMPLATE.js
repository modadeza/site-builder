/**
 * ============================================================
 * パーツ定義テンプレート
 * ============================================================
 * 
 * 新しいパーツを作成する際はこのファイルをコピーして使ってください。
 * 
 * ## 構造
 * 
 * {
 *   id: string          — ユニークID（kebab-case）
 *   name: string        — カタログ表示名
 *   category: string    — カテゴリ名（parts/index.js の CATEGORY_ORDER 参照）
 *   desc: string        — 短い説明文
 *   thumb: string       — サムネイルタイプ（Thumb コンポーネントに追加必要）
 *   fields: Field[]     — 編集可能なフィールド定義
 *   render: (vars, globalColor) => string  — HTML生成関数
 * }
 * 
 * ## Field 定義
 * 
 * {
 *   key: string         — 変数名
 *   label: string       — UI表示ラベル
 *   type: 'text' | 'textarea' | 'color' | 'toggle' | 'select'
 *   default: any        — デフォルト値
 *   options?: string[]  — type: 'select' の場合の選択肢
 *   showIf?: string     — 条件付き表示
 *                          トグル: "showButton" (そのkeyがtrueの時に表示)
 *                          セレクト: "columns:4" (そのkeyがその値の時に表示)
 * }
 * 
 * ## render 関数
 * 
 * - 第1引数 v: ユーザーが編集した変数値
 * - 第2引数 g: グローバルカラー設定
 *   { primary, accent, bg, bgLight, textDark, textLight }
 * 
 * - カラー変数は v.accentColor || g.primary のようにフォールバックさせる
 * - フォントは 'Noto Sans JP' を使用
 * - インラインスタイルで完結させる（外部CSS依存なし）
 * 
 * ## スクショからパーツを作る手順
 * 
 * 1. 良いサイトのセクションのスクショをClaudeに貼る
 * 2. 以下のプロンプトで依頼:
 *    「このセクションをHTML化してください。以下のフォーマットで:
 *     - ESモジュールとして export default { id, name, category, desc, thumb, fields, render }
 *     - render関数は (v, g) => HTML文字列 の形式
 *     - カラーは v.xxxColor || g.primary のようにグローバルフォールバック
 *     - fields には text/textarea/color/toggle/select を使って変数化
 *     - インラインスタイルのみ使用」
 * 3. 出力をそのまま src/parts/xxx.js として保存
 * 4. src/parts/index.js に import と登録を追加
 */

export default {
  id: 'template',
  name: 'テンプレート名',
  category: 'カテゴリ名',
  desc: '短い説明',
  thumb: 'default',
  fields: [
    { key: 'headline', label: '見出し', type: 'text', default: 'サンプル見出し' },
    { key: 'bodyText', label: '本文', type: 'textarea', default: 'サンプル本文テキスト' },
    { key: 'showButton', label: 'ボタン表示', type: 'toggle', default: false },
    { key: 'buttonText', label: 'ボタンテキスト', type: 'text', default: '詳しく見る', showIf: 'showButton' },
    { key: 'columns', label: 'カラム数', type: 'select', options: ['2','3','4'], default: '3' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary
    return `
<section style="padding:120px 40px;background:${g.bgLight};font-family:'Noto Sans JP',sans-serif">
  <div style="max-width:1200px;margin:0 auto;text-align:center">
    <h2 style="font-size:36px;font-weight:800;color:${g.textDark}">${v.headline}</h2>
    <p style="font-size:16px;color:#666;margin-top:16px">${v.bodyText}</p>
    ${v.showButton ? `<a href="#" style="display:inline-block;margin-top:32px;padding:14px 32px;background:${ac};color:#fff;border-radius:6px;text-decoration:none;font-weight:600">${v.buttonText}</a>` : ''}
  </div>
</section>`
  },
}
