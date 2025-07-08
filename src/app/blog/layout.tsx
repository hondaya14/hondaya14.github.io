import React from 'react';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#222] font-sans">
      {children}
    </div>
  );
}
