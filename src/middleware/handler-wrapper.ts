import type { Middleware } from 'waku/config';

// note - when developing middleware, you must manually restart. there is no hot reload.

const handleWrapperMiddleware: Middleware = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // if you don't try/catch or re-throw, then Hono onError will handle
      // throw err;
      console.log("middleware catch", err);
      ctx.res.status = 500;
      ctx.res.body = stringToReadableStream(JSON.stringify({ _value: { "error": err?.message || "Internal Server Error" } }));
      return;
    }
  };
};

function stringToReadableStream(str: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(str);

  return new ReadableStream({
    start(controller) {
      controller.enqueue(uint8Array);
      controller.close();
    }
  });
}

export default handleWrapperMiddleware;
