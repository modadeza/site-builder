export default {
  id: 'hero-diagonal',
  name: 'ダイアゴナル',
  category: 'ヒーロー',
  desc: '斜めclip-pathのダイナミックFV',
  thumb: 'diagonal',
  fields: [
    { key: 'headline', label: '見出し', type: 'text', default: '未来を、ともにつくる。' },
    { key: 'subtext', label: 'サブテキスト', type: 'textarea', default: 'テクノロジーとデザインの力で、ビジネスの可能性を広げます。' },
    { key: 'tagline', label: 'タグライン', type: 'text', default: 'Innovation × Design' },
    { key: 'cta', label: 'CTAテキスト', type: 'text', default: 'お問い合わせ' },
    { key: 'showCta2', label: 'セカンドCTA', type: 'toggle', default: false },
    { key: 'cta2', label: 'セカンドCTAテキスト', type: 'text', default: '資料ダウンロード', showIf: 'showCta2' },
    { key: 'layout', label: 'レイアウト', type: 'select', options: ['左寄せ', '中央揃え'], default: '左寄せ' },
    { key: 'showScroll', label: 'SCROLL表示', type: 'toggle', default: true },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'bgColor', label: '背景色', type: 'color', default: '', showIf: '_colorOverride' },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const bg = v.bgColor || g.bg, ac = v.accentColor || g.accent, center = v.layout === '中央揃え'
    return `<section style="position:relative;min-height:100vh;overflow:hidden;background:${bg};font-family:'Noto Sans JP',sans-serif"><div style="position:absolute;top:0;right:0;width:55%;height:100%;background:linear-gradient(135deg,${ac}22,${ac}08);clip-path:polygon(25% 0,100% 0,100% 100%,0 100%)"></div><div style="position:absolute;top:20%;right:10%;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,${ac}15,transparent 70%);filter:blur(60px)"></div><div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${ac}40,transparent)"></div><div style="position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:0 40px;display:flex;align-items:center;${center ? 'justify-content:center;text-align:center' : ''};min-height:100vh"><div style="max-width:600px"><div style="display:inline-block;padding:6px 16px;border:1px solid ${ac}60;border-radius:100px;color:${ac};font-size:13px;letter-spacing:2px;margin-bottom:32px;text-transform:uppercase">${v.tagline}</div><h1 style="font-size:clamp(36px,5vw,64px);font-weight:800;color:#fff;line-height:1.2;margin:0 0 24px;letter-spacing:-1px">${v.headline}</h1><p style="font-size:18px;color:#ffffffaa;line-height:1.8;margin:0 0 40px">${v.subtext}</p><div style="display:flex;gap:16px;${center ? 'justify-content:center' : ''}"><a href="#" style="display:inline-flex;align-items:center;gap:8px;padding:16px 36px;background:${ac};color:${bg};font-size:15px;font-weight:700;border-radius:6px;text-decoration:none">${v.cta} →</a>${v.showCta2 ? `<a href="#" style="display:inline-flex;align-items:center;padding:16px 36px;background:transparent;color:${ac};font-size:15px;font-weight:600;border-radius:6px;text-decoration:none;border:1px solid ${ac}60">${v.cta2}</a>` : ''}</div></div></div>${v.showScroll ? `<div style="position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;gap:24px;align-items:center"><div style="width:40px;height:1px;background:${ac}40"></div><span style="color:#ffffff40;font-size:12px;letter-spacing:3px">SCROLL</span><div style="width:40px;height:1px;background:${ac}40"></div></div>` : ''}</section>`
  },
}
