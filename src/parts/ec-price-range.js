export default {
  id: 'ec-price-range',
  name: '価格帯フィルター',
  category: 'EC：ナビゲーション',
  desc: 'ボタン式の価格帯選択',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'セクション名', type: 'text', default: '価格から選ぶ / PRICE RANGE' },
    { key: 'r1', label: '価格帯1', type: 'text', default: '〜100,000' },
    { key: 'r2', label: '価格帯2', type: 'text', default: '100,000 〜 200,000' },
    { key: 'r3', label: '価格帯3', type: 'text', default: '200,000 〜 300,000' },
    { key: 'r4', label: '価格帯4', type: 'text', default: '300,000 〜 400,000' },
    { key: 'r5', label: '価格帯5', type: 'text', default: '400,000〜' },
    { key: 'theme', label: 'テーマ', type: 'select', options: ['ライト', 'ダーク'], default: 'ライト' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary
    const dark = v.theme === 'ダーク'
    const bg = dark ? '#0e0e14' : '#f8f8fa'
    const btnBg = dark ? '#1a1a24' : '#fff'
    const tc = dark ? '#e0e0ea' : '#1a1a1a'
    const bdr = dark ? '#2a2a36' : '#e0e0e8'
    const u = 'epf' + Math.random().toString(36).slice(2, 7)
    const ranges = [v.r1, v.r2, v.r3, v.r4, v.r5].filter(Boolean)
    const btns = ranges.map(r => `<a href="#" class="range-btn">¥${r}</a>`).join('')
    return `<style>
.${u}{padding:48px 20px;background:${bg};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:1200px;margin:0 auto}
.${u} .hdr{display:flex;align-items:baseline;gap:12px;margin-bottom:20px}
.${u} .hdr h2{font-size:18px;font-weight:800;color:${tc};margin:0}
.${u} .hdr span{font-size:11px;color:#999;letter-spacing:1px;text-transform:uppercase}
.${u} .ranges{display:flex;flex-wrap:wrap;gap:10px}
.${u} .range-btn{display:inline-block;padding:12px 24px;background:${btnBg};border:1px solid ${bdr};border-radius:10px;font-size:14px;font-weight:600;color:${tc};text-decoration:none;transition:all .2s;white-space:nowrap}
.${u} .range-btn:hover{border-color:${ac};color:${ac};box-shadow:0 4px 12px rgba(0,0,0,.06)}
@media(max-width:768px){
.${u}{padding:32px 16px}
.${u} .ranges{gap:8px}
.${u} .range-btn{padding:10px 16px;font-size:12px;flex:1 1 calc(50% - 4px)}
}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><h2>${v.sectionTitle.split('/')[0].trim()}</h2><span>${(v.sectionTitle.split('/')[1]||'').trim()}</span></div>
<div class="ranges">${btns}</div>
</div></section>`
  },
}
