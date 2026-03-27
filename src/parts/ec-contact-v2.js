export default {
  id: 'ec-contact-v2',
  name: '電話+LINE（リッチ）',
  category: 'EC：お問い合わせ',
  desc: 'ダークカード+LINEグリーンカード',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'タイトル', type: 'text', default: 'お問い合わせ' },
    { key: 'sectionSub', label: 'サブ', type: 'text', default: 'CONTACT' },
    { key: 'phoneLabel', label: '電話ラベル', type: 'text', default: '電話でのご相談' },
    { key: 'phone', label: '電話番号', type: 'text', default: '0120-686-068' },
    { key: 'phoneNote', label: '電話備考', type: 'text', default: '営業時間：午前11時〜午後9時 年中無休' },
    { key: 'showLine', label: 'LINEカード', type: 'toggle', default: true },
    { key: 'lineLabel', label: 'LINEラベル', type: 'text', default: 'LINEでのご相談', showIf: 'showLine' },
    { key: 'lineCta', label: 'LINE CTA', type: 'text', default: '公式LINEを友達追加', showIf: 'showLine' },
    { key: 'lineNote', label: 'LINE備考', type: 'text', default: '営業時間：午前11時〜午後9時 年中無休', showIf: 'showLine' },
    { key: 'theme', label: 'ページ背景', type: 'select', options: ['ライト', 'ダーク'], default: 'ライト' },
  ],
  render: (v, g) => {
    const dark = v.theme === 'ダーク'
    const pageBg = dark ? '#111118' : '#f0f0f3'
    const dotColor = dark ? '#888' : '#333'
    const tc = dark ? '#fff' : '#1a1a1a'
    const u = 'ect' + Math.random().toString(36).slice(2, 7)
    return `<style>
.${u}{padding:32px 16px 24px;background:${pageBg};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:600px;margin:0 auto}
.${u} .hdr{display:flex;align-items:flex-start;gap:10px;margin-bottom:20px;padding-left:4px}
.${u} .hdr-dot{display:flex;flex-direction:column;gap:3px;height:28px;justify-content:space-between;padding:2px 0}
.${u} .hdr-dot i{display:block;width:4px;height:4px;border-radius:50%;background:${dotColor};flex-shrink:0}
.${u} .hdr h2{font-size:26px;font-weight:900;color:${tc};margin:0;line-height:1}
.${u} .hdr span{font-size:12px;color:#999;letter-spacing:2px;font-weight:500}
.${u} .phone-card{background:#2d3748;border-radius:14px;padding:28px 20px;text-align:center;margin-bottom:12px}
.${u} .phone-label{font-size:14px;font-weight:700;color:#fff;margin-bottom:16px}
.${u} .phone-num{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:14px}
.${u} .phone-num .icon{font-size:28px;color:#fff}
.${u} .phone-num span{font-size:clamp(30px,7vw,40px);font-weight:900;color:#fff;letter-spacing:1px}
.${u} .phone-note{font-size:12px;color:#ffffffaa}
.${u} .line-card{background:#06C755;border-radius:14px;padding:28px 20px;text-align:center}
.${u} .line-label{font-size:14px;font-weight:700;color:#fff;margin-bottom:14px;text-decoration:underline;text-underline-offset:3px}
.${u} .line-cta{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:14px}
.${u} .line-icon{width:32px;height:32px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:#06C755;flex-shrink:0}
.${u} .line-cta span{font-size:clamp(20px,5vw,26px);font-weight:900;color:#fff}
.${u} .line-note{font-size:12px;color:#ffffffcc}
@media(max-width:768px){.${u}{padding:24px 16px}}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><div class="hdr-dot"><i></i><i></i><i></i><i></i></div><h2>${v.sectionTitle}</h2><span>${v.sectionSub}</span></div>
<div class="phone-card"><div class="phone-label">${v.phoneLabel}</div><div class="phone-num"><span class="icon">📱</span><span>${v.phone}</span></div><div class="phone-note">${v.phoneNote}</div></div>
${v.showLine ? `<div class="line-card"><div class="line-label">${v.lineLabel}</div><div class="line-cta"><div class="line-icon">LINE</div><span>${v.lineCta}</span></div><div class="line-note">${v.lineNote}</div></div>` : ''}
</div></section>`
  },
}
