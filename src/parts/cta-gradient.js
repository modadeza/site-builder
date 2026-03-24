export default {
  id: 'cta-gradient',
  name: 'グラデーションバー',
  category: 'CTA',
  desc: 'グラデーション背景のインパクトCTA',
  thumb: 'gradient',
  fields: [
    { key: 'headline', label: '見出し', type: 'text', default: '一緒に、はじめませんか？' },
    { key: 'subtext', label: 'サブテキスト', type: 'text', default: 'まずはお気軽にご相談ください。無料でお見積もりいたします。' },
    { key: 'cta', label: 'CTAテキスト', type: 'text', default: '無料相談を予約する' },
    { key: 'showCta2', label: 'セカンドCTA', type: 'toggle', default: false },
    { key: 'cta2', label: 'セカンドCTAテキスト', type: 'text', default: '資料をダウンロード', showIf: 'showCta2' },
    { key: 'spacing', label: '余白', type: 'select', options: ['S', 'M', 'L'], default: 'M' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'bgFrom', label: '開始色', type: 'color', default: '', showIf: '_colorOverride' },
    { key: 'bgTo', label: '終了色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const c1 = v.bgFrom || g.primary, c2 = v.bgTo || g.accent
    const pad = { S: '60px', M: '100px', L: '140px' }[v.spacing] || '100px'
    const u = 'cg' + Math.random().toString(36).slice(2, 7)
    return `<style>
.${u}{padding:${pad} 40px;background:linear-gradient(135deg,${c1},${c2});font-family:'Noto Sans JP',sans-serif;position:relative;overflow:hidden}
.${u} .deco1{position:absolute;top:-50%;right:-10%;width:500px;height:500px;border-radius:50%;background:rgba(255,255,255,.06)}
.${u} .deco2{position:absolute;bottom:-30%;left:-5%;width:400px;height:400px;border-radius:50%;background:rgba(255,255,255,.04)}
.${u} .inner{max-width:700px;margin:0 auto;text-align:center;position:relative;z-index:1}
.${u} h2{font-size:clamp(24px,4vw,44px);font-weight:800;color:#fff;margin:0 0 20px;line-height:1.3}
.${u} .sub{font-size:16px;color:#ffffffcc;margin:0 0 40px;line-height:1.8}
.${u} .ctas{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.${u} .b1{display:inline-block;padding:18px 48px;background:#fff;color:${c1};font-size:15px;font-weight:700;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(0,0,0,.15)}
.${u} .b2{display:inline-block;padding:18px 48px;background:transparent;color:#fff;font-size:15px;font-weight:600;border-radius:100px;text-decoration:none;border:2px solid rgba(255,255,255,.4)}
@media(max-width:768px){
.${u}{padding:60px 20px}
.${u} .sub{font-size:14px;margin:0 0 32px}
.${u} .ctas{flex-direction:column;align-items:stretch}
.${u} .b1,.${u} .b2{padding:16px 24px;font-size:14px;text-align:center;width:100%}
.${u} .deco1,.${u} .deco2{display:none}
}
</style>
<section class="${u}">
<div class="deco1"></div><div class="deco2"></div>
<div class="inner">
<h2>${v.headline}</h2>
<p class="sub">${v.subtext}</p>
<div class="ctas"><a href="#" class="b1">${v.cta}</a>${v.showCta2 ? `<a href="#" class="b2">${v.cta2}</a>` : ''}</div>
</div>
</section>`
  },
}
