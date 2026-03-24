export default {
  id: 'faq-accordion',
  name: 'アコーディオン',
  category: 'FAQ',
  desc: '開閉式のよくある質問セクション',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'セクション名', type: 'text', default: 'FAQ' },
    { key: 'sectionSub', label: 'セクション説明', type: 'text', default: 'よくいただくご質問にお答えします。' },
    { key: 'q1', label: '質問1', type: 'text', default: '納期はどのくらいですか？' },
    { key: 'a1', label: '回答1', type: 'textarea', default: 'プロジェクトの規模によりますが、一般的なコーポレートサイトで約4〜8週間、LPで2〜3週間が目安です。' },
    { key: 'q2', label: '質問2', type: 'text', default: '費用の目安を教えてください。' },
    { key: 'a2', label: '回答2', type: 'textarea', default: 'コーポレートサイトは50万円〜、LP制作は20万円〜を目安にご案内しています。詳細はお見積もりにてご確認ください。' },
    { key: 'q3', label: '質問3', type: 'text', default: '修正回数に制限はありますか？' },
    { key: 'a3', label: '回答3', type: 'textarea', default: '基本プランでは3回まで含まれています。追加修正も柔軟に対応いたしますので、お気軽にご相談ください。' },
    { key: 'q4', label: '質問4', type: 'text', default: '保守・運用のサポートはありますか？' },
    { key: 'a4', label: '回答4', type: 'textarea', default: 'はい、月額制の保守プランをご用意しています。サーバー管理、セキュリティ更新、コンテンツ更新などを対応します。' },
    { key: 'theme', label: 'テーマ', type: 'select', options: ['ライト', 'ダーク'], default: 'ライト' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary
    const dark = v.theme === 'ダーク'
    const bg = dark ? '#0a0a10' : '#ffffff'
    const cardBg = dark ? '#111118' : '#f8f8fa'
    const tc = dark ? '#e0e0ea' : '#1a1a1a'
    const sc = dark ? '#999' : '#666'
    const bdr = dark ? '#1e1e2a' : '#e8e8f0'
    const u = 'fq' + Math.random().toString(36).slice(2, 7)
    let items = ''
    for (let i = 1; i <= 4; i++) {
      const q = v[`q${i}`], a = v[`a${i}`]
      if (!q) continue
      items += `<details class="item"><summary><span>${q}</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${ac}" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></summary><div class="ans">${a}</div></details>`
    }
    return `<style>
.${u}{padding:120px 40px;background:${bg};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:800px;margin:0 auto}
.${u} .hdr{text-align:center;margin-bottom:64px}
.${u} .hdr span{font-size:12px;letter-spacing:4px;color:${ac};text-transform:uppercase;font-weight:600}
.${u} .hdr p{font-size:16px;color:${sc};margin:12px 0 0}
.${u} .item{background:${cardBg};border:1px solid ${bdr};border-radius:12px;margin-bottom:12px;overflow:hidden}
.${u} summary{padding:20px 24px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;font-size:15px;font-weight:600;color:${tc};list-style:none}
.${u} summary::-webkit-details-marker{display:none}
.${u} summary svg{flex-shrink:0;transition:transform .2s}
.${u} .item[open] summary svg{transform:rotate(180deg)}
.${u} .item[open] summary{border-bottom:1px solid ${bdr}}
.${u} .ans{padding:20px 24px;font-size:14px;color:${sc};line-height:1.9}
@media(max-width:768px){
.${u}{padding:60px 20px}
.${u} summary{padding:16px 18px;font-size:14px}
.${u} .ans{padding:16px 18px;font-size:13px}
.${u} .hdr{margin-bottom:32px}
}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr"><span>${v.sectionTitle}</span><p>${v.sectionSub}</p></div>
${items}
</div></section>`
  },
}
