export function getTagColor(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    "text-yellow-400",
    "text-green-400",
    "text-cyan-400",
    "text-pink-400",
    "text-orange-400",
    "text-lime-400",
    "text-emerald-400",
    "text-teal-400",
    "text-blue-400",
    "text-violet-400",
  ];

  return colors[Math.abs(hash) % colors.length];
}
