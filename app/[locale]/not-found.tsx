import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-6xl font-bold text-gradient-najd">404</p>
      <p className="text-muted-foreground">This page could not be found.</p>
      <Link
        href="/en"
        className="rounded-full bg-najd-gradient px-5 py-2.5 text-sm font-semibold text-white"
      >
        Go home
      </Link>
    </main>
  );
}
