import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(() => {

  return {
    plugins: [react()],
    resolve:{
      alias:{
        'src': path.resolve(__dirname, './src'),
        'Shared': path.resolve(__dirname,'./src/shared')
      }
    },
    server:{
      port:8085
    }

  }
})
