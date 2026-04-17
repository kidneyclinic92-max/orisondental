/** Royalty-free clinic imagery (Unsplash). Replace with your own assets in `public/assets/` anytime. */
export const homeIntroVisual = {
  src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47247a6?auto=format&fit=crop&w=1400&q=82',
  alt: 'Bright modern dental office with treatment chair and equipment',
} as const

export type ShowcaseTile = {
  src: string
  alt: string
  caption: string
}

export const homeShowcaseImages: ShowcaseTile[] = [
  {
    src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=82',
    alt: 'Dentist and patient during a consultation in a bright clinic',
    caption: 'Personalized consultations',
  },
  {
    src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=82',
    alt: 'Close-up of advanced dental care and hygiene',
    caption: 'Advanced, gentle techniques',
  },
  {
    src: 'https://images.unsplash.com/photo-1607545727073-666b0898cb0c?auto=format&fit=crop&w=900&q=82',
    alt: 'Healthy natural smile after cosmetic dental care',
    caption: 'Smile-focused outcomes',
  },
]
