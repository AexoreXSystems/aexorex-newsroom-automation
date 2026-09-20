export default {
  async fetch(request, env, ctx) {
    return new Response(
      "AexoreX Newsroom Automation is running.",
      {
        status: 200,
        headers: {
          "content-type": "text/plain; charset=UTF-8",
        },
      }
    );
  },

  async scheduled(event, env, ctx) {
    console.log(
      "AexoreX Newsroom Automation Cron executed:",
      new Date().toISOString()
    );
  },
};
