import { NextResponse } from "next/server";

type InstagramPublishRequest = {
  igUserId: string;
  mediaType: "REELS" | "IMAGE";
  assetUrl: string;
  caption: string;
  thumbOffset?: number;
};

const GRAPH_VERSION = "v19.0";

export async function POST(request: Request) {
  const payload = (await request.json()) as InstagramPublishRequest;
  const token = process.env.IG_LONG_LIVED_TOKEN;

  if (!token) {
    return NextResponse.json(
      {
        status: "missing_token",
        message:
          "Add IG_LONG_LIVED_TOKEN to environment variables. Generate it via the Facebook Graph API using a connected Business account.",
        steps: [
          "Exchange short-lived token for a long-lived token",
          "Store securely and refresh before 60 days",
          "Retry the request with Authorization header",
        ],
        docs: "https://developers.facebook.com/docs/instagram-api/reference/ig-user/media",
        payload,
      },
      { status: 501 }
    );
  }

  const creationUrl = `https://graph.facebook.com/${GRAPH_VERSION}/${payload.igUserId}/media`;

  return NextResponse.json(
    {
      status: "dry_run",
      message:
        "This is a dry run. Use the returned endpoints to create media containers, poll status, and publish once ready.",
      requests: [
        {
          method: "POST",
          url: creationUrl,
          body: {
            media_type: payload.mediaType,
            video_url: payload.mediaType === "REELS" ? payload.assetUrl : undefined,
            image_url: payload.mediaType === "IMAGE" ? payload.assetUrl : undefined,
            caption: payload.caption,
            thumb_offset: payload.thumbOffset ?? 0,
            access_token: "<redacted>",
          },
        },
        {
          method: "GET",
          url: `${creationUrl}/{creation_id}`,
          params: { access_token: "<redacted>", fields: "status_code,status" },
        },
        {
          method: "POST",
          url: `https://graph.facebook.com/${GRAPH_VERSION}/${payload.igUserId}/media_publish`,
          body: { creation_id: "{creation_id}", access_token: "<redacted>" },
        },
      ],
    },
    { status: 202 }
  );
}
