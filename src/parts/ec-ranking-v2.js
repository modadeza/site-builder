export default {
  id: 'ec-ranking-v2',
  name: 'ランキング（リッチ）',
  category: 'EC：商品',
  desc: 'ストライプ装飾+タブ+セールバッジ',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'タイトル', type: 'text', default: 'Ranking' },
    { key: 'sectionSub', label: 'サブ', type: 'text', default: '［ランキング］' },
    { key: 'tab1', label: 'タブ1', type: 'text', default: 'ALL' },
    { key: 'tab2', label: 'タブ2', type: 'text', default: 'Tシャツ' },
    { key: 'tab3', label: 'タブ3', type: 'text', default: 'パーカー' },
    { key: 'tab4', label: 'タブ4', type: 'text', default: 'スウェット' },
    { key: 'p1Name', label: '商品1', type: 'text', default: 'NEW ERA® 9FIFTY™ ちいかわ BOX LOGO BLACK' },
    { key: 'p1Price', label: '商品1 価格', type: 'text', default: '¥7,150' },
    { key: 'p1Tax', label: '商品1 税', type: 'text', default: '(税込)' },
    { key: 'p1Sale', label: '商品1 セール', type: 'text', default: '' },
    { key: 'p1Old', label: '商品1 旧価格', type: 'text', default: '' },
    { key: 'p2Name', label: '商品2', type: 'text', default: 'ちいかわ L/STシャツ うさぎ サンドベージュ' },
    { key: 'p2Price', label: '商品2 価格', type: 'text', default: '¥1,870' },
    { key: 'p2Tax', label: '商品2 税', type: 'text', default: '' },
    { key: 'p2Sale', label: '商品2 セール', type: 'text', default: '50%OFF' },
    { key: 'p2Old', label: '商品2 旧価格', type: 'text', default: '¥3,740' },
    { key: 'columns', label: '表示数', type: 'select', options: ['2', '4'], default: '2' },
    { key: 'accentTab', label: 'タブ色', type: 'color', default: '#6b4dc4' },
    { key: 'accentStripe1', label: 'ストライプ色1', type: 'color', default: '#f5a623' },
    { key: 'accentStripe2', label: 'ストライプ色2', type: 'color', default: '#f7c948' },
  ],
  render: (v, g) => {
    const cols = parseInt(v.columns) || 2
    const s1 = v.accentStripe1, s2 = v.accentStripe2, tabC = v.accentTab
    const u = 'erk' + Math.random().toString(36).slice(2, 7)
    let cards = ''
    for (let i = 1; i <= cols; i++) {
      const name = v[`p${i}Name`] || `Product ${i}`
      const price = v[`p${i}Price`] || ''
      const tax = v[`p${i}Tax`] || ''
      const sale = v[`p${i}Sale`] || ''
      const old = v[`p${i}Old`] || ''
      const isSale = !!sale
      cards += `<div class="product"><div class="rank"><span class="rank-num">${i}</span><div class="rank-stripe"></div></div><div class="product-img"><span class="ph">📦</span><div class="cart-btn">🛒</div></div><div class="product-name">${name}</div><div class="price-row">${isSale ? `<span class="sale-badge">${sale}</span><span class="sale-price">${price}</span><span class="original-price">${old}</span>` : `<span class="normal-price">${price}</span><span class="tax">${tax}</span>`}</div></div>`
    }
    return `<style>
.${u}{padding:32px 16px 24px;background:#fff;font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:600px;margin:0 auto}
.${u} .hdr-title{display:flex;align-items:baseline;gap:10px}
.${u} .hdr h2{font-size:32px;font-weight:900;color:#1a1a1a;margin:0;line-height:1}
.${u} .hdr span{font-size:14px;color:#888;font-weight:500}
.${u} .stripe{height:6px;margin-top:4px;background:repeating-linear-gradient(-45deg,${s1},${s1} 4px,${s2} 4px,${s2} 8px);border-radius:3px;max-width:440px}
.${u} .tabs{display:flex;gap:0;border-bottom:2px solid #eee;margin:16px 0;overflow-x:auto;-webkit-overflow-scrolling:touch}
.${u} .tabs a{padding:10px 16px;font-size:13px;font-weight:600;color:#888;text-decoration:none;white-space:nowrap;border-bottom:2px solid transparent;margin-bottom:-2px}
.${u} .tabs a:first-child{color:#1a1a1a;border-bottom-color:${tabC}}
.${u} .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}
.${u} .rank{margin-bottom:6px}
.${u} .rank-num{font-size:24px;font-weight:900;color:#1a1a1a;line-height:1}
.${u} .rank-stripe{height:4px;width:48px;margin-top:2px;background:repeating-linear-gradient(-45deg,${tabC},${tabC} 3px,${s1} 3px,${s1} 6px);border-radius:2px}
.${u} .product-img{aspect-ratio:1/1;background:#f5f5f5;border-radius:10px;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center}
.${u} .ph{font-size:48px;opacity:.15}
.${u} .cart-btn{position:absolute;right:8px;bottom:8px;width:36px;height:36px;background:#fff;border:1px solid #ddd;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 6px rgba(0,0,0,.08)}
.${u} .product-name{font-size:13px;font-weight:500;color:#1a1a1a;margin-top:8px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.${u} .price-row{display:flex;align-items:baseline;gap:6px;margin-top:4px;flex-wrap:wrap}
.${u} .sale-badge{padding:2px 8px;background:#e53e3e;color:#fff;font-size:10px;font-weight:700;border-radius:3px}
.${u} .sale-price{font-size:16px;font-weight:900;color:#e53e3e}
.${u} .original-price{font-size:13px;color:#999;text-decoration:line-through}
.${u} .normal-price{font-size:16px;font-weight:900;color:#1a1a1a}
.${u} .tax{font-size:11px;color:#888}
@media(max-width:768px){.${u} .grid{gap:12px}.${u} .product-name{font-size:12px}}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><div class="hdr-title"><h2>${v.sectionTitle}</h2><span>${v.sectionSub}</span></div><div class="stripe"></div></div>
<div class="tabs"><a href="#">${v.tab1}</a><a href="#">${v.tab2}</a><a href="#">${v.tab3}</a><a href="#">${v.tab4}</a></div>
<div class="grid">${cards}</div>
</div></section>`
  },
}
