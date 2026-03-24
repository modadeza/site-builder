export default {
  id: 'works-grid',
  name: 'グリッドギャラリー',
  category: '実績・事例',
  desc: 'ホバーエフェクト付きの実績グリッド',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'セクション名', type: 'text', default: 'Works' },
    { key: 'sectionSub', label: 'セクション説明', type: 'text', default: '私たちが手がけたプロジェクトの一部をご紹介します。' },
    { key: 'columns', label: 'カラム数', type: 'select', options: ['2', '3'], default: '3' },
    { key: 'w1Title', label: '実績1', type: 'text', default: 'ECサイト リニューアル' },
    { key: 'w1Cat', label: '実績1 カテゴリ', type: 'text', default: 'Web Design' },
    { key: 'w2Title', label: '実績2', type: 'text', default: 'コーポレートサイト制作' },
    { key: 'w2Cat', label: '実績2 カテゴリ', type: 'text', default: 'Branding' },
    { key: 'w3Title', label: '実績3', type: 'text', default: 'SaaSダッシュボード' },
    { key: 'w3Cat', label: '実績3 カテゴリ', type: 'text', default: 'UI/UX Design' },
    { key: 'showButton', label: '一覧ボタン', type: 'toggle', default: true },
    { key: 'buttonText', label: 'ボタンテキスト', type: 'text', default: 'すべての実績を見る', showIf: 'showButton' },
    { key: 'theme', label: 'テーマ', type: 'select', options: ['ライト', 'ダーク'], default: 'ダーク' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary, cols = parseInt(v.columns) || 3
    const dark = v.theme === 'ダーク'
    const bg = dark ? '#0a0a10' : '#f8f8fa'
    const tc = dark ? '#fff' : '#1a1a1a'
    const sc = dark ? '#ffffff60' : '#888'
    const cardBg = dark ? '#12121c' : '#fff'
    const u = 'wg' + Math.random().toString(36).slice(2, 7)
    const colors = [ac, '#6366f1', '#f59e0b']
    let cards = ''
    for (let i = 1; i <= cols; i++) {
      const t = v[`w${i}Title`] || `Project ${i}`
      const c = v[`w${i}Cat`] || ''
      cards += `<div class="card"><div class="img" style="background:linear-gradient(135deg,${colors[(i-1)%3]}20,${colors[(i-1)%3]}08)"><div class="overlay"><span>View →</span></div></div><h3>${t}</h3><span class="cat">${c}</span></div>`
    }
    return `<style>
.${u}{padding:120px 40px;background:${bg};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:1200px;margin:0 auto}
.${u} .hdr{text-align:center;margin-bottom:60px}
.${u} .hdr span{font-size:12px;letter-spacing:4px;color:${ac};text-transform:uppercase;font-weight:600}
.${u} .hdr p{font-size:16px;color:${sc};margin:12px 0 0}
.${u} .grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:24px}
.${u} .card{cursor:pointer}
.${u} .img{aspect-ratio:4/3;border-radius:12px;overflow:hidden;position:relative;background:${cardBg}}
.${u} .overlay{position:absolute;inset:0;background:${ac}00;display:flex;align-items:center;justify-content:center;transition:background .3s}
.${u} .overlay span{color:#fff;font-weight:600;font-size:14px;opacity:0;transition:opacity .3s}
.${u} .card:hover .overlay{background:${ac}cc}
.${u} .card:hover .overlay span{opacity:1}
.${u} h3{font-size:16px;font-weight:700;color:${tc};margin:16px 0 4px}
.${u} .cat{font-size:12px;color:${sc}}
.${u} .more{text-align:center;margin-top:48px}
.${u} .btn{display:inline-block;padding:14px 36px;border:1px solid ${ac};color:${ac};font-size:14px;font-weight:600;border-radius:100px;text-decoration:none;transition:all .2s}
.${u} .btn:hover{background:${ac};color:#fff}
@media(max-width:768px){
.${u}{padding:60px 20px}
.${u} .grid{grid-template-columns:1fr;gap:20px}
.${u} .hdr{margin-bottom:32px}
.${u} h3{font-size:15px}
.${u} .btn{width:100%;text-align:center}
}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><span>${v.sectionTitle}</span><p>${v.sectionSub}</p></div>
<div class="grid">${cards}</div>
${v.showButton ? `<div class="more"><a href="#" class="btn">${v.buttonText}</a></div>` : ''}
</div></section>`
  },
}
