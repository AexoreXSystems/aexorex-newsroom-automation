export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Publish webhook endpoint
    if (url.pathname === "/api/publish" && request.method === "POST") {
      return handlePublish(request, env);
    }

    // Health check
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
    console.log(
      "AexoreX Newsroom Automation Cron executed:",
      new Date().toISOString()
    );
  }
};


async function handlePublish(request, env) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return jsonResponse(
        {
          success: false,
          error: "Content-Type must be application/json"
        },
        400
      );
    }

    const article = await request.json();

    if (!article.title) {
      return jsonResponse(
        {
          success: false,
          error: "Article title is required"
        },
        400
      );
    }

    console.log("Article received for publication:", {
      title: article.title,
      slug: article.slug || null
    });

    return jsonResponse({
      success: true,
      message: "Article received by AexoreX Newsroom Automation",
      article: {
        title: article.title,
        slug: article.slug || null
      },
      received_at: new Date().toISOString()
    });
  } catch (error) {
    console.error("Publish webhook error:", error);

    return jsonResponse(
      {
        success: false,
        error: "Invalid request"
      },
      400
    );
  }
}


function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8"
    }
  });
}
