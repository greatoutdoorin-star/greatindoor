import AdminNav from "@/components/admin/AdminNav";
import SettingsForm from "@/components/admin/SettingsForm";
import { requireAdmin } from "@/lib/auth";
import { getAdminSettings } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await getAdminSettings();

  return (
    <>
      <AdminNav current="/admin/settings" />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1
          className="font-display font-bold"
          style={{ fontSize: "var(--text-h1)" }}
        >
          Settings
        </h1>
        <p
          className="mt-2 max-w-2xl font-body text-ink-muted"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          These appear across the whole site, so saving rebuilds every page.
        </p>

        <SettingsForm settings={settings} />
      </main>
    </>
  );
}
