import { useMemo, useState, type ReactNode } from 'react'
import { defaultContent } from './defaultContent'
import { loadContent, resetContent, saveContent } from './service'
import type { SiteContent } from './types'
import { ContentContext } from './ContentContextInternal'

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
