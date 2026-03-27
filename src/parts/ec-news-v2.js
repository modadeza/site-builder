export default {
  id: 'ec-news-v2',
  name: 'お知らせリスト（リッチ）',
  category: 'EC：コンテンツ',
  desc: '日付+下線タイトルのニュースリスト',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'タイトル', type: 'text', default: 'お知らせ' },
    { key: 'sectionSub', label: 'サブ', type: 'text', default: 'INFORMATION' },
    { key: 'listLabel', label: '一覧ラベル', type: 'text', default: 'お知らせ一覧' },
    { key: 'n1Date', label: '記事1 日付', type: 'text', default: '2026年03月24日' },
    { key: 'n1Title', label: '記事1 タイトル', type: 'text', default: '【お知らせ】累計販売台数30,000台突破キャンペーン実施中！' },
    { key: 'n2Date', label: '記事2 日付', type: 'text', default: '2026年02月12日' },
    { key: 'n2Title', label: '記事2 タイトル', type: 'text', default: '【お知らせ】SSD無償アップグレードキャンペーン開催中' },
    { key: 'n3Date', label: '記事3 日付', type: 'text', default: '2026年01月30日' },
    { key: 'n3Title', label: '記事3 タイトル', type: 'text', default: '【重要】そらるコラボPCの納期遅延について' },
    { key: 'theme', label: 'ページ背景', type: 'select', options: ['ライト', 'ダーク'], default: 'ライト' },
  ],
  render: (v, g) => {
    const dark = v.theme === 'ダーク'
    const pageBg = dark ? '#111118' : '#fff'
    const tc = dark ? '#e8e8f0' : '#1a1a1a'
    const sc = dark ? '#888' : '#999'
    const bdr = dark ? '#2a2a36' : '#e8e8ec'
    const divColor = dark ? '#888' : '#2d3748'
    const dotColor = dark ? '#888' : '#333'
    const u = 'ein' + Math.random().toString(36).slice(2, 7)
    let items = ''
    for (let i = 1; i <= 3; i++) {
      const d = v[`n${i}Date`], t = v[`n${i}Title`]
      if (!t) continue
      items += `<div class="item"><div class="date">${d}</div><div class="title"><a href="#">${t}</a></div></div>`
    }
    return `<style>
.${u}{padding:32px 16px 24px;background:${pageBg};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:600px;margin:0 auto}
.${u} .hdr{display:flex;align-items:flex-start;gap:10px;margin-bottom:24px;padding-left:4px}
.${u} .hdr-dot{display:flex;flex-direction:column;gap:3px;height:28px;justify-content:space-between;padding:2px 0}
.${u} .hdr-dot i{display:block;width:4px;height:4px;border-radius:50%;background:${dotColor};flex-shrink:0}
.${u} .hdr h2{font-size:26px;font-weight:900;color:${tc};margin:0;line-height:1}
.${u} .hdr span{font-size:12px;color:#999;letter-spacing:2px;font-weight:500}
.${u} .list-hdr{display:flex;align-items:center;gap:10px;margin-bottom:20px}
.${u} .list-hdr span{font-size:14px;font-weight:700;color:${tc}}
.${u} .list-hdr a{width:28px;height:28px;border:1.5px solid #ccc;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;color:#999;font-size:12px}
.${u} .divider{width:40px;height:3px;background:${divColor};border-radius:2px;margin:0 auto 24px}
.${u} .item{padding:16px 0;border-bottom:1px solid ${bdr}}
.${u} .item:first-of-type{border-top:1px solid ${bdr}}
.${u} .date{font-size:12px;color:${sc};margin-bottom:6px}
.${u} .title a{font-size:14px;font-weight:600;color:${tc};text-decoration:underline;text-underline-offset:3px;text-decoration-color:#bbb;line-height:1.6}
@media(max-width:768px){.${u}{padding:24px 16px}}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><div class="hdr-dot"><i></i><i></i><i></i><i></i></div><h2>${v.sectionTitle}</h2><span>${v.sectionSub}</span></div>
<div class="list-hdr"><span>${v.listLabel}</span><a href="#">›</a></div>
<div class="divider"></div>
${items}
</div></section>`
  },
}
