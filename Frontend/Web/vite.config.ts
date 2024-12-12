import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist', // Dossier de sortie
        assetsDir: 'assets', // Dossier pour les fichiers d'assets
        rollupOptions: {
            input: './index.html', // Fichier d'entrée principal
        },
    },
    base: './', // Définit une base relative pour les chemins
});
