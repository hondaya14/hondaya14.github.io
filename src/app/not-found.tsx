import Link from "next/link";
import { LINE_SEED } from "@/lib/fonts";
import { HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#101114] text-foreground text-center px-6">
      <div className="bg-white/5 border border-white/10 rounded-lg p-10 max-w-lg w-full">
        <h2 className={`mt-3 text-4xl font-semibold ${LINE_SEED.className}`}>Page Not Found</h2>
        <div className="mt-6">
          <Link
            href="/"
            className=" inline-block px-15 py-5 no-underline rounded-md font-semibold hover:bg-gray-200 transition-colors"
          >
            <HomeIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
