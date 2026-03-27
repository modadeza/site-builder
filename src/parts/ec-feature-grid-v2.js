export default {
  id: 'ec-feature-grid-v2',
  name: '特集グリッド（リッチ）',
  category: 'EC：バナー',
  desc: '2カラム×3行のビジュアル特集カード',
  thumb: 'default',
  fields: [
    { key: 'sectionTitle', label: 'セクションタイトル', type: 'text', default: '特集' },
    { key: 'sectionSub', label: 'サブタイトル', type: 'text', default: 'FEATURE' },
    { key: 'c1Main', label: 'カード1 メイン', type: 'text', default: '30,000台突破' },
    { key: 'c1Sub', label: 'カード1 サブ', type: 'text', default: 'キャンペーン' },
    { key: 'c1Badge', label: 'カード1 バッジ', type: 'text', default: '最短翌日出荷' },
    { key: 'c2Main', label: 'カード2 メイン', type: 'text', default: '人気' },
    { key: 'c2Sub', label: 'カード2 サブ', type: 'text', default: 'ランキング' },
    { key: 'c2Badge', label: 'カード2 バッジ', type: 'text', default: '2025年下半期' },
    { key: 'c3Label', label: 'カード3 ラベル', type: 'text', default: '圧倒的存在感で人気' },
    { key: 'c3Main', label: 'カード3 メイン', type: 'text', default: '黒色LED\nモデル' },
    { key: 'c4Label', label: 'カード4 ラベル', type: 'text', default: '純白を彩る新定番' },
    { key: 'c4Main', label: 'カード4 メイン', type: 'text', default: '白色LED\nモデル' },
    { key: 'c5Main', label: 'カード5 メイン', type: 'text', default: '価格から\n選ぶ' },
    { key: 'c6Main', label: 'カード6 メイン', type: 'text', default: 'ゲームから\n選ぶ' },
    { key: 'linkText', label: 'リンクテキスト', type: 'text', default: '詳細はこちら' },
    { key: 'theme', label: 'ページ背景', type: 'select', options: ['ライト', 'ダーク'], default: 'ライト' },
  ],
  render: (v, g) => {
    const dark = v.theme === 'ダーク'
    const pageBg = dark ? '#111118' : '#f0f0f3'
    const linkColor = dark ? '#aaa' : '#666'
    const u = 'efg' + Math.random().toString(36).slice(2, 7)
    return `<style>
.${u}{padding:32px 16px 24px;background:${pageBg};font-family:'Noto Sans JP',sans-serif}
.${u} .wrap{max-width:600px;margin:0 auto}
.${u} .hdr{display:flex;align-items:baseline;gap:10px;margin-bottom:16px;padding-left:4px}
.${u} .hdr-dot{display:flex;flex-direction:column;gap:3px;margin-right:2px}
.${u} .hdr-dot i{display:block;width:4px;height:4px;border-radius:50%;background:${dark?'#888':'#333'}}
.${u} .hdr h2{font-size:24px;font-weight:900;color:${dark?'#fff':'#1a1a1a'};margin:0;line-height:1}
.${u} .hdr span{font-size:12px;color:#999;letter-spacing:2px;font-weight:500}
.${u} .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}

/* Card base */
.${u} .card{border-radius:10px;overflow:hidden;position:relative;text-decoration:none;display:flex;flex-direction:column}
.${u} .card-body{padding:16px 14px 10px;display:flex;flex-direction:column;justify-content:center;min-height:140px;position:relative;z-index:1}
.${u} .card-link{text-align:right;padding:2px 10px 8px;font-size:11px;color:${linkColor};font-weight:600;display:flex;align-items:center;justify-content:flex-end;gap:2px}
.${u} .card-link::after{content:'≫';font-size:13px;color:${linkColor}}

/* Card 1: Campaign - gradient gray/blue with large yellow numbers */
.${u} .c1 .card-body{background:linear-gradient(135deg,#2a2a35 0%,#3a3a4a 40%,#4a5568 100%)}
.${u} .c1 .main{font-size:36px;font-weight:900;color:#FFD700;letter-spacing:-1px;line-height:1}
.${u} .c1 .main small{font-size:16px;font-weight:700;color:#ccc}
.${u} .c1 .sub{font-size:24px;font-weight:900;color:#FFD700;margin-top:2px}
.${u} .c1 .badge{display:inline-block;margin-top:8px;padding:3px 12px;border:1.5px solid #fff;font-size:11px;color:#fff;font-weight:700;background:transparent}

/* Card 2: Ranking - gradient light silver */
.${u} .c2 .card-body{background:linear-gradient(135deg,#e8e8ec 0%,#d0d0d8 50%,#c8c8d0 100%)}
.${u} .c2 .main{font-size:32px;font-weight:900;color:#1a1a1a;line-height:1.1}
.${u} .c2 .sub{font-size:32px;font-weight:900;color:#1a1a1a}
.${u} .c2 .badge{display:inline-block;margin-top:8px;padding:3px 12px;border:1.5px solid #555;font-size:11px;color:#444;font-weight:700;background:transparent}

/* Card 3 & 4: Product model - dark with image area */
.${u} .c3 .card-body,.${u} .c4 .card-body{min-height:150px}
.${u} .c3 .card-body{background:linear-gradient(135deg,#111 0%,#1a1a2a 50%,#0d1117 100%)}
.${u} .c4 .card-body{background:linear-gradient(135deg,#e8e8f0 0%,#f0f0f5 50%,#e0e0ea 100%)}
.${u} .c3 .label,.${u} .c4 .label{font-size:10px;font-weight:600;padding:2px 8px;border:1px solid;border-radius:2px;display:inline-block;margin-bottom:6px;width:fit-content}
.${u} .c3 .label{color:#aaffcc;border-color:#aaffcc60}
.${u} .c4 .label{color:#8888cc;border-color:#8888cc60}
.${u} .c3 .main{font-size:26px;font-weight:900;color:#fff;line-height:1.2;white-space:pre-line}
.${u} .c4 .main{font-size:26px;font-weight:900;color:#333;line-height:1.2;white-space:pre-line}

/* Card 5 & 6: Navigation - gradient dark */
.${u} .c5 .card-body{background:linear-gradient(135deg,#1a2a1a 0%,#0a1a0a 50%,#102010 100%)}
.${u} .c6 .card-body{background:linear-gradient(135deg,#2a1a2a 0%,#1a0a1a 50%,#200a20 100%)}
.${u} .c5 .main,.${u} .c6 .main{font-size:26px;font-weight:900;color:#fff;line-height:1.3;white-space:pre-line}
.${u} .c5 .icon{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:48px;color:#44cc6640;font-weight:900;font-style:normal}
.${u} .c6 .icon{position:absolute;right:8px;top:50%;transform:translateY(-50%);font-size:36px;opacity:.3}

/* Card backgrounds */
.${u} .c1,.${u} .c3,.${u} .c5,.${u} .c6{background:#f8f8fa}
.${u} .c2,.${u} .c4{background:#f8f8fa}
${dark ? `.${u} .c1,.${u} .c2,.${u} .c3,.${u} .c4,.${u} .c5,.${u} .c6{background:#1a1a22}` : ''}

@media(min-width:769px){
.${u} .wrap{max-width:700px}
.${u} .card-body{min-height:160px;padding:20px 18px 14px}
.${u} .c1 .main{font-size:42px}
.${u} .c1 .sub{font-size:28px}
.${u} .c2 .main,.${u} .c2 .sub{font-size:36px}
.${u} .c3 .main,.${u} .c4 .main{font-size:30px}
.${u} .c5 .main,.${u} .c6 .main{font-size:30px}
}
</style>
<section class="${u}"><div class="wrap">
<div class="hdr">
  <div class="hdr-dot"><i></i><i></i><i></i><i></i></div>
  <h2>${v.sectionTitle}</h2>
  <span>${v.sectionSub}</span>
</div>
<div class="grid">
  <!-- Card 1: Campaign -->
  <div class="card c1">
    <div class="card-body">
      <div class="main">${v.c1Main.replace(/(\d[\d,]+)/, '<span>$1</span>')}<small>${v.c1Main.match(/[^\d,]+$/)?.[0] || ''}</small></div>
      <div class="sub">${v.c1Sub}</div>
      <div class="badge">${v.c1Badge}</div>
    </div>
    <div class="card-link">${v.linkText}</div>
  </div>

  <!-- Card 2: Ranking -->
  <div class="card c2">
    <div class="card-body">
      <div class="main">${v.c2Main}</div>
      <div class="sub">${v.c2Sub}</div>
      <div class="badge">${v.c2Badge}</div>
    </div>
    <div class="card-link">${v.linkText}</div>
  </div>

  <!-- Card 3: Black LED -->
  <div class="card c3">
    <div class="card-body">
      <div class="label">${v.c3Label}</div>
      <div class="main">${v.c3Main}</div>
    </div>
    <div class="card-link">${v.linkText}</div>
  </div>

  <!-- Card 4: White LED -->
  <div class="card c4">
    <div class="card-body">
      <div class="label">${v.c4Label}</div>
      <div class="main">${v.c4Main}</div>
    </div>
    <div class="card-link">${v.linkText}</div>
  </div>

  <!-- Card 5: Price -->
  <div class="card c5">
    <div class="card-body">
      <div class="main">${v.c5Main}</div>
      <em class="icon">¥</em>
    </div>
    <div class="card-link">${v.linkText}</div>
  </div>

  <!-- Card 6: Game -->
  <div class="card c6">
    <div class="card-body">
      <div class="main">${v.c6Main}</div>
      <span class="icon">🎮</span>
    </div>
    <div class="card-link">${v.linkText}</div>
  </div>
</div>
</div></section>`
  },
}
