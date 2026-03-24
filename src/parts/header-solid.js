export default {
  id: 'header-solid',
  name: 'ソリッド',
  category: 'ヘッダー',
  desc: '背景付きの固定ナビゲーション',
  thumb: 'default',
  fields: [
    { key: 'logo', label: 'ロゴテキスト', type: 'text', default: 'BRAND' },
    { key: 'nav1', label: 'ナビ1', type: 'text', default: 'About' },
    { key: 'nav2', label: 'ナビ2', type: 'text', default: 'Services' },
    { key: 'nav3', label: 'ナビ3', type: 'text', default: 'Works' },
    { key: 'nav4', label: 'ナビ4', type: 'text', default: 'Contact' },
    { key: 'showCta', label: 'CTAボタン', type: 'toggle', default: true },
    { key: 'ctaText', label: 'CTAテキスト', type: 'text', default: '無料相談', showIf: 'showCta' },
    { key: 'theme', label: 'テーマ', type: 'select', options: ['ダーク', 'ライト'], default: 'ダーク' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary
    const dark = v.theme === 'ダーク'
    const bg = dark ? '#0a0a12' : '#ffffff'
    const tc = dark ? '#ffffffcc' : '#333'
    const lc = dark ? '#fff' : '#111'
    const bdr = dark ? '#ffffff10' : '#eee'
    const u = 'hs' + Math.random().toString(36).slice(2, 7)
    return `<style>
.${u}{background:${bg};border-bottom:1px solid ${bdr};font-family:'Noto Sans JP',sans-serif}
.${u} .bar{max-width:1200px;margin:0 auto;padding:16px 40px;display:flex;align-items:center;justify-content:space-between}
.${u} .logo{font-size:20px;font-weight:900;color:${lc};letter-spacing:1px;text-decoration:none}
.${u} .logo span{color:${ac}}
.${u} nav{display:flex;gap:28px;align-items:center}
.${u} nav a{color:${tc};font-size:13px;text-decoration:none;font-weight:500}
.${u} .cta{padding:10px 24px;background:${ac};color:#fff;font-size:13px;font-weight:600;border-radius:100px;text-decoration:none}
.${u} .burger{display:none;flex-direction:column;gap:5px;cursor:pointer}
.${u} .burger span{display:block;width:22px;height:2px;background:${lc};border-radius:1px}
@media(max-width:768px){
.${u} .bar{padding:14px 20px}
.${u} nav{display:none}
.${u} .burger{display:flex}
}
</style>
<header class="${u}"><div class="bar">
<a href="#" class="logo">${v.logo.replace(/^(.)/, '<span>$1</span>')}</a>
<nav>
<a href="#">${v.nav1}</a><a href="#">${v.nav2}</a><a href="#">${v.nav3}</a><a href="#">${v.nav4}</a>
${v.showCta ? `<a href="#" class="cta">${v.ctaText}</a>` : ''}
</nav>
<div class="burger"><span></span><span></span><span></span></div>
</div></header>`
  },
}
