import { Suspense } from 'react';
import { Link } from 'waku';
import { Throw } from '../components/throw';
import { isBuild } from '../lib/waku';

export default async function HomePage() {
  const data = await getData();
  return (
    <div>
      <title>{data.title}</title>
      <h1 className="text-4xl font-bold tracking-tight">{data.headline}</h1>
      <p>{data.body}</p>
      <Suspense fallback="Pending...">
        <ServerMessage />
      </Suspense>
      <Throw />
      <div>
        <Link to="/about" className="mt-4 block underline">
          About page
        </Link>
        <Link to="/error" className="mt-4 block underline">
          Error page
        </Link>
      </div>
    </div>
  );
}

// Example async server component
const ServerMessage = async () => {
  if (isBuild()) {
    console.warn('Note: server components are awaited during build.');
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <p>Hello from server!</p>;
};

// Example async data fetching
const getData = async () => {
  const data = {
    title: 'Waku',
    headline: 'Waku',
    body: 'Hello world!',
  };

  return data;
};

// Enable dynamic server rendering.
// Static rendering is possible if you want to render at build time.
// The Hono context will not be available.
export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
