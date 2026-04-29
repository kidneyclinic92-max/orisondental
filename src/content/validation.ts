import type { SiteContent } from './types'

export function validateContent(content: SiteContent): string[] {
  const errors: string[] = []
  if (!content.site.brandName.trim()) errors.push('Site brand name is required.')
  if (!content.site.navLinks.length) errors.push('At least one navigation link is required.')
  if (!content.pages.home.dentalTips.length) errors.push('Home tips must include at least one item.')
  if (!content.pages.services.cards.length) errors.push('Services page requires at least one card.')
  if (!content.pages.achievements.items.length) errors.push('Achievements page requires at least one tile.')
  if (!content.pages.about.metrics.length) errors.push('About page requires at least one metric.')
  if (!content.pages.contact.cards.length) errors.push('Contact page requires at least one card.')
  if (!content.pages.book.bullets.length) errors.push('Book page requires at least one bullet point.')
  return errors
}
