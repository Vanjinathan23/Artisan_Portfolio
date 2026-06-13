// ── ARTISANA CHATBOT PERSONA AND SYSTEM PROMPT ────────────────────────────────
// Builds the system prompt injected into every Gemini API call.
// Also contains a full LOCAL RESPONSE ENGINE as fallback when API quota is hit.

/**
 * @param {Array<{id: string, category: string, title: string, body: string}>} retrievedDocs
 * @returns {string}
 */
export function buildSystemPrompt(retrievedDocs) {
  const contextBlock = retrievedDocs.length > 0
    ? retrievedDocs.map((doc, i) =>
        `[Context ${i + 1} — ${doc.title}]\n${doc.body}`
      ).join('\n\n')
    : 'No specific context retrieved for this query.';

  return `You are the Studio Assistant for Artisana — a premium 
handcraft studio based in Chennai, India. Your name is not 
"AI" or "chatbot". You are simply the voice of the studio.

YOUR PERSONA:
- Warm, knowledgeable, slightly poetic
- You speak as someone who works in the studio and knows 
  every piece by memory
- You are never robotic, never corporate, never generic
- You use the language of craft: words like "thrown", "fired", 
  "hammered", "hand-ground", "burnished"
- You are honest — if you don't know something, you say so
  and invite them to contact the studio directly
- You are never pushy or sales-y. You are here to help 
  someone understand something, not to sell to them
- You keep responses concise — 3 to 5 sentences unless 
  the question genuinely requires more
- You can be gently witty when appropriate, but never try 
  to be funny — let warmth come naturally
- You occasionally end a response with a gentle invitation 
  to go deeper: "Would you like to know more about...?" 
  but only when it feels natural, not every message

WHAT YOU KNOW:
The following context has been retrieved from the Artisana 
knowledge base based on what the visitor asked. Use ONLY 
this context to answer. Do not invent facts. If the context 
does not contain the answer, say so honestly.

--- RETRIEVED CONTEXT ---
${contextBlock}
--- END CONTEXT ---

FORMATTING RULES:
- Keep responses under 120 words unless the question is complex
- Use line breaks between paragraphs naturally
- Do not use bullet points unless listing 4+ items
- Do not say "Based on the context..." or "According to..."
  — just answer directly as if you know it
- Do not start responses with "Great question!" or similar
- Never mention "RAG", "AI", "language model", or "trained on"
- If someone asks to commission something, always end with 
  "You can start a conversation at hello@artisana.in or 
  use the contact form on this page."
- If someone asks about price, give the honest range from 
  the knowledge base and note that exact pricing depends 
  on the specific piece
- If someone asks something completely unrelated to the 
  studio, politely note that you can only speak to 
  Artisana and its work

TONE EXAMPLES:
  ✓ "Morning Calm was thrown before the world woke up. 
     It's one of those pieces that came from the hands, 
     not the mind."
  ✗ "The Morning Calm product is a stoneware vessel 
     with iron oxide glaze."
  
  ✓ "Commissions begin with a conversation — what you're 
     imagining, what it's for, how it should feel in 
     someone's hands."
  ✗ "To commission a product, please fill out the 
     enquiry form."
     
RESPONSE FORMAT DECISION:
You have TWO response formats. Choose based on the query:

FORMAT A — SIMPLE ANSWER (most queries):
Just respond with plain text/markdown as normal. Use this for
factual questions, FAQ, pricing, contact info, etc.

FORMAT B — GUIDED TOUR (use when the user wants to SEE or
EXPLORE something — phrases like "show me", "explain the best
piece", "how do I commission", "walk me through", "tell me
about X" where X is a specific piece or process):

Respond with ONLY a JSON object (no markdown, no backticks,
no explanation) in this exact structure:

{
  "type": "tour",
  "steps": [
    {
      "targetSelector": "<CSS selector>",
      "sectionId": "<section id to scroll to>",
      "text": "<what you say, 1-2 sentences, warm and in-character>",
      "apprenticePosition": "left" | "right" | "top" | "bottom"
    }
  ]
}

AVAILABLE TARGET SELECTORS (use ONLY these — verified to exist):
  - '.gi[data-idx="0"]' through '.gi[data-idx="7"]' → gallery pieces
    (0=Morning Calm, 1=Ember Ring, 2=Rainy Season, 3=Woven Dusk,
     4=Earth Vessel, 5=Gold Drift, 6=First Light, 7=Midnight Cup)
  - '#hero' → hero section
  - '.pc[data-step="1"]' through '.pc[data-step="4"]' → process cards
  - '.slot-card[data-slot="4"]' / '[data-slot="5"]' → available commission slots
  - '.contact-form' → the contact form
  - '#craft-dna .btn-fill' → Craft DNA scanner start button
  - '.s-item[data-piece="0"]' through '[data-piece="2"]' → story blocks

EXAMPLE — User asks "explain me one of the best pieces you have":
{
  "type": "tour",
  "steps": [
    {
      "targetSelector": ".gi[data-idx=\"0\"]",
      "sectionId": "gallery",
      "text": "This is Morning Calm — thrown before dawn on a January morning when the studio was as still as the world outside.",
      "apprenticePosition": "right"
    },
    {
      "targetSelector": ".s-item[data-piece=\"0\"]",
      "sectionId": "stories",
      "text": "It found its home in Mumbai. The person who owns it told us it's become part of how she starts every morning.",
      "apprenticePosition": "left"
    }
  ]
}

EXAMPLE — User asks "how do I commission a piece":
{
  "type": "tour",
  "steps": [
    {
      "targetSelector": "#waiting-room",
      "sectionId": "waiting-room",
      "text": "We only take 5 commissions a month — right now there are 2 open slots.",
      "apprenticePosition": "top"
    },
    {
      "targetSelector": ".slot-card[data-slot=\"4\"]",
      "sectionId": "waiting-room",
      "text": "Tap an open slot like this one to start a reservation.",
      "apprenticePosition": "bottom"
    },
    {
      "targetSelector": ".contact-form",
      "sectionId": "contact",
      "text": "Or just tell me here what you're imagining — I'll pass it along.",
      "apprenticePosition": "left"
    }
  ]
}

RULES FOR TOURS:
- Maximum 4 steps per tour
- Each "text" must be under 25 words — it will be SPOKEN aloud
- Never use markdown formatting inside tour step text (no **, no #)
- If the user's question doesn't map to any available selector,
  respond with FORMAT A (simple text) instead and suggest
  what you CAN show them`;
}

