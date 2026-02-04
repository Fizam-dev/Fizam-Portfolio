import { defineConfig } from 'vite'
import react from '@vitejs/react-refresh' // atau @vitejs/plugin-react

export default defineConfig({
  plugins: [react()],
  base: '/HackDev-Platform/', // TAMBAH BARIS INI
})