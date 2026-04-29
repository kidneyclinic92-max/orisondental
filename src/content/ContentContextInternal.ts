import { createContext } from 'react'
import type { SiteContent } from './types'

export type ContentContextValue = {
  content: SiteContent
  setContent: (content: SiteContent) => void
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void
  resetToDefault: () => void
}

export const ContentContext = createContext<ContentContextValue | null>(null)

