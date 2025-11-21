import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    pageExtensions: ["js", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
    }
})

export default withMDX(nextConfig);
