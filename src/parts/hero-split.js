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
    return `<section style="min-height:100vh;display:grid;grid-template-columns:1fr 1fr;font-family:'Noto Sans JP',sans-serif;background:${bg}"><div style="display:flex;align-items:center;padding:80px 60px;${flip ? 'order:2' : ''}"><div><h1 style="font-size:clamp(40px,5vw,72px);font-weight:900;color:#1a1a1a;line-height:1.1;margin:0 0 28px;letter-spacing:-2px;white-space:pre-line">${v.headline}</h1><p style="font-size:16px;color:#666;line-height:1.9;margin:0 0 40px;max-width:400px">${v.subtext}</p><div style="display:flex;gap:12px"><a href="#" style="display:inline-block;padding:14px 32px;background:${ac};color:#fff;font-size:14px;font-weight:600;border-radius:100px;text-decoration:none">${v.cta}</a>${v.showCta2 ? `<a href="#" style="display:inline-block;padding:14px 32px;background:transparent;color:${ac};font-size:14px;font-weight:600;border-radius:100px;text-decoration:none;border:1px solid ${ac}80">${v.cta2}</a>` : ''}</div></div></div><div style="position:relative;overflow:hidden;${flip ? 'order:1' : ''}"><div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 20%,${ac}30,transparent 50%),radial-gradient(ellipse at 70% 80%,#6366f130,transparent 50%),radial-gradient(ellipse at 50% 50%,#f59e0b20,transparent 60%),${bg}"></div><div style="position:absolute;inset:40px;border:1px solid ${ac}20;border-radius:24px"></div><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:120px;height:120px;border:2px solid ${ac}40;border-radius:50%;display:flex;align-items:center;justify-content:center"><div style="width:60px;height:60px;background:${ac};border-radius:50%;opacity:.8"></div></div></div></section>`
  },
}
