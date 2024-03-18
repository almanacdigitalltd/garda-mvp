import path from 'path'
import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        root: '../src',
        base: process.env.VITE_BASE_PATH,
        publicDir: process.env.VITE_DEFAULT_PATH + '/public',
        resolve: {
			alias: {
				'@modules': path.resolve(__dirname, '../app/node_modules'),
                '@assets': path.resolve(__dirname, '../src'),
			},
		},
        build: {
            minify: true,
            outDir: process.env.VITE_OUTPUT_PATH,
            emptyOutDir: false,
            rollupOptions: {
                input: {
                    core: process.env.VITE_INPUT_PATH + '/js/app.js',
                    index: process.env.VITE_INPUT_PATH + '/sass/app.scss'
                },
                output: {
                    chunkFileNames: 'js/[name].js',
                    entryFileNames: 'js/[name].js',
    
                    assetFileNames: ({name}) => {
                        if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
                            return 'img/[name][extname]';
                        }

                        if (/\.(ttf|woff)$/.test(name ?? '')){
                            return 'fonts/[name][extname]';
                        }
                        
                        if (/\.css$/.test(name ?? '')) {
                            return 'css/[name][extname]';   
                        }
               
                        return '[name][extname]';
                    },
                }


            }
        }
    })
}

