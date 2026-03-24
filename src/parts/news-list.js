export default {
  id: 'news-list',
  name: 'ニュースリスト',
  category: 'ニュース',
  desc: '日付付きのニュース・ブログ一覧',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'セクション名', type: 'text', default: 'News' },
    { key: 'sectionSub', label: 'セクション説明', type: 'text', default: '最新のお知らせ' },
    { key: 'n1Date', label: '記事1 日付', type: 'text', default: '2025.04.01' },
    { key: 'n1Tag', label: '記事1 タグ', type: 'text', default: 'お知らせ' },
    { key: 'n1Title', label: '記事1 タイトル', type: 'text', default: 'Webサイトをリニューアルしました' },
    { key: 'n2Date', label: '記事2 日付', type: 'text', default: '2025.03.15' },
    { key: 'n2Tag', label: '記事2 タグ', type: 'text', default: '実績' },
    { key: 'n2Title', label: '記事2 タイトル', type: 'text', default: '株式会社ABC様のコーポレートサイトを制作しました' },
    { key: 'n3Date', label: '記事3 日付', type: 'text', default: '2025.03.01' },
    { key: 'n3Tag', label: '記事3 タグ', type: 'text', default: 'ブログ' },
    { key: 'n3Title', label: '記事3 タイトル', type: 'text', default: '2025年のWebデザイントレンドまとめ' },
    { key: 'showButton', label: '一覧ボタン', type: 'toggle', default: true },
    { key: 'buttonText', label: 'ボタンテキスト', type: 'text', default: 'すべてのニュースを見る', showIf: 'showButton' },
    { key: 'theme', label: 'テーマ', type: 'select', options: ['ライト', 'ダーク'], default: 'ライト' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary
    const dark = v.theme === 'ダーク'
    const bg = dark ? '#0a0a10' : '#ffffff'
    const tc = dark ? '#e8e8f0' : '#1a1a1a'
    const sc = dark ? '#666' : '#999'
    const bdr = dark ? '#1a1a24' : '#eee'
    const u = 'nl' + Math.random().toString(36).slice(2, 7)
    let items = ''
    for (let i = 1; i <= 3; i++) {
      const date = v[`n${i}Date`] || '', tag = v[`n${i}Tag`] || '', title = v[`n${i}Title`] || ''
      if (!title) continue
      items += `<a href="#" class="item"><span class="date">${date}</span><span class="tag">${tag}</span><span class="title">${title}</span><span class="arrow">→</span></a>`
    }
    return `<style>
.${u}{padding:100px 40px;background:${bg};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:900px;margin:0 auto}
.${u} .hdr{display:flex;justify-content:space-between;align-items:end;margin-bottom:48px}
.${u} .hdr div span{display:block;font-size:12px;letter-spacing:4px;color:${ac};text-transform:uppercase;font-weight:600}
.${u} .hdr div p{font-size:15px;color:${sc};margin:8px 0 0}
.${u} .item{display:flex;align-items:center;gap:16px;padding:20px 0;border-bottom:1px solid ${bdr};text-decoration:none;transition:all .2s}
.${u} .item:first-child{border-top:1px solid ${bdr}}
.${u} .item:hover{padding-left:8px}
.${u} .date{font-size:13px;color:${sc};flex-shrink:0;width:90px}
.${u} .tag{font-size:11px;color:${ac};background:${ac}12;padding:3px 10px;border-radius:100px;font-weight:600;flex-shrink:0}
.${u} .title{font-size:15px;color:${tc};font-weight:500;flex:1}
.${u} .arrow{color:${ac};font-size:14px;flex-shrink:0;opacity:0;transition:opacity .2s}
.${u} .item:hover .arrow{opacity:1}
.${u} .more{text-align:center;margin-top:40px}
.${u} .btn{display:inline-block;padding:12px 32px;border:1px solid ${ac};color:${ac};font-size:13px;font-weight:600;border-radius:100px;text-decoration:none}
@media(max-width:768px){
.${u}{padding:60px 20px}
.${u} .hdr{flex-direction:column;align-items:start;gap:8px;margin-bottom:24px}
.${u} .item{flex-wrap:wrap;gap:8px;padding:16px 0}
.${u} .date{width:auto}
.${u} .title{width:100%;flex:none;font-size:14px}
.${u} .arrow{display:none}
.${u} .btn{width:100%;text-align:center}
}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><div><span>${v.sectionTitle}</span><p>${v.sectionSub}</p></div></div>
${items}
${v.showButton ? `<div class="more"><a href="#" class="btn">${v.buttonText}</a></div>` : ''}
</div></section>`
  },
}
