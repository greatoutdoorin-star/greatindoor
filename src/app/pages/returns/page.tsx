import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Returns & Refund",
  description:
    "Our returns policy for made-to-order interiors and furniture, and how we handle transit damage or manufacturing defects.",
};

export default function ReturnsPage() {
  return (
    <PolicyPage title="Returns & Refund">
      <p>
        Almost everything Great Indoors supplies is made to order — furniture
        built to your dimensions, blinds cut to your windows, carpets and
        flooring sized to your rooms. Because each order is produced for one
        space, we follow a no-return and no-refund policy on custom items. We
        would rather spend the time before the order making sure it is right.
      </p>

      <h2>Before you order</h2>

      <p>
        Our interior stylist is available on WhatsApp to help you choose
        materials, finishes and dimensions, and we offer a free site visit for
        projects. Take advantage of both. Fabric swatches and material samples
        can be seen at our Raja Park showroom, and we will confirm every
        specification in writing before production begins.
      </p>

      <h2>Changes and cancellations</h2>

      <p>
        Orders can be changed or cancelled until production starts. Once
        cutting, weaving or fabrication has begun, the materials are committed
        to your specification and the order cannot be reversed.
      </p>

      <h2>Damage and defects</h2>

      <p>
        We stand behind what we make. If an item arrives damaged in transit or
        carries a manufacturing defect, tell us within 48 hours of delivery with
        photographs and we will repair or replace it at our cost. Please check
        goods on arrival, and where possible record the unwrapping — it makes a
        transit claim straightforward for everyone.
      </p>

      <h2>Ongoing support</h2>

      <p>
        Repairs, re-upholstery, re-tensioning and general maintenance are
        services we offer for the life of the product, whether or not it is
        still under warranty.
      </p>
    </PolicyPage>
  );
}
