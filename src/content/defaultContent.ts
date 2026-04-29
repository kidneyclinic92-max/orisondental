import type { SiteContent } from './types'

export const defaultContent: SiteContent = {
  site: {
    brandName: 'Orison Dental Clinic',
    logoSrc: '/assets/logo.png',
    navLinks: [
      { label: 'Home', path: '/' },
      { label: 'Services', path: '/services' },
      { label: 'Achievements', path: '/achievements' },
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
    navCtaLabel: 'Book Consultation',
    navCtaPath: '/book',
    footerAddress: '1200 Wellness Blvd, Suite 200',
    phoneDisplay: '0336-001-1925',
    phoneHref: 'tel:+923360011925',
    socialLinks: [
      { platform: 'Facebook', url: 'https://www.facebook.com/' },
      { platform: 'Instagram', url: 'https://www.instagram.com/' },
      { platform: 'TikTok', url: 'https://www.tiktok.com/' },
      { platform: 'X', url: 'https://x.com/' },
    ],
  },
  pages: {
    home: {
      heroTitle: 'Orison Dental Clinic',
      heroTagline: 'Transform Your Smile with Expert Care',
      heroPrimaryCtaLabel: 'Book Consultation',
      heroPrimaryCtaPath: '/book',
      heroSecondaryCtaLabel: 'Explore Services',
      heroSecondaryCtaPath: '/services',
      clinicHeading: 'Orison Dental and Implant Clinic',
      clinicParagraphOne:
        'A modern dental care provider dedicated to delivering high-quality, patient-focused treatments using advanced technology and expert care. The clinic specializes in creating healthy, confident smiles through a range of orthodontic and restorative solutions.',
      clinicParagraphTwo:
        'With a strong emphasis on comfort, precision, and personalized treatment, Orison offers a seamless and stress-free dental experience.',
      servicePreview: [
        {
          title: 'General Dentistry',
          text: 'Checkups, hygiene care, fillings, and routine treatment.',
          imageSrc: '/assets/general_dentistry.png',
          imageAlt: 'General Dentistry',
        },
        {
          title: 'Braces & Aligners',
          text: 'Orthodontic options to straighten teeth and improve your bite.',
          imageSrc: '/assets/braces_aligners.png',
          imageAlt: 'Braces & Aligners',
        },
        {
          title: 'Restorative Care',
          text: 'Crowns, implants, and treatments that restore function and confidence.',
          imageSrc: '/assets/restoration.png',
          imageAlt: 'Restorative Care',
        },
      ],
      tipsHeading: 'Tips for a Healthier Smile',
      tipsSubheading: 'Simple daily habits that help protect your teeth and gums between visits.',
      dentalTips: [
        {
          title: 'Brush Twice Daily',
          text: 'Brush for at least two minutes in the morning and before bed using fluoride toothpaste.',
          imageSrc: '/assets/brushtwice.png',
          imageAlt: 'Person brushing teeth',
        },
        {
          title: 'Floss Every Day',
          text: 'Flossing removes plaque and food particles from areas your toothbrush cannot reach.',
          imageSrc: '/assets/floss.png',
          imageAlt: 'Dental floss close-up',
        },
        {
          title: 'Watch Your Diet',
          text: 'Limit sugary snacks and acidic drinks that can erode enamel and cause cavities.',
          imageSrc: '/assets/diet.png',
          imageAlt: 'Healthy smile-friendly foods',
        },
        {
          title: 'Use Mouthwash',
          text: 'An antibacterial rinse helps reduce plaque, prevent gum disease, and freshen breath.',
          imageSrc: '/assets/mouthwash.png',
          imageAlt: 'Mouthwash bottle and cup',
        },
        {
          title: 'Stay Hydrated',
          text: 'Drinking water throughout the day helps wash away bacteria and keeps your mouth moist.',
          imageSrc: '/assets/hydrated.png',
          imageAlt: 'Person drinking water',
        },
        {
          title: 'Visit Your Dentist',
          text: 'Schedule checkups every six months for professional cleaning and early issue detection.',
          imageSrc: '/assets/dentist.png',
          imageAlt: 'Dental checkup in clinic',
        },
      ],
      trustPoints: [
        {
          title: 'Experienced Team',
          text: 'Professional dentists focused on careful treatment and patient comfort.',
        },
        {
          title: 'Modern Equipment',
          text: 'Digital diagnostics for more efficient assessment and planning.',
        },
        {
          title: 'Clean & Safe',
          text: 'Sterilized instruments and organized treatment spaces at every visit.',
        },
      ],
      ctaHeading: 'Ready to book your next visit?',
      ctaText: 'Get in touch with our team to arrange a consultation or routine dental appointment.',
      ctaButtonLabel: 'Schedule Your Consultation',
      ctaButtonPath: '/book',
      ctaHint: 'Quick and simple online booking',
      heroVideoSrc: '/assets/Dental_Surgery_Video_Generation.mp4',
      clinicImageSrc: '/assets/homepage.png',
    },
    services: {
      heading: 'Services',
      intro:
        'From braces to aligners and implant-based restoration, our care is designed to solve real dental concerns with practical treatment plans.',
      cards: [
        {
          title: 'Braces for all ages',
          text: 'Customized orthodontic plans that align teeth and balance your bite with clarity at every step.',
          imageSrc: '/assets/braces_for_all_ages.jpg',
          imageAlt: 'Braces treatment for all ages',
        },
        {
          title: 'Clear aligners',
          text: 'Discreet, comfortable aligner therapy for confident smiles without traditional brackets.',
          imageSrc: '/assets/clear_aligners.webp',
          imageAlt: 'Clear aligner treatment',
        },
        {
          title: 'Implants & restoration',
          text: 'Durable implant solutions and restorative work that feels natural and functions beautifully.',
          imageSrc: '/assets/dental_implant.webp',
          imageAlt: 'Dental implant restorative care',
        },
      ],
      cardCtaLabel: 'Book consultation',
      cardCtaPath: '/book',
    },
    achievements: {
      heading: 'Awards and Achievements',
      intro:
        'A record built in the treatment room-not on a template. Metrics that reflect real outcomes, patient respect, and the standard we hold ourselves to every day.',
      items: [
        {
          stat: '100+',
          title: 'Successful dental surgeries',
          text: 'Dummy metric showcasing high-volume oral and restorative surgical care.',
          imageSrc:
            'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80',
          imageAlt: 'Dental surgical setup',
        },
        {
          stat: '250+',
          title: 'Braces and aligner transformations',
          text: 'Dummy metric representing orthodontic success stories across ages.',
          imageSrc:
            'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1200&q=80',
          imageAlt: 'Orthodontic consultation',
        },
        {
          stat: '12',
          title: 'Advanced technology systems in use',
          text: 'Dummy metric for digital diagnostics, planning, and treatment precision.',
          imageSrc:
            'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
          imageAlt: 'Advanced dental technology',
        },
      ],
    },
    about: {
      heading: 'Where precision meets calm, confident care',
      intro:
        'We combine advanced diagnostics, meticulous technique, and a patient-first mindset-so every visit feels considered, never rushed. Your oral health deserves a practice that treats detail as seriously as you do.',
      offeringsHeading: 'Clinical focus',
      offeringsIntro:
        'Orthodontics, digital planning, and restorative excellence-built around your goals and your timeline.',
      metrics: [
        {
          value: '150+',
          label: 'Patients cared for',
          hint: 'Trusted outcomes across routine and advanced treatment.',
        },
        {
          value: '15',
          label: 'Specialists on staff',
          hint: 'Orthodontics, surgery, and restorative expertise in one place.',
        },
      ],
      offerings: [
        {
          title: 'Braces for all ages',
          text: 'Customized orthodontic plans that align teeth and balance your bite with clarity at every step.',
        },
        {
          title: 'Clear aligners',
          text: 'Discreet, comfortable aligner therapy for confident smiles without traditional brackets.',
        },
        {
          title: 'Implants & restoration',
          text: 'Durable implant solutions and restorative work that feels natural and functions beautifully.',
        },
      ],
      ctaHeading: 'Ready when you are',
      ctaText: 'Call for a conversation, or book online-we will align the next step to your schedule.',
      ctaCallLabel: 'Call now',
      ctaBookLabel: 'Book consultation',
      ctaBookPath: '/book',
    },
    contact: {
      kicker: 'Orison Dental & Implant Clinic',
      heading: "Let's start a conversation",
      intro:
        'Questions about treatment, timing, or your first visit-reach out by phone or leave your email and we will respond with clear next steps.',
      cards: [
        {
          title: 'Phone',
          text: 'Call during office hours for the fastest answer.',
          value: '0336-001-1925',
          href: 'tel:+923360011925',
        },
        {
          title: 'Email',
          text: 'Use the form - we monitor inquiries and reply as soon as we can.',
        },
        {
          title: 'Practice',
          text: 'Advanced diagnostics and restorative care in one calm, patient-focused setting.',
        },
      ],
      callNowLabel: 'Call now',
      callNowPath: 'tel:+923360011925',
      bookLabel: 'Book consultation',
      bookPath: '/book',
      formLabel: 'Email inquiry',
      formSubheading: "Share your address-we will follow up with scheduling or answers.",
      emailLabel: 'Your email',
      emailPlaceholder: 'you@example.com',
      emailRequiredError: 'Please enter your email address.',
      emailInvalidError: 'Enter a valid email address.',
      submitLabel: 'Send message',
      successHeading: 'Thank you',
      successText: 'We have received your note and will be in touch soon.',
    },
    book: {
      heading: 'Request an appointment',
      intro:
        'Share a few details and we will confirm by phone or email. Prefer to call? Reach us at 0336-001-1925 during office hours.',
      bullets: [
        'Typical response within one business day',
        'Encrypted handling of your contact information',
        'Insurance and billing questions welcome in the notes field',
      ],
      form: {
        title: 'Appointment request form',
        successTitle: 'Thank you',
        successText: 'We have received your request. Our team will contact you shortly to confirm your appointment.',
        bookAnotherLabel: 'Book another visit',
        submitLabel: 'Request appointment',
        fields: {
          nameLabel: 'Full name',
          emailLabel: 'Email',
          phoneLabel: 'Phone',
          serviceLabel: 'Service / visit type',
          dateLabel: 'Preferred date',
          timeLabel: 'Preferred time',
          notesLabel: 'Notes (optional)',
          notesPlaceholder: 'Symptoms, questions, or accessibility needs',
        },
        serviceOptions: [
          'Select...',
          'General consultation',
          'Preventive care',
          'Follow-up visit',
          'Urgent same-day',
          'Other',
        ],
        timeOptions: [
          'Flexible',
          'Morning (8-12)',
          'Afternoon (12-5)',
          'Evening (by arrangement)',
        ],
        validation: {
          nameRequired: 'Please enter your name.',
          emailRequired: 'Please enter your email.',
          emailInvalid: 'Enter a valid email address.',
          phoneRequired: 'Please enter a phone number.',
          dateRequired: 'Choose a preferred date.',
          serviceRequired: 'Select a service or visit type.',
        },
      },
    },
  },
}
