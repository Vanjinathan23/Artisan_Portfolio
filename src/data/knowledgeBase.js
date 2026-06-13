// ── ARTISANA RAG KNOWLEDGE BASE ─────────────────────────────────────────────
// All studio knowledge chunked into retrievable documents.
// Each document has an id, category, title, and body text.
// Covers: studio identity, all pieces, commissions, process, gallery,
//         testimonials, craft DNA quiz, piece journeys, stories, FAQ, journal.

export const knowledgeBase = [

  // ── STUDIO IDENTITY ──────────────────────────────────────────────

  {
    id: "studio-001",
    category: "studio",
    title: "About Artisana Studio",
    body: `Artisana is a premium handcraft studio based in Chennai, India, founded in 2018.
    The studio specialises in four craft forms: pottery, jewelry, painting, and textile.
    Every single piece is handmade — no machines, no shortcuts, no mass production.
    Artisana accepts a strictly limited number of commissions each month (only 5 per month)
    to ensure full individual attention to each piece. The studio has created over 300 unique
    pieces, participated in 12+ exhibitions, and maintains a 100% handmade philosophy.
    Artisana was born from the conviction that the most meaningful objects carry the memory
    of their making. The studio has been running for 6+ years.`
  },

  {
    id: "studio-002",
    category: "studio",
    title: "Artisan Background and Origin Story",
    body: `The artisan behind Artisana began crafting in 2018 during a silent retreat where
    they first discovered ceramics. The first vessel broke. The second one stayed. In 2019,
    the studio opened in a 200 sq ft room that became a world — the wheel turned every
    morning before sunrise. In 2020, the first exhibition was held: twenty pieces were shown,
    seventeen sold, three were kept to remember who they were when made. By 2022, over 100
    unique pieces had been created across pottery, jewelry, painting, and textile.
    In 2024, Artisana was born as the formal name for this living philosophy.
    The studio has since grown to 300+ unique pieces and 12+ exhibitions.`
  },

  {
    id: "studio-003",
    category: "studio",
    title: "Studio Location, Contact, and Hours",
    body: `The Artisana studio is located at Studio 4, Artisan Quarter, Chennai, India.
    Contact the studio by email at hello@artisana.in or by phone at +91 99999 99999.
    Studio visits are available by appointment only, Tuesday through Saturday, 10am to 6pm.
    Visitors can see works in progress, view available pieces, and discuss commission ideas.
    Group visits of more than 4 people should be scheduled at least one week in advance.
    All commissions and enquiries begin with a conversation — reach out anytime.`
  },

  {
    id: "studio-004",
    category: "studio",
    title: "Studio Philosophy — Three Pillars",
    body: `Artisana believes craft is not a style — it is a conviction. A daily act of
    resistance against the disposable and the fast. Each piece is a small argument for
    permanence. The studio follows three core pillars:
    1. Handmade Always — no machines, no shortcuts, no molds or casting.
    2. Sustainable Materials — earth-sourced, responsibly gathered clays, metals, and natural dyes.
    3. Traditional Techniques — methods passed through generations, unchanged by trend.
    Every imperfection tells a story. Speed is not a value here. Presence is.`
  },

  {
    id: "studio-005",
    category: "studio",
    title: "What Makes Artisana Different",
    body: `Artisana stands apart from other craft studios in five key ways:
    First — only 5 commissions per month, so every piece gets undivided attention.
    Second — every sold piece receives a digital provenance record called 'The Piece's Journey'
    so owners always know the full story of what they own.
    Third — the studio maintains a public process journal called 'Unseen Hours' showing the
    real, unfiltered process including failures and doubts.
    Fourth — the Craft DNA Scanner helps visitors find the craft type made for someone like them.
    Fifth — no piece is ever exactly repeated. What exists is what was made, once.`
  },

  // ── PIECES — POTTERY ─────────────────────────────────────────────

  {
    id: "piece-pottery-001",
    category: "pottery",
    title: "Morning Calm — Pottery Vessel (Piece AM-001)",
    body: `Morning Calm is Artisana's signature pottery vessel and one of the most beloved pieces.
    It was inspired by the stillness of dawn mist over still water. Thrown on a cold January
    morning (January 14, 2024) at 5:47 AM when the studio temperature matched the cold world
    outside (18°C, overcast, no wind). The form came from the hands, not the mind — an
    unconscious response to stillness that couldn't be planned or repeated.
    Material: Stoneware clay, Batch #C-2401, sourced from Rajasthan.
    Firing: 1280°C in a reduction atmosphere for 9 hours.
    Glaze: Hand-mixed iron oxide with wood ash, single dip.
    The piece found its home in Mumbai on February 3, 2024. Reference: AM-001.
    The vessel broke once during trimming and was remade — the second version was better.
    It is food-safe and fully functional. Archetype match: The Ritualist.`
  },

  {
    id: "piece-pottery-002",
    category: "pottery",
    title: "Earth Vessel — Pottery Bowl",
    body: `Earth Vessel is a pottery bowl shaped by hands that remember the patience of the soil.
    It has an unglazed exterior and a burnished inside, carrying the memory of the earth it
    came from. Wide and low in form — functional as a fruit bowl, beautiful as a centrepiece.
    Made from natural terracotta-toned stoneware. The unglazed exterior means every fingerprint
    during making is baked permanently into the surface. It is heavy, grounded, and permanent.
    Available in the gallery. It represents the studio's most earth-connected work.`
  },

  {
    id: "piece-pottery-003",
    category: "pottery",
    title: "Midnight Cup — Pottery Tea Cup",
    body: `Midnight Cup is a tea cup crafted for the ritual of solitude. It holds the colour of
    3am and morning silence in its dark glaze. The cup is sized between a mug and a teacup —
    sized for single servings and designed to sit comfortably in one hand.
    Glaze: Hand-mixed manganese and cobalt wash, creating the deep dark colour.
    Fired at 1280°C, making it food-safe and water-tight. Dishwasher-safe on a gentle cycle
    but hand washing is recommended to preserve the glaze. Customers have said 'tea tastes
    different in these cups — whoever made them put something invisible in the clay.'`
  },

  {
    id: "piece-pottery-004",
    category: "pottery",
    title: "Stone Jar — Pottery Storage Jar",
    body: `Stone Jar is a heavy, grounded, and permanent pottery piece — a sentinel for the
    domestic space. Built for everyday use as a storage vessel, it carries the weight and
    silence of something that has always been there. Thick walls, minimal surface treatment,
    and a wide lid. It is among the most functional pieces in the Artisana collection.
    Available in the gallery.`
  },

  // ── PIECES — JEWELRY ─────────────────────────────────────────────

  {
    id: "piece-jewelry-001",
    category: "jewelry",
    title: "Ember Ring — Copper Ring (Piece AM-002)",
    body: `Ember Ring is a handmade copper ring forged from the memory of a campfire that
    burned through the night. Made on October 22, 2023 starting at 8:30 PM on a clear night
    (24°C). The copper was sourced from a single ingot from Rajasthan and hammered over
    three days into its final form — no molds, no casting, no machines.
    The slight asymmetry in the band is intentional — a reminder that perfection is a myth.
    Natural patina, no coating — it will age beautifully with the wearer.
    It found its home in Delhi on November 18, 2023. Reference: AM-002.
    Can be commissioned in custom ring sizes. Archetype match: The Bearer.
    Testimonial: 'My wife cried when she saw it. Not because it was expensive. Because it
    looked like it understood her.' — James Holloway.`
  },

  {
    id: "piece-jewelry-002",
    category: "jewelry",
    title: "Gold Drift — Gold Pendant",
    body: `Gold Drift is a handmade pendant that moves like the thought it was born from.
    It is hand-hammered 22k gold leaf over a copper base — never to be exactly repeated.
    The pendant hangs on a thin adjustable cord. The gold leaf application is done entirely
    by hand, meaning each piece has a unique texture and placement of gold.
    Can be commissioned as either a pendant or a brooch. A deeply personal piece,
    suited as a gift or a mark of a significant moment.`
  },

  {
    id: "piece-jewelry-003",
    category: "jewelry",
    title: "Silver Drift — Sterling Silver Sculptural Piece",
    body: `Silver Drift is a sculptural jewelry piece — a hand-forged sterling silver form
    with an organic, natural finish. It has the lightness of silver with the weight of
    intention. Each piece is unique due to the hand-forging process. Available in the gallery.
    Silver is the lightest and most refined of the metals used at Artisana.
    Suited for those who prefer understated, sculptural jewelry over bold statement pieces.`
  },

  {
    id: "piece-jewelry-004",
    category: "jewelry",
    title: "Copper Echo — Minimalist Copper Jewelry",
    body: `Copper Echo is a minimalist statement piece in copper that echoes the curves of
    the landscape. It is quietly bold — present without demanding attention.
    Hand-forged from a single piece of copper, with no joins or clasps.
    Copper is the warmest of the metals used at Artisana and develops a natural patina
    over time that makes each piece uniquely the wearer's own.`
  },

  // ── PIECES — PAINTING ─────────────────────────────────────────────

  {
    id: "piece-painting-001",
    category: "painting",
    title: "Rainy Season — Original Painting (Piece AM-003)",
    body: `Rainy Season is an original painting on unprimed linen canvas with hand-ground
    mineral pigments — the same materials used by painters four centuries ago.
    Painted on July 8, 2023 starting at 11:15 AM during heavy monsoon rain in Chennai
    (29°C, the smell of wet earth through the studio windows). The painting does not
    depict rain — it carries the feeling of standing in it, alone, and finding that to
    be enough. Pigments: Ochre, umber, and carbon black on raw linen.
    Finished with a single coat of damar resin varnish applied by hand.
    Air dried for 6 weeks before varnishing. Found its home in Bangalore, August 30, 2023.
    Reference: AM-003. Archetype match: The Feeler.`
  },

  {
    id: "piece-painting-002",
    category: "painting",
    title: "First Light — Original Painting",
    body: `First Light is an original painting made before the world woke up and changed
    everything. Painted in the blue hour before dawn on raw linen canvas. The colour
    palette is extremely restrained — near-white, cold grey, and one warm ochre note.
    This painting is about the quality of light that exists only for twenty minutes
    and cannot be photographed correctly. It is for those who notice what others miss.`
  },

  {
    id: "piece-painting-003",
    category: "painting",
    title: "Ochre Mind — Abstract Painting",
    body: `Ochre Mind is an abstract exploration of landscape and memory using raw pigments
    on linen. The piece moves between geological and emotional — what the landscape looks
    like when experienced from inside rather than observed from outside.
    Raw ochre, raw umber, and titanium white on unprimed linen. Available in the gallery.`
  },

  {
    id: "piece-painting-004",
    category: "painting",
    title: "Azure Hour — Atmospheric Painting",
    body: `Azure Hour captures the brief moment when the sky is neither day nor night —
    that precise window of transition that lasts only minutes. Painted in muted blues,
    warm greys, and a single stroke of warm light on the horizon. On unprimed linen
    with mineral pigments. Available in the gallery.`
  },

  // ── PIECES — TEXTILE ─────────────────────────────────────────────

  {
    id: "piece-textile-001",
    category: "textile",
    title: "Woven Dusk — Handwoven Textile Scarf",
    body: `Woven Dusk is a handwoven textile scarf made over three weeks on an inherited loom,
    at the hour the light turns amber. Each thread was woven from patterns passed down four
    generations of makers. The warp is natural undyed cotton. The weft is hand-dyed silk
    in amber, rust, and warm grey tones. Dimensions: approximately 180cm by 45cm.
    Lightweight enough for Chennai evenings, warm enough for air-conditioned spaces.
    Testimonial: 'The craftsmanship is unlike anything I found in galleries twice the price.
    This is the real thing.' — Aiko Tanaka. Archetype match: The Keeper.`
  },

  {
    id: "piece-textile-002",
    category: "textile",
    title: "Silk Memory — Woven Textile Piece",
    body: `Silk Memory is a woven textile piece made from patterns passed down through four
    generations of makers. Every knot is a word in the family language. Versatile — can
    be worn as a wrap, displayed as a wall piece, or used as a decorative table runner.
    Made from pure mulberry silk with natural dyes: turmeric (golden yellow), indigo (deep
    blue), and pomegranate (warm rust-red). Each piece is completely unique.`
  },

  {
    id: "piece-textile-003",
    category: "textile",
    title: "Indigo Throw — Handwoven Indigo Textile",
    body: `Indigo Throw is hand-woven using traditional techniques and natural indigo dye.
    A piece of living heritage — indigo is one of the oldest natural dyes in the world,
    used by weavers for millennia. The throw is soft, weighty, and deeply coloured.
    Each wash softens and deepens the indigo hue. Available in the gallery.`
  },

  // ── COMMISSIONS ──────────────────────────────────────────────────

  {
    id: "commission-001",
    category: "commission",
    title: "How Commissions Work at Artisana",
    body: `Artisana accepts only 5 commissions per month to ensure every piece receives full
    individual attention. Currently 3 slots are filled and 2 slots are available this month.
    The estimated wait for new commissions is approximately 3 weeks from today.
    All commissions begin with a conversation — tell the studio what you are imagining:
    not just the object, but the feeling it should carry. The artisan will confirm
    availability within 24 hours. To start: email hello@artisana.in or use the contact
    form on the website. Rush commissions are never accepted — every piece requires its own time.`
  },

  {
    id: "commission-002",
    category: "commission",
    title: "Commission Pricing Guide",
    body: `Artisana does not publish fixed prices because no two commissions are identical.
    Pricing depends on craft type, complexity, materials, and timeline. General guide:
    — Pottery commissions: 3,500 to 15,000 INR
    — Jewelry commissions: 5,000 to 25,000 INR (depending on metal and complexity)
    — Painting commissions: 8,000 to 40,000 INR (depending on size and medium)
    — Textile commissions: 4,000 to 18,000 INR
    These are indicative ranges. Exact pricing is discussed during the commission conversation.
    Rush commissions are not accepted. Every piece requires its own time.`
  },

  {
    id: "commission-003",
    category: "commission",
    title: "What to Tell the Studio When Starting a Commission",
    body: `When enquiring about a commission, the most helpful things to share are:
    — What feeling you want the piece to carry (not just what it looks like)
    — Who it is for and what the occasion is (gift, personal, wedding, anniversary)
    — Your preferred timeline and rough budget
    — Which craft type interests you: pottery, jewelry, painting, or textile
    You do not need to know exactly what you want — that is what the conversation is for.
    The artisan will ask the right questions and guide you. Start at hello@artisana.in.`
  },

  {
    id: "commission-004",
    category: "commission",
    title: "Custom Pottery Commissions — What's Possible",
    body: `Custom pottery commissions at Artisana can include: tea sets, single cups,
    bowls of various sizes, vases, candle holders, and decorative vessels.
    You can specify: approximate size and function, preferred colour tone
    (dark/light/earthy/muted/natural), surface texture (smooth/textured/raw),
    and whether you want a functional or purely decorative piece.
    The clay type is selected by the artisan based on intended use.
    Pottery commissions take 3 to 5 weeks. Price range: 3,500 to 15,000 INR.`
  },

  {
    id: "commission-005",
    category: "commission",
    title: "Custom Jewelry Commissions — What's Possible",
    body: `Custom jewelry commissions at Artisana can include: rings (copper, brass, or silver),
    pendants, earrings, brooches, and hair pins. You can specify: the intended wearer and
    their style, occasion (wedding, gift, daily wear, anniversary), preferred metal
    (copper is warmest and develops patina, brass is bolder, silver is lightest and most refined),
    stone inclusion if desired (semi-precious stones only), and ring size.
    All jewelry is hammered by hand — no casting, no molds.
    Jewelry commissions take 2 to 4 weeks. Price range: 5,000 to 25,000 INR.`
  },

  {
    id: "commission-006",
    category: "commission",
    title: "Custom Painting Commissions — What's Possible",
    body: `Custom painting commissions at Artisana are made on unprimed linen canvas using
    hand-ground mineral pigments. You can specify: canvas size, the feeling or theme you
    want the painting to carry (abstract, landscape, emotional), and colour family.
    However, the specific colour palette is guided by the artisan based on the brief —
    exact colour matching is not done.  Paintings are not literal depictions but emotional
    responses. Air-dried and varnished with damar resin. Takes 3 to 6 weeks.
    Price range: 8,000 to 40,000 INR.`
  },

  {
    id: "commission-007",
    category: "commission",
    title: "Custom Textile Commissions — What's Possible",
    body: `Custom textile commissions at Artisana include: scarves, wraps, wall hangings,
    and table runners. Hand-woven on an inherited loom using mulberry silk and natural cotton.
    Natural dyes only — turmeric, indigo, pomegranate, and earth tones.
    You can specify: colour family and approximate dimensions. Due to the weaving process,
    textile commissions take the longest — 4 to 7 weeks. Price range: 4,000 to 18,000 INR.`
  },

  // ── CRAFT PROCESS — 7 STEPS ──────────────────────────────────────

  {
    id: "process-001",
    category: "process",
    title: "The 7-Step Craft Process at Artisana",
    body: `Every pottery piece at Artisana goes through seven precise stages:
    Step 01 — Material Selection: Only sustainably sourced earth clays. Each batch tested
    by hand for texture, elasticity, and memory before entering the studio.
    Step 02 — The Shaping: Hands meet clay on the wheel. No templates, no molds. Every form
    emerges through conversation between maker and material.
    Step 03 — Refinement: Days of drying, trimming, texturing. The piece is touched hundreds
    of times before fire is introduced.
    Step 04 — Slow Drying: Patience is a material. Moisture leaves the clay naturally over
    weeks to prevent internal stress.
    Step 05 — The Bisque Fire: Transformative heat at 900°C changes Earth into Stone. A
    permanent chemical change that prepares the piece for glazing.
    Step 06 — Glazing Ritual: Applied by hand using minerals gathered from the landscape.
    Each brushstroke creates a unique surface.
    Step 07 — The Final Piece: Fired at 1280°C. What emerges belongs to both the maker and
    the flame — a finished piece of soul.`
  },

  {
    id: "process-002",
    category: "process",
    title: "Materials Used at Artisana — Full List",
    body: `Artisana uses the following carefully selected materials:
    Pottery: Stoneware clay from Rajasthan (primary), terracotta clay for rustic earthenware.
    Jewelry: Copper and brass from single mines in Rajasthan, sterling silver, 22k gold leaf.
    Painting: Unprimed linen canvas, hand-ground mineral pigments (ochre, umber, iron oxide,
    cobalt, manganese, carbon black, titanium white). Damar resin varnish.
    Textile: Mulberry silk, natural raw cotton. Natural dyes: turmeric (gold), indigo (blue),
    pomegranate (rust-red). All materials are sustainably and responsibly sourced.`
  },

  {
    id: "process-003",
    category: "process",
    title: "Firing Temperatures and Techniques",
    body: `Artisana uses two firing stages for pottery:
    Bisque fire: 900°C — transforms raw clay into permanent stone, a chemical change.
    Glaze fire: 1280°C in a reduction atmosphere — the final firing that sets the glaze
    and brings out the full character of the piece. Duration: typically 9 hours.
    At 1280°C, stoneware becomes food-safe, water-tight, and extremely durable.
    Glaze results vary with every firing — the kiln introduces an element of unknowing
    that the artisan embraces. No two firings produce identical results.`
  },

  // ── WAITING ROOM — COMMISSION STATUS ────────────────────────────

  {
    id: "waitingroom-001",
    category: "commission",
    title: "The Waiting Room — Current Commission Status",
    body: `Artisana's Waiting Room shows live commission availability. As of June 2024:
    Total slots: 5 per month. Currently taken: 3. Available: 2 slots.
    Wait time before a new commission starts: approximately 3 weeks.
    Current commissions in progress:
    — Commission 001: Custom Pottery Tea Set for a client in Mumbai (started 2 weeks ago)
    — Commission 002: Custom Wedding Ring Pair in copper for a client in Delhi (started 1 week ago)
    — Commission 003: Abstract Painting Study for a client in Bangalore (started this week)
    Slots 004 and 005 are open. If you want to reserve a slot, email hello@artisana.in.`
  },

  // ── CRAFT DNA SCANNER ────────────────────────────────────────────

  {
    id: "craftdna-001",
    category: "quiz",
    title: "Craft DNA Scanner — What It Is",
    body: `The Craft DNA Scanner is a 5-question personality quiz on the Artisana website
    that matches visitors to the craft type made for someone exactly like them. The questions
    are emotional, not transactional. They ask about time of day, sensory preferences, home
    feel, and what you want an object to do for you. Results map to one of four craft types:
    — Pottery: matched to Morning Calm (archetype: The Ritualist)
    — Jewelry: matched to Ember Ring (archetype: The Bearer)
    — Painting: matched to Rainy Season (archetype: The Feeler)
    — Textile: matched to Woven Dusk (archetype: The Keeper)
    Find the Craft DNA Scanner on the website between the Stories and Philosophy sections.`
  },

  {
    id: "craftdna-002",
    category: "quiz",
    title: "Craft DNA — The 5 Quiz Questions",
    body: `The 5 Craft DNA Scanner questions are:
    Q1: What time of day do you feel most like yourself?
    Options: Before the world wakes up (dawn), When light is brightest (noon),
    The golden hour before dark (dusk), Deep into the night, alone (night).
    Q2: How do you prefer your tea?
    Options: Strong, dark, no additions / Milky and soft, sweetened / Green and clean,
    ceremonial / I don't drink tea. I prefer silence.
    Q3: What does your home feel like when you're happiest in it?
    Options: Warm, layered, rich in texture / Minimal, each object chosen /
    Full of books and quiet corners / Changing constantly, no fixed form.
    Q4: When you hold something beautiful, what do you notice first?
    Options: Its weight / Its surface texture / Its colour / Its story.
    Q5: What do you want an object to do for you?
    Options: Hold a ritual / Mark a moment / Simply exist / Be given to someone else.`
  },

  {
    id: "craftdna-003",
    category: "quiz",
    title: "Craft DNA — Archetypes and Piece Matches",
    body: `The four Craft DNA archetypes and their matched pieces:
    THE RITUALIST — matched to Pottery / Morning Calm.
    You find meaning in repetition. Beauty lives in the ordinary, returned to deliberately.
    You notice weight. You prefer ritual over occasion.
    THE BEARER — matched to Jewelry / Ember Ring.
    You carry meaning for others. The pieces you choose are never just yours — they are
    vessels for what you feel toward someone. You give objects away before keeping them.
    THE FEELER — matched to Painting / Rainy Season.
    You experience before you analyse. Colour is a language you were born reading.
    You think in colours before words.
    THE KEEPER — matched to Textile / Woven Dusk.
    You surround yourself with things that hold memory. Objects are emotional anchors.
    Your home is layered and warm. You are drawn to what was made slowly.`
  },

  // ── PIECE JOURNEY — DIGITAL PROVENANCE ───────────────────────────

  {
    id: "journey-001",
    category: "provenance",
    title: "The Piece's Journey — Digital Provenance System",
    body: `Every sold piece at Artisana receives a permanent digital memory page accessible
    at artisana.in/piece/[ID]. Each page shows the complete provenance record:
    — Date and exact time the piece was made
    — Weather conditions that morning in the studio
    — Material batch number and sourcing origin
    — Firing temperature, atmosphere, and duration
    — A process photograph taken during making
    — A personal note from the artisan to the owner
    Owners receive a QR code linking to their piece's memory page.
    This turns every purchase into a living heirloom with a permanent, unforgeable record.
    Three pieces currently have journey pages: Morning Calm (AM-001), Ember Ring (AM-002),
    and Rainy Season (AM-003).`
  },

  {
    id: "journey-002",
    category: "provenance",
    title: "Morning Calm — Full Provenance Record (AM-001)",
    body: `Morning Calm provenance: Reference AM-001.
    Date made: January 14, 2024 at 5:47 AM.
    Weather: Cold and overcast, 18°C, no wind.
    Material: Stoneware clay, Batch #C-2401, sourced from Rajasthan.
    Firing: 1280°C, reduction atmosphere, 9 hours.
    Glaze: Hand-mixed iron oxide with wood ash, single dip.
    Given to: Owner in Mumbai. Delivery: February 3, 2024.
    Artisan's note: 'This vessel broke once during trimming and was remade. The second version
    was better. It always is. I hope it holds your mornings as carefully as it held mine.'`
  },

  {
    id: "journey-003",
    category: "provenance",
    title: "Ember Ring — Full Provenance Record (AM-002)",
    body: `Ember Ring provenance: Reference AM-002.
    Date made: October 22, 2023 at 8:30 PM.
    Weather: Clear night, 24°C, the kind of evening that feels like a memory.
    Material: Copper, single ingot, Rajasthan origin. Hammered cold over 3 sessions across 3 days.
    No casting, no molds — purely hammered.
    Finish: Natural patina, no coating. Will age beautifully with the wearer.
    Given to: Owner in Delhi. Delivery: November 18, 2023.
    Artisan's note: 'I made this for someone I had not met yet. You were the right person.
    The slight curve in the band is not a flaw — it is where I stopped and sat with it for
    a long time before continuing.'`
  },

  {
    id: "journey-004",
    category: "provenance",
    title: "Rainy Season — Full Provenance Record (AM-003)",
    body: `Rainy Season provenance: Reference AM-003.
    Date made: July 8, 2023 at 11:15 AM.
    Weather: Heavy monsoon rain, 29°C, the smell of wet earth through studio windows.
    Material: Unprimed linen canvas, hand-ground ochre, umber, carbon black.
    Process: Air dried for 6 weeks. Finished with damar resin varnish, one coat, applied by hand.
    Given to: Owner in Bangalore. Delivery: August 30, 2023.
    Artisan's note: 'I did not plan to make this painting. The rain made me. I sat down and
    started working and four hours passed without my noticing. It does not depict rain.
    It is the feeling of it.'`
  },

  // ── TESTIMONIALS ─────────────────────────────────────────────────

  {
    id: "testimonial-001",
    category: "testimonial",
    title: "Customer Testimonials and Reviews",
    body: `Real words from Artisana piece owners:
    "I placed it by my window and it changed how I start my day. It is not just an object —
    it breathes." — Priya Mehta, Morning Calm Vase.
    "My wife cried when she saw it. Not because it was expensive. Because it looked like it
    understood her." — James Holloway, Ember Ring.
    "The craftsmanship is unlike anything I found in galleries twice the price. This is the
    real thing." — Aiko Tanaka, Woven Dusk Scarf.
    "Tea tastes different in these cups. Whoever made them put something invisible in the clay."
    — Leila Rostami, Midnight Cup Set.
    "Three people asked if it was vintage. No — it is brand new and already timeless."
    — Marcus Wren, Forest Clasp.`
  },

  // ── STORIES ───────────────────────────────────────────────────────

  {
    id: "story-001",
    category: "story",
    title: "The Stories — Morning Calm, Ember Ring, Rainy Season",
    body: `Artisana documents the stories behind key pieces on the website:
    Morning Calm (Pottery, 2024): Inspired by the calmness of rainy mornings. This vessel
    was thrown before dawn — when the studio held the same silence as the world outside.
    Ember Ring (Jewelry, 2023): Forged from the memory of a campfire that burned through the
    night. The copper was sourced from a single mine in Rajasthan. No molds. No casting.
    Rainy Season (Painting, 2023): Painted on unprimed linen with hand-ground mineral pigments
    — the same materials used by painters four centuries ago.
    Each story is about the feeling behind the making, not just the physical object.`
  },

  // ── JOURNAL ──────────────────────────────────────────────────────

  {
    id: "journal-001",
    category: "journal",
    title: "Unseen Hours — The Hidden Studio Journal",
    body: `Artisana maintains a hidden studio journal called 'Unseen Hours' at artisana.in/journal.
    It contains raw, unfiltered diary entries from the making process — written at 4am when
    pieces break, when glazes finally work, when doubt sets in and when breakthroughs happen.
    The journal is not promoted — it is found by those who look. There is a barely visible
    link at the bottom of the website footer reading 'for those who stay until the end'.
    The journal entries are dated and show the real, unpolished process behind every finished
    piece. It is the most honest document the studio produces.`
  },

  // ── FAQ ───────────────────────────────────────────────────────────

  {
    id: "faq-001",
    category: "faq",
    title: "Does Artisana ship internationally?",
    body: `Artisana ships within India and to select international destinations.
    Domestic shipping: available across all Indian cities.
    International shipping available to: UAE, UK, USA, Singapore, and Australia.
    Shipping costs and timelines vary by destination and piece fragility.
    Pottery pieces are packed in custom foam-lined boxes with double boxing for extra protection.
    All pieces are insured during transit.
    International buyers should contact the studio at hello@artisana.in to confirm
    shipping feasibility for their specific piece.`
  },

  {
    id: "faq-002",
    category: "faq",
    title: "Can I visit the Artisana studio in Chennai?",
    body: `Studio visits to Artisana in Chennai are available by appointment only.
    The studio is open Tuesday through Saturday, 10am to 6pm.
    During a visit you can: see works in progress, view available pieces,
    and discuss commission ideas in person with the artisan.
    To schedule a visit: email hello@artisana.in or call +91 99999 99999.
    Group visits of more than 4 people should be scheduled at least one week in advance.`
  },

  {
    id: "faq-003",
    category: "faq",
    title: "Are the pieces functional or decorative?",
    body: `Most Artisana pottery is fully functional for everyday use.
    Morning Calm vessel: food-safe.
    Midnight Cup: dishwasher-safe on gentle cycle, but hand washing recommended to preserve glaze.
    All stoneware fired at 1280°C is food-safe and water-tight.
    Jewelry is made for daily wear and is durable.
    Paintings and textiles are decorative or display pieces (scarves can of course be worn).
    Earth Vessel and Stone Jar are functional as fruit bowls and storage vessels.`
  },

  {
    id: "faq-004",
    category: "faq",
    title: "How long does a commission take?",
    body: `Commission timelines at Artisana depend on craft type:
    — Pottery: 3 to 5 weeks (including drying and two firings)
    — Jewelry: 2 to 4 weeks (hammering and finishing)
    — Painting: 3 to 6 weeks (painting, air drying 6 weeks, varnishing)
    — Textile: 4 to 7 weeks (weaving is the most time-intensive)
    Current wait before a new commission begins: approximately 3 weeks.
    Total timeline from enquiry to delivery is typically 5 to 10 weeks.
    Rush commissions are never accepted — every piece requires its own time.`
  },

  {
    id: "faq-005",
    category: "faq",
    title: "Can I request a specific colour or size?",
    body: `Yes, within reason.
    Pottery: You can specify colour direction (warm/cool/dark/light/natural) and approximate
    size. Exact colour matching is not possible — glaze results vary with each kiln firing.
    Jewelry: Metal type and ring size can be specified precisely.
    Painting: Canvas size can be specified. Colour palette is artisan-guided based on brief.
    Textile: Colour family and approximate dimensions can be specified.
    The artisan will not match a specific colour exactly for any medium — each piece is
    unique by nature. That is part of what you are commissioning.`
  },

  {
    id: "faq-006",
    category: "faq",
    title: "Is Artisana on social media?",
    body: `Artisana is active on Instagram, Pinterest, YouTube, and Behance.
    Instagram: the most recent work in progress — follow for studio updates.
    Pinterest: inspiration boards and reference collections.
    YouTube: process videos showing pieces being made from start to finish.
    Behance: the full curated portfolio.
    Social handles are in the portfolio footer and on the contact page.`
  },

  {
    id: "faq-007",
    category: "faq",
    title: "Does Artisana do exhibitions or collaborations?",
    body: `Yes. Artisana participates in selected exhibitions — typically 2 to 3 per year,
    primarily in Chennai and occasionally in Mumbai and Bangalore.
    The studio is open to collaborations with: interior designers, boutique hotels,
    concept stores, and fashion brands for limited edition collections.
    For exhibition and collaboration enquiries, use the contact form on the website
    or email hello@artisana.in.`
  },

  {
    id: "faq-008",
    category: "faq",
    title: "What is the studio's return or exchange policy?",
    body: `Because every Artisana piece is handmade and unique, standard returns are not offered.
    However, if a piece arrives damaged during shipping (all pieces are insured during transit),
    the studio will work with you directly to resolve the situation.
    For commissions, the artisan works closely with you throughout the process so that the
    final piece reflects what was agreed. The studio's goal is that every piece finds
    exactly the right person. Contact hello@artisana.in for any concerns.`
  },

  {
    id: "faq-009",
    category: "faq",
    title: "What is the Piece's Journey / QR code?",
    body: `Every sold Artisana piece comes with a QR code that links to a permanent digital
    memory page at artisana.in/piece/[ID]. This page records the complete provenance:
    exact date and time of making, weather, materials (batch number and origin), firing details,
    a process photograph, and a personal handwritten note from the artisan to the owner.
    This system transforms every purchase into a living heirloom. Owners can share this link,
    and if they ever sell or gift the piece, the new owner inherits the full history.`
  },

  {
    id: "faq-010",
    category: "faq",
    title: "How do I start a commission or make an enquiry?",
    body: `To start a commission or make an enquiry with Artisana:
    — Email: hello@artisana.in (response within 24 hours)
    — Phone: +91 99999 99999
    — Contact form: available on the portfolio website
    — Studio visit: by appointment, Tuesday to Saturday, 10am to 6pm, Chennai
    When reaching out, share: what you're imagining, who it's for, your timeline, and rough
    budget. You don't need to know exactly what you want — the artisan will guide you.
    Currently 2 commission slots are open. New commissions begin in approximately 3 weeks.`
  },

  {
    id: "faq-011",
    category: "faq",
    title: "What metals does Artisana use for jewelry?",
    body: `Artisana uses three metals for jewelry:
    — Copper: The warmest metal. Develops a natural patina over time, becoming uniquely the
    wearer's own. Sourced from a single mine in Rajasthan. Used in Ember Ring.
    — Brass: Bolder and more golden. Slightly harder than copper with a warm yellow tone.
    — Sterling Silver: The lightest and most refined. Clean, understated, sculptural.
    Used in Silver Drift.
    — 22k Gold Leaf: Used as application over copper base (Gold Drift pendant).
    All metals are hammered by hand — no casting, no molds, no mass production.
    Semi-precious stones can be incorporated into jewelry commissions on request.`
  },

  {
    id: "faq-012",
    category: "faq",
    title: "What pottery clay types does Artisana use?",
    body: `Artisana primarily uses two clay types:
    — Stoneware Clay: Sourced from Rajasthan. Primary clay for most pottery pieces. Fired at
    1280°C, becomes extremely durable, food-safe, and water-tight. Rich earthy tones.
    — Terracotta Clay: Used for rustic earthenware with a warmer, redder tone. More porous
    than stoneware, typically for decorative pieces.
    Clay batches are tested by hand before entering the studio — each batch has different
    memory and elasticity. The artisan selects clay based on what the piece needs.`
  },

];

// ── EXPORT CATEGORY LABELS for filter display ──────────────────────
export const knowledgeCategories = [
  'studio', 'pottery', 'jewelry', 'painting',
  'textile', 'commission', 'process', 'faq',
  'provenance', 'journal', 'quiz', 'testimonial', 'story'
];
