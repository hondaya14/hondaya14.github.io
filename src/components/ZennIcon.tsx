import Image from 'next/image'

interface ZennIconProps {
  className?: string
}

export default function ZennIcon({ className = 'w-10 h-10' }: ZennIconProps) {
  return (
    <Image
      src="/zenn-logo-only.svg"
      alt="Zenn"
      width={40}
      height={40}
      className={className}
      title="Zenn"
    />
  )
}
