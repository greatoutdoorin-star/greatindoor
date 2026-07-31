/**
 * FAQ content, grouped by category.
 *
 * Written for an enquiry-led site: there is no cart, no checkout and no online
 * payment, so nothing here references order tracking, EMI or pin-code
 * serviceability. Moves to the database once the admin panel lands.
 */

export type Faq = { q: string; a: string };
export type FaqGroup = { category: string; items: Faq[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    category: "About Us",
    items: [
      {
        q: "Where is your showroom?",
        a: "Our showroom is at 272A Frontier Colony, Adarsh Nagar, Jaipur 302004. You can see material samples, fabric swatches and display pieces across all our categories in person.",
      },
      {
        q: "How long have you been in business?",
        a: "Since 1993. The business began as Royal Interiors in Raja Park, Jaipur, and was reborn as Great Indoors in 2012. We have delivered more than 500 projects since.",
      },
      {
        q: "What do you actually supply?",
        a: "Over 20 categories across three areas — furniture (office, cafe, sofas), interiors (blinds, flooring, carpets, cladding, tiles, planters) and outdoor (awnings, tensile structures, luxury tents, artificial grass, sports flooring).",
      },
    ],
  },
  {
    category: "Ordering & Pricing",
    items: [
      {
        q: "Why are no prices listed on the website?",
        a: "Almost everything we supply is made to order — dimensions, fabric, finish and quantity all change the cost. Send an enquiry on WhatsApp with what you need and we will quote it properly rather than list a figure that would not apply to your project.",
      },
      {
        q: "How do I place an order?",
        a: "Message us on WhatsApp or call +91 98290 12090. Our team will confirm specifications, share a quote, and arrange a site visit if the project needs one.",
      },
      {
        q: "Do you take bulk and B2B orders?",
        a: "Yes — hotels, offices, cafes and institutional projects are a large part of what we do. Bulk and B2B orders carry up to 30% off. Please use the Bulk | B2B page or WhatsApp us with your requirement.",
      },
      {
        q: "Can I customise dimensions, fabric or finish?",
        a: "Yes. Everything is 100% customisable — dimensions, fabric, finish and colour. Tell us the space you are fitting out and we will work to it.",
      },
    ],
  },
  {
    category: "Site Visits & Installation",
    items: [
      {
        q: "Do you do site visits?",
        a: "Yes, and they are free for projects. A site visit lets us measure accurately and recommend what actually suits the space, which matters most for blinds, flooring, carpets and cladding.",
      },
      {
        q: "Is installation included?",
        a: "Installation is included within Jaipur. For projects outside the city, installation is quoted with the order — our team travels for larger fit-outs.",
      },
      {
        q: "How long does an order take?",
        a: "It depends on the category and quantity. Stocked items move quickly; made-to-order furniture, tensile structures and tents need production time. We confirm a timeline in writing when you place the order.",
      },
    ],
  },
  {
    category: "After Sales",
    items: [
      {
        q: "Do you handle repairs and maintenance?",
        a: "Yes. We service what we supply — wear and tear, re-upholstery, re-tensioning and general maintenance. Only warranty comes with an expiry date; our support does not.",
      },
      {
        q: "What if something arrives damaged?",
        a: "Tell us within 48 hours of delivery with photographs and we will repair or replace the affected item. Because goods are made to order, we ask that you check them on arrival.",
      },
      {
        q: "Is there a warranty?",
        a: "Warranty terms vary by category and are confirmed with your quote. Structural elements, fabrics and finishes each carry their own cover.",
      },
    ],
  },
];
