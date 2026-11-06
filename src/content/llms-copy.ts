/**
 * Detail for llms.txt beyond what the pages show, drawn from the Veldform business document.
 * Everything here is published: keep internal notes, partners, prices and future plans out.
 */
export const llmsCopy = {
  brandLine: "Bespoke Greenhouses and Climate Systems. Horticultural Science + Design.",
  pricing:
    "All solutions are currently bespoke. Once a size and concept is chosen and the specification agreed, Veldform provides a cost estimate and delivery window.",
  scenarioExtras: {
    "kitchen-garden": [
      "Designed to sustain restaurants, private chefs and people with a keen food focus or a love of specialty crops.",
      "Crop types also include summer fruits, leafy greens and other vegetables.",
    ],
    "botanical-library": [
      "Botanical libraries combine elegant architectural design with intelligent climate-control technology, creating carefully balanced environments where rare and delicate plants can flourish.",
      "With the ability to monitor and manage temperature, humidity and other growing conditions, you can nurture a unique collection, from delicate orchids and ferns to fascinating carnivorous plants.",
      "Collections can include disas, bromeliads, orchids, sundews (Drosera capensis, Drosera regia, Drosera admirabilis, Drosera aliciae) and ferns (Adiantum capillus-veneris, Blechnum capense, Rumohra adiantiformis, Alsophila capensis).",
      "Example targets for waterfall orchids (Disa uniflora): 6–12 mol/m²/day of light (bright, indirect light or 3–4 hours of morning sun; 20,000–30,000 lux in a controlled setup), 65–85% humidity with constant air movement, 18–25°C by day and 10–15°C at night, and root temperatures kept below 21°C with chilled, pure water.",
    ],
    "living-space": [
      "A botanical living space is designed to host and grow, harvest and entertain, side by side.",
      "Classic house plants and rare exotics add aesthetic appeal, leafy greens and edible flowers add freshness, and kitchen herbs can spice a winter braai.",
      "You can dine semi alfresco in a cool, shaded climate when it is too hot outside, or read in the sun on a clear winter's day.",
    ],
  } as Record<string, readonly string[]>,
  pestManagement: {
    id: "pest-management",
    title: "Integrated pest management strategies",
    body: "We develop a plant protection plan around your crops and the pests present on site. Regular monitoring, good growing practices and suitable biological controls form the foundation. Depending on your approach, the plan may also include compatible treatments when needed.",
  },
  growthConcepts: [
    {
      title: "Light",
      body: "Light supplies the energy for photosynthesis. How well a plant uses that light also depends on its temperature, water supply, nutrients and growing conditions.",
    },
    {
      title: "Temperature",
      body: "Every crop has a temperature range in which it grows well. A greenhouse helps manage conditions throughout the day and across the seasons, increasing the time crops spend within a suitable range.",
    },
    {
      title: "Vapour pressure deficit",
      body: "Vapour pressure deficit, or VPD, describes the difference between the moisture in the air and the amount it could hold when saturated. It helps explain how readily water moves from leaves into the air. Temperature and relative humidity can be used to estimate VPD, but the most suitable range depends on the crop and its stage of growth. Conditions that are too dry can increase water stress, while overly humid conditions can restrict transpiration and encourage some diseases.",
    },
    {
      title: "Water and root zone",
      body: "Plants need both water and oxygen around their roots. Waterlogged conditions reduce the oxygen available to roots, while dry conditions limit growth and can cause water stress. Irrigation sensors help inform watering decisions, with settings adjusted to the specific crop, soil or substrate in real time rather than relying on a single schedule.",
    },
    {
      title: "Climate steering and zoning",
      body: "Different crops and growth stages can favour different conditions. Planting leafy greens in a cooler, shadier area and sun loving crops in a brighter area makes use of the variation already present in a greenhouse. Where crops need more distinct conditions, partitions and separately controlled zones may help. A climate guide can set out suitable temperature, humidity and ventilation targets for your equipment and chosen crops.",
    },
  ],
  climateSteering: {
    intro:
      "Climate steering can optimise plant growth and boost secondary metabolites in vegetable and herb crops by applying controlled, mild stress, known as intentional elicitation. Adjusting climate parameters triggers the plant's natural defence mechanisms, shifting resources from vegetative growth toward protective phytochemicals, while aiming to avoid lasting damage or critical yield loss.",
    levers: [
      "Light quality and intensity: supplementary UV-B and changes to red to far-red or blue light ratios can shift terpene and phenolic concentrations.",
      "Temperature: moderate temperature drops or restricted heat spikes can alter a plant's chemical composition.",
      "Controlled water deficit: lowering humidity or stretching irrigation intervals raises VPD, and the resulting mild drought stress prompts plants to produce more protective compounds.",
      "Carbon dioxide enrichment: raising greenhouse CO2 increases photosynthetic carbon assimilation, leaving excess carbon available for carbon-rich metabolites.",
    ],
  },
  process: [
    {
      title: "Enquire",
      body: "Share your approximate site location and your desired greenhouse type, along with any special aesthetic or material considerations. Because all solutions are currently bespoke, please indicate when the project could commence (consultation and design phase) and when installation could take place or needs to be completed by.",
    },
    {
      title: "Map and collect",
      body: "Design with the land, not against it. We assess the potential of the site, from soil to sunlight, existing structures and utilities. This data, along with your goals or crop types, shows where the structure fits best within your property. Readings from multiple locations can be compared based on their microclimatic advantages or challenges.",
    },
    {
      title: "Design and quote",
      body: "After setting a clear scope and understanding the site and your preferences, we propose a solution. Once a size and concept is chosen and the specification agreed, we provide a cost estimate and delivery window.",
    },
    {
      title: "Measure",
      body: "We confirm dimensions, levels and fixing details on site before fabrication so the build matches the plan.",
    },
    {
      title: "Prefabrication and build",
      body: "The engineering and design are finalised, materials ordered and prefabrication commences. Foundations can be laid and utility services installed during this time. Components are then delivered and assembled, beds are filled, the irrigation and HVAC are set up, and the climate systems commissioned and tested.",
    },
    {
      title: "Handover, training and operation",
      body: "You are shown how to monitor and adjust the automation from wherever you are. Handover can include practical onsite demonstrations or training, and more formal or academic lessons can be provided. At the end of each season for the first year, our team analyses your climate data to refine or revise the climate strategy and adjust automation settings.",
    },
    {
      title: "Ongoing support",
      body: "If outlined in your service agreement, you can schedule checkups for in-person support and guidance, crop consulting or remote assistance such as climate strategy.",
    },
  ],
  warranty: [
    "All structural and glazing elements (frame and cladding) come with a 10 year warranty.",
    "If equipment goes out of commission due to a hardware fault, we will replace it at no cost.",
  ],
  enquiryDetails:
    "Helpful details to include: site location, greenhouse type, design references, preferred start date and commissioning date.",
  community:
    "As our business grows, we are committed to developing healthy and secure food production systems for those in need, including isolated communities who lack access to fresh, nutritious produce and people in urban areas without the space, time or means to support a healthy diet. If you have a specific project idea or community in mind, please reach out.",
  whatMakesAGreenhouse: [
    "A greenhouse creates conditions for plants to grow beyond the limits of the weather outside. It shelters them from wind, rain and cold, captures the sun's warmth and, where needed, adds heat. Ventilation, shading and humidity control help keep that environment suited to the plants within.",
    "The idea has a long history. In fifteenth-century Korea, heated growing structures used underfloor heating and translucent oiled paper to cultivate vegetables through winter. Later, the orangeries of France sheltered citrus collections, while Victorian glasshouses made it possible to grow palms, orchids and ferns far from their native climates. These were places of cultivation, but also of curiosity, pleasure and extraordinary ambition.",
    "Today, greenhouses are often associated with food production. We are equally interested in their capacity to transport us. If you have ever stepped into a tropical glasshouse during a northern European winter, you will know the feeling: the warmth, the moisture, the scent of foliage. The atmosphere just feels different.",
  ],
  aClimateOfYourOwn: [
    "Our greenhouse systems bring these possibilities into the home and garden, shaped around what you want to grow and how you want to spend your time.",
    "A kitchen garden can supply ingredients chosen for flavour. A botanical library can house a personal plant collection, or provide the conditions to propagate rare orchids and share them with a community. A living space can extend the house into the garden, turn a courtyard into a fern-filled retreat, or create somewhere to entertain among plants.",
    "The starting point might be a practical need, a particular fascination or the memory of a landscape: the lushness of a tropical jungle, the cool mist of a cloud forest, or simply somewhere green to read while rain falls on the glass.",
    "The structure may take a familiar glasshouse form or become part of the architecture of your home. Automated climate, watering and lighting systems help maintain the conditions your chosen plants need, with the space designed for the people who use it too.",
    "These purposes can sit comfortably together. A greenhouse can be productive, hold a collection and offer a small holiday on your doorstep.",
  ],
} as const;
