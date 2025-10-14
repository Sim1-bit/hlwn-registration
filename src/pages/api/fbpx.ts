// Relay verso Facebook per aggirare i blocker (usato solo dopo consenso)
export async function GET({ url, request }: { url: URL; request: Request }) {
  const target = "https://www.facebook.com/tr" + url.search;

  const upstream = await fetch(target, {
    headers: { "User-Agent": request.headers.get("user-agent") || "" },
  });

  const body = await upstream.arrayBuffer();
  const contentType = upstream.headers.get("content-type") || "image/gif";

  return new Response(body, {
    status: upstream.status,
    headers: { "content-type": contentType, "cache-control": "no-store" },
  });
}
