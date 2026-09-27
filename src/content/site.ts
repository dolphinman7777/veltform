export type Service = {
  id: string;
  title: string;
  body: string;
};

export type Concept = {
  id: string;
  title: string;
  body: string;
};

export type Offering =
  | { id: string; title: string; kind: "copy"; body: string }
  | { id: string; title: string; kind: "list"; items: readonly string[] };

export type LifestyleScenario = {
  id: string;
  title: string;
  body: string;
  image: string;
};

export const site = {
  name: "veltform",
  displayName: "Veltform",
  tagline: "Bespoke Greenhouses and Climate Systems",
  subtagline: "Bespoke Greenhouses and Climate Systems",
  heroLines: ["bespoke structure", "living climate", "Root soil."],
  sealRing: "science · structure · season",
  thesis:
    "Grow more of the year, in a greenhouse built for your site and your crops.",
  thesisHighlight: ["more of the year", "your site and your crops"],
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
  concepts: [
    {
      id: "light",
      title: "Light",
      body: "Light supplies the energy for photosynthesis. How well a plant uses that light also depends on its temperature, water supply, nutrients and growing conditions.",
    },
    {
      id: "temperature",
      title: "Temperature",
      body: "Every crop has a temperature range in which it grows well. A greenhouse helps manage conditions throughout the day and across the seasons, increasing the time crops spend within a suitable range.",
    },
    {
      id: "vpd",
      title: "Vapour pressure deficit",
      body: "Vapour pressure deficit, or VPD, describes the difference between the moisture in the air and the amount it could hold when saturated. It helps explain how readily water moves from leaves into the air. Temperature and relative humidity can be used to estimate VPD, but the most suitable range depends on the crop and its stage of growth. Conditions that are too dry can increase water stress, while overly humid conditions can restrict transpiration and encourage some diseases.",
    },
    {
      id: "water",
      title: "Water and root zone",
      body: "Plants need both water and oxygen around their roots. Waterlogged conditions reduce the oxygen available to roots, while dry conditions limit growth and can cause water stress. Irrigation sensors help inform watering decisions, with settings adjusted to the specific crop, soil or substrate in real time rather than relying on a single schedule.",
    },
    {
      id: "zoning",
      title: "Climate steering and zoning",
      body: "Different crops and growth stages can favour different conditions. Planting leafy greens in a cooler, shadier area and sun loving crops in a brighter area makes use of the variation already present in a greenhouse. Where crops need more distinct conditions, partitions and separately controlled zones may help. A climate guide can set out suitable temperature, humidity and ventilation targets for your equipment and chosen crops.",
    },
  ] satisfies Concept[],
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
  conceptsSectionTitle: "essential plant growth concepts",
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
  galleryHeadline: "reference imagery — structure, light, and layout.",
  galleryHighlight: "reference imagery",
  galleryCopy:
    "Project visualizations and site studies inform frame choice, footprint, and cladding before build.",
  gallery: [
    {
      src: "/images/projects/image3.png",
      caption: "visualization · reduced area",
    },
    {
      src: "/images/projects/image2.png",
      caption: "visualization · full available area",
    },
    {
      src: "/images/projects/image1.png",
      caption: "visualization · wooden frame, polycarbonate cladding",
    },
    {
      src: "/images/gallery/frame.png",
      caption: "wooden frame study",
    },
  ],
  lifestyleIntro:
    "The same structure can be a kitchen garden, a botanical library, or a living space.",
  scenarios: [
    {
      id: "kitchen-garden",
      title: "kitchen garden",
      body: "Vegetable production, planned for maximum efficiency.",
      image: "/images/lifestyle/kitchen-garden.jpg",
    },
    {
      id: "botanical-library",
      title: "botanical library",
      body: "A stable climate for rare collections.",
      image: "/images/lifestyle/botanical-library.jpg",
    },
    {
      id: "living-space",
      title: "living space",
      body: "A comfortable mixed-use space for plants and people.",
      image: "/images/lifestyle/living-space.jpg",
    },
  ] satisfies LifestyleScenario[],
  contactEmail: "hello@veltform.com",
} as const;
