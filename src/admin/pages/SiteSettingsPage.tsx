import { JsonEditor, TextField } from '../components/AdminFields'
import { useContent } from '../../content/useContent'

export function SiteSettingsPage() {
  const { content, updateContent } = useContent()
  const site = content.site

  return (
    <div className="admin-page">
      <h2>Site Settings</h2>
      <div className="admin-grid">
        <TextField
          label="Brand name"
          value={site.brandName}
          onChange={(value) => updateContent((prev) => ({ ...prev, site: { ...prev.site, brandName: value } }))}
        />
        <TextField
          label="Logo source"
          value={site.logoSrc}
          onChange={(value) => updateContent((prev) => ({ ...prev, site: { ...prev.site, logoSrc: value } }))}
        />
        <TextField
          label="Header CTA label"
          value={site.navCtaLabel}
          onChange={(value) => updateContent((prev) => ({ ...prev, site: { ...prev.site, navCtaLabel: value } }))}
        />
        <TextField
          label="Header CTA path"
          value={site.navCtaPath}
          onChange={(value) => updateContent((prev) => ({ ...prev, site: { ...prev.site, navCtaPath: value } }))}
        />
        <TextField
          label="Footer address"
          value={site.footerAddress}
          onChange={(value) => updateContent((prev) => ({ ...prev, site: { ...prev.site, footerAddress: value } }))}
        />
        <TextField
          label="Phone display"
          value={site.phoneDisplay}
          onChange={(value) => updateContent((prev) => ({ ...prev, site: { ...prev.site, phoneDisplay: value } }))}
        />
        <TextField
          label="Phone link"
          value={site.phoneHref}
          onChange={(value) => updateContent((prev) => ({ ...prev, site: { ...prev.site, phoneHref: value } }))}
        />
      </div>
      <JsonEditor
        label="Navigation links"
        value={site.navLinks}
        onChange={(value) => updateContent((prev) => ({ ...prev, site: { ...prev.site, navLinks: value } }))}
      />
      <JsonEditor
        label="Social links"
        value={site.socialLinks}
        onChange={(value) => updateContent((prev) => ({ ...prev, site: { ...prev.site, socialLinks: value } }))}
      />
    </div>
  )
}
