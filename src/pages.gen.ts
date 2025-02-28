// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as Error_getConfig } from './pages/error';
// prettier-ignore
import type { getConfig as Index_getConfig } from './pages/index';

// prettier-ignore
type Page =
| { path: '/404'; render: 'dynamic' }
| ({ path: '/about' } & GetConfigResponse<typeof About_getConfig>)
| ({ path: '/error' } & GetConfigResponse<typeof Error_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof Index_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
  