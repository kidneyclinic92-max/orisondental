import type { LucideIcon } from 'lucide-react'
import {
  CarFront,
  Clock,
  HeartHandshake,
  MapPin,
  MessageCircleHeart,
  Microscope,
  Quote,
  UsersRound,
} from 'lucide-react'

export type PillarItem = {
  Icon: LucideIcon
  title: string
  text: string
  imageSrc: string
  imageAlt: string
}

export const pillars: PillarItem[] = [
  {
    Icon: HeartHandshake,
    title: 'Braces for All Ages',
    text: 'Customized braces designed to align your teeth and enhance your smile effectively.',
    imageSrc: '/assets/braces_for_all_ages.jpg',
    imageAlt:
      'Young patient smiling during an orthodontic visit at the dental clinic',
  },
  {
    Icon: Microscope,
    title: 'Clear Aligners Available',
    text: 'Invisible aligners that straighten teeth comfortably and discreetly for a confident smile.',
    imageSrc: '/assets/clear_aligners.webp',
    imageAlt: 'Dental professional discussing comfortable clear aligner treatment',
  },
  {
    Icon: UsersRound,
    title: 'Dental Implants Offered',
    text: 'Durable implants that restore your smile and improve functionality with natural appearance.',
    imageSrc: '/assets/dental_implant.webp',
    imageAlt: 'Modern dental tools and sterile setup for restorative care',
  },
]

export type TestimonialItem = {
  Icon: LucideIcon
  quote: string
  name: string
  detail: string
}

export const testimonials: TestimonialItem[] = [
  {
    Icon: MessageCircleHeart,
    quote:
      'Orison Dental transformed my smile with their expert care and advanced technology. Highly recommend their services!',
    name: 'Ahmed',
    detail: 'Verified patient',
  },
  {
    Icon: Quote,
    quote:
      'The clinic is modern, clean, and professional. The staff explained every step and made me feel fully comfortable.',
    name: 'Sarah K.',
    detail: 'Orthodontic care',
  },
  {
    Icon: UsersRound,
    quote:
      'From braces to follow-ups, everything was smooth and well-organized. I can see a real difference in my smile.',
    name: 'Usman R.',
    detail: 'Braces treatment',
  },
]

export type VisitCardItem = {
  Icon: LucideIcon
  title: string
  kind: 'hours' | 'address' | 'parking'
}

export const visitCardMeta: VisitCardItem[] = [
  { Icon: Clock, title: 'Office hours', kind: 'hours' },
  { Icon: MapPin, title: 'Find us', kind: 'address' },
  { Icon: CarFront, title: 'Parking & access', kind: 'parking' },
]
