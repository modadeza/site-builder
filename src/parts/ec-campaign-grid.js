export default {
  id: 'ec-campaign-grid',
  name: 'キャンペーンカード',
  category: 'EC：バナー',
  desc: '特集・キャンペーンのカードグリッド',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'セクション名', type: 'text', default: '特集 / FEATURE' },
    { key: 'c1Title', label: 'カード1 タイトル', type: 'text', default: '30,000円キャンペーン' },
    { key: 'c1Sub', label: 'カード1 説明', type: 'text', default: '対象商品購入で3万円OFF' },
    { key: 'c2Title', label: 'カード2 タイトル', type: 'text', default: '有機ELモデル特集' },
    { key: 'c2Sub', label: 'カード2 説明', type: 'text', default: '高画質ディスプレイ搭載モデル' },
    { key: 'c3Title', label: 'カード3 タイトル', type: 'text', default: 'ゲームから選ぶ' },
    { key: 'c3Sub', label: 'カード3 説明', type: 'text', default: 'プレイしたいゲームで探す' },
    { key: 'columns', label: 'カラム数', type: 'select', options: ['2', '3'], default: '3' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary
    const cols = parseInt(v.columns) || 3
    const u = 'ecg' + Math.random().toString(36).slice(2, 7)
    const gradients = [`linear-gradient(135deg,${ac}20,${ac}08)`, 'linear-gradient(135deg,#6366f120,#6366f108)', 'linear-gradient(135deg,#f59e0b20,#f59e0b08)']
    let cards = ''
    for (let i = 1; i <= cols; i++) {
      const t = v[`c${i}Title`] || '', s = v[`c${i}Sub`] || ''
      cards += `<a href="#" class="card" style="background:${gradients[(i-1)%3]}"><div class="badge">${s}</div><h3>${t}</h3><span class="arrow">→</span></a>`
    }
    return `<style>
.${u}{padding:40px 20px;background:#f8f8fa;font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:1200px;margin:0 auto}
.${u} .hdr{display:flex;align-items:baseline;gap:12px;margin-bottom:20px}
.${u} .hdr h2{font-size:18px;font-weight:800;color:#1a1a1a;margin:0}
.${u} .hdr span{font-size:11px;color:#999;letter-spacing:1px;text-transform:uppercase}
.${u} .grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:12px}
.${u} .card{display:block;padding:24px 20px;border-radius:12px;text-decoration:none;border:1px solid #e8e8f0;position:relative;transition:all .2s;min-height:100px}
.${u} .card:hover{border-color:${ac};transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.06)}
.${u} .badge{font-size:11px;color:#888;margin-bottom:8px}
.${u} h3{font-size:15px;font-weight:700;color:#1a1a1a;margin:0}
.${u} .arrow{position:absolute;right:16px;bottom:16px;color:${ac};font-size:16px;opacity:0;transition:opacity .2s}
.${u} .card:hover .arrow{opacity:1}
@media(max-width:768px){
.${u}{padding:24px 16px}
.${u} .grid{grid-template-columns:1fr 1fr;gap:8px}
.${u} .card{padding:16px 14px;min-height:80px}
.${u} h3{font-size:13px}
}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><h2>${v.sectionTitle.split('/')[0].trim()}</h2><span>${(v.sectionTitle.split('/')[1]||'').trim()}</span></div>
<div class="grid">${cards}</div>
</div></section>`
  },
}
