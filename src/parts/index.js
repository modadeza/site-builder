/**
 * パーツレジストリ
 * 
 * 新しいパーツを追加する手順:
 * 1. src/parts/ にファイルを作成（hero-diagonal.js を参考に）
 * 2. このファイルに import を追加
 * 3. PARTS 配列に追加
 * 
 * それだけでカタログに表示されます。
 */

import heroDiagonal from './hero-diagonal'
import heroSplit from './hero-split'
import featuresOverlap from './features-overlap'
import aboutEditorial from './about-editorial'
import ctaGradient from './cta-gradient'

const PARTS = [
  heroDiagonal,
  heroSplit,
  featuresOverlap,
  aboutEditorial,
  ctaGradient,
]

/**
 * カテゴリ別にグループ化して返す
 * @returns {{ [category: string]: Part[] }}
 */
export function getPartsByCategory() {
  const cats = {}
  PARTS.forEach(p => {
    if (!cats[p.category]) cats[p.category] = []
    cats[p.category].push(p)
  })
  return cats
}

/**
 * カテゴリの表示順序
 * ここに記載された順で左カタログに表示される
 * 未記載のカテゴリは末尾に追加される
 */
export const CATEGORY_ORDER = [
  'ヘッダー',
  'ヒーロー',
  '特徴・サービス',
  '実績・事例',
  '会社概要',
  'チーム紹介',
  'お客様の声',
  '料金プラン',
  'FAQ',
  'CTA',
  'お問い合わせ',
  'フッター',
]

export function getOrderedCategories() {
  const cats = getPartsByCategory()
  const ordered = []
  CATEGORY_ORDER.forEach(cat => {
    if (cats[cat]) {
      ordered.push({ name: cat, parts: cats[cat] })
      delete cats[cat]
    }
  })
  // 未登録カテゴリを末尾に
  Object.entries(cats).forEach(([name, parts]) => {
    ordered.push({ name, parts })
  })
  return ordered
}

export default PARTS
