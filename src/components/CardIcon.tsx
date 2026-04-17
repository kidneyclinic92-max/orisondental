import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  large?: boolean
  className?: string
}

export function CardIcon({ icon: Icon, large, className = '' }: Props) {
  const wrapClass = ['card-icon', large ? 'card-icon--lg' : '', className]
    .filter(Boolean)
    .join(' ')
  const size = large ? 26 : 22

  return (
    <div className={wrapClass} aria-hidden>
      <Icon size={size} strokeWidth={1.65} />
    </div>
  )
}
