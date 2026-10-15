import React from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/CodeBlock";

function PreWithSyntax({ children }: React.HTMLAttributes<HTMLPreElement>) {
  if (!React.isValidElement(children)) return <pre>{children}</pre>;
  const props = children.props as React.HTMLAttributes<HTMLElement>;
  const language = /language-([^\s]+)/.exec(props.className || "")?.[1] ?? null;
  return (
    <CodeBlock language={language}>{String(props.children ?? "").replace(/\n$/, "")}</CodeBlock>
  );
}

export function InlineCode(props: React.HTMLAttributes<HTMLElement>) {
  const className = (props.className || "") as string;
  const language = /language-([^\s]+)/.exec(className)?.[1] ?? null;
  const content = String(props.children || "");
  if (language) return <CodeBlock language={language}>{content}</CodeBlock>;
  return <CodeBlock inline>{content}</CodeBlock>;
}

type MdxLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

function unwrapLegacyAnchor(children: React.ReactNode): React.ReactNode {
  if (!React.isValidElement(children)) return children;
  if (children.type !== "a") return children;

  const anchor = children as React.ReactElement<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
  return anchor.props.children;
}

function MdxLink({ href, children, className, title, id, ...props }: MdxLinkProps) {
  const linkChildren = unwrapLegacyAnchor(children);

  if (!href) {
    return (
      <span className={className} title={title} id={id}>
        {linkChildren}
      </span>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} title={title} id={id}>
        {linkChildren}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} title={title} id={id}>
        {linkChildren}
      </a>
    );
  }

  const isHttpUrl = href.startsWith("http://") || href.startsWith("https://");

  return (
    <a
      href={href}
      className={className}
      title={title}
      id={id}
      target={props.target ?? (isHttpUrl ? "_blank" : undefined)}
      rel={props.rel ?? (isHttpUrl ? "noopener noreferrer" : undefined)}
    >
      {linkChildren}
    </a>
  );
}

export const mdxCodeComponents: MDXComponents = {
  h1: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
  pre: PreWithSyntax,
  a: MdxLink as never,
  code: InlineCode as never,
  Link: MdxLink as never,
};
