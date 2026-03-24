import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages: リポジトリ名に合わせて変更してください
  // 例: base: '/site-builder/'
  // カスタムドメインの場合は base: '/' のまま
  base: '/site-builder/',
})
