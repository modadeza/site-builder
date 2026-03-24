export default {
  id: 'features-overlap',
  name: 'オーバーラップカード',
  category: '特徴・サービス',
  desc: 'カードが重なり合う立体的レイアウト',
  thumb: 'overlap',
  fields: [
    { key: 'sectionTitle', label: 'セクション名', type: 'text', default: 'Our Services' },
    { key: 'sectionSub', label: 'セクション説明', type: 'text', default: '3つの専門領域で、ビジネスの成長を加速させます。' },
    { key: 'columns', label: 'カラム数', type: 'select', options: ['2', '3', '4'], default: '3' },
    { key: 'card1Title', label: 'カード1', type: 'text', default: 'Web Design' },
    { key: 'card1Text', label: 'カード1 説明', type: 'text', default: 'ブランドの世界観を反映した美しいWebサイト' },
    { key: 'card2Title', label: 'カード2', type: 'text', default: 'Development' },
    { key: 'card2Text', label: 'カード2 説明', type: 'text', default: '最新技術で高速・堅牢なプロダクトを実装' },
    { key: 'card3Title', label: 'カード3', type: 'text', default: 'Marketing' },
    { key: 'card3Text', label: 'カード3 説明', type: 'text', default: 'データドリブンな戦略で確実な成果を' },
    { key: 'card4Title', label: 'カード4', type: 'text', default: 'Consulting', showIf: 'columns:4' },
    { key: 'card4Text', label: 'カード4 説明', type: 'text', default: '戦略立案からPMまで伴走型で支援', showIf: 'columns:4' },
    { key: 'showButton', label: 'カード内ボタン', type: 'toggle', default: false },
    { key: 'buttonText', label: 'ボタンテキスト', type: 'text', default: '詳しく見る →', showIf: 'showButton' },
    { key: 'theme', label: '背景テーマ', type: 'select', options: ['ライト', 'ダーク'], default: 'ライト' },
    { key: 'spacing', label: '余白', type: 'select', options: ['S', 'M', 'L'], default: 'M' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const cols = parseInt(v.columns) || 3, ac = v.accentColor || g.primary, dark = v.theme === 'ダーク'
    const bg = dark ? '#0c0c14' : '#ffffff', cardBg = dark ? '#161620' : '#f8fafc', cardBdr = dark ? '#1e1e2e' : '#e2e8f0', tc = dark ? '#e0e0ea' : '#1a1a1a', sc = dark ? '#888898' : '#888'
    const pad = { S: '80px 40px', M: '120px 40px', L: '160px 40px' }[v.spacing] || '120px 40px'
    let cards = ''
    for (let i = 1; i <= cols; i++) {
      const t = v[`card${i}Title`] || `Card ${i}`, tx = v[`card${i}Text`] || '', isC = i === Math.ceil(cols / 2) && cols > 2
      cards += `<div style="background:${isC ? ac : cardBg};${isC ? '' : `border:1px solid ${cardBdr};`}padding:48px 36px;border-radius:16px;position:relative;z-index:${isC ? 4 : 3};${isC ? `transform:translateY(-16px);box-shadow:0 24px 48px ${ac}30` : ''}"><div style="width:48px;height:48px;background:${isC ? '#ffffff20' : ac + '12'};border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:24px"><div style="width:20px;height:20px;background:${isC ? '#fff' : ac};border-radius:${i % 2 === 0 ? '50%' : '4px'}"></div></div><h3 style="font-size:20px;font-weight:700;color:${isC ? '#fff' : tc};margin:0 0 12px">${t}</h3><p style="font-size:14px;color:${isC ? '#ffffffbb' : sc};line-height:1.8;margin:0${v.showButton ? ' 0 24px' : ''}">${tx}</p>${v.showButton ? `<a href="#" style="display:inline-block;padding:10px 20px;font-size:13px;font-weight:600;border-radius:6px;text-decoration:none;${isC ? `background:#fff;color:${ac}` : `background:${ac};color:#fff`}">${v.buttonText || '詳しく見る →'}</a>` : ''}</div>`
    }
    return `<section style="padding:${pad};background:${bg};font-family:'Noto Sans JP',sans-serif"><div style="max-width:1200px;margin:0 auto"><div style="text-align:center;margin-bottom:80px"><span style="display:inline-block;font-size:12px;letter-spacing:4px;color:${ac};text-transform:uppercase;margin-bottom:16px;font-weight:600">${v.sectionTitle}</span><p style="font-size:18px;color:${dark ? '#888898' : '#666'};margin:0">${v.sectionSub}</p></div><div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:0;position:relative">${cards}</div></div></section>`
  },
}
