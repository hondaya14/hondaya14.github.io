import Link from "next/link";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  if (!items || items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className={clsx("breadcrumbs", className)}>
      <ol>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`}>
              {item.href && !isLast ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
              {!isLast && <ChevronRight className="h-3 w-3 mx-1" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
