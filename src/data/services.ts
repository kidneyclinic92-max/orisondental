import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  HeartPulse,
  ScanLine,
} from 'lucide-react'

export type ServiceItem = {
  Icon: LucideIcon
  title: string
  text: string
}

export const services: ServiceItem[] = [
  {
    Icon: HeartPulse,
    title: 'Braces for All Ages',
    text: 'Customized braces designed to align your teeth and enhance your smile effectively.',
  },
  {
    Icon: ScanLine,
    title: 'Clear Aligners Available',
    text: 'Invisible aligners that straighten teeth comfortably and discreetly for a confident smile.',
  },
  {
    Icon: Activity,
    title: 'Dental Implants Offered',
    text: 'Durable implants that restore your smile and improve functionality with natural appearance.',
  },
]
