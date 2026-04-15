import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const affiliateLinks: Record<string, string> = {
  hostinger: "https://hostinger.com",
  hubspot: "https://hubspot.com",
  notion: "https://notion.so",
  jasper: "https://jasper.ai",
  semrush: "https://semrush.com",
  "systeme-io": "https://systeme.io/?sa=sa026881943899075a2e173792837d9dece54a7e8b",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const url = affiliateLinks[slug];

  if (!url) {
    redirect("/");
  }

  redirect(url);
}
