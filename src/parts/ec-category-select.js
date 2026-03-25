export default {
  id: 'ec-category-select',
  name: 'カテゴリ選択',
  category: 'EC：ナビゲーション',
  desc: 'アイコン付きカテゴリ選択グリッド',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'セクション名', type: 'text', default: 'パーツから探す' },
    { key: 'group1Title', label: 'グループ1 タイトル', type: 'text', default: 'CPUから選ぶ' },
    { key: 'g1Item1', label: 'グループ1 項目1', type: 'text', default: 'AMD Ryzen' },
    { key: 'g1Item2', label: 'グループ1 項目2', type: 'text', default: 'Intel Core' },
    { key: 'group2Title', label: 'グループ2 タイトル', type: 'text', default: 'GPUから選ぶ' },
    { key: 'g2Item1', label: 'グループ2 項目1', type: 'text', default: 'NVIDIA GeForce' },
    { key: 'g2Item2', label: 'グループ2 項目2', type: 'text', default: 'AMD Radeon' },
    { key: 'theme', label: 'テーマ', type: 'select', options: ['ライト', 'ダーク'], default: 'ライト' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || g.primary
    const dark = v.theme === 'ダーク'
    const bg = dark ? '#0e0e14' : '#fff'
    const cardBg = dark ? '#161620' : '#f4f4f8'
    const tc = dark ? '#e8e8f0' : '#1a1a1a'
    const sc = dark ? '#888' : '#666'
    const bdr = dark ? '#1e1e2a' : '#e8e8f0'
    const u = 'ecc' + Math.random().toString(36).slice(2, 7)

    const renderGroup = (title, items) => {
      const itemHTML = items.filter(Boolean).map(item =>
        `<a href="#" class="item"><div class="item-icon" style="background:${ac}12"><span style="color:${ac}">⬡</span></div><span>${item}</span></a>`
      ).join('')
      return `<div class="group"><h3>${title}</h3><div class="items">${itemHTML}</div></div>`
    }

    return `<style>
.${u}{padding:48px 20px;background:${bg};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:1200px;margin:0 auto}
.${u} .hdr{font-size:18px;font-weight:800;color:${tc};margin:0 0 24px;display:flex;align-items:baseline;gap:12px}
.${u} .hdr span{font-size:11px;color:#999;letter-spacing:1px;text-transform:uppercase}
.${u} .groups{display:flex;flex-direction:column;gap:24px}
.${u} .group h3{font-size:13px;font-weight:700;color:${ac};margin:0 0 12px;padding:8px 16px;background:${ac}10;border-radius:8px;display:inline-block}
.${u} .items{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.${u} .item{display:flex;align-items:center;gap:12px;padding:16px 20px;background:${cardBg};border:1px solid ${bdr};border-radius:12px;text-decoration:none;transition:all .2s}
.${u} .item:hover{border-color:${ac};box-shadow:0 4px 16px rgba(0,0,0,.06)}
.${u} .item-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.${u} .item span{font-size:14px;font-weight:600;color:${tc}}
@media(max-width:768px){
.${u}{padding:32px 16px}
.${u} .items{grid-template-columns:1fr 1fr;gap:8px}
.${u} .item{padding:12px 14px;gap:8px}
.${u} .item-icon{width:36px;height:36px;font-size:16px}
.${u} .item span{font-size:12px}
}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr">${v.sectionTitle}</div>
<div class="groups">
${renderGroup(v.group1Title, [v.g1Item1, v.g1Item2])}
${renderGroup(v.group2Title, [v.g2Item1, v.g2Item2])}
</div>
</div></section>`
  },
}
