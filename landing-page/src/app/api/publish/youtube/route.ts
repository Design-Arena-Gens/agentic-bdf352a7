import { NextResponse } from "next/server";

type YoutubePublishRequest = {
  title: string;
  description: string;
  tags?: string[];
  privacyStatus?: "public" | "unlisted" | "private";
  videoUrl: string;
  thumbnailUrl?: string;
};

const YOUTUBE_UPLOAD_ENDPOINT =
  "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status";

export async function POST(request: Request) {
  const payload = (await request.json()) as YoutubePublishRequest;
  const token = process.env.YOUTUBE_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      {
        status: "missing_token",
        message:
          "Set YOUTUBE_ACCESS_TOKEN and re-run. We recommend storing refresh tokens securely in Vercel env vars and rotating quarterly.",
        nextSteps: [
          "POST to Google OAuth with scope https://www.googleapis.com/auth/youtube.upload",
          "Persist refresh_token; exchange for access token on demand",
          "Retry this endpoint with the Authorization header set",
        ],
        docs: "https://developers.google.com/youtube/v3/docs/videos/insert",
        payload,
      },
      { status: 501 }
    );
  }

  const metadata = {
    snippet: {
      title: payload.title,
      description: payload.description,
      tags: payload.tags ?? [],
      categoryId: "27",
      defaultLanguage: "en",
    },
    status: {
      privacyStatus: payload.privacyStatus ?? "public",
      selfDeclaredMadeForKids: false,
    },
  };

  return NextResponse.json(
    {
      status: "dry_run",
      message:
        "This is a dry run. Replace the mocked fetch with a resumable upload using the Location header returned by YouTube.",
      uploadEndpoint: YOUTUBE_UPLOAD_ENDPOINT,
      headers: {
        Authorization: "Bearer <redacted>",
        "X-Upload-Content-Type": "video/mp4",
      },
      metadata,
      uploadSteps: [
        "POST metadata to the resumable upload endpoint",
        "PUT the video to the returned Location URL",
        payload.thumbnailUrl
          ? `POST thumbnail bytes to https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=<id>`
          : "Optional: set a custom thumbnail once the video is processed",
      ],
    },
    { status: 202 }
  );
}
