import type { LucideIcon } from 'lucide-react'
import {
  Award,
  CalendarCheck,
  CalendarDays,
  Star,
} from 'lucide-react'

export type AchievementItem = {
  Icon: LucideIcon
  stat: string
  title: string
  text: string
  imageSrc: string
  imageAlt: string
}

export const achievements: AchievementItem[] = [
  {
    Icon: CalendarDays,
    stat: '100+',
    title: 'Successful dental surgeries',
    text: 'Dummy metric showcasing high-volume oral and restorative surgical care.',
    imageSrc: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Dental surgical setup',
  },
  {
    Icon: Star,
    stat: '250+',
    title: 'Braces and aligner cases',
    text: 'Dummy data representing completed orthodontic treatment plans.',
    imageSrc:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Orthodontic braces treatment',
  },
  {
    Icon: CalendarCheck,
    stat: '12+',
    title: 'Advanced technologies in use',
    text: 'Digital diagnostics, precision imaging, and modern chairside systems.',
    imageSrc: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern clear aligner technology',
  },
  {
    Icon: Award,
    stat: '50+',
    title: 'Complex smile restorations',
    text: 'Dummy benchmark for crowns, implants, and full-smile rehabilitation cases.',
    imageSrc: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Smile restoration treatment result',
  },
]
