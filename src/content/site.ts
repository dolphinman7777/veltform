export type Service = {
  id: string;
  title: string;
  body: string;
};

export type Offering =
  | { id: string; title: string; kind: "copy"; body: string }
  | { id: string; title: string; kind: "list"; items: readonly string[] };

export type LifestyleDetailLink = {
  text: string;
  href: string;
};

export type LifestyleDetailListItem =
  | string
  | {
      segments: readonly (string | LifestyleDetailLink)[];
    };

export type LifestyleScenarioProseDetail = {
  lead?: string;
  paragraphs: readonly string[];
  closing?: string;
};

export type LifestyleScenarioListDetail = {
  paragraphs?: readonly string[];
  intro?: string;
  items: readonly LifestyleDetailListItem[];
};

export type LifestyleScenarioDetailCopy =
  | string
  | LifestyleScenarioProseDetail
  | LifestyleScenarioListDetail;

export type LifestyleScenarioDetails = {
  focus: LifestyleScenarioDetailCopy;
  climateTypes: LifestyleScenarioDetailCopy;
  cropTypes: LifestyleScenarioDetailCopy;
};

export type LifestyleScenarioSlide = {
  tagline: string;
  paragraphs: readonly string[];
};

export type LifestyleScenario = {
  id: string;
  title: string;
  body: string;
  image: string;
  homeImage: string;
  slide: LifestyleScenarioSlide;
  details: LifestyleScenarioDetails;
};