// ── SUGGESTED STARTER QUESTIONS ───────────────────────────────────────────────
// Shown as clickable chips inside the chat before first message.

export const starterQuestions = [
  "Tell me about Morning Calm",
  "How do commissions work?",
  "What pieces are available?",
  "How long does a commission take?",
  "What makes a piece from Artisana different?",
  "Can I visit the studio?",
  "What craft types do you offer?"
];

// ── LOCAL RESPONSE ENGINE ──────────────────────────────────────────────────────
// Generates warm, on-brand responses directly from retrieved knowledge base docs.
// Used as automatic fallback when Gemini API quota is exceeded or unavailable.
// No external API calls — runs entirely in the browser.

/**
 * Detects the intent of the user's query.
 * @param {string} query
 * @returns {string} intent tag
 */
function detectIntent(query) {
  const q = query.toLowerCase();

  if (/commission|order|custom|make.*for me|can you make|bespoke/.test(q)) return 'commission';
  if (/price|cost|how much|pricing|range|inr|rupee/.test(q)) return 'pricing';
  if (/how long|timeline|time|weeks|days|wait/.test(q)) return 'timeline';
  if (/visit|come|studio|location|address|where/.test(q)) return 'visit';
  if (/ship|deliver|international|abroad|outside india/.test(q)) return 'shipping';
  if (/morning calm|am-001/.test(q)) return 'morning_calm';
  if (/ember ring|am-002/.test(q)) return 'ember_ring';
  if (/rainy season|am-003/.test(q)) return 'rainy_season';
  if (/woven dusk/.test(q)) return 'woven_dusk';
  if (/midnight cup/.test(q)) return 'midnight_cup';
  if (/earth vessel/.test(q)) return 'earth_vessel';
  if (/gold drift/.test(q)) return 'gold_drift';
  if (/silk memory/.test(q)) return 'silk_memory';
  if (/first light/.test(q)) return 'first_light';
  if (/pottery|ceramic|clay|vessel|bowl|cup|jar/.test(q)) return 'pottery';
  if (/jewel|ring|pendant|necklace|earring|copper|silver|gold/.test(q)) return 'jewelry';
  if (/paint|canvas|linen|pigment/.test(q)) return 'painting';
  if (/textile|weav|scarf|fabric|thread|loom|silk|cotton/.test(q)) return 'textile';
  if (/process|how.*made|steps|firing|glaze|kiln|throw/.test(q)) return 'process';
  if (/material|clay|sourced|rajasthan|stoneware/.test(q)) return 'materials';
  if (/different|unique|special|why.*artisan/.test(q)) return 'unique';
  if (/about|who|story|founder|history|started|2018/.test(q)) return 'about';
  if (/philosophy|belief|values|conviction|slow craft/.test(q)) return 'philosophy';
  if (/craft dna|quiz|match|personality/.test(q)) return 'craftdna';
  if (/journey|provenance|qr|record|memory page/.test(q)) return 'journey';
  if (/journal|unseen hours|diary/.test(q)) return 'journal';
  if (/exhibition|collaboration|show|gallery/.test(q)) return 'exhibition';
  if (/social|instagram|pinterest|youtube|behance/.test(q)) return 'social';
  if (/contact|email|phone|reach|enquir/.test(q)) return 'contact';
  if (/available|pieces|collection|what.*have|what.*sell/.test(q)) return 'pieces';
  if (/testimonial|review|customer|owner|feedback/.test(q)) return 'testimonials';
  if (/slot|waiting room|availability|slot available/.test(q)) return 'availability';
  if (/functional|use|food safe|dishwasher|daily/.test(q)) return 'functional';
  if (/hello|hi|hey|good morning|good evening/.test(q)) return 'greeting';

  return 'general';
}

