export default {
  id: 'pricing-cards',
  name: 'プランカード',
  category: '料金プラン',
  desc: '3プラン構成の料金表',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'セクション名', type: 'text', default: 'Pricing' },
    { key: 'sectionSub', label: 'セクション説明', type: 'text', default: 'プロジェクトの規模に合わせて最適なプランをお選びいただけます。' },
    { key: 'p1Name', label: 'プラン1 名前', type: 'text', default: 'Light' },
    { key: 'p1Price', label: 'プラン1 価格', type: 'text', default: '¥300,000〜' },
    { key: 'p1Desc', label: 'プラン1 説明', type: 'text', default: 'LP・シンプルなサイト向け' },
    { key: 'p1F', label: 'プラン1 特徴（改行区切り）', type: 'textarea', default: '1〜3ページ\nレスポンシブ対応\n基本SEO設定\n納期: 2〜3週間' },
    { key: 'p2Name', label: 'プラン2 名前', type: 'text', default: 'Standard' },
    { key: 'p2Price', label: 'プラン2 価格', type: 'text', default: '¥600,000〜' },
    { key: 'p2Desc', label: 'プラン2 説明', type: 'text', default: 'コーポレートサイト向け' },
    { key: 'p2F', label: 'プラン2 特徴（改行区切り）', type: 'textarea', default: '5〜10ページ\nCMS導入\nアクセス解析\n納期: 4〜6週間' },
    { key: 'p3Name', label: 'プラン3 名前', type: 'text', default: 'Premium' },
    { key: 'p3Price', label: 'プラン3 価格', type: 'text', default: '¥1,200,000〜' },
    { key: 'p3Desc', label: 'プラン3 説明', type: 'text', default: '大規模・カスタム開発向け' },
    { key: 'p3F', label: 'プラン3 特徴（改行区切り）', type: 'textarea', default: 'ページ数無制限\nカスタム機能開発\n優先サポート\n納期: 8〜12週間' },
    { key: 'theme', label: 'テーマ', type: 'select', options: ['ライト', 'ダーク'], default: 'ライト' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary
    const dark = v.theme === 'ダーク'
    const bg = dark ? '#08080e' : '#f8f8fa'
    const cardBg = dark ? '#111118' : '#fff'
    const tc = dark ? '#e8e8f0' : '#1a1a1a'
    const sc = dark ? '#888898' : '#888'
    const bdr = dark ? '#1e1e2a' : '#e8e8f0'
    const u = 'pr' + Math.random().toString(36).slice(2, 7)
    let cards = ''
    for (let i = 1; i <= 3; i++) {
      const isF = i === 2
      const name = v[`p${i}Name`] || `Plan ${i}`
      const price = v[`p${i}Price`] || ''
      const desc = v[`p${i}Desc`] || ''
      const features = (v[`p${i}F`] || '').split('\n').filter(Boolean).map(f => `<li>✓ ${f}</li>`).join('')
      cards += `<div class="card${isF ? ' featured' : ''}">
${isF ? '<div class="badge">POPULAR</div>' : ''}
<h3>${name}</h3><p class="desc">${desc}</p>
<div class="price">${price}</div>
<ul>${features}</ul>
<a href="#" class="btn">${isF ? 'このプランを選ぶ' : 'お問い合わせ'}</a>
</div>`
    }
    return `<style>
.${u}{padding:120px 40px;background:${bg};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:1100px;margin:0 auto}
.${u} .hdr{text-align:center;margin-bottom:64px}
.${u} .hdr span{font-size:12px;letter-spacing:4px;color:${ac};text-transform:uppercase;font-weight:600}
.${u} .hdr p{font-size:16px;color:${sc};margin:12px 0 0}
.${u} .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:start}
.${u} .card{background:${cardBg};border:1px solid ${bdr};border-radius:16px;padding:40px 32px;position:relative;text-align:center}
.${u} .featured{background:${ac};border-color:${ac};transform:scale(1.04)}
.${u} .badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);padding:4px 16px;background:#fff;color:${ac};font-size:11px;font-weight:700;border-radius:100px;letter-spacing:1px}
.${u} h3{font-size:18px;font-weight:700;color:${tc};margin:0 0 8px}
.${u} .featured h3{color:#fff}
.${u} .desc{font-size:13px;color:${sc};margin:0 0 24px}
.${u} .featured .desc{color:#ffffffaa}
.${u} .price{font-size:28px;font-weight:900;color:${tc};margin:0 0 28px;letter-spacing:-1px}
.${u} .featured .price{color:#fff}
.${u} ul{list-style:none;padding:0;margin:0 0 32px;text-align:left}
.${u} li{font-size:13px;color:${sc};padding:8px 0;border-bottom:1px solid ${bdr}}
.${u} .featured li{color:#ffffffbb;border-color:#ffffff15}
.${u} .btn{display:block;padding:14px;background:${ac}15;color:${ac};font-size:14px;font-weight:600;border-radius:8px;text-decoration:none;transition:all .2s}
.${u} .featured .btn{background:#fff;color:${ac}}
@media(max-width:768px){
.${u}{padding:60px 20px}
.${u} .grid{grid-template-columns:1fr;gap:16px}
.${u} .featured{transform:none}
.${u} .card{padding:32px 24px}
.${u} .hdr{margin-bottom:32px}
}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><span>${v.sectionTitle}</span><p>${v.sectionSub}</p></div>
<div class="grid">${cards}</div>
</div></section>`
  },
}
