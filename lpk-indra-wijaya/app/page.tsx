import { getDatabase } from "@/lib/store";
import HomeClient from "@/components/HomeClient";

// Revalidate or dynamic server rendering so updates from CMS appear immediately
export const dynamic = "force-dynamic";

export default function HomePage() {
  const data = getDatabase();

  return <HomeClient initialData={data} />;
}
