export default {
  id: 'ec-product-ranking',
  name: '商品ランキング',
  category: 'EC：商品',
  desc: 'ランキングバッジ付き商品カード',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'セクション名', type: 'text', default: '売り上げランキング / RANKING' },
    { key: 'columns', label: 'カラム数', type: 'select', options: ['2', '3', '4'], default: '3' },
    { key: 'p1Name', label: '商品1 名前', type: 'text', default: 'ゲーミングPC Ryzen7 5700X' },
    { key: 'p1Price', label: '商品1 価格', type: 'text', default: '¥149,800' },
    { key: 'p1OldPrice', label: '商品1 定価', type: 'text', default: '¥168,000' },
    { key: 'p2Name', label: '商品2 名前', type: 'text', default: 'ゲーミングPC Ryzen5 5500X' },
    { key: 'p2Price', label: '商品2 価格', type: 'text', default: '¥167,800' },
    { key: 'p2OldPrice', label: '商品2 定価', type: 'text', default: '' },
    { key: 'p3Name', label: '商品3 名前', type: 'text', default: 'ゲーミングPC i7-14700' },
    { key: 'p3Price', label: '商品3 価格', type: 'text', default: '¥225,500' },
    { key: 'p3OldPrice', label: '商品3 定価', type: 'text', default: '¥248,000' },
    { key: 'showButton', label: '一覧ボタン', type: 'toggle', default: true },
    { key: 'buttonText', label: 'ボタンテキスト', type: 'text', default: 'ランキングをもっと見る', showIf: 'showButton' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary
    const cols = parseInt(v.columns) || 3
    const u = 'epr' + Math.random().toString(36).slice(2, 7)
    const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32', ac, ac]
    let cards = ''
    for (let i = 1; i <= Math.min(cols, 4); i++) {
      const name = v[`p${i}Name`] || `Product ${i}`
      const price = v[`p${i}Price`] || ''
      const old = v[`p${i}OldPrice`] || ''
      cards += `<a href="#" class="card">
<div class="rank" style="background:${rankColors[(i-1)%5]}">${i}</div>
<div class="img"><div class="placeholder">📦</div></div>
<div class="info"><h3>${name}</h3>
<div class="prices">${old ? `<span class="old">${old}</span>` : ''}<span class="current">${price}</span></div>
</div></a>`
    }
    return `<style>
.${u}{padding:48px 20px;background:#fff;font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:1200px;margin:0 auto}
.${u} .hdr{display:flex;align-items:baseline;gap:12px;margin-bottom:24px}
.${u} .hdr h2{font-size:18px;font-weight:800;color:#1a1a1a;margin:0}
.${u} .hdr span{font-size:11px;color:#999;letter-spacing:1px;text-transform:uppercase}
.${u} .grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:16px}
.${u} .card{display:block;background:#f8f8fa;border:1px solid #eee;border-radius:12px;overflow:hidden;text-decoration:none;position:relative;transition:all .2s}
.${u} .card:hover{border-color:${ac};box-shadow:0 8px 24px rgba(0,0,0,.08);transform:translateY(-2px)}
.${u} .rank{position:absolute;top:8px;left:8px;width:28px;height:28px;border-radius:50%;color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;z-index:2}
.${u} .img{aspect-ratio:4/3;background:#f0f0f4;display:flex;align-items:center;justify-content:center}
.${u} .placeholder{font-size:40px;opacity:.3}
.${u} .info{padding:14px 16px}
.${u} h3{font-size:13px;font-weight:600;color:#333;margin:0 0 8px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.${u} .prices{display:flex;align-items:baseline;gap:8px}
.${u} .old{font-size:12px;color:#999;text-decoration:line-through}
.${u} .current{font-size:16px;font-weight:800;color:#e53e3e}
.${u} .more{text-align:center;margin-top:24px}
.${u} .btn{display:inline-block;padding:12px 32px;border:1px solid ${ac};color:${ac};font-size:13px;font-weight:600;border-radius:100px;text-decoration:none;transition:all .2s}
.${u} .btn:hover{background:${ac};color:#fff}
@media(max-width:768px){
.${u}{padding:32px 16px}
.${u} .grid{grid-template-columns:1fr 1fr;gap:10px}
.${u} .info{padding:10px 12px}
.${u} h3{font-size:12px}
.${u} .current{font-size:14px}
.${u} .btn{width:100%;text-align:center}
}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><h2>${v.sectionTitle.split('/')[0].trim()}</h2><span>${(v.sectionTitle.split('/')[1]||'').trim()}</span></div>
<div class="grid">${cards}</div>
${v.showButton ? `<div class="more"><a href="#" class="btn">${v.buttonText}</a></div>` : ''}
</div></section>`
  },
}
