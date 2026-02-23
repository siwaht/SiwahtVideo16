export async function onRequestPost() {
    // Mock success response for Cloudflare environment
    // Since Filesystem is read-only, we can't save the link permanently here.
    // This prevents the "Unexpected end of JSON input" error in the frontend.

    const mockMedia = {
        id: crypto.randomUUID(),
        title: "External Link Added",
        status: "success",
        message: "Link processed (Note: Persistence on Cloudflare requires D1 database)"
    };

    return new Response(JSON.stringify(mockMedia), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}
