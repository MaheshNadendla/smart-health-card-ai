import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDeployment = env.VITE_APP_ENV === 'deployment';
  const target = isDeployment 
    ? env.VITE_PROD_SERVER_API_URL 
    : (env.VITE_LOCAL_SERVER_API_URL_PROXY || 'http://localhost:8000');

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      proxy: {
        // Proxy all /api requests to the backend server
        '/api': {
          target: target,
          changeOrigin: true,
          // Re-write is not needed if the backend also has /api prefix
        },
      },
    },
  }
})
