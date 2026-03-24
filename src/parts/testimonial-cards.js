export default {
  id: 'testimonial-cards',
  name: 'テスティモニアルカード',
  category: 'お客様の声',
  desc: '引用スタイルのお客様の声',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'セクション名', type: 'text', default: 'Testimonials' },
    { key: 'sectionSub', label: 'セクション説明', type: 'text', default: 'お客様からいただいた声をご紹介します。' },
    { key: 't1Text', label: '声1', type: 'textarea', default: 'プロジェクトの初期段階から丁寧にヒアリングしていただき、期待以上の成果物を納品してくださいました。' },
    { key: 't1Name', label: '声1 名前', type: 'text', default: '山田様' },
    { key: 't1Company', label: '声1 会社', type: 'text', default: '株式会社ABC / 代表取締役' },
    { key: 't2Text', label: '声2', type: 'textarea', default: 'レスポンスが早く、細かな修正にも柔軟に対応いただけました。次のプロジェクトもぜひお願いしたいです。' },
    { key: 't2Name', label: '声2 名前', type: 'text', default: '田村様' },
    { key: 't2Company', label: '声2 会社', type: 'text', default: '株式会社XYZ / マーケティング部長' },
    { key: 'theme', label: 'テーマ', type: 'select', options: ['ライト', 'ダーク'], default: 'ダーク' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.accent
    const dark = v.theme === 'ダーク'
    const bg = dark ? '#08080e' : '#f4f4f8'
    const cardBg = dark ? '#111118' : '#fff'
    const tc = dark ? '#e0e0ea' : '#1a1a1a'
    const sc = dark ? '#888898' : '#888'
    const bdr = dark ? '#1e1e2a' : '#e8e8f0'
    const u = 'tc' + Math.random().toString(36).slice(2, 7)
    let cards = ''
    for (let i = 1; i <= 2; i++) {
      const txt = v[`t${i}Text`] || '', name = v[`t${i}Name`] || '', co = v[`t${i}Company`] || ''
      cards += `<div class="card"><div class="quote">"</div><p>${txt}</p><div class="author"><div class="avatar" style="background:${ac}20;color:${ac}">${name.charAt(0)}</div><div><div class="name">${name}</div><div class="co">${co}</div></div></div></div>`
    }
    return `<style>
.${u}{padding:120px 40px;background:${bg};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:1100px;margin:0 auto}
.${u} .hdr{text-align:center;margin-bottom:64px}
.${u} .hdr span{font-size:12px;letter-spacing:4px;color:${ac};text-transform:uppercase;font-weight:600}
.${u} .hdr h3{font-size:16px;color:${sc};margin:12px 0 0;font-weight:400}
.${u} .grid{display:grid;grid-template-columns:1fr 1fr;gap:32px}
.${u} .card{background:${cardBg};border:1px solid ${bdr};border-radius:16px;padding:40px 36px;position:relative}
.${u} .quote{position:absolute;top:24px;right:32px;font-size:64px;font-weight:900;color:${ac}20;line-height:1}
.${u} .card p{font-size:15px;color:${tc};line-height:1.9;margin:0 0 28px;position:relative;z-index:1}
.${u} .author{display:flex;align-items:center;gap:12px}
.${u} .avatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;flex-shrink:0}
.${u} .name{font-size:14px;font-weight:700;color:${tc}}
.${u} .co{font-size:12px;color:${sc};margin-top:2px}
@media(max-width:768px){
.${u}{padding:60px 20px}
.${u} .grid{grid-template-columns:1fr;gap:20px}
.${u} .card{padding:28px 24px}
.${u} .card p{font-size:14px}
.${u} .hdr{margin-bottom:32px}
}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><span>${v.sectionTitle}</span><h3>${v.sectionSub}</h3></div>
<div class="grid">${cards}</div>
</div></section>`
  },
}
