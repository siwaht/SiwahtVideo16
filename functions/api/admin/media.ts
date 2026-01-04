export async function onRequestGet() {
    const mediaData: any[] = [];

    return new Response(JSON.stringify(mediaData), {
        headers: { "Content-Type": "application/json" }
    });
}
