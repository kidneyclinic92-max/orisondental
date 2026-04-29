import { defaultContent } from './defaultContent'
import type { SiteContent } from './types'

const STORAGE_KEY = 'orison_site_content_v1'

function cloneDefault(): SiteContent {
  return JSON.parse(JSON.stringify(defaultContent)) as SiteContent
}

function mergeWithDefaults(parsed: unknown): SiteContent {
  const base = cloneDefault()
  const next = (parsed ?? {}) as Partial<SiteContent> & Record<string, unknown>
  const parsedSite = (next.site ?? {}) as Partial<SiteContent['site']>
  const parsedPages = (next.pages ?? {}) as Partial<SiteContent['pages']>

  const merged: SiteContent = {
    ...base,
    ...next,
    site: {
      ...base.site,
      ...parsedSite,
    },
    pages: {
      ...base.pages,
      ...parsedPages,
      home: { ...base.pages.home, ...(parsedPages.home ?? {}) },
      services: { ...base.pages.services, ...(parsedPages.services ?? {}) },
      achievements: { ...base.pages.achievements, ...(parsedPages.achievements ?? {}) },
      about: { ...base.pages.about, ...(parsedPages.about ?? {}) },
      contact: { ...base.pages.contact, ...(parsedPages.contact ?? {}) },
      book: {
        ...base.pages.book,
        ...(parsedPages.book ?? {}),
        form: {
          ...base.pages.book.form,
          ...(parsedPages.book?.form ?? {}),
          fields: {
            ...base.pages.book.form.fields,
            ...(parsedPages.book?.form?.fields ?? {}),
          },
          validation: {
            ...base.pages.book.form.validation,
            ...(parsedPages.book?.form?.validation ?? {}),
          },
        },
      },
    },
  }

  // Backward compatibility for old content shape and partial objects.
  merged.pages.home.servicePreview = merged.pages.home.servicePreview.map((item, idx) => {
    const legacy = item as unknown as { img?: string }
    return {
      ...base.pages.home.servicePreview[idx],
      ...item,
      imageSrc: item.imageSrc || legacy.img || base.pages.home.servicePreview[idx].imageSrc,
      imageAlt: item.imageAlt || item.title || base.pages.home.servicePreview[idx].imageAlt,
    }
  })

  merged.pages.home.dentalTips = merged.pages.home.dentalTips.map((item, idx) => ({
    ...base.pages.home.dentalTips[idx],
    ...item,
    imageSrc: item.imageSrc || base.pages.home.dentalTips[idx].imageSrc,
    imageAlt: item.imageAlt || item.title || base.pages.home.dentalTips[idx].imageAlt,
  }))

  if (!merged.pages.home.heroVideoSrc?.trim()) {
    merged.pages.home.heroVideoSrc = base.pages.home.heroVideoSrc
  }

  return merged
}

export function loadContent(): SiteContent {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return cloneDefault()
    const parsed = JSON.parse(raw)
    return mergeWithDefaults(parsed)
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
