import Link from "next/link";
import { lineSeedFont } from "@/lib/fonts";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#101114] text-foreground text-center px-6">
      <div className="bg-white/5 border border-white/10 rounded-lg p-10 max-w-lg w-full">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-300">Error 404</p>
        <h1 className={`mt-3 text-4xl font-semibold ${lineSeedFont.className}`}>Page Not Found</h1>
        <p className="mt-4 text-gray-200 leading-relaxed">
          The page you are looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block px-5 py-3 bg-white text-[#101114] rounded-md font-semibold hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
