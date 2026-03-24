export default {
  id: 'contact-split',
  name: 'スプリットフォーム',
  category: 'お問い合わせ',
  desc: '左に情報、右にフォームの2カラム構成',
  thumb: 'default',
  fields: [
    { key: 'headline', label: '見出し', type: 'text', default: 'お気軽にご相談ください' },
    { key: 'subtext', label: 'サブテキスト', type: 'textarea', default: 'プロジェクトのご相談、お見積もりのご依頼など、どんなことでもお問い合わせください。2営業日以内にご返信いたします。' },
    { key: 'email', label: 'メールアドレス', type: 'text', default: 'hello@example.com' },
    { key: 'phone', label: '電話番号', type: 'text', default: '03-1234-5678' },
    { key: 'address', label: '住所', type: 'text', default: '東京都渋谷区〇〇 1-2-3' },
    { key: 'showMap', label: '情報を表示', type: 'toggle', default: true },
    { key: 'theme', label: 'テーマ', type: 'select', options: ['ライト', 'ダーク'], default: 'ダーク' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.accent
    const dark = v.theme === 'ダーク'
    const bg = dark ? '#0a0a10' : '#f8f8fa'
    const cardBg = dark ? '#111118' : '#fff'
    const tc = dark ? '#e8e8f0' : '#1a1a1a'
    const sc = dark ? '#888898' : '#666'
    const inputBg = dark ? '#0a0a10' : '#f4f4f8'
    const bdr = dark ? '#1e1e2a' : '#ddd'
    const u = 'cf' + Math.random().toString(36).slice(2, 7)
    return `<style>
.${u}{padding:120px 40px;background:${bg};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1.2fr;gap:64px;align-items:start}
.${u} h2{font-size:clamp(24px,3vw,36px);font-weight:800;color:${tc};margin:0 0 20px;line-height:1.4}
.${u} .sub{font-size:15px;color:${sc};line-height:1.9;margin:0 0 40px}
.${u} .info{display:flex;flex-direction:column;gap:16px}
.${u} .info-item{display:flex;align-items:center;gap:12px;font-size:14px;color:${sc}}
.${u} .info-icon{width:36px;height:36px;background:${ac}15;border-radius:8px;display:flex;align-items:center;justify-content:center;color:${ac};font-size:16px;flex-shrink:0}
.${u} .form{background:${cardBg};border-radius:16px;padding:40px}
.${u} .row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
.${u} .field{display:flex;flex-direction:column;gap:6px;margin-bottom:0}
.${u} .field.full{grid-column:1/-1}
.${u} label{font-size:12px;font-weight:600;color:${sc}}
.${u} input,.${u} textarea{padding:12px 16px;background:${inputBg};border:1px solid ${bdr};border-radius:8px;font-size:14px;color:${tc};font-family:'Noto Sans JP',sans-serif;outline:none}
.${u} textarea{resize:vertical;min-height:100px}
.${u} .submit{width:100%;padding:16px;background:${ac};color:#fff;font-size:15px;font-weight:700;border:none;border-radius:8px;cursor:pointer;margin-top:8px;font-family:'Noto Sans JP',sans-serif}
@media(max-width:768px){
.${u}{padding:60px 20px}
.${u} .wrap{grid-template-columns:1fr;gap:32px}
.${u} .form{padding:24px}
.${u} .row{grid-template-columns:1fr}
.${u} .sub{margin:0 0 24px}
}
</style>
<section class="${u}"><div class="wrap">
<div>
<h2>${v.headline}</h2>
<p class="sub">${v.subtext}</p>
${v.showMap ? `<div class="info">
<div class="info-item"><div class="info-icon">✉</div><span>${v.email}</span></div>
<div class="info-item"><div class="info-icon">☎</div><span>${v.phone}</span></div>
<div class="info-item"><div class="info-icon">📍</div><span>${v.address}</span></div>
</div>` : ''}
</div>
<div class="form">
<div class="row">
<div class="field"><label>お名前</label><input type="text" placeholder="山田 太郎"></div>
<div class="field"><label>メールアドレス</label><input type="email" placeholder="you@example.com"></div>
</div>
<div class="row">
<div class="field full"><label>会社名</label><input type="text" placeholder="株式会社〇〇"></div>
</div>
<div class="row">
<div class="field full"><label>お問い合わせ内容</label><textarea placeholder="ご相談内容をご記入ください"></textarea></div>
</div>
<button class="submit">送信する</button>
</div>
</div></section>`
  },
}
