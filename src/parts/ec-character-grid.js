export default {
  id: 'ec-character-grid',
  name: 'キャラクター/カテゴリグリッド',
  category: 'EC：ナビゲーション',
  desc: 'カラフル2×3のカードグリッド',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'タイトル', type: 'text', default: 'Character' },
    { key: 'sectionSub', label: 'サブ', type: 'text', default: '［キャラクター］' },
    { key: 'c1Label', label: 'カード1 ラベル', type: 'text', default: 'CHIIKAWA' },
    { key: 'c1Color', label: 'カード1 背景色', type: 'color', default: '#fce4ec' },
    { key: 'c2Label', label: 'カード2 ラベル', type: 'text', default: 'Chiikawa Golf' },
    { key: 'c2Color', label: 'カード2 背景色', type: 'color', default: '#b2dfdb' },
    { key: 'c3Label', label: 'カード3 ラベル', type: 'text', default: 'NAGANO CHARACTERS' },
    { key: 'c3Color', label: 'カード3 背景色', type: 'color', default: '#fdd835' },
    { key: 'c4Label', label: 'カード4 ラベル', type: 'text', default: 'LIL ala mode' },
    { key: 'c4Color', label: 'カード4 背景色', type: 'color', default: '#fce4ec' },
    { key: 'c5Label', label: 'カード5 ラベル', type: 'text', default: 'mofusand' },
    { key: 'c5Color', label: 'カード5 背景色', type: 'color', default: '#e0f2f1' },
    { key: 'c6Label', label: 'カード6 ラベル', type: 'text', default: 'KOUPENCHAN' },
    { key: 'c6Color', label: 'カード6 背景色', type: 'color', default: '#c8e6c9' },
    { key: 'columns', label: 'カラム数', type: 'select', options: ['2', '3'], default: '2' },
    { key: 'accentStripe1', label: 'ストライプ色1', type: 'color', default: '#f5a623' },
    { key: 'accentStripe2', label: 'ストライプ色2', type: 'color', default: '#f7c948' },
  ],
  render: (v, g) => {
    const cols = parseInt(v.columns) || 2
    const s1 = v.accentStripe1, s2 = v.accentStripe2
    const u = 'echr' + Math.random().toString(36).slice(2, 7)
    let cards = ''
    for (let i = 1; i <= 6; i++) {
      const label = v[`c${i}Label`] || ''
      const color = v[`c${i}Color`] || '#eee'
      if (!label) continue
      cards += `<a href="#" class="card" style="background:${color}"><div class="card-inner"><div class="card-label">${label.replace(/\n/g, '<br>')}</div></div></a>`
    }
    return `<style>
.${u}{padding:32px 16px 24px;background:#fff;font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:600px;margin:0 auto}
.${u} .hdr-title{display:flex;align-items:baseline;gap:10px}
.${u} .hdr h2{font-size:32px;font-weight:900;color:#1a1a1a;margin:0;line-height:1;font-style:italic}
.${u} .hdr span{font-size:14px;color:#888;font-weight:500}
.${u} .stripe{height:6px;margin-top:4px;background:repeating-linear-gradient(-45deg,${s1},${s1} 4px,${s2} 4px,${s2} 8px);border-radius:3px;max-width:440px}
.${u} .grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:10px;margin-top:16px}
.${u} .card{aspect-ratio:1/1;border-radius:16px;overflow:hidden;cursor:pointer;transition:transform .2s;text-decoration:none;display:block}
.${u} .card:hover{transform:scale(1.02)}
.${u} .card-inner{width:100%;height:100%;position:relative;display:flex;align-items:flex-start;padding:14px}
.${u} .card-label{font-size:14px;font-weight:800;color:#333;line-height:1.4}
@media(max-width:768px){.${u} .card-label{font-size:12px}}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><div class="hdr-title"><h2>${v.sectionTitle}</h2><span>${v.sectionSub}</span></div><div class="stripe"></div></div>
<div class="grid">${cards}</div>
</div></section>`
  },
}
