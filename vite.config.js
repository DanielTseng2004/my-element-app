import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({

  plugins: [
    vue(),
    // 自動匯入配置
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    watch: {
      // 雖然 Vite 預設會排除，但若電腦太慢可以手動加強
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
})