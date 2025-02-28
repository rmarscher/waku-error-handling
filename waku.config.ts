import type { Hono } from 'hono';
import { type Config, defineConfig } from 'waku/config';
import { sentry } from '@hono/sentry';

console.log('import.meta.env', import.meta.env);

export default defineConfig({
  ...(!import.meta.env || import.meta.env.PROD ? {
      unstable_honoEnhancer: ((createApp: (app: Hono) => Hono) => {
        return (appToCreate: Hono) => {
          const app = createApp(appToCreate);
          app.use('*', sentry())
          app.onError((err, c) => {
            console.error('In hono onError:', err);
            return c.text('Internal Server Error', 500)
          });
          return app;
        };
      }) as Config['unstable_honoEnhancer']
    }
    : {
        unstable_honoEnhancer: ((createApp: (app: Hono) => Hono) => {
          const handlerPromise = import('./waku.cloudflare-dev-server').then(
            ({ cloudflareDevServer }) =>
              cloudflareDevServer({
                // Optional config settings for the Cloudflare dev server (wrangler proxy)
                // https://developers.cloudflare.com/workers/wrangler/api/#parameters-1
                persist: {
                  path: '.wrangler/state/v3',
                },
              }),
          );
          return (appToCreate: Hono) => {
            const app = createApp(appToCreate);
            app.use('*', sentry());
            app.onError((err, c) => {
              console.error('In hono onError:', err);
              return c.text('Internal Server Error', 500)
            });
            return {
              fetch: async (req: Request) => {
                const devHandler = await handlerPromise;
                return devHandler(req, app);
              },
            };
          };
        }) as Config['unstable_honoEnhancer'],
      }
    ),
  middleware: () => {
    return [
      import('waku/middleware/context'),
      import('waku/middleware/dev-server'),
      import('./waku.cloudflare-middleware'),
      import('./src/middleware/handler-wrapper'),
      import('waku/middleware/handler'),
    ];
  },
});
