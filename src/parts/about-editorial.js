export default {
  id: 'about-editorial',
  name: 'エディトリアル',
  category: '会社概要',
  desc: '雑誌風タイポグラフィ主導レイアウト',
  thumb: 'editorial',
  fields: [
    { key: 'label', label: 'ラベル', type: 'text', default: 'About Us' },
    { key: 'headline', label: '見出し', type: 'text', default: '想いを、かたちに。' },
    { key: 'bodyText', label: '本文', type: 'textarea', default: '2015年の創業以来、100社以上のデジタル変革を支援。単なる制作会社ではなく、ビジネスパートナーとして共に成長することを目指しています。' },
    { key: 'flipLayout', label: '左右反転', type: 'toggle', default: false },
    { key: 'showStats', label: '実績数値', type: 'toggle', default: true },
    { key: 'stat1', label: '数値1', type: 'text', default: '120+', showIf: 'showStats' },
    { key: 'stat1Label', label: '数値1ラベル', type: 'text', default: 'プロジェクト実績', showIf: 'showStats' },
    { key: 'stat2', label: '数値2', type: 'text', default: '98%', showIf: 'showStats' },
    { key: 'stat2Label', label: '数値2ラベル', type: 'text', default: 'クライアント継続率', showIf: 'showStats' },
    { key: 'showButton', label: 'ボタン表示', type: 'toggle', default: false },
    { key: 'buttonText', label: 'ボタンテキスト', type: 'text', default: '会社概要を見る', showIf: 'showButton' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'bgColor', label: '背景色', type: 'color', default: '', showIf: '_colorOverride' },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const bg = v.bgColor || g.bg, ac = v.accentColor || g.accent, flip = v.flipLayout
    return `<section style="padding:140px 40px;background:${bg};font-family:'Noto Sans JP',sans-serif;position:relative;overflow:hidden"><div style="position:absolute;top:60px;right:60px;font-size:200px;font-weight:900;color:#ffffff06;line-height:1;pointer-events:none">Ab</div><div style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1.2fr;gap:80px;align-items:center"><div style="${flip ? 'order:2' : ''}"><div style="font-size:11px;letter-spacing:5px;color:${ac};text-transform:uppercase;margin-bottom:24px;font-weight:500">${v.label}</div><h2 style="font-size:clamp(32px,4vw,52px);font-weight:800;color:#fff;line-height:1.3;margin:0 0 20px">${v.headline}</h2><div style="width:60px;height:2px;background:${ac};margin-bottom:32px"></div>${v.showStats ? `<div style="display:flex;gap:48px;margin-top:48px"><div><div style="font-size:42px;font-weight:800;color:${ac}">${v.stat1}</div><div style="font-size:13px;color:#ffffff60;margin-top:4px">${v.stat1Label}</div></div><div><div style="font-size:42px;font-weight:800;color:${ac}">${v.stat2}</div><div style="font-size:13px;color:#ffffff60;margin-top:4px">${v.stat2Label}</div></div></div>` : ''}${v.showButton ? `<a href="#" style="display:inline-block;margin-top:40px;padding:14px 32px;background:${ac};color:${bg};font-size:14px;font-weight:600;border-radius:6px;text-decoration:none">${v.buttonText}</a>` : ''}</div><div style="position:relative;${flip ? 'order:1' : ''}"><div style="position:absolute;top:-20px;left:-20px;width:100%;height:100%;border:1px solid ${ac}25;border-radius:4px"></div><p style="font-size:16px;color:#ffffffbb;line-height:2.2;margin:0;position:relative;z-index:1">${v.bodyText}</p></div></div></section>`
  },
}
