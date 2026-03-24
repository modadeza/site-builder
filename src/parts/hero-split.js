export default {
  id: 'hero-split',
  name: 'スプリット',
  category: 'ヒーロー',
  desc: '左右分割＋グラデーションメッシュ',
  thumb: 'split',
  fields: [
    { key: 'headline', label: '見出し', type: 'textarea', default: 'Designing\nthe Next.' },
    { key: 'subtext', label: 'サブテキスト', type: 'textarea', default: 'デジタルプロダクトの設計から実装まで一貫して支援するクリエイティブスタジオです。' },
    { key: 'cta', label: 'CTAテキスト', type: 'text', default: 'View Works' },
    { key: 'flipLayout', label: '左右反転', type: 'toggle', default: false },
    { key: 'showCta2', label: 'セカンドCTA', type: 'toggle', default: false },
    { key: 'cta2', label: 'セカンドCTAテキスト', type: 'text', default: 'お問い合わせ', showIf: 'showCta2' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'bgColor', label: '背景色', type: 'color', default: '', showIf: '_colorOverride' },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const bg = v.bgColor || g.bgLight, ac = v.accentColor || g.primary, flip = v.flipLayout
    const u = 'hs' + Math.random().toString(36).slice(2, 7)
    return `<style>
.${u}{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;font-family:'Noto Sans JP',sans-serif;background:${bg}}
.${u} .txt{display:flex;align-items:center;padding:80px 60px;${flip?'order:2':''}}
.${u} .txt div{max-width:480px}
.${u} h1{font-size:clamp(36px,5vw,72px);font-weight:900;color:#1a1a1a;line-height:1.1;margin:0 0 28px;letter-spacing:-2px;white-space:pre-line}
.${u} .sub{font-size:16px;color:#666;line-height:1.9;margin:0 0 40px;max-width:400px}
.${u} .ctas{display:flex;gap:12px;flex-wrap:wrap}
.${u} .b1{display:inline-block;padding:14px 32px;background:${ac};color:#fff;font-size:14px;font-weight:600;border-radius:100px;text-decoration:none}
.${u} .b2{display:inline-block;padding:14px 32px;background:transparent;color:${ac};font-size:14px;font-weight:600;border-radius:100px;text-decoration:none;border:1px solid ${ac}80}
.${u} .vis{position:relative;overflow:hidden;${flip?'order:1':''}}
.${u} .mesh{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 20%,${ac}30,transparent 50%),radial-gradient(ellipse at 70% 80%,#6366f130,transparent 50%),radial-gradient(ellipse at 50% 50%,#f59e0b20,transparent 60%),${bg}}
.${u} .frame{position:absolute;inset:40px;border:1px solid ${ac}20;border-radius:24px}
.${u} .circ{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:120px;height:120px;border:2px solid ${ac}40;border-radius:50%;display:flex;align-items:center;justify-content:center}
.${u} .dot{width:60px;height:60px;background:${ac};border-radius:50%;opacity:.8}
@media(max-width:768px){
.${u}{grid-template-columns:1fr;min-height:auto}
.${u} .txt{padding:60px 20px 40px;order:1!important}
.${u} .txt div{max-width:100%}
.${u} h1{font-size:clamp(32px,8vw,48px)}
.${u} .sub{font-size:15px;margin:0 0 32px;max-width:100%}
.${u} .b1,.${u} .b2{width:100%;text-align:center;padding:14px 24px}
.${u} .ctas{flex-direction:column}
.${u} .vis{min-height:300px;order:2!important}
.${u} .frame{inset:20px}
.${u} .circ{width:80px;height:80px}
.${u} .dot{width:40px;height:40px}
}
</style>
<section class="${u}">
<div class="txt"><div>
<h1>${v.headline}</h1>
<p class="sub">${v.subtext}</p>
<div class="ctas"><a href="#" class="b1">${v.cta}</a>${v.showCta2?`<a href="#" class="b2">${v.cta2}</a>`:''}</div>
</div></div>
<div class="vis"><div class="mesh"></div><div class="frame"></div><div class="circ"><div class="dot"></div></div></div>
</section>`
  },
}
