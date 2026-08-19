import Image from "next/image";
import { requireAdmin } from "@/lib/auth";
import { listHeroSlides } from "@/lib/admin-data";
import HeroSlideForm from "@/components/admin/HeroSlideForm";
import RowActions from "@/components/admin/RowActions";
import { deleteHeroSlide, setHeroSlideVisibility } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function HeroPage() {
  await requireAdmin();
  const slides = await listHeroSlides();

  return (
    <>
      <h1 className="font-display font-bold" style={{ fontSize: "var(--text-h1)" }}>
        Hero slides
      </h1>
      <p
        className="mt-2 max-w-2xl font-body text-ink-muted"
        style={{ fontSize: "var(--text-body-sm)" }}
      >
        The slider at the top of the home page. With no slides here the site
        falls back to its built-in artwork, so it is safe to leave empty.
      </p>

      {slides.length > 0 && (
        <ul className="mt-8 grid gap-3">
          {slides.map((slide) => (
            <li
              key={slide.id}
              className={`flex flex-wrap items-center gap-4 border border-hairline bg-canvas p-3 ${
                slide.visible ? "" : "opacity-55"
              }`}
            >
              <div className="relative h-16 w-28 shrink-0 bg-surface">
                {slide.image && (
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-display font-semibold">
                  {slide.headline || <span className="text-ink-subtle">No headline</span>}
                </p>
                <p
                  className="truncate font-body text-ink-muted"
                  style={{ fontSize: "var(--text-body-sm)" }}
                >
                  {slide.subtext || slide.image}
                </p>
              </div>

              <RowActions
                id={slide.id}
                visible={slide.visible}
                onToggle={setHeroSlideVisibility}
                onDelete={deleteHeroSlide}
                label={slide.headline || `slide ${slide.id}`}
                mode="toggle"
              />
              <RowActions
                id={slide.id}
                visible={slide.visible}
                onToggle={setHeroSlideVisibility}
                onDelete={deleteHeroSlide}
                label={slide.headline || `slide ${slide.id}`}
                mode="delete"
              />
            </li>
          ))}
        </ul>
      )}

      <h2
        className="mt-12 font-display font-bold"
        style={{ fontSize: "var(--text-h3)" }}
      >
        Add a slide
      </h2>
      <HeroSlideForm nextSortOrder={slides.length} />
    </>
  );
}
