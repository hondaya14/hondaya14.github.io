import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="reading-page not-found-content">
        <p className="page-kicker">404</p>
        <h1>Page Not Found</h1>
        <Link href="/">Back to home</Link>
      </div>
    </SiteShell>
  );
}
