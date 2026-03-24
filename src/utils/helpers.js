/**
 * フィールドの条件付き表示判定
 * 
 * showIf の書式:
 *   - "showButton"    → vals.showButton が truthy なら表示
 *   - "columns:4"     → vals.columns === "4" なら表示
 *   - undefined/null  → 常に表示
 */
export function shouldShowField(field, vals) {
  if (!field.showIf) return true
  if (field.showIf.includes(':')) {
    const [k, expected] = field.showIf.split(':')
    return String(vals[k]) === expected
  }
  return !!vals[field.showIf]
}

/**
 * HTML生成ヘルパー
 */
export function generateFullHTML(parts, vars, globalColor) {
  const sections = parts
    .map(p => p.render(vars[p.iid], globalColor))
    .join('\n')

  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Generated Site</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}body{overflow-x:hidden}</style>
</head>
<body>
${sections}
</body>
</html>`
}

/**
 * HTMLをBlobとしてダウンロード
 */
export function downloadHTML(html, filename = 'site.html') {
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * デフォルトグローバルカラー
 */
export const DEFAULT_GLOBAL_COLOR = {
  primary: '#2563eb',
  accent: '#00d4aa',
  bg: '#0a0f1e',
  bgLight: '#ffffff',
  textDark: '#1a1a1a',
  textLight: '#ffffff',
}
