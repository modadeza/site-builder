/**
 * パーツレジストリ
 * 
 * 新しいパーツを追加する手順:
 * 1. src/parts/ にファイルを作成
 * 2. このファイルに import を追加
 * 3. PARTS 配列に追加
 */

// ヘッダー
import headerTransparent from './header-transparent'
import headerSolid from './header-solid'

// ヒーロー
import heroDiagonal from './hero-diagonal'
import heroSplit from './hero-split'

// 特徴・サービス
import featuresOverlap from './features-overlap'

// 実績・事例
import worksGrid from './works-grid'

// 会社概要
import aboutEditorial from './about-editorial'

// チーム紹介
import teamCards from './team-cards'

// お客様の声
import testimonialCards from './testimonial-cards'

// 料金プラン
import pricingCards from './pricing-cards'

// FAQ
import faqAccordion from './faq-accordion'

// ニュース
import newsList from './news-list'

// CTA
import ctaGradient from './cta-gradient'

// お問い合わせ
import contactSplit from './contact-split'

// フッター
import footerColumns from './footer-columns'

const PARTS = [
  headerTransparent,
  headerSolid,
  heroDiagonal,
  heroSplit,
  featuresOverlap,
  worksGrid,
  aboutEditorial,
  teamCards,
  testimonialCards,
  pricingCards,
  faqAccordion,
  newsList,
  ctaGradient,
  contactSplit,
  footerColumns,
]

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
  'ニュース',
  'CTA',
  'お問い合わせ',
  'フッター',
]

export function getPartsByCategory() {
  const cats = {}
  PARTS.forEach(p => {
    if (!cats[p.category]) cats[p.category] = []
    cats[p.category].push(p)
  })
  return cats
}

export function getOrderedCategories() {
  const cats = getPartsByCategory()
  const ordered = []
  CATEGORY_ORDER.forEach(cat => {
    if (cats[cat]) {
      ordered.push({ name: cat, parts: cats[cat] })
      delete cats[cat]
    }
  })
  Object.entries(cats).forEach(([name, parts]) => {
    ordered.push({ name, parts })
  })
  return ordered
}

export default PARTS