export const site = {
  name: "veldform",
  displayName: "Veldform",
  tagline: "Bespoke Botanical Environments",
  heroMotto: "Bespoke Botanical Environments",
  heroImage: "/images/home/video-poster.png",
  heroBackground: "/images/home/hero-desktop.png",
  heroBackgroundMobile: "/images/home/hero-mobile.jpg",
  heroBackgroundMobileBw: "/images/home/hero-mobile-bw.jpg",
  heroVideo: "/videos/home-weather-and-light.mp4",
  heroVideoHeadlineHighlight: "consistent",
  heroVideoHeadline: "abundance",
  processHighlight: "process",
  processSteps: [
    {
      id: "enquire",
      label: "01",
      title: "enquire",
      description:
        "Share your site, crops, and how you want to use the greenhouse. We listen first, then outline what is possible on your plot.",
    },
    {
      id: "map",
      label: "02",
      title: "Map",
      description:
        "We assess light through the year, access, services, and where the structure fits best — so the design works with the land, not against it.",
    },
    {
      id: "quote",
      label: "03",
      title: "Quote",
      description:
        "You receive a clear scope, specification, and price for the greenhouse and systems included — no surprises once work begins.",
    },
    {
      id: "measure",
      label: "04",
      title: "Measure",
      description:
        "We confirm dimensions, levels, and fixing details on site before fabrication so the build matches the plan.",
    },
    {
      id: "build",
      label: "05",
      title: "Build",
      description:
        "The greenhouse is installed, climate systems commissioned, and you are shown how to run it for your crops.",
    },
  ] as const,
  architecturalInfluencesHighlight: "bespoke",
  architecturalInfluencesHeadline: "greenhouse designs",
  architecturalInfluencesImage: "/images/home/architectural-influences.png",
  climateSystemsHighlight: "automatic",
  climateSystemsHeadline: "climate management",
  climateSystemsSubline: "For more than comfort.",
  climateSystemsBody:
    "Autonomous climate steering can promote the speed of plant growth, and increase the production of nutritionally and medicinally relevant compounds which make up the unique aroma and flavour of plants.",
  climateSystemsImage: "/images/home/automatic-climate-management.png",
  thesisSupport:
    "Each one is planned around the light, weather, and crops on your site.",
  servicesIntro:
    "The sum or selection of these services makeup a complete greenhouse solution",
  services: [
    {
      id: "viability",
      title: "Site and crop viability assessment",
      body: "We assess light levels across your site in summer and winter to understand what you can grow, where, and when. The assessment also helps determine whether supplementary lighting or climate control would be useful for your chosen crops.",
    },
    {
      id: "climate",
      title: "Climate management design",
      body: "Each greenhouse is designed around its location and intended crops. Temperature and humidity sensors can control extraction fans, while heat activated vents provide passive ventilation when conditions allow. Vent size, placement and outside weather still determine how much cooling passive ventilation can provide.",
    },
    {
      id: "irrigation",
      title: "Root zone and irrigation planning",
      body: "Choose from soil beds, raised beds and hydroponic systems, including deep water culture and nutrient film technique. Where nearby trees or hedges compete for water and nutrients, raised or isolated beds can protect the growing area. Moisture sensors can help schedule irrigation so roots receive water while retaining the air they need to grow.",
    },
    {
      id: "lighting",
      title: "Supplementary lighting",
      body: "In shaded locations or seasons with limited daylight, supplementary LEDs can extend the growing period or provide the light a crop needs to perform well. We size lighting around the crop’s daily light requirement and the natural light available. Solar and battery systems can supply some or all of the electricity, depending on their capacity and the lighting demand.",
    },
    {
      id: "monitoring",
      title: "Monitoring and control",
      body: "A locally hosted, web connected control system lets you check greenhouse conditions remotely, operate compatible irrigation and ventilation equipment, and receive alerts when readings move outside your chosen ranges.",
    },
    {
      id: "training",
      title: "Training and guidance",
      body: "We offer onsite training for owners and staff, from hands-on growing basics to more detailed system management. This can cover germination, transplanting, hydroponic reservoirs, crop monitoring and routine maintenance, supported by a digital or printed guide.",
    },
  ] satisfies Service[],
  sensorsHighlight: "Use sensors",
  sensorsHeadline: "in your greenhouse to steer the climate.",
  sensorsCopy: "Hands off approach to climate management",
  sensorReadings: [
    { id: "temperature", caption: "temperature · air movement" },
    { id: "humidity", caption: "humidity · vapour pressure deficit" },
    { id: "moisture", caption: "moisture · irrigation schedule" },
    { id: "light", caption: "light · daily light requirement" },
    { id: "monitoring", caption: "monitoring · remote alerts" },
  ] as const,
  materialsIntro:
    "Greenhouses can range from bespoke timber and glass structures to prefabricated aluminium and polycarbonate kits. Appearance and budget matter, but site conditions, light transmission, ventilation and how the greenhouse is managed also shape growing performance.",
  offerings: [
    {
      id: "timber-glass",
      title: "Timber or steel and glass",
      kind: "copy",
      body: "A custom timber or steel frame with suitable greenhouse glazing can offer a distinctive appearance and a long service life. Costs depend on the structure, glazing specification and fabrication required.",
    },
    {
      id: "timber-poly",
      title: "Timber and polycarbonate",
      kind: "copy",
      body: "Timber allows a frame to be tailored to existing structures and the character of the property. Twin wall polycarbonate can offer insulation and diffuse incoming light, though light transmission and service life vary by product.",
    },
    {
      id: "aluminium-kit",
      title: "Aluminium and polycarbonate kits",
      kind: "copy",
      body: "Prefabricated kits can be a practical option where their dimensions suit the site. Foundations, raised beds and any supporting structure need to be considered as part of the full installation cost.",
    },
    {
      id: "substrate",
      title: "Substrate and container options",
      kind: "list",
      items: [
        "Growing in the existing soil",
        "Framed beds with a selected growing mix",
        "Fully raised beds",
        "Hydroponics, including deep water culture, nutrient film technique or stonewool.",
      ],
    },
    {
      id: "lighting",
      title: "Supplementary lighting",
      kind: "copy",
      body: "Where a site receives limited light, crops can be selected to suit the conditions or supported with artificial lighting. LEDs can extend the day or add light during darker periods. Existing solar and battery infrastructure may help, but the choice depends on when the lights run and how much electricity the system can supply.",
    },
    {
      id: "germination",
      title: "Germination station",
      kind: "copy",
      body: "A dedicated space with suitable temperature, light and humidity for starting seedlings.",
    },
    {
      id: "postharvest",
      title: "Postharvest area",
      kind: "copy",
      body: "Space for washing, preparing and drying harvested produce, designed around the crops and intended use.",
    },
  ] satisfies Offering[],
  lifestyleIntro:
    "The same structure can be a kitchen garden, a botanical library, or a living space.",
  lifestyleSlideEyebrow: "Greenhouse Systems",
  scenarios: [
    {
      id: "kitchen-garden",
      title: "kitchen garden",
      body: "Vegetable production, planned for maximum efficiency.",
      image: "/images/lifestyle/kitchen-garden.jpg",
      homeImage: "/images/home/lifestyle-kitchen-garden.png",
      slide: {
        tagline: "Grown for flavour.",
        paragraphs: [
          "A kitchen garden gives you the freedom to grow ingredients around the food you enjoy.",
          "Commercial produce must meet the demands of handling, transport and shelf life. Growing for your own kitchen allows different priorities: a tomato’s flavour, a pepper’s sweetness, the fragrance of a particular herb. You can choose varieties for their eating qualities and harvest them when they are ready, minutes before they reach the plate.",
          "Our smart greenhouse systems make this easier to achieve. Climate, watering and lighting are managed automatically, helping maintain the conditions plants need to thrive without daily attention. We don't grow plants, they grow themselves, we just need to put them in the right environment. You can enjoy a productive garden without having to master the science behind it.",
          "Your needs come first. You choose what goes into the soil, and onto the plants, and in turn, what ends up on your plate.",
          "For a home cook, this might mean growing varieties that are difficult to find locally and organically, or simply keeping favourite herbs close at hand.",
          "For a private chef or hospitality kitchens, it offers the opportunity to grow around a menu, choosing ingredients for the qualities a dish calls for. Grown locally, picked when ripe.",
        ],
      },
      details: {
        focus: "Flavour, organic passion, convenience, consistency, self-sufficiency.",
        climateTypes: "Multi-group or crop choice specific — Mediterranean.",
        cropTypes: "Tomatoes, cucumber, herbs, peppers, chillies, strawberries, dwarf bananas.",
      },
    },
    {
      id: "botanical-library",
      title: "botanical library",
      body: "A stable climate for rare collections.",
      image: "/images/lifestyle/botanical-library.jpg",
      homeImage: "/images/home/lifestyle-botanical-library.png",
      slide: {
        tagline: "A collector’s paradise.",
        paragraphs: [
          "A unique climate, a biosphere to sustain a special collection of plants. A botanical library can include more than just a cultivation environment, but also one designed around conservation, seed saving and propagation. Grow your collection, and travel with peace of mind, the automatic climate and self watering systems will keep your plants thriving while you're away.",
        ],
      },
      details: {
        focus: "Curiosity, passion, collection.",
        climateTypes: "Multi-group or plant group specific: tropical, arid, cloud forest, Mediterranean.",
        cropTypes: {
          items: [
            "Tropical — aroids, palms, prayer plants",
            "Arid — cacti, succulents, spurges",
            "Cloud forest — orchids, bromeliads, ferns",
          ],
        },
      },
    },
    {
      id: "living-space",
      title: "living space",
      body: "A comfortable mixed-use space for plants and people.",
      image: "/images/lifestyle/living-space.jpg",
      homeImage: "/images/home/lifestyle-living-space.png",
      slide: {
        tagline: "The tranquility of nature and the expression of design.",
        paragraphs: [
          "Visually distilled, with architectural plants, capturing curiosity with interesting exotics or evoking emotion with intentional sprays of floral colour - the botanical scene sets the backdrop for life to unfold.",
          "Cool and shaded in summer and warm and sunny in winter, bespoke design and automatic climate management solutions create a climate to be desired.",
          "As a mixed utility space the additional options are boundless. Be it a bar, a braai or a discreet yet immersive sound system, a plunge pool or a sauna, if we can't install or build it we’ll find a sub-contractor who can - or work alongside artisans of your choosing.",
          "Unlike a traditional greenhouse focused on maximizing crop production, our Living Spaces are shaped around your interests, hobbies and personal tastes and style.",
          "A place to relax, to enjoy natural beauty, to express yourself and share your expression with others.",
        ],
      },
      details: {
        focus: "Entertainment, tranquility, space creation, all-weather garden.",
        climateTypes: "Comfortable — semi-tropical, cool.",
        cropTypes: "Palms, ferns, creepers, flowers.",
      },
    },
  ] satisfies LifestyleScenario[],
  contactEmail: "hello@veldform.com",
  /** Public origin used for canonical URLs, sitemap and share tags. Override with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://veldform.com").replace(/\/$/, ""),
  /**
   * Search/social copy only — shown in Google results and link previews, never on the page.
   * Kept in step with on-page copy.
   */
  seo: {
    home: {
      title: "Veldform — Bespoke Botanical Environments",
      description:
        "Bespoke botanical environments with automatic climate management: kitchen gardens, botanical libraries and living spaces, designed and built around your plants.",
    },
    lifestyle: {
      title: "Lifestyle Segments — Kitchen Gardens to Living Spaces",
      description:
        "A kitchen garden grown for flavour, a botanical library for collectors, or a botanical living space. Explore how a Veldform environment fits the way you live.",
    },
    systems: {
      title: "Systems — Greenhouse Services and Materials",
      description:
        "Site assessment, climate design, irrigation, lighting, monitoring and training: the services, materials and sensors behind a Veldform greenhouse.",
    },
    environments: {
      title: "Environments — Four Growing Climates",
      description:
        "Temperature, humidity, VPD and light ranges for Mediterranean, tropical, arid and cloud forest growing environments, with botanical curation and rare plant sourcing.",
    },
    process: {
      title: "Process — From Enquiry to Build",
      description:
        "How a Veldform environment comes together: enquire, map your site, quote, measure and build.",
    },
    enquire: {
      title: "Enquire — Book a Consultation",
      description:
        "Book a consultation with Veldform about a kitchen garden, botanical library, living space, design support or retrofitting.",
    },
  },
} as const;
