import { defaultContent } from './defaultContent'
import type { SiteContent } from './types'

const STORAGE_KEY = 'orison_site_content_v1'

function cloneDefault(): SiteContent {
  return JSON.parse(JSON.stringify(defaultContent)) as SiteContent
}

export function loadContent(): SiteContent {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return cloneDefault()
    const parsed = JSON.parse(raw) as SiteContent
    return { ...cloneDefault(), ...parsed, site: { ...cloneDefault().site, ...parsed.site }, pages: { ...cloneDefault().pages, ...parsed.pages } }
  } catch {
    return cloneDefault()
  }
}

export function saveContent(content: SiteContent) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
}

export function resetContent() {
  const next = cloneDefault()
  saveContent(next)
  return next
}
