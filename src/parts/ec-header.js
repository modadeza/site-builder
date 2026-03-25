export default {
  id: 'ec-header',
  name: 'ECナビ',
  category: 'EC：ヘッダー',
  desc: '検索バー+カート付きのECヘッダー',
  thumb: 'default',
  fields: [
    { key: 'logo', label: 'ロゴテキスト', type: 'text', default: 'MDL.make' },
    { key: 'searchPlaceholder', label: '検索プレースホルダー', type: 'text', default: 'キーワードで検索' },
    { key: 'nav1', label: 'ナビ1', type: 'text', default: 'ゲーミングPC' },
    { key: 'nav2', label: 'ナビ2', type: 'text', default: 'クリエイターPC' },
    { key: 'nav3', label: 'ナビ3', type: 'text', default: 'ノートPC' },
    { key: 'nav4', label: 'ナビ4', type: 'text', default: 'パーツ' },
    { key: 'nav5', label: 'ナビ5', type: 'text', default: 'セール' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary
    const u = 'ech' + Math.random().toString(36).slice(2, 7)
    return `<style>
.${u}{background:#111;font-family:'Noto Sans JP',sans-serif}
.${u} .top{max-width:1200px;margin:0 auto;padding:12px 20px;display:flex;align-items:center;gap:16px}
.${u} .logo{font-size:20px;font-weight:900;color:#fff;text-decoration:none;white-space:nowrap}
.${u} .logo span{color:${ac}}
.${u} .search{flex:1;position:relative;max-width:480px}
.${u} .search input{width:100%;padding:10px 40px 10px 16px;border:1px solid #333;border-radius:8px;background:#1a1a1a;color:#fff;font-size:13px;outline:none;font-family:'Noto Sans JP',sans-serif}
.${u} .search input:focus{border-color:${ac}}
.${u} .search-icon{position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#666;font-size:14px}
.${u} .icons{display:flex;gap:16px;align-items:center;margin-left:auto}
.${u} .icon-btn{color:#ccc;font-size:18px;text-decoration:none;position:relative}
.${u} .cart-badge{position:absolute;top:-6px;right:-8px;width:16px;height:16px;background:${ac};border-radius:50%;font-size:9px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}
.${u} .nav{border-top:1px solid #222;overflow-x:auto}
.${u} .nav-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;gap:0}
.${u} .nav a{padding:10px 16px;color:#ccc;font-size:12px;text-decoration:none;white-space:nowrap;font-weight:500;transition:color .2s;border-bottom:2px solid transparent}
.${u} .nav a:hover{color:#fff;border-bottom-color:${ac}}
.${u} .burger{display:none;color:#fff;font-size:20px;cursor:pointer;padding:4px}
@media(max-width:768px){
.${u} .top{padding:10px 16px;gap:10px}
.${u} .logo{font-size:16px}
.${u} .search{max-width:none}
.${u} .icons{gap:12px}
.${u} .nav-inner{padding:0 16px}
.${u} .nav a{padding:8px 12px;font-size:11px}
}
</style>
<header class="${u}">
<div class="top">
<a href="#" class="logo"><span>${v.logo.charAt(0)}</span>${v.logo.slice(1)}</a>
<div class="search"><input type="text" placeholder="${v.searchPlaceholder}"><span class="search-icon">🔍</span></div>
<div class="icons"><a href="#" class="icon-btn">♡</a><a href="#" class="icon-btn">🛒<span class="cart-badge">0</span></a><a href="#" class="icon-btn">👤</a></div>
</div>
<nav class="nav"><div class="nav-inner">
<a href="#">${v.nav1}</a><a href="#">${v.nav2}</a><a href="#">${v.nav3}</a><a href="#">${v.nav4}</a><a href="#">${v.nav5}</a>
</div></nav>
</header>`
  },
}
