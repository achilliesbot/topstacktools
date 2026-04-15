import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const affiliateLinks: Record<string, string> = {
  hostinger: "https://hostinger.com/?utm_source=topstacktools&utm_medium=affiliate&utm_campaign=review",
  hubspot: "https://hubspot.com/?utm_source=topstacktools&utm_medium=affiliate&utm_campaign=review",
  notion: "https://notion.so/?utm_source=topstacktools&utm_medium=affiliate&utm_campaign=review",
  jasper: "https://jasper.ai/?utm_source=topstacktools&utm_medium=affiliate&utm_campaign=review",
  semrush: "https://semrush.com/?utm_source=topstacktools&utm_medium=affiliate&utm_campaign=review",
  systeme: "https://systeme.io/?sa=sa026881943899075a2e173792837d9dece54a7e8b",
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
