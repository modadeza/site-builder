/**
 * ============================================================
 * パーツ定義テンプレート（レスポンシブ対応版）
 * ============================================================
 * 
 * ## レスポンシブ対応ルール
 * 
 * - render関数内で <style> タグを埋め込み、メディアクエリを使用
 * - ユニークIDを生成してクラス名衝突を防ぐ:
 *     const u = 'xx' + Math.random().toString(36).slice(2, 7)
 * - ブレイクポイント: 768px（モバイル）
 * - モバイル時の主な変更:
 *     - grid → 1カラムに
 *     - padding縮小（40px → 20px）
 *     - フォントサイズ縮小
 *     - ボタンは width:100% で縦並び
 *     - 装飾要素は display:none
 * - インラインスタイルは使わず、全て <style> 内のクラスで指定
 * 
 * ## スクショからパーツを作る際のClaudeへのプロンプト
 * 
 * 「このセクションをサイトビルダーのパーツとしてHTML化してください。
 * 
 *  フォーマット:
 *  - ESモジュール: export default { id, name, category, desc, thumb, fields, render }
 *  - render関数: (v, g) => HTML文字列
 *  - ユニークID: const u = 'xx' + Math.random().toString(36).slice(2, 7)
 *  - クラス名は全て .${u} .xxx の形式でスコープ
 *  - <style>タグを埋め込み、@media(max-width:768px) でモバイル対応
 *  - モバイル時: 1カラム化、padding縮小、ボタンfull-width、装飾非表示
 *  - カラー: v.xxxColor || g.primary のようにグローバルフォールバック
 *  - fields の type: text / textarea / color / toggle / select
 *  - showIf で条件付き表示: "toggleKey" または "selectKey:value"
 *  - フォント: 'Noto Sans JP'」
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
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary
    const u = 'tp' + Math.random().toString(36).slice(2, 7)
    return `<style>
.${u}{padding:120px 40px;background:${g.bgLight};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:1200px;margin:0 auto;text-align:center}
.${u} h2{font-size:36px;font-weight:800;color:${g.textDark};margin:0 0 16px}
.${u} p{font-size:16px;color:#666;margin:0}
.${u} .btn{display:inline-block;margin-top:32px;padding:14px 32px;background:${ac};color:#fff;border-radius:6px;text-decoration:none;font-weight:600}
@media(max-width:768px){
.${u}{padding:60px 20px}
.${u} h2{font-size:24px}
.${u} p{font-size:14px}
.${u} .btn{width:100%;text-align:center}
}
</style>
<section class="${u}"><div class="wrap">
<h2>${v.headline}</h2>
<p>${v.bodyText}</p>
${v.showButton ? `<a href="#" class="btn">${v.buttonText}</a>` : ''}
</div></section>`
  },
}
