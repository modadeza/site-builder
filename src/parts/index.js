/**
 * パーツレジストリ
 */

// === コーポレート系 ===
import headerTransparent from './header-transparent'
import headerSolid from './header-solid'
import heroDiagonal from './hero-diagonal'
import heroSplit from './hero-split'
import featuresOverlap from './features-overlap'
import worksGrid from './works-grid'
import aboutEditorial from './about-editorial'
import teamCards from './team-cards'
import testimonialCards from './testimonial-cards'
import pricingCards from './pricing-cards'
import faqAccordion from './faq-accordion'
import newsList from './news-list'
import ctaGradient from './cta-gradient'
import contactSplit from './contact-split'
import footerColumns from './footer-columns'

// === EC系 ===
import ecHeader from './ec-header'
import ecBanner from './ec-banner'
import ecCampaignGrid from './ec-campaign-grid'
import ecCategorySelect from './ec-category-select'
import ecProductRanking from './ec-product-ranking'
import ecPriceRange from './ec-price-range'
import ecContact from './ec-contact'

const PARTS = [
  // コーポレート
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
  // EC
  ecHeader,
  ecBanner,
  ecCampaignGrid,
  ecCategorySelect,
  ecProductRanking,
  ecPriceRange,
  ecContact,
]

export const CATEGORY_ORDER = [
  // コーポレート
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
  // EC
  'EC：ヘッダー',
  'EC：バナー',
  'EC：ナビゲーション',
  'EC：商品',
  'EC：お問い合わせ',
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
