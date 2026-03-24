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
    const pad = { S: '60px 40px', M: '100px 40px', L: '140px 40px' }[v.spacing] || '100px 40px'
    return `<section style="padding:${pad};background:linear-gradient(135deg,${c1},${c2});font-family:'Noto Sans JP',sans-serif;position:relative;overflow:hidden"><div style="position:absolute;top:-50%;right:-10%;width:500px;height:500px;border-radius:50%;background:rgba(255,255,255,.06)"></div><div style="position:absolute;bottom:-30%;left:-5%;width:400px;height:400px;border-radius:50%;background:rgba(255,255,255,.04)"></div><div style="max-width:700px;margin:0 auto;text-align:center;position:relative;z-index:1"><h2 style="font-size:clamp(28px,4vw,44px);font-weight:800;color:#fff;margin:0 0 20px;line-height:1.3">${v.headline}</h2><p style="font-size:16px;color:#ffffffcc;margin:0 0 40px;line-height:1.8">${v.subtext}</p><div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap"><a href="#" style="display:inline-block;padding:18px 48px;background:#fff;color:${c1};font-size:15px;font-weight:700;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(0,0,0,.15)">${v.cta}</a>${v.showCta2 ? `<a href="#" style="display:inline-block;padding:18px 48px;background:transparent;color:#fff;font-size:15px;font-weight:600;border-radius:100px;text-decoration:none;border:2px solid rgba(255,255,255,.4)">${v.cta2}</a>` : ''}</div></div></section>`
  },
}
