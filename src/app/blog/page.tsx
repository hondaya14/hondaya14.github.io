import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import ZennIcon from '@/components/ZennIcon'

export const metadata = {
  title: 'Blog',
}

export default function BlogPage() {
  const entries = [
    { href: '/blog/posts', label: 'Self-hosted Blog', icon: <FontAwesomeIcon icon={faRss} className="w-6 h-6" /> },
    { href: 'https://zenn.dev/hondaya14', label: 'Zenn', icon: <ZennIcon className="w-6 h-6" /> },
  ]

  return (
    <div className="min-h-screen bg-[#101114] text-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold">Blog</h1>
        <ul className="space-y-4">
          {entries.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                className="flex items-center gap-4 p-4 border border-gray-600 rounded no-underline hover:bg-gray-600/10"
              >
                {icon}
                <span className="text-lg">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
