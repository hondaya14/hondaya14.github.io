import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'

type AnchorProps = ComponentProps<'a'> & {
  href?: string
  children: React.ReactNode
}

type ImageProps = ComponentProps<'img'> & {
  src?: string
  alt?: string
}

type PreProps = ComponentProps<'pre'> & {
  children: React.ReactNode
}

type CodeProps = ComponentProps<'code'> & {
  children: React.ReactNode
}

type BlockquoteProps = ComponentProps<'blockquote'> & {
  children: React.ReactNode
}

export const MDXComponents = {
  // カスタムリンクコンポーネント
  a: ({ href, children, ...props }: AnchorProps) => {
    if (href?.startsWith('http') || href?.startsWith('https')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href || '#'} {...props}>
        {children}
      </Link>
    )
  },
  
  // カスタム画像コンポーネント
  img: ({ src, alt, width, height, ...props }: ImageProps) => {
    if (!src) return null
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={typeof width === 'string' ? parseInt(width) || 800 : width || 800}
        height={typeof height === 'string' ? parseInt(height) || 400 : height || 400}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
        {...props}
      />
    )
  },
  
  // コードブロック
  pre: ({ children, ...props }: PreProps) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto" {...props}>
      {children}
    </pre>
  ),
  
  // インラインコード
  code: ({ children, ...props }: CodeProps) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
      {children}
    </code>
  ),
  
  // ブロッククォート
  blockquote: ({ children, ...props }: BlockquoteProps) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </blockquote>
  ),
}
