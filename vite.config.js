import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// Adding this plugin into the react environment initializes certain node.js specific stuff (which does not exist in the browser, e.g. Buffer) into the browser environment. Doing this would make the build successful and it would not break when libraries such as @solana/spl-token are imported and used.

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
})
