import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'resources/js/plugins/notification/index.ts'),
            name: 'InertiaToast',
            fileName: 'index',
            formats: ['es'], // ESM build for Laravel Vite
        },
        rollupOptions: {
            // vue-sonner, vue, inertia — external libs (already installed in app)
            external: ['vue', '@inertiajs/vue3', 'vue-sonner'],
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
});
