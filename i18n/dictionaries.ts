import "server-only"

export type Dictionary = {
  navigation: {
    home: string
    about: string
    services: string
    gallery: string
    reviews: string
    contact: string
    privacy: string
    terms: string
    signIn: string
    bookNow: string
  }
  hero: {
    title: string
    subtitle: string
    cta: string
  }
  footer: {
    slogan: string
    rights: string
    links: {
      home: string
      services: string
      gallery: string
      about: string
      contact: string
      privacy: string
      terms: string
    }
    sections: {
      links: string
      legal: string
    }
  }
  about: {
    metadata: { title: string; description: string }
    title: string
    subtitle: string
    ourHistoryTitle: string
    ourHistoryParagraph1: string
    ourHistoryParagraph2: string
    ourHistoryParagraph3: string
    ourValuesTitle: string
    values: {
      love: { title: string; description: string }
      quality: { title: string; description: string }
      attention: { title: string; description: string }
    }
  }
  gallery: {
    metadata: { title: string; description: string }
    title: string
    subtitle: string
  }
  beforeAfter: {
    title: string
    subtitle: string
    beforeLabel: string
    afterLabel: string
    sets: {
      alt1: string
      alt2: string
      alt3: string
    }
    ariaLabelPrefix: string
  }
  instagram: {
    title: string
    subtitle: string
    followUs: string
    viewOnInstagram: string
  }
  education: {
    title: string
    subtitle: string
    categories: {
      care: string
      tips: string
      warnings: string
      health: string
    }
    articles: {
      care: Array<{
        title: string
        description: string
        content: string
      }>
      tips: Array<{
        title: string
        description: string
        content: string
      }>
      warnings: Array<{
        title: string
        description: string
        content: string
      }>
      health: Array<{
        title: string
        description: string
        content: string
      }>
    }
  }
  contact: {
    title: string
    description: string
    subtitle: string
    address: { label: string; value: string }
    phone: { label: string; value: string }
    email: { label: string; value: string }
    hours: { label: string; value: string }
    social: {
      follow: string
      facebook: string
      instagram: string
      whatsapp: string
    }
    contactButton: string
    mapTitle: string
    whatsappTooltip: {
      title: string
      description: string
      ariaLabel: string
      close: string
    }
    form?: {
      title: string
      description: string
      name: string
      email: string
      message: string
      submit: string
      success: string
    }
  }
  services: {
    metadata: {
      title: string
      description: string
    }
    title: string
    subtitle: string
    smallDogs: string
    mediumDogs: string
    largeDogs: string
    services: {
      premium_bath: {
        title: string
        description: string
        price_small: string
        price_medium: string
        price_large: string
      }
      full_grooming: {
        title: string
        description: string
        price_small: string
        price_medium: string
        price_large: string
      }
      spa_treatment: {
        title: string
        description: string
        price_small: string
        price_medium: string
        price_large: string
      }
    }
    sizeGuide: {
      title: string
      small: string
      medium: string
      large: string
    }
    servicesList: {
      title: string
      items: string[]
    }
    featured: {
      bath: {
        title: string
        description: string
        items: string[]
      }
      cut: {
        title: string
        description: string
        items: string[]
      }
      spa: {
        title: string
        description: string
        items: string[]
      }
    }
    packages: {
      title: string
      subtitle: string
      popular: {
        tag: string
        title: string
        description: string
        price: string
        items: string[]
        button: string
      }
      best: {
        tag: string
        title: string
        description: string
        price: string
        items: string[]
        button: string
      }
      vip: {
        tag: string
        title: string
        description: string
        price: string
        items: string[]
        button: string
      }
    }
    contactCta: string
  }
  auth: {
    signIn: {
      title: string
      description: string
      emailPlaceholder: string
      password: string
      forgotPassword: string
      submit: string
      loading: string
      orContinueWith: string
      google: string
      facebook: string
      termsNotice: string
      terms: string
      errorTitle: string
      errorDescription: string
      oauthErrorDescription: string
    }
  }
  error: {
    title: string
    description: string
    retry: string
    backToHome: string
  }
  notFound: {
    title: string
    description: string
    home: string
    contact: string
  }
  privacy: {
    metadata: { title: string; description: string }
    title: string
    lastUpdated: string
    sections: {
      title: string
      content: string[]
    }[]
  }
  terms: {
    metadata: {
      title: string
      description: string
    }
    title: string
    lastUpdated: string
    sections: {
      title: string
      content: string[]
    }[]
  }
  home: {
    metaTitle: string
    metaDescription: string
  }
  reviews: {
    metadata: {
      title: string
      description: string
    }
    title: string
    subtitle: string
  }
  reviewsSection: {
    title: string
    sortBy: string
    sortOptions: {
      recent: string
      highest: string
      lowest: string
    }
    likesLabel: string
    repliesLabel: string
    reviewCount: string
    mockComments: string[]
  }
}


const dictionaries = {
  es: () => import("./es.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
}

type RawDictionary = Omit<Dictionary, "reviewsSection"> & {
  reviewsSection: Omit<Dictionary["reviewsSection"], "reviewCount"> & {
    reviewCount: string
  }
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const dict = await (dictionaries[locale as keyof typeof dictionaries] || dictionaries.es)()
  return dict
}