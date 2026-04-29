import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { defaultContent } from './defaultContent'
import { loadContent, resetContent, saveContent } from './service'
import type { SiteContent } from './types'

type ContentContextValue = {
  content: SiteContent
  setContent: (content: SiteContent) => void
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void
  resetToDefault: () => void
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(() => {
    if (typeof window === 'undefined') return defaultContent
    return loadContent()
  })

  function setContent(next: SiteContent) {
    setContentState(next)
    saveContent(next)
  }

  function updateContent(updater: (prev: SiteContent) => SiteContent) {
    setContentState((prev) => {
      const next = updater(prev)
      saveContent(next)
      return next
    })
  }

  function resetToDefault() {
    const next = resetContent()
    setContentState(next)
  }

  const value = useMemo(
    () => ({
      content,
      setContent,
      updateContent,
      resetToDefault,
    }),
    [content],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const value = useContext(ContentContext)
  if (!value) throw new Error('useContent must be used inside ContentProvider')
  return value
}
