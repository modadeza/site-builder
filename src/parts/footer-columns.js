export default {
  id: 'footer-columns',
  name: 'カラムフッター',
  category: 'フッター',
  desc: 'ロゴ＋リンクカラム＋コピーライト',
  thumb: 'default',
  fields: [
    { key: 'logo', label: 'ロゴテキスト', type: 'text', default: 'COMPANY' },
    { key: 'tagline', label: 'タグライン', type: 'text', default: 'テクノロジーで、未来をつくる。' },
    { key: 'col1Title', label: 'カラム1 タイトル', type: 'text', default: 'Services' },
    { key: 'col1Links', label: 'カラム1 リンク（改行区切り）', type: 'textarea', default: 'Web制作\nUI/UXデザイン\nシステム開発\nコンサルティング' },
    { key: 'col2Title', label: 'カラム2 タイトル', type: 'text', default: 'Company' },
    { key: 'col2Links', label: 'カラム2 リンク（改行区切り）', type: 'textarea', default: '会社概要\nチーム\n採用情報\nブログ' },
    { key: 'col3Title', label: 'カラム3 タイトル', type: 'text', default: 'Contact' },
    { key: 'col3Links', label: 'カラム3 リンク（改行区切り）', type: 'textarea', default: 'お問い合わせ\n03-1234-5678\nhello@example.com' },
    { key: 'copyright', label: 'コピーライト', type: 'text', default: '© 2025 Company Inc. All rights reserved.' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.accent
    const u = 'ft' + Math.random().toString(36).slice(2, 7)
    const renderLinks = (text) => (text || '').split('\n').filter(Boolean).map(l => `<a href="#">${l}</a>`).join('')
    return `<style>
.${u}{padding:80px 40px 40px;background:#08080e;font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:1200px;margin:0 auto}
.${u} .top{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:48px;padding-bottom:48px;border-bottom:1px solid #ffffff10}
.${u} .brand .logo{font-size:20px;font-weight:900;color:#fff;letter-spacing:2px;margin-bottom:12px}
.${u} .brand .tag{font-size:13px;color:#ffffff50;line-height:1.7}
.${u} .col h4{font-size:12px;font-weight:700;color:#ffffff60;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px}
.${u} .col a{display:block;font-size:13px;color:#ffffffaa;text-decoration:none;padding:4px 0;transition:color .2s}
.${u} .col a:hover{color:${ac}}
.${u} .bottom{padding-top:24px;display:flex;justify-content:space-between;align-items:center}
.${u} .copy{font-size:12px;color:#ffffff30}
.${u} .socials{display:flex;gap:12px}
.${u} .socials a{width:32px;height:32px;border-radius:50%;background:#ffffff08;display:flex;align-items:center;justify-content:center;color:#ffffff50;text-decoration:none;font-size:14px;transition:all .2s}
.${u} .socials a:hover{background:${ac};color:#fff}
@media(max-width:768px){
.${u}{padding:48px 20px 24px}
.${u} .top{grid-template-columns:1fr 1fr;gap:32px}
.${u} .brand{grid-column:1/-1}
.${u} .bottom{flex-direction:column;gap:16px;text-align:center}
}
@media(max-width:480px){
.${u} .top{grid-template-columns:1fr}
}
</style>
<footer class="${u}"><div class="wrap">
<div class="top">
<div class="brand"><div class="logo">${v.logo}</div><div class="tag">${v.tagline}</div></div>
<div class="col"><h4>${v.col1Title}</h4>${renderLinks(v.col1Links)}</div>
<div class="col"><h4>${v.col2Title}</h4>${renderLinks(v.col2Links)}</div>
<div class="col"><h4>${v.col3Title}</h4>${renderLinks(v.col3Links)}</div>
</div>
<div class="bottom">
<span class="copy">${v.copyright}</span>
<div class="socials"><a href="#">𝕏</a><a href="#">in</a><a href="#">▶</a></div>
</div>
</div></footer>`
  },
}
