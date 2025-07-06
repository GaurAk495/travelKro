import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-900 text-center p-6">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">Page Not Found</h2>
      <p className="mb-6 text-zinc-600 dark:text-zinc-300">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Go Home
      </Link>
    </div>
  );
}
