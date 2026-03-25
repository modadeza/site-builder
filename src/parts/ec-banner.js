export default {
  id: 'ec-banner',
  name: 'キャンペーンバナー',
  category: 'EC：バナー',
  desc: 'LINE登録やキャンペーン訴求バナー',
  thumb: 'default',
  fields: [
    { key: 'headline', label: '見出し', type: 'text', default: 'ゲーミングPCのプロに相談!!' },
    { key: 'subtext', label: 'サブテキスト', type: 'text', default: '登録者 9万人突破' },
    { key: 'cta', label: 'CTAテキスト', type: 'text', default: 'LINE相談はこちら' },
    { key: 'bgStyle', label: '背景スタイル', type: 'select', options: ['グラデーション', 'ソリッド', 'ダーク'], default: 'グラデーション' },
    { key: '_colorOverride', label: 'カラー個別指定', type: 'toggle', default: false },
    { key: 'accentColor', label: 'アクセント色', type: 'color', default: '', showIf: '_colorOverride' },
    { key: 'bgColor', label: '背景色', type: 'color', default: '', showIf: '_colorOverride' },
  ],
  render: (v, g) => {
    const ac = v.accentColor || '#06C755'
    const bgMap = {
      'グラデーション': `linear-gradient(135deg, ${ac}, #2d8a4e)`,
      'ソリッド': v.bgColor || ac,
      'ダーク': '#1a1a24',
    }
    const bg = bgMap[v.bgStyle] || bgMap['グラデーション']
    const u = 'ecb' + Math.random().toString(36).slice(2, 7)
    return `<style>
.${u}{background:${bg};font-family:'Noto Sans JP',sans-serif;padding:32px 20px;text-align:center;position:relative;overflow:hidden}
.${u} .deco{position:absolute;top:-30px;right:-30px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.08)}
.${u} .inner{position:relative;z-index:1;max-width:600px;margin:0 auto}
.${u} .badge{display:inline-block;padding:4px 14px;background:rgba(255,255,255,.2);border-radius:100px;font-size:12px;color:#fff;font-weight:600;margin-bottom:12px}
.${u} h2{font-size:clamp(18px,4vw,28px);font-weight:900;color:#fff;margin:0 0 8px;line-height:1.3}
.${u} p{font-size:14px;color:#ffffffcc;margin:0 0 20px}
.${u} .cta{display:inline-block;padding:14px 40px;background:#fff;color:#333;font-size:15px;font-weight:700;border-radius:100px;text-decoration:none;box-shadow:0 4px 16px rgba(0,0,0,.15);transition:transform .2s}
.${u} .cta:hover{transform:scale(1.03)}
@media(max-width:768px){
.${u}{padding:24px 16px}
.${u} .cta{padding:12px 32px;font-size:14px;width:100%}
}
</style>
<section class="${u}">
<div class="deco"></div>
<div class="inner">
<div class="badge">${v.subtext}</div>
<h2>${v.headline}</h2>
<a href="#" class="cta">${v.cta}</a>
</div>
</section>`
  },
}
