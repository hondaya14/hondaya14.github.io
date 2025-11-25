import Link from "next/link";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={clsx("text-sm text-gray-300", className)}>
      <ol className="flex items-center gap-1">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:underline text-gray-300 no-underline">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-400">{item.label}</span>
              )}
              {!isLast && <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
