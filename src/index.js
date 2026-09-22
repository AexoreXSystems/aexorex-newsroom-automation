export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    return new Response(
      JSON.stringify({
        service: "AexoreX Newsroom Automation",
        status: "operational",
        environment: "Cloudflare Workers",
        endpoint: url.pathname,
        timestamp: new Date().toISOString()
      }, null, 2),
      {
        status: 200,
        headers: {
          "content-type": "application/json; charset=UTF-8"
        }
      }
    );
  },

  async scheduled(event, env, ctx) {
    console.log("AexoreX Newsroom Automation cron executed:", event.cron);
  }
};
