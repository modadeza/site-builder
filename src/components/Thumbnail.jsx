import React from 'react'

/**
 * サムネイルSVGコンポーネント
 * 
 * 新しいパーツのサムネイルを追加する場合:
 * 1. THUMBNAILS オブジェクトに新しいキーを追加
 * 2. パーツ定義の thumb にそのキーを指定
 */

const THUMBNAILS = {
  diagonal: (ac) => (
    <svg viewBox="0 0 160 100">
      <rect width="160" height="100" fill="#0a0f1e"/>
      <polygon points="60,0 160,0 160,100 20,100" fill={ac} opacity=".12"/>
      <rect x="16" y="30" width="60" height="6" rx="3" fill="#fff" opacity=".9"/>
      <rect x="16" y="42" width="80" height="4" rx="2" fill="#fff" opacity=".3"/>
      <rect x="16" y="56" width="36" height="12" rx="4" fill={ac} opacity=".9"/>
    </svg>
  ),
  split: (ac) => (
    <svg viewBox="0 0 160 100">
      <rect width="80" height="100" fill="#faf8f5"/>
      <rect x="80" width="80" height="100" fill="#fef2f0"/>
      <rect x="12" y="30" width="50" height="6" rx="3" fill="#1a1a1a" opacity=".8"/>
      <rect x="12" y="56" width="30" height="10" rx="5" fill={ac}/>
      <circle cx="120" cy="50" r="16" fill={ac} opacity=".25"/>
      <circle cx="120" cy="50" r="8" fill={ac} opacity=".6"/>
    </svg>
  ),
  overlap: (ac) => (
    <svg viewBox="0 0 160 100">
      <rect width="160" height="100" fill="#fff"/>
      <rect x="8" y="20" width="44" height="60" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth=".5"/>
      <rect x="58" y="12" width="44" height="68" rx="6" fill={ac}/>
      <rect x="108" y="20" width="44" height="60" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth=".5"/>
    </svg>
  ),
  editorial: (ac) => (
    <svg viewBox="0 0 160 100">
      <rect width="160" height="100" fill="#0c0c0c"/>
      <rect x="16" y="28" width="40" height="4" rx="2" fill={ac} opacity=".8"/>
      <rect x="16" y="38" width="55" height="5" rx="2" fill="#fff" opacity=".8"/>
      <rect x="16" y="60" width="16" height="14" rx="2" fill={ac} opacity=".6"/>
      <rect x="38" y="60" width="16" height="14" rx="2" fill={ac} opacity=".6"/>
      <rect x="85" y="30" width="60" height="3" rx="1.5" fill="#fff" opacity=".2"/>
      <rect x="85" y="38" width="60" height="3" rx="1.5" fill="#fff" opacity=".2"/>
    </svg>
  ),
  gradient: (ac) => (
    <svg viewBox="0 0 160 100">
      <defs>
        <linearGradient id="thumbGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ac}/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
      </defs>
      <rect width="160" height="100" fill="url(#thumbGrad)"/>
      <circle cx="130" cy="20" r="30" fill="#fff" opacity=".06"/>
      <rect x="40" y="32" width="80" height="5" rx="2.5" fill="#fff" opacity=".9"/>
      <rect x="55" y="58" width="50" height="14" rx="7" fill="#fff" opacity=".9"/>
    </svg>
  ),
  // デフォルト（未定義のサムネイル用）
  default: (ac) => (
    <svg viewBox="0 0 160 100">
      <rect width="160" height="100" fill="#1a1a24"/>
      <rect x="20" y="20" width="120" height="60" rx="8" fill={ac} opacity=".15"/>
      <rect x="40" y="40" width="80" height="6" rx="3" fill={ac} opacity=".5"/>
      <rect x="50" y="54" width="60" height="4" rx="2" fill="#fff" opacity=".2"/>
    </svg>
  ),
}

export default function Thumbnail({ type, color }) {
  const ac = color || '#2563eb'
  const renderer = THUMBNAILS[type] || THUMBNAILS.default
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 6, overflow: 'hidden' }}>
      {renderer(ac)}
    </div>
  )
}
