import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // 👈 This ensures proper routing and reload handling

  plugins: [react()],
  
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
