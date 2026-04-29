import { JsonEditor, TextAreaField, TextField } from '../components/AdminFields'
import { useContent } from '../../content/ContentContext'

export function HomeEditorPage() {
  const { content, updateContent } = useContent()
  const home = content.pages.home

  const setHome = (patch: Partial<typeof home>) =>
    updateContent((prev) => ({ ...prev, pages: { ...prev.pages, home: { ...prev.pages.home, ...patch } } }))

  return (
    <div className="admin-page">
      <h2>Home Editor</h2>
      <div className="admin-grid">
        <TextField label="Hero title" value={home.heroTitle} onChange={(value) => setHome({ heroTitle: value })} />
        <TextField label="Hero tagline" value={home.heroTagline} onChange={(value) => setHome({ heroTagline: value })} />
        <TextField
          label="Hero primary CTA label"
          value={home.heroPrimaryCtaLabel}
          onChange={(value) => setHome({ heroPrimaryCtaLabel: value })}
        />
        <TextField
          label="Hero primary CTA path"
          value={home.heroPrimaryCtaPath}
          onChange={(value) => setHome({ heroPrimaryCtaPath: value })}
        />
        <TextField
          label="Hero secondary CTA label"
          value={home.heroSecondaryCtaLabel}
          onChange={(value) => setHome({ heroSecondaryCtaLabel: value })}
        />
        <TextField
          label="Hero secondary CTA path"
          value={home.heroSecondaryCtaPath}
          onChange={(value) => setHome({ heroSecondaryCtaPath: value })}
        />
        <TextField
          label="Hero video source"
          value={home.heroVideoSrc}
          onChange={(value) => setHome({ heroVideoSrc: value })}
        />
        <TextField
          label="Clinic image source"
          value={home.clinicImageSrc}
          onChange={(value) => setHome({ clinicImageSrc: value })}
        />
        <TextField
          label="Clinic section heading"
          value={home.clinicHeading}
          onChange={(value) => setHome({ clinicHeading: value })}
        />
        <TextField
          label="Tips section heading"
          value={home.tipsHeading}
          onChange={(value) => setHome({ tipsHeading: value })}
        />
        <TextField
          label="Tips section subheading"
          value={home.tipsSubheading}
          onChange={(value) => setHome({ tipsSubheading: value })}
        />
        <TextField label="Bottom CTA heading" value={home.ctaHeading} onChange={(value) => setHome({ ctaHeading: value })} />
      </div>

      <TextAreaField
        label="Clinic paragraph one"
        value={home.clinicParagraphOne}
        onChange={(value) => setHome({ clinicParagraphOne: value })}
      />
      <TextAreaField
        label="Clinic paragraph two"
        value={home.clinicParagraphTwo}
        onChange={(value) => setHome({ clinicParagraphTwo: value })}
      />
      <TextAreaField label="Bottom CTA text" value={home.ctaText} onChange={(value) => setHome({ ctaText: value })} />
      <TextField label="Bottom CTA button label" value={home.ctaButtonLabel} onChange={(value) => setHome({ ctaButtonLabel: value })} />
      <TextField label="Bottom CTA button path" value={home.ctaButtonPath} onChange={(value) => setHome({ ctaButtonPath: value })} />
      <TextField label="Bottom CTA hint" value={home.ctaHint} onChange={(value) => setHome({ ctaHint: value })} />

      <JsonEditor label="Service preview cards" value={home.servicePreview} onChange={(value) => setHome({ servicePreview: value })} />
      <JsonEditor label="Dental tips" value={home.dentalTips} onChange={(value) => setHome({ dentalTips: value })} />
      <JsonEditor label="Trust points" value={home.trustPoints} onChange={(value) => setHome({ trustPoints: value })} />
    </div>
  )
}
