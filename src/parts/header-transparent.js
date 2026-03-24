export default {
  id: 'header-transparent',
  name: 'トランスペアレント',
  category: 'ヘッダー',
  desc: '透過背景のオーバーレイナビ',
  thumb: 'default',
  fields: [
    { key: 'logo', label: 'ロゴテキスト', type: 'text', default: 'COMPANY' },
    { key: 'nav1', label: 'ナビ1', type: 'text', default: 'サービス' },
    { key: 'nav2', label: 'ナビ2', type: 'text', default: '実績' },
    { key: 'nav3', label: 'ナビ3', type: 'text', default: '会社概要' },
    { key: 'nav4', label: 'ナビ4', type: 'text', default: 'ブログ' },
    { key: 'ctaText', label: 'CTAテキスト', type: 'text', default: 'お問い合わせ' },
    { key: 'showCta', label: 'CTAボタン', type: 'toggle', default: true },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.accent
    const u = 'ht' + Math.random().toString(36).slice(2, 7)
    return `<style>
.${u}{position:relative;z-index:100;font-family:'Noto Sans JP',sans-serif}
.${u} .bar{max-width:1200px;margin:0 auto;padding:20px 40px;display:flex;align-items:center;justify-content:space-between}
.${u} .logo{font-size:18px;font-weight:800;color:#fff;letter-spacing:2px;text-decoration:none}
.${u} nav{display:flex;gap:32px;align-items:center}
.${u} nav a{color:#ffffffbb;font-size:13px;text-decoration:none;font-weight:500;transition:color .2s}
.${u} nav a:hover{color:#fff}
.${u} .cta{padding:10px 24px;background:${ac};color:#fff;font-size:13px;font-weight:600;border-radius:6px;text-decoration:none}
.${u} .burger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px}
.${u} .burger span{display:block;width:22px;height:2px;background:#fff;border-radius:1px}
@media(max-width:768px){
.${u} .bar{padding:16px 20px}
.${u} nav{display:none}
.${u} .burger{display:flex}
.${u} .logo{font-size:16px}
}
</style>
<header class="${u}"><div class="bar">
<a href="#" class="logo">${v.logo}</a>
<nav>
<a href="#">${v.nav1}</a><a href="#">${v.nav2}</a><a href="#">${v.nav3}</a><a href="#">${v.nav4}</a>
${v.showCta ? `<a href="#" class="cta">${v.ctaText}</a>` : ''}
</nav>
<div class="burger"><span></span><span></span><span></span></div>
</div></header>`
  },
}
