import { Link } from "waku";


export default async function NotFoundPage() {
  return (
    <div>
      <title>Not Found</title>
      <h1 className="text-4xl font-bold tracking-tight">Not Found</h1>
      <p>Sorry, we couldn't find it.</p>
      <Link to="/" className="mt-4 inline-block underline">
        Return home
      </Link>
    </div>
  );
}
