/**
 * Detail for llms.txt beyond what the pages show, drawn from the Veldform business document.
 * Everything here is published: keep internal notes, partners, prices and future plans out.
 */

export type LlmsBlock = {
  heading?: string;
  paragraphs?: readonly string[];
  items?: readonly { term: string; text: string }[];
};

export type LlmsSection = { heading: string; blocks: readonly LlmsBlock[] };

export const llmsCopy = {
  brandLine: "Bespoke Greenhouses and Climate Systems. Horticultural Science + Design.",
  pricing:
    "All solutions are currently bespoke, so the cost depends on the structure, glazing specification and fabrication required. Once a size and concept is chosen and the specification agreed, Veldform provides a cost estimate and delivery window.",
  scenarioExtras: {
    "kitchen-garden": [
      "High biomass output systems for fast, sustainable and predictable production of edible crops. Designed to sustain restaurants, private chefs or those with a keen food focus or a love for specialty crops.",
      "Climate steering can promote plant growth as well as increase the production of nutritionally or medicinally relevant secondary metabolites, which make up the unique aroma and flavour of plants.",
      "Crop types also include summer fruits, solanaceous crops (tomatoes, peppers, chillies), leafy greens and vegetables. Sliding microgreen drawers under a raised bed can make for easy tray swapping.",
    ],
    "botanical-library": [
      "Imagine stepping into your own little world of lush greenery, exotic flowers and extraordinary plants. Your own living sanctuary. Our Botanical Libraries combine elegant architectural design with intelligent climate-control technology, creating carefully balanced environments where rare and delicate plants can flourish.",
      "With the ability to monitor and manage temperature, humidity and other growing conditions you can nurture a unique collection of plants: from delicate orchids and ferns to fascinating carnivorous plants.",
      "Discover new species and enjoy the experience of watching nature flourish. Whether you’re passionate about protecting biodiversity or simply dream of being surrounded by greenery, your botanical library becomes a space to explore, discover and connect with the plant world.",
      "Connect with nature. Cultivate the extraordinary. Preserve its beauty. And share it with others.",
    ],
    "living-space": [
      "A botanical living space, designed to host and grow, harvest and entertain, side by side.",
      "Classic house plants and rare exotics add the aesthetic appeal. Leafy greens and edible flowers add freshness to your summer salad, and kitchen herbs spice that cosy winter braai.",
      "A living space balances the needs of both plants and people, allowing you to dine semi alfresco in a cool and shaded climate when it’s too hot outside, or soak up some sun on a clear winter’s day with a book on the couch. Take a break from the hot desk, harvesting mint for the tea, or snack on summer berries out of season.",
      "Rather than focusing on a high productivity production greenhouse, a living space system is designed around your interests and unique tastes, creating habitat for both plants and people.",
    ],
  } as Record<string, readonly string[]>,
  pestManagement: {
    id: "pest-management",
    title: "Integrated pest management strategies",
    body: "We develop a plant protection plan around your crops and the pests present on site. Regular monitoring, good growing practices and suitable biological controls form the foundation. Depending on your approach, the plan may also include compatible treatments when needed.",
  },
  sections: [
    {
      heading: "Glazing in South Africa",
      blocks: [
        {
          items: [
            {
              term: "Standard double glazing",
              text: "Widely available from most local glaziers.",
            },
            {
              term: "Low-E double glazing (argon gas and coating)",
              text: "Easy to source in South Africa. Modern building regulations (SANS 10400-XA) mandate energy-efficient fenestration for new builds, making Low-E double glazing the go-to standard for compliance. It provides up to 25% better thermal isolation than standard double glazing, making it highly economical over time for intense sun exposures, like north-facing rooms in South Africa.",
            },
            {
              term: "Liquid nano glass coatings",
              text: "Available through specialised architectural or automotive film and coating companies, and applied onto existing glass as a direct alternative to window tinting film. They cost less upfront because you do not have to replace the frame or the glass. If you are building from scratch or replacing old window units entirely, factory-sealed Low-E glass offers a true structural lifespan of 20 years or more.",
            },
          ],
        },
      ],
    },
    {
      heading: "How thermal and UV coatings affect plant growth",
      blocks: [
        {
          items: [
            {
              term: "Direct photosynthesis is unaffected",
              text: "PAR light drives growth: plants use blue light (400–500 nm) for leaf and root development and red light (600–700 nm) for flowering and fruiting. Ultraviolet light (100–400 nm) is not required for the primary photosynthetic process.",
            },
            {
              term: "Changes in plant structure",
              text: "UV light, specifically UV-B, acts as a signal through photoreceptors (like UVR8) that helps keep plants shorter, with sturdier, thicker leaves and shorter internodes. Without UV exposure, some crops may grow slightly more stretched, leggier or softer, as the natural compacting signal is absent.",
            },
            {
              term: "Less cellular damage and scorch",
              text: "Eliminating UV radiation decreases the risk of cellular DNA damage, leaf yellowing, or sunburn and scorch on sensitive foliage.",
            },
            {
              term: "Fewer protective pigments",
              text: "Plants often produce secondary metabolites like flavonoids or anthocyanins as a natural sunscreen against UV light. Blocking UV can reduce these pigments, meaning some red, purple or dark-blushed varieties may look less intensely coloured.",
            },
            {
              term: "Pests and diseases",
              text: "Certain insects and fungal pathogens rely on UV cues for orientation and development, so blocking UV can sometimes lower insect pest activity or certain fungal pressures inside a greenhouse.",
            },
          ],
        },
      ],
    },
    {
      heading: "Essential plant growth concepts",
      blocks: [
        {
          heading: "Light",
          paragraphs: [
            "Light supplies the energy for photosynthesis. How well a plant uses that light also depends on its temperature, water supply, nutrients and growing conditions.",
          ],
        },
        {
          heading: "Temperature",
          paragraphs: [
            "Every crop has a temperature range in which it grows well. A greenhouse helps manage conditions throughout the day and across the seasons, increasing the time crops spend within a suitable range.",
          ],
        },
        {
          heading: "Vapour pressure deficit",
          paragraphs: [
            "Vapour pressure deficit, or VPD, describes the difference between the moisture in the air and the amount it could hold when saturated. It helps explain how readily water moves from leaves into the air.",
            "Temperature and relative humidity can be used to estimate VPD, but the most suitable range depends on the crop and its stage of growth. Conditions that are too dry can increase water stress, while overly humid conditions can restrict transpiration and encourage some diseases.",
          ],
        },
        {
          heading: "Water and root zone",
          paragraphs: [
            "Plants need both water and oxygen around their roots. Waterlogged conditions reduce the oxygen available to roots, while dry conditions limit growth and can cause water stress.",
            "Irrigation sensors help inform watering decisions, with settings adjusted to the specific crop, soil or substrate in real time rather than relying on a single schedule.",
          ],
        },
        {
          heading: "Climate steering and zoning",
          paragraphs: [
            "Different crops and growth stages can favour different conditions. Planting leafy greens in a cooler, shadier area and sun-loving crops in a brighter area makes use of the variation already present in a greenhouse.",
            "Where crops need more distinct conditions, partitions and separately controlled zones may help. A climate guide can set out suitable temperature, humidity and ventilation targets for your equipment and chosen crops.",
          ],
        },
      ],
    },
    {
      heading: "Climate steering for flavour and aroma",
      blocks: [
        {
          paragraphs: [
            "Greenhouse climate steering optimises not only plant growth, but can also boost the production of secondary metabolites in vegetable and herb crops by applying controlled, mild abiotic stress, known as intentional elicitation.",
            "In a controlled environment agriculture (CEA) system, growers strategically adjust climate parameters to trigger the plant’s natural defence mechanisms. This shifts metabolic resources away from vegetative growth (primary metabolism) and toward the synthesis of protective phytochemicals (secondary metabolism), without causing lasting damage or critical yield loss.",
          ],
        },
        {
          heading: "How climate steering drives synthesis",
          paragraphs: [
            "Plants synthesise secondary metabolites to acclimate to environmental shifts, scavenge reactive oxygen species (ROS) and stabilise cellular structures. Greenhouses manipulate these responses through four main environmental levers.",
          ],
          items: [
            {
              term: "Light quality and intensity (photobiology)",
              text: "Supplementing with UV-B radiation acts as an energetic stressor, rapidly upregulating the phenylpropanoid pathway to produce protective antioxidants. Altering the red to far-red (R:FR) ratio or increasing blue light triggers photoreceptor signalling, which directly shifts terpene and phenolic concentrations.",
            },
            {
              term: "Temperature manipulation",
              text: "Introducing moderate temperature drops (cold stress) or restricted heat spikes activates transcription factors such as MYB or WRKY. This accelerates the transcription of key biosynthetic enzymes, altering the plant’s chemical composition.",
            },
            {
              term: "Controlled water deficit (VPD and irrigation)",
              text: "Intentionally lowering greenhouse relative humidity or stretching irrigation intervals spikes the vapour pressure deficit. This mild drought stress restricts osmotic potential, prompting the plant to mass-produce protective compounds to prevent water loss and oxidative damage.",
            },
            {
              term: "Carbon dioxide enrichment",
              text: "Elevating greenhouse CO2 increases photosynthetic carbon assimilation. This generates an “energy overflow”, or high carbon-to-nitrogen (C/N) ratio, leaving excess carbon available to be funnelled directly into carbon-rich, non-nitrogenous metabolites.",
            },
          ],
        },
      ],
    },
    {
      heading: "Growing Cape waterfall orchids and ferns",
      blocks: [
        {
          paragraphs: [
            "To replicate a South African waterfall climate at home or in a greenhouse, group your plants by their specific environmental targets. The most critical factor across all groups is keeping the root systems cool, even if the ambient air warms up.",
          ],
        },
        {
          heading: "Waterfall orchids: Disa uniflora",
          paragraphs: [
            "While they can tolerate a surprisingly high amount of light in nature due to the cold water rushing over their roots, they require careful temperature control in cultivation to prevent root rot.",
          ],
          items: [
            {
              term: "Daily light",
              text: "6–12 mol/m²/day. Under natural conditions, this translates to bright, indirect light or morning sun (3–4 sun hours). In a controlled setup, target 20,000–30,000 lux.",
            },
            {
              term: "Humidity",
              text: "65%–85%. They demand high atmospheric moisture but constant air movement. Stagnant, humid air will quickly cause crown rot.",
            },
            { term: "Temperature", text: "Day: 18°C–25°C. Night: 10°C–15°C." },
            {
              term: "Critical rule",
              text: "Root temperatures must strictly stay below 21°C. Use chilled, pure water (rain or reverse osmosis) to flush pots on warm days.",
            },
          ],
        },
        {
          heading: "Cape ferns",
          items: [
            {
              term: "Adiantum capillus-veneris (Cape maidenhair fern)",
              text: "The quintessential waterfall fern. It clings directly to wet, vertical rock faces in deep gorges, constantly bathed in fine waterfall spray.",
            },
            {
              term: "Blechnum capense (Cape blechnum, or deer fern)",
              text: "A robust fern with striking, arching fronds that forms dense colonies along shaded stream banks and mountain seeps.",
            },
            {
              term: "Rumohra adiantiformis (seven-weeks fern, or leatherleaf fern)",
              text: "Thrives in moist, dark forest margins and wet rocky areas from the Cape Peninsula upwards.",
            },
            {
              term: "Alsophila capensis (Cape tree fern)",
              text: "For a dramatic look, this beautiful tree fern grows natively along cool forest rivers and mist-heavy mountain ravines.",
            },
          ],
        },
        {
          heading: "Sundews and carnivorous plants",
          paragraphs: [
            "Sundews to collect include Drosera capensis, Drosera regia, Drosera admirabilis and Drosera aliciae, grown alongside disas, bromeliads, orchids and ferns.",
          ],
        },
        {
          heading: "Seed saving and propagation",
          paragraphs: [
            "A botanical library can include more than just a cultivation environment, but also one designed around conservation, seed saving and propagation.",
          ],
          items: [
            {
              term: "Processing and drying room",
              text: "A climate-controlled workspace with low-humidity conditions, typically using silica gel or dehumidifiers, to dry seeds down to optimal moisture content (usually 5% to 7%) without damaging them.",
            },
            {
              term: "Cleaning equipment",
              text: "Sieves, air separators, dissecting microscopes and illuminated magnifying lamps to clean chaff, seed coats and debris by hand or machine.",
            },
            {
              term: "Packaging and labelling station",
              text: "Tools for sealing seeds into moisture-barrier foil packets, glass vials or paper envelopes, with standardised barcoding and database tracking.",
            },
            {
              term: "Seed storage",
              text: "Standard seed banks use freezers at low temperatures, commonly -18°C to -20°C for long-term storage of orthodox seed, or around +4°C for short- to medium-term storage, depending on the species.",
            },
            {
              term: "Backup power",
              text: "Uninterruptible power supplies and backup generators help keep climate control systems running during power outages.",
            },
          ],
        },
      ],
    },
    {
      heading: "Grow what you eat, eat what you grow",
      blocks: [
        {
          heading: "Fresh food, grown your way",
          paragraphs: [
            "Our smart greenhouse systems make it easier to enjoy fresh, nutritious and flavourful vegetables all year round. Supermarket varieties are selected based on appearance and shelf life, quick turnaround and easy handling. These commercial goals often come at a great cost: flavour, aroma and sometimes nutrition.",
            "On top of this, produce has to be harvested early to ensure it is firm and handles transport, refrigeration and long storage times. So even when a commercial variety hits all the flavour and health metrics, these attributes rarely arrive at the consumer because of the long supply chain.",
            "With a kitchen garden of your own, you can be harvesting produce that has been selected for flavour first, picked at the optimum ripeness, and on your plate minutes after harvest instead of days. Think aromatic, juicy tomatoes, sweet and crunchy peppers, flavourful chillies and fragrant herbs.",
            "A craft and science which could have taken years to perfect can now become achievable in a matter of months, reaping continued enjoyment for years to come.",
          ],
        },
        {
          heading: "For food lovers, chefs and hospitality",
          paragraphs: [
            "Designed for those with a love for food, perhaps with some time constraints, and for those who need quality, consistently. From private chefs to larger hospitality operations, a smart greenhouse gives you not only greater control over what you grow and when it grows, but how it grows. You get to decide what goes onto your plants or in your soil, and ultimately, what ends up on your plate.",
            "Check your greenhouse conditions directly from your phone, keep track of changes and manage your growing environment wherever you are.",
            "Consistent harvests and crop quality come along with technology, sustainability and a passion for great food. Explore the flavours, aromas and varieties that make fresh ingredients truly special. Grow fresh, flavourful ingredients closer to your kitchen or customers.",
          ],
        },
        {
          heading: "Flavour and nutrition: commercial versus boutique crops",
          paragraphs: [
            "Homegrown vegetables and herbs can be higher in vitamins, antioxidants and phytonutrients than store-bought produce. Many nutrients start degrading once produce is harvested, and store-bought vegetables are often picked before peak ripeness to survive shipping and long storage windows.",
            "Most commercial varieties are selected to offer high aesthetic appeal, easy handling and stable shelf life. Unfortunately, crops selected for these characteristics, coupled with premature harvesting, often come at the cost of flavour, aroma and nutrition.",
          ],
        },
        {
          heading: "Why grow your own",
          items: [
            {
              term: "Self-reliance",
              text: "Growing your own produce can give you more control over your food supply and nutrition, while reducing your dependence on grocery stores.",
            },
            {
              term: "Freshness and flavour",
              text: "Homegrown produce can be picked at peak ripeness rather than harvested early for long-distance transport, which makes it taste better and hold more nutrients.",
            },
            {
              term: "Health and safety",
              text: "You decide what goes into the soil and onto your plants, meaning you can avoid unwanted synthetic pesticides, herbicides or post-harvest treatments. Taking control over your own food supply is one of the first steps you can take to help promote your health and that of your family.",
            },
          ],
        },
        {
          heading: "Food security and community projects",
          paragraphs: [
            "While producing food at home may not move the needle in the global battle against food insecurity, we can all start at home when it comes to reducing the footprint of our culinary consumption.",
            "As our business grows, we are committed to developing healthy and secure food production systems for those in need. Isolated communities who often lack access to fresh, nutritious produce are often limited not by space but by cultivation resources and, in some cases, expertise. Those in the urban sprawl are almost always without the space, time and means to afford themselves and their loved ones the healthy diet needed not just to survive, but to thrive and grow.",
            "While these challenges require different approaches, the intersection of food systems and technology with applied social and environmental science is at the core of the solutions that can help drive positive change for both people and planet.",
            "If you have a specific project idea, or community in mind, please reach out. Together we can help increase food security and the quality of living, through healthy nutrition for those most in need.",
          ],
        },
      ],
    },
    {
      heading: "What makes a greenhouse",
      blocks: [
        {
          paragraphs: [
            "A greenhouse creates conditions for plants to grow beyond the limits of the weather outside. It shelters them from wind, rain and cold, captures the sun’s warmth and, where needed, adds heat. Ventilation, shading and humidity control help keep that environment suited to the plants within.",
            "The idea has a long history. In fifteenth-century Korea, heated growing structures used underfloor heating and translucent oiled paper to cultivate vegetables through winter. Later, the orangeries of France sheltered citrus collections, while Victorian glasshouses made it possible to grow palms, orchids and ferns far from their native climates. These were places of cultivation, but also of curiosity, pleasure and extraordinary ambition.",
            "Today, greenhouses are often associated with food production. We are equally interested in their capacity to transport us. If you have ever stepped into a tropical glasshouse during a northern European winter, you will know the feeling: the warmth, the moisture, the scent of foliage. The atmosphere just feels different.",
          ],
        },
        {
          heading: "A climate of your own",
          paragraphs: [
            "Our greenhouse systems bring these possibilities into the home and garden, shaped around what you want to grow and how you want to spend your time.",
            "A kitchen garden can supply ingredients chosen for flavour. A botanical library can house a personal plant collection, or provide the conditions to propagate rare orchids and share them with a community. A living space can extend the house into the garden, turn a courtyard into a fern-filled retreat, or create somewhere to entertain among plants.",
            "The starting point might be a practical need, a particular fascination or the memory of a landscape: the lushness of a tropical jungle, the cool mist of a cloud forest, or simply somewhere green to read while rain falls on the glass.",
            "The structure may take a familiar glasshouse form or become part of the architecture of your home. Automated climate, watering and lighting systems help maintain the conditions your chosen plants need, with the space designed for the people who use it too.",
            "These purposes can sit comfortably together. A greenhouse can be productive, hold a collection and offer a small holiday on your doorstep.",
          ],
        },
      ],
    },
  ] as readonly LlmsSection[],
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
} as const;
