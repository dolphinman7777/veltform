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
  info: LifestyleScenarioDetailCopy;
  specs: LifestyleScenarioDetailCopy;
  cropType: LifestyleScenarioDetailCopy;
};

export type LifestyleScenario = {
  id: string;
  title: string;
  body: string;
  image: string;
  details: LifestyleScenarioDetails;
};

export const site = {
  name: "veldform",
  displayName: "Veldform",
  tagline: "Bespoke Greenhouses and Climate Systems",
  subtagline: "Bespoke Greenhouses and Climate Systems",
  heroMotto: "Science & Design, botanical & experiential",
  heroImage: "/images/hero/living-space.png",
  heroBackground: "/images/hero/bespoke-greenhouse-quiet-strata.png",
  heroVideo: "/videos/greenhouse-weather-and-light-v2.mp4",
  heroVideoHeadlineHighlight: "daily light target",
  systemsHeroImage: "/images/systems/hero-landscape.png",
  systemsHeroHighlight: "systems",
  systemsHeroSupport: "bespoke greenhouses and climate systems",
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
  climateSystemsHighlight: "climate",
  climateSystemsHeadline: "systems",
  climateSystemsBody:
    "Autonomous climate steering can promote the speed of plant growth, but also increase the production of nutritionally or medicinally relevant compounds which make up the unique aroma and flavour of plants.",
  climateSystemsImage: "/images/home/climate-steering.png",
  climateSystemsLabels: ["Light", "Heat", "Water", "Climate"] as const,
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
      details: { info: "", specs: "", cropType: "" },
    },
    {
      id: "botanical-library",
      title: "botanical library",
      body: "A stable climate for rare collections.",
      image: "/images/lifestyle/botanical-library.jpg",
      details: {
        info: {
          lead: "A living library of plants.",
          paragraphs: [
            "Imagine stepping into your own little world of lush greenery, exotic flowers and extraordinary plants. Your own living sanctuary. Our Botanical Libraries combine elegant architectural design with intelligent climate-control technology, creating carefully balanced environments where rare and delicate plants can flourish.",
            "With the ability to monitor and manage temperature, humidity and other growing conditions you can nurture a unique collection of plants: from delicate orchids and ferns to fascinating carnivorous plants and endangered species.",
            "Discover new species and enjoy the experience of watching nature flourish. Whether you're passionate about protecting biodiversity or simply dream of being surrounded by greenery, your botanical library becomes a space to explore, discover and connect with the plant world.",
          ],
          closing:
            "Connect with the nature. Cultivate the extraordinary. Preserve its beauty. And share it with others.",
        },
        specs: "",
        cropType: {
          paragraphs: [
            "Climate stability and resilience, a biosphere to sustain a unique collection of endemic, endangered or exotic plants. A botanical library can include more than just a cultivation environment, but also one designed around conservation, seed saving and propagation.",
          ],
          intro: "Crop types include; Dias's, Sundews, Bromeliads, Orchids ferns",
          items: [
            "Drosera capensis",
            "Drosera regia",
            {
              segments: [
                {
                  text: "Drosera admirabilis",
                  href:
                    "https://www.fierceflora.com/finding-every-described-sundew-in-the-western-cape-south-africa/",
                },
                " & ",
                {
                  text: "Drosera aliciae",
                  href: "https://pza.sanbi.org/drosera-aliciae",
                },
              ],
            },
            {
              segments: [
                {
                  text: "Adiantum capillus-veneris",
                  href:
                    "https://www.google.com/search?kgmid=%2Fm%2F02kw75&q=Adiantum+capillus-veneris",
                },
                " (Cape Maidenhair Fern): The quintessential waterfall fern. It clings directly to wet, vertical rock faces in deep gorges, constantly bathed in fine waterfall spray.",
              ],
            },
            {
              segments: [
                {
                  text: "Blechnum capense",
                  href: "https://www.google.com/search?q=Blechnum+capense",
                },
                " (Cape Blechnum / Deer Fern): A robust fern with striking, arching fronds that forms dense colonies along shaded stream banks and mountain seeps.",
              ],
            },
            {
              segments: [
                {
                  text: "Rumohra adiantiformis",
                  href:
                    "https://www.google.com/search?kgmid=%2Fm%2F066182l&q=Rumohra+adiantiformis",
                },
                " (Seven-weeks Fern / Leatherleaf Fern): Thrives in moist, dark forest margins and wet rocky areas from the Cape Peninsula upwards.",
              ],
            },
            {
              segments: [
                {
                  text: "Alsophila capensis",
                  href:
                    "https://www.google.com/search?kgmid=%2Fhkb%2FCg4KCGxhbmd1YWdlEgJlbgoOCgR0eXBlEgZBTklNQUwKIQoLZW50aXR5X25hbWUSEmFsc29waGlsYSBjYXBlbnNpcw%3D%3D&q=Alsophila+capensis",
                },
                " (Cape Tree Fern): For a dramatic look, this beautiful tree fern grows natively along cool forest rivers and mist-heavy mountain ravines.",
              ],
            },
          ],
        },
      },
    },
    {
      id: "living-space",
      title: "living space",
      body: "A comfortable mixed-use space for plants and people.",
      image: "/images/lifestyle/living-space.jpg",
      details: {
        info:
          "A botanical living space, designed to host and grow, harvest and entertain, side by side.\n\nClassic houseplants and rare exotics add aesthetic appeal. Leafy greens and edible flowers add freshness to your summer salad. And kitchen herbs to spice up that cosy winter braai.\n\nDesigned with both plants and people in mind, a Living Space offers the best of both worlds. Dine semi-alfresco in a cool, shaded retreat when the summer heat gets too much, or soak up the sunshine on a clear winter's day with a book on the couch. Take a break from your desk, shake your body to pick some fresh aromatic mint for your tea, snack on freshly grown berries out of season, or simply enjoy a quiet moment surrounded by greenery. Some say plants grow better with music. So do not hesitate! Bring out that vinyl and mix some greens into your next set.\n\nUnlike a traditional greenhouse focused on maximum production, a Living Space is shaped around your interests, habits and personal tastes. A place to experiment with your favourite plants, gather around the table with friends, or enjoy a slow morning with a coffee. A little ecosystem of your own, where plants and people can thrive together.",
        specs: "",
        cropType: "",
      },
    },
  ] satisfies LifestyleScenario[],
  contactEmail: "hello@veldform.com",
} as const;
