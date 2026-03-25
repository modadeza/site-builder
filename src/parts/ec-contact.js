export default {
  id: 'ec-contact',
  name: '電話+LINE問い合わせ',
  category: 'EC：お問い合わせ',
  desc: '電話番号とLINE CTA',
  thumb: 'default',
  fields: [
    { key: 'headline', label: '見出し', type: 'text', default: 'お問い合わせ' },
    { key: 'phone', label: '電話番号', type: 'text', default: '0120-686-068' },
    { key: 'phoneNote', label: '電話備考', type: 'text', default: '受付時間: 10:00〜19:00（土日祝除く）' },
    { key: 'showLine', label: 'LINE CTA', type: 'toggle', default: true },
    { key: 'lineText', label: 'LINE CTAテキスト', type: 'text', default: '公式LINEを友達追加', showIf: 'showLine' },
    { key: 'lineSub', label: 'LINE説明', type: 'text', default: 'LINEでお気軽にご相談ください', showIf: 'showLine' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary
    const u = 'ect' + Math.random().toString(36).slice(2, 7)
    return `<style>
.${u}{padding:48px 20px;background:#fff;font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:700px;margin:0 auto;text-align:center}
.${u} h2{font-size:20px;font-weight:800;color:#1a1a1a;margin:0 0 32px;padding-bottom:16px;border-bottom:2px solid #eee}
.${u} .phone-block{margin-bottom:32px}
.${u} .phone-label{font-size:12px;color:#888;margin-bottom:8px}
.${u} .phone{font-size:clamp(28px,5vw,40px);font-weight:900;color:#1a1a1a;letter-spacing:2px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:12px}
.${u} .phone-icon{width:44px;height:44px;background:${ac}15;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.${u} .phone-note{font-size:12px;color:#999;margin-top:8px}
.${u} .line-block{background:#06C755;border-radius:16px;padding:24px 32px;margin-top:24px}
.${u} .line-block h3{font-size:11px;color:#ffffffaa;margin:0 0 8px;font-weight:500}
.${u} .line-cta{display:inline-block;padding:14px 40px;background:#fff;color:#06C755;font-size:15px;font-weight:700;border-radius:100px;text-decoration:none;box-shadow:0 4px 12px rgba(0,0,0,.1)}
@media(max-width:768px){
.${u}{padding:32px 16px}
.${u} .phone{font-size:clamp(24px,6vw,32px)}
.${u} .line-block{padding:20px;border-radius:12px}
.${u} .line-cta{width:100%;padding:14px 24px}
}
</style>
<section class="${u}"><div class="wrap">
<h2>${v.headline}</h2>
<div class="phone-block">
<div class="phone-label">電話でのご相談</div>
<a href="tel:${v.phone.replace(/-/g,'')}" class="phone"><div class="phone-icon">☎</div>${v.phone}</a>
<div class="phone-note">${v.phoneNote}</div>
</div>
${v.showLine ? `<div class="line-block"><h3>${v.lineSub}</h3><a href="#" class="line-cta">${v.lineText}</a></div>` : ''}
</div></section>`
  },
}
