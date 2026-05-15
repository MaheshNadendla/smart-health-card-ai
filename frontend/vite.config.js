import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const isDeployment = env.VITE_APP_ENV === 'deployment'

  return {
    base: '/', // ✅ REQUIRED for Render

    plugins: [react(), tailwindcss()],

    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_LOCAL_SERVER_API_URL_PROXY || 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },

    define: {
      __API_URL__: JSON.stringify(
        isDeployment
          ? env.VITE_PROD_SERVER_API_URL
          : '/api'
      ),
    },
  }
})