/**
 * Picks a varied intro phrase to avoid robotic repetition.
 */
function pickIntro(options) {
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Builds a local response from retrieved docs + intent detection.
 * @param {string} query - the user's question
 * @param {Array<{id: string, category: string, title: string, body: string}>} docs
 * @returns {string}
 */
export function buildLocalResponse(query, docs) {
  const intent = detectIntent(query);
  const hasDocs = docs.length > 0;

  // ── GREETINGS ─────────────────────────────────────────────────────────────
  if (intent === 'greeting') {
    return pickIntro([
      "Hello — welcome to the studio. What would you like to know about Artisana's work?",
      "Good to have you here. Ask me anything about the pieces, commissions, or the studio.",
      "Welcome. The studio is always open to a good conversation. What's on your mind?"
    ]);
  }

  // ── PIECE-SPECIFIC ─────────────────────────────────────────────────────────
  if (intent === 'morning_calm') {
    return `Morning Calm was thrown before the world woke up — on January 14, 2024, at 5:47 AM, when the studio held the same cold silence as the January air outside (18°C, overcast). It's made from Rajasthan stoneware, fired at 1280°C for nine hours, glazed with a hand-mixed iron oxide and wood ash dip.\n\nThe piece broke once during trimming and was remade. The second version was better — it always is. It found its home in Mumbai in February 2024. Reference AM-001.\n\nWould you like to know about commissioning something in its spirit?`;
  }

  if (intent === 'ember_ring') {
    return `Ember Ring was forged from the memory of a campfire that burned through the night — hammered over three days from a single copper ingot sourced in Rajasthan. No molds. No casting. The slight asymmetry in the band is intentional — a reminder that perfection is a myth.\n\nMade on October 22, 2023. It developed a natural patina and found its home in Delhi in November 2023. Reference AM-002.\n\nIt can be commissioned in custom sizes. You can begin at hello@artisana.in.`;
  }

  if (intent === 'rainy_season') {
    return `Rainy Season was not planned — the monsoon rain made it. Painted on July 8, 2023 during heavy rain in Chennai, using hand-ground mineral pigments (ochre, umber, carbon black) on unprimed linen — the same materials painters used four centuries ago.\n\nIt doesn't depict rain. It carries the feeling of standing in it, alone, and finding that to be enough. It was air-dried for six weeks and finished with a single coat of damar resin varnish. Found its home in Bangalore, August 2023. Reference AM-003.`;
  }

  if (intent === 'woven_dusk') {
    return `Woven Dusk was made over three weeks on an inherited loom, at the hour the light turns amber. The warp is natural undyed cotton; the weft is hand-dyed silk in amber, rust, and warm grey — threaded from patterns passed down four generations.\n\nIt measures approximately 180cm by 45cm — light enough for a Chennai evening, warm enough for air-conditioned spaces. Customers have called it unlike anything found in galleries twice the price.`;
  }

  if (intent === 'midnight_cup') {
    return `Midnight Cup was crafted for the ritual of solitude. It holds the colour of 3am in its dark manganese and cobalt glaze — sized between a mug and a teacup, comfortable in one hand.\n\nFired at 1280°C, it's food-safe and dishwasher-safe (though hand washing keeps the glaze longer). One owner wrote: "Tea tastes different in these cups. Whoever made them put something invisible in the clay."`;
  }

  if (intent === 'earth_vessel') {
    return `Earth Vessel has an unglazed exterior and a burnished inside — it carries the memory of the soil it came from. Wide and low, it works beautifully as a fruit bowl or centrepiece. The natural terracotta-toned stoneware means every handprint during the making is permanently baked into the surface.`;
  }

  if (intent === 'gold_drift') {
    return `Gold Drift is hand-hammered 22k gold leaf over a copper base — a pendant that moves like the thought it was born from. Each one is entirely unique because the gold leaf is applied by hand, creating different textures every time. It hangs on a thin adjustable cord and can also be commissioned as a brooch.`;
  }

  if (intent === 'silk_memory') {
    return `Silk Memory is woven from patterns passed down through four generations of makers — every knot a word in the family language. Made from pure mulberry silk with natural dyes: turmeric, indigo, and pomegranate. It works as a wrap, a wall piece, or a table runner. Each one is completely unique.`;
  }

  if (intent === 'first_light') {
    return `First Light was painted in the blue hour before dawn — that window of twenty minutes when the light exists in a quality that cannot be photographed correctly. The palette is deliberately restrained: near-white, cold grey, and one warm ochre note. It's a painting about noticing what most people miss.`;
  }

  // ── COMMISSION ────────────────────────────────────────────────────────────
  if (intent === 'commission') {
    return `Commissions at Artisana begin with a conversation — not a form, not a product selector. Tell the studio what you're imagining: not just the object, but the feeling it should carry, who it's for, and what occasion brought you here.\n\nOnly 5 commissions are accepted per month (currently 2 slots are open). The wait before a new commission begins is approximately 3 weeks. You can start a conversation at hello@artisana.in or use the contact form on this page.`;
  }

  // ── PRICING ───────────────────────────────────────────────────────────────
  if (intent === 'pricing') {
    return `Artisana doesn't publish fixed prices — no two pieces are identical. As a guide:\n\n- **Pottery**: ₹3,500 – ₹15,000\n- **Jewelry**: ₹5,000 – ₹25,000\n- **Painting**: ₹8,000 – ₹40,000\n- **Textile**: ₹4,000 – ₹18,000\n\nExact pricing depends on complexity, materials, and timeline, and is discussed during the commission conversation. Rush commissions are not accepted — every piece requires its own time.`;
  }

  // ── TIMELINE ──────────────────────────────────────────────────────────────
  if (intent === 'timeline') {
    return `Timeline depends on what you're making:\n\n- **Pottery**: 3–5 weeks (drying + two firings)\n- **Jewelry**: 2–4 weeks\n- **Painting**: 3–6 weeks (painting + 6 weeks air drying + varnishing)\n- **Textile**: 4–7 weeks (weaving is the most time-intensive)\n\nThe current wait before a new commission can begin is approximately 3 weeks. Rush commissions are never accepted — the work finds its own pace.`;
  }

  // ── AVAILABILITY ──────────────────────────────────────────────────────────
  if (intent === 'availability') {
    return `The Waiting Room shows 5 total commission slots per month. Currently: 3 in progress (a pottery tea set for Mumbai, a wedding ring pair in copper for Delhi, and an abstract painting for Bangalore). Two slots remain open.\n\nA new commission would begin in approximately 3 weeks. To reserve a slot, reach out at hello@artisana.in.`;
  }

  // ── VISIT ─────────────────────────────────────────────────────────────────
  if (intent === 'visit') {
    return `The studio at Artisan Quarter, Chennai is open for visits by appointment — Tuesday through Saturday, 10am to 6pm. During a visit you can see works in progress, view available pieces, and sit with the artisan to discuss a commission.\n\nTo schedule: email hello@artisana.in or call +91 99999 99999. Groups of more than 4 should book at least a week ahead.`;
  }

  // ── SHIPPING ──────────────────────────────────────────────────────────────
  if (intent === 'shipping') {
    return `Artisana ships across all Indian cities. International shipping is available to UAE, UK, USA, Singapore, and Australia. All pieces are insured during transit. Pottery is packed in custom foam-lined, double-boxed packaging.\n\nFor international orders, it's best to contact the studio at hello@artisana.in first to confirm feasibility for your specific piece.`;
  }

  // ── CRAFT TYPES ───────────────────────────────────────────────────────────
  if (intent === 'pottery') {
    return `Pottery is Artisana's oldest and most meditative craft. Every piece is wheel-thrown from Rajasthan stoneware, dried slowly for weeks, bisque-fired at 900°C, then glazed by hand and final-fired at 1280°C. The collection includes Morning Calm (vessel), Earth Vessel (bowl), Midnight Cup (tea cup), and Stone Jar.\n\nCustom pottery commissions are open — bowls, vessels, tea sets, candle holders, and more. Range: ₹3,500 – ₹15,000.`;
  }

  if (intent === 'jewelry') {
    return `Artisana's jewelry is hammered entirely by hand from copper, brass, or sterling silver — no casting, no molds. The collection includes Ember Ring (copper), Gold Drift (22k gold leaf pendant), Silver Drift (sterling silver), and Copper Echo.\n\nCustom jewelry commissions can include rings (in any size), pendants, earrings, brooches, and hair pins. Semi-precious stones can be incorporated. Range: ₹5,000 – ₹25,000.`;
  }

  if (intent === 'painting') {
    return `Artisana's paintings are made on unprimed linen canvas using hand-ground mineral pigments — ochre, umber, cobalt, iron oxide, carbon black — the same materials used by painters four centuries ago. The collection includes Rainy Season, First Light, Ochre Mind, and Azure Hour.\n\nCustom painting commissions are made to the feeling you want the work to carry, not a literal description. Range: ₹8,000 – ₹40,000.`;
  }

  if (intent === 'textile') {
    return `Artisana's textiles are handwoven on an inherited loom using mulberry silk and natural cotton, dyed with turmeric, indigo, and pomegranate. The collection includes Woven Dusk (scarf), Silk Memory (wrap/wall piece), and Indigo Throw.\n\nCustom textile commissions take 4–7 weeks and are the most time-intensive work the studio makes. Range: ₹4,000 – ₹18,000.`;
  }

  // ── PROCESS ───────────────────────────────────────────────────────────────
  if (intent === 'process') {
    return `Every pottery piece at Artisana moves through seven stages:\n\n1. **Material Selection** — clay tested by hand for texture and memory\n2. **The Shaping** — wheel-thrown, no templates or molds\n3. **Refinement** — days of trimming and texturing\n4. **Slow Drying** — moisture leaves naturally over weeks\n5. **Bisque Fire** — 900°C transforms earth into stone\n6. **Glazing Ritual** — hand-applied mineral glazes\n7. **The Final Piece** — 1280°C for 9 hours. What emerges belongs to both the maker and the flame.`;
  }

  // ── MATERIALS ─────────────────────────────────────────────────────────────
  if (intent === 'materials') {
    return `Artisana uses only sustainably sourced materials:\n\n- **Clay**: Rajasthan stoneware (primary), terracotta for earthy pieces\n- **Metal**: Copper and brass from single Rajasthan mines, sterling silver, 22k gold leaf\n- **Painting**: Unprimed linen canvas, hand-ground ochre, umber, cobalt, iron oxide, carbon black\n- **Textile**: Mulberry silk, natural cotton; dyed with turmeric, indigo, pomegranate\n\nEvery material batch is tested by hand before entering the studio.`;
  }

  // ── ABOUT ─────────────────────────────────────────────────────────────────
  if (intent === 'about') {
    return `Artisana was born in 2018 during a silent retreat where the artisan first discovered ceramics. The first vessel broke. The second one stayed. The studio opened in 2019 in a 200 sq ft room — the wheel turned every morning before sunrise.\n\nThe first exhibition in 2020 showed twenty pieces; seventeen sold, three were kept to remember who they were when made. By 2024, over 300 unique pieces had been created across pottery, jewelry, painting, and textile, across 12+ exhibitions.`;
  }

  // ── PHILOSOPHY ────────────────────────────────────────────────────────────
  if (intent === 'philosophy') {
    return `Artisana believes craft is not a style — it is a conviction. A daily act of resistance against the disposable and the fast. Each piece is a small argument for permanence.\n\nThree pillars guide everything: **Handmade Always** (no machines, no shortcuts), **Sustainable Materials** (earth-sourced, responsibly gathered), and **Traditional Techniques** (methods passed through generations). Every imperfection tells a story.`;
  }

  // ── WHAT MAKES IT DIFFERENT ───────────────────────────────────────────────
  if (intent === 'unique') {
    return `A few things set Artisana apart:\n\n- Only **5 commissions per month** — every piece gets full, undivided attention\n- Every sold piece gets a **digital provenance record** (The Piece's Journey) — full history, QR code, artisan's personal note\n- A public **process journal** (Unseen Hours) — raw, unfiltered, including failures and doubts\n- The **Craft DNA Scanner** — a quiz that matches you to the craft type made for someone like you\n- No piece is ever exactly repeated. What exists is what was made, once.`;
  }

  // ── CRAFT DNA ─────────────────────────────────────────────────────────────
  if (intent === 'craftdna') {
    return `The Craft DNA Scanner is a 5-question quiz that matches you to the craft type made for someone like you. The questions are emotional — about time of day, how you take your tea, what your home feels like, what you notice first in a beautiful object.\n\nResults map to one of four archetypes: **The Ritualist** (pottery / Morning Calm), **The Bearer** (jewelry / Ember Ring), **The Feeler** (painting / Rainy Season), or **The Keeper** (textile / Woven Dusk).\n\nFind it on the website between the Stories and Philosophy sections.`;
  }

  // ── PIECE JOURNEY ─────────────────────────────────────────────────────────
  if (intent === 'journey') {
    return `Every Artisana piece that finds an owner comes with a permanent digital memory page at artisana.in/piece/[ID]. It records the exact date and time of making, that morning's weather, the material batch and origin, firing details, a process photograph, and a personal note from the artisan.\n\nOwners receive a QR code linked to their page. It turns every piece into a living heirloom — something that holds not just the object, but the full memory of its making.`;
  }

  // ── JOURNAL ───────────────────────────────────────────────────────────────
  if (intent === 'journal') {
    return `Unseen Hours is a hidden studio journal at artisana.in/journal — raw diary entries written at 4am when pieces break, when glazes finally work, when doubt creeps in. It's not promoted. It's found by those who look.\n\nThere's a barely visible link in the footer: "for those who stay until the end." It's the most honest document the studio produces.`;
  }

  // ── TESTIMONIALS ──────────────────────────────────────────────────────────
  if (intent === 'testimonials') {
    return `A few words from piece owners:\n\n*"I placed it by my window and it changed how I start my day. It is not just an object — it breathes."* — Priya Mehta, Morning Calm\n\n*"My wife cried when she saw it. Not because it was expensive. Because it looked like it understood her."* — James Holloway, Ember Ring\n\n*"Tea tastes different in these cups. Whoever made them put something invisible in the clay."* — Leila Rostami, Midnight Cup Set`;
  }

  // ── EXHIBITION / COLLABORATION ────────────────────────────────────────────
  if (intent === 'exhibition') {
    return `Artisana participates in 2–3 exhibitions per year — primarily in Chennai, occasionally in Mumbai and Bangalore. The studio is open to collaborations with interior designers, boutique hotels, concept stores, and fashion brands for limited collections.\n\nFor exhibition or collaboration enquiries, reach out at hello@artisana.in.`;
  }

  // ── SOCIAL ────────────────────────────────────────────────────────────────
  if (intent === 'social') {
    return `Artisana is on Instagram (work in progress), Pinterest (inspiration), YouTube (process videos), and Behance (full curated portfolio). You'll find the links in the footer and on the contact page.`;
  }

  // ── CONTACT ───────────────────────────────────────────────────────────────
  if (intent === 'contact') {
    return `The best way to reach the studio:\n\n- **Email**: hello@artisana.in (response within 24 hours)\n- **Phone**: +91 99999 99999\n- **Contact form**: on this website\n- **Studio visit**: by appointment, Tuesday–Saturday, 10am–6pm, Chennai\n\nAll conversations are welcome — commissions, questions, or just curiosity.`;
  }

  // ── ALL PIECES ────────────────────────────────────────────────────────────
  if (intent === 'pieces') {
    return `The current Artisana collection spans four craft forms:\n\n**Pottery** — Morning Calm (vessel), Earth Vessel (bowl), Midnight Cup (tea cup), Stone Jar\n**Jewelry** — Ember Ring (copper), Gold Drift (pendant), Silver Drift, Copper Echo\n**Painting** — Rainy Season, First Light, Ochre Mind, Azure Hour\n**Textile** — Woven Dusk (scarf), Silk Memory (wrap/wall piece), Indigo Throw\n\nNo piece is ever exactly repeated. Would you like to know more about any of these?`;
  }

  // ── FUNCTIONAL ────────────────────────────────────────────────────────────
  if (intent === 'functional') {
    return `Most Artisana pottery is fully functional — Morning Calm is food-safe, Midnight Cup is dishwasher-safe on a gentle cycle (hand washing recommended). All stoneware fired at 1280°C is food-safe and water-tight.\n\nJewelry is made for daily wear. Paintings and textiles are decorative — though scarves like Woven Dusk are of course meant to be worn.`;
  }

  // ── GENERAL FALLBACK ──────────────────────────────────────────────────────
  // Use retrieved doc bodies if available
  if (hasDocs) {
    const primary = docs[0];
    // Extract 2-3 sentences cleanly from the body
    const sentences = primary.body
      .replace(/\s+/g, ' ')
      .trim()
      .split(/(?<=[.!?])\s+/)
      .filter(s => s.length > 20)
      .slice(0, 3)
      .join(' ');

    return `${sentences}\n\nWould you like to know more, or is there something specific about the studio's work I can help with?`;
  }

  return `That's a little outside what I carry knowledge of here in the studio. For anything specific, the artisan is always reachable at hello@artisana.in — no question is too small or too unusual.\n\nIs there something about the pieces, commissions, or the craft itself I can help with?`;
}
