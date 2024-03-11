import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        base: process.env.VITE_BASE_PATH,
        publicDir: process.env.VITE_DEFAULT_PATH + '/public',
        build: {
            minify: true,
            outDir: process.env.VITE_OUTPUT_PATH,
            emptyOutDir: false,
            rollupOptions: {
                input: {
                    core: process.env.VITE_INPUT_PATH + '/js/web.js',
                    index: process.env.VITE_INPUT_PATH + '/sass/web.scss'
                },
                output: {
                    chunkFileNames: 'js/[name].js',
                    entryFileNames: 'js/[name].js',
    
                    assetFileNames: ({name}) => {
                        if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
                            return 'img/[name][extname]';
                        }
                        
                        if (/\.css$/.test(name ?? '')) {
                            return 'css/[name][extname]';   
                        }
               
                        return '[name][extname]';
                    },
                }


            }
        },
        plugins: [
			{
				name: 'php',
				enforce: 'post',
				handleHotUpdate({ file, server }) {
					if (file.endsWith('.php')) {
						server.ws.send({
							type: 'full-reload',
							path: '*'
						});
					}
				}
			},
			{
				name: 'twig',
				enforce: 'post',
				handleHotUpdate({ file, server }) {
					if (file.endsWith('.twig')) {
						server.ws.send({
							type: 'full-reload',
							path: '*'
						});
					}
				}
			},
			{
				name: 'html',
				enforce: 'post',
				handleHotUpdate({ file, server }) {
					if (file.endsWith('.html')) {
						server.ws.send({
							type: 'full-reload',
							path: '*'
						});
					}
				}
			}
		]
    })
}

