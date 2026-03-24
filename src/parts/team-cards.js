export default {
  id: 'team-cards',
  name: 'メンバーカード',
  category: 'チーム紹介',
  desc: 'チームメンバーのカード一覧',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'セクション名', type: 'text', default: 'Team' },
    { key: 'sectionSub', label: 'セクション説明', type: 'text', default: '多様な専門性を持つチームが、あなたのプロジェクトを支えます。' },
    { key: 'm1Name', label: 'メンバー1 名前', type: 'text', default: '田中 太郎' },
    { key: 'm1Role', label: 'メンバー1 役職', type: 'text', default: 'CEO / Founder' },
    { key: 'm2Name', label: 'メンバー2 名前', type: 'text', default: '佐藤 花子' },
    { key: 'm2Role', label: 'メンバー2 役職', type: 'text', default: 'Creative Director' },
    { key: 'm3Name', label: 'メンバー3 名前', type: 'text', default: '鈴木 一郎' },
    { key: 'm3Role', label: 'メンバー3 役職', type: 'text', default: 'Lead Engineer' },
    { key: 'columns', label: 'カラム数', type: 'select', options: ['3', '4'], default: '3' },
    { key: 'theme', label: 'テーマ', type: 'select', options: ['ライト', 'ダーク'], default: 'ライト' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary, cols = parseInt(v.columns) || 3
    const dark = v.theme === 'ダーク'
    const bg = dark ? '#0a0a10' : '#ffffff'
    const cardBg = dark ? '#14141e' : '#f8fafc'
    const tc = dark ? '#e8e8f0' : '#1a1a1a'
    const sc = dark ? '#888898' : '#888'
    const u = 'tm' + Math.random().toString(36).slice(2, 7)
    const initials = ['T', 'S', 'I', 'M']
    let cards = ''
    for (let i = 1; i <= cols; i++) {
      const n = v[`m${i}Name`] || `Member ${i}`
      const r = v[`m${i}Role`] || ''
      cards += `<div class="card"><div class="avatar" style="background:linear-gradient(135deg,${ac}25,${ac}10)"><span style="color:${ac};font-size:24px;font-weight:800">${initials[(i-1)%4]}</span></div><h3>${n}</h3><p>${r}</p></div>`
    }
    return `<style>
.${u}{padding:120px 40px;background:${bg};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:1200px;margin:0 auto}
.${u} .hdr{text-align:center;margin-bottom:64px}
.${u} .hdr span{font-size:12px;letter-spacing:4px;color:${ac};text-transform:uppercase;font-weight:600}
.${u} .hdr p{font-size:16px;color:${sc};margin:12px 0 0}
.${u} .grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:32px}
.${u} .card{text-align:center;padding:40px 24px;background:${cardBg};border-radius:16px}
.${u} .avatar{width:80px;height:80px;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center}
.${u} h3{font-size:16px;font-weight:700;color:${tc};margin:0 0 6px}
.${u} .card p{font-size:13px;color:${ac};margin:0;font-weight:500}
@media(max-width:768px){
.${u}{padding:60px 20px}
.${u} .grid{grid-template-columns:1fr 1fr;gap:16px}
.${u} .card{padding:28px 16px}
.${u} .avatar{width:60px;height:60px}
.${u} .hdr{margin-bottom:32px}
}
@media(max-width:480px){
.${u} .grid{grid-template-columns:1fr}
}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><span>${v.sectionTitle}</span><p>${v.sectionSub}</p></div>
<div class="grid">${cards}</div>
</div></section>`
  },
}
