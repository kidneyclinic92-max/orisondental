export type NavLink = {
  label: string
  path: string
}

export type SocialLink = {
  platform: string
  url: string
}

export type ServiceItem = {
  title: string
  text: string
  imageSrc: string
  imageAlt: string
}

export type TipItem = {
  title: string
  text: string
  imageSrc: string
  imageAlt: string
}

export type TrustItem = {
  title: string
  text: string
}

export type AchievementItem = {
  stat: string
  title: string
  text: string
  imageSrc: string
  imageAlt: string
}

export type MetricItem = {
  value: string
  label: string
  hint: string
}

export type OfferingItem = {
  title: string
  text: string
}

export type ContactCard = {
  title: string
  text: string
  value?: string
  href?: string
}

export type SiteContent = {
  site: {
    brandName: string
    logoSrc: string
    navLinks: NavLink[]
    navCtaLabel: string
    navCtaPath: string
    footerAddress: string
    phoneDisplay: string
    phoneHref: string
    socialLinks: SocialLink[]
  }
  pages: {
    home: {
      heroTitle: string
      heroTagline: string
      heroPrimaryCtaLabel: string
      heroPrimaryCtaPath: string
      heroSecondaryCtaLabel: string
      heroSecondaryCtaPath: string
      clinicHeading: string
      clinicParagraphOne: string
      clinicParagraphTwo: string
      servicePreview: ServiceItem[]
      tipsHeading: string
      tipsSubheading: string
      dentalTips: TipItem[]
      trustPoints: TrustItem[]
      ctaHeading: string
      ctaText: string
      ctaButtonLabel: string
      ctaButtonPath: string
      ctaHint: string
      heroVideoSrc: string
      clinicImageSrc: string
    }
    services: {
      heading: string
      intro: string
      cards: ServiceItem[]
      cardCtaLabel: string
      cardCtaPath: string
    }
    achievements: {
      heading: string
      intro: string
      items: AchievementItem[]
    }
    about: {
      heading: string
      intro: string
      offeringsHeading: string
      offeringsIntro: string
      metrics: MetricItem[]
      offerings: OfferingItem[]
      ctaHeading: string
      ctaText: string
      ctaCallLabel: string
      ctaBookLabel: string
      ctaBookPath: string
    }
    contact: {
      kicker: string
      heading: string
      intro: string
      cards: ContactCard[]
      callNowLabel: string
      callNowPath: string
      bookLabel: string
      bookPath: string
      formLabel: string
      formSubheading: string
      emailLabel: string
      emailPlaceholder: string
      emailRequiredError: string
      emailInvalidError: string
      submitLabel: string
      successHeading: string
      successText: string
    }
    book: {
      heading: string
      intro: string
      bullets: string[]
      form: {
        title: string
        successTitle: string
        successText: string
        bookAnotherLabel: string
        submitLabel: string
        fields: {
          nameLabel: string
          emailLabel: string
          phoneLabel: string
          serviceLabel: string
          dateLabel: string
          timeLabel: string
          notesLabel: string
          notesPlaceholder: string
        }
        serviceOptions: string[]
        timeOptions: string[]
        validation: {
          nameRequired: string
          emailRequired: string
          emailInvalid: string
          phoneRequired: string
          dateRequired: string
          serviceRequired: string
        }
      }
    }
  }
}
