import React from "react";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#101114] text-white font-sans">{children}</div>;
}
