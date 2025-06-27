import Image from 'next/image'
import Link from 'next/link'

export const MDXComponents = {
  // カスタムリンクコンポーネント
  a: ({ href, children, ...props }: { href?: string; children: React.ReactNode; [key: string]: any }) => {
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
  img: ({ src, alt, ...props }: { src?: string; alt?: string; [key: string]: any }) => {
    if (!src) return null
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={800}
        height={400}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
        {...props}
      />
    )
  },
  
  // コードブロック
  pre: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto" {...props}>
      {children}
    </pre>
  ),
  
  // インラインコード
  code: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
      {children}
    </code>
  ),
  
  // ブロッククォート
  blockquote: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </blockquote>
  ),
}
