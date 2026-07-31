import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Delivery & Installation",
  description:
    "Production timelines, delivery across India, and installation for furniture, blinds, flooring, cladding and outdoor structures.",
};

export default function ShippingPage() {
  return (
    <PolicyPage title="Delivery & Installation">
      <p>
        Great Indoors supplies and installs. For most categories the two go
        together — blinds, wall-to-wall carpets, deck flooring, cladding and
        tensile structures are all measured, made and fitted by our own team
        rather than handed over in a box.
      </p>

      <h2>Production timelines</h2>

      <p>
        Timelines depend on the category and the quantity. Stocked items and
        smaller furniture orders typically move in 7 to 14 working days.
        Made-to-order sofas, tensile structures and luxury tents need longer,
        and project quantities are scheduled against your site programme. We
        confirm a date in writing with your quote rather than leaving it open.
      </p>

      <h2>Delivery</h2>

      <p>
        We deliver across India. Within Jaipur, delivery and installation are
        included. For projects elsewhere, transport and installation are quoted
        with the order — for larger fit-outs our installation team travels to
        site.
      </p>

      <h2>Site readiness</h2>

      <p>
        For installed categories, the site needs to be ready: walls finished,
        floors levelled, and power available where the work requires it. We will
        tell you what is needed at the site visit so nothing is discovered on
        installation day.
      </p>

      <h2>Transit damage</h2>

      <p>
        Goods are packed for the journey, but if something arrives damaged,
        report it within 48 hours with photographs. We will repair or replace
        the affected item at our cost. Please inspect on arrival and, where you
        can, record the unwrapping.
      </p>
    </PolicyPage>
  );
}
