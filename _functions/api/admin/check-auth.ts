export async function onRequestGet() {
    return new Response(JSON.stringify({ authenticated: true }), {
        headers: { "Content-Type": "application/json" }
    });
}
