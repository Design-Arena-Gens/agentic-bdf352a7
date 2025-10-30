import Link from "next/link";
import { connectFlow, videoAssets, brand } from "@/lib/content";

const apiDocs = {
  youtube: "https://developers.google.com/youtube/v3/docs/videos/insert",
  instagram: "https://developers.facebook.com/docs/instagram-api/reference/ig-user/media",
};

export function ConnectPublishSection() {
  return (
    <section id="connect" className="bg-background py-20">
      <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-6">
        <div className="rounded-[var(--radius-lg)] bg-white/85 p-8 shadow-[var(--shadow-soft)] ring-1 ring-primary/15">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold text-foreground">
                Connect & publish in under two minutes
              </h2>
              <p className="mt-3 text-sm text-muted">
                Hook up your channels once, then drop in the upload-ready assets below. If a connection
                fails, the download kit keeps you launch-ready.
              </p>
            </div>
            <Link
              href="/publishing-manifest.json"
              download
              className="focus-ring inline-flex h-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)]"
            >
              Download publishing kit
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">YouTube Data API v3</h3>
              <p className="text-sm text-muted">
                Scope: <span className="font-mono text-primary">{connectFlow.youtube.scope}</span>
              </p>
              <ol className="space-y-3 text-sm text-muted">
                {connectFlow.youtube.steps.map((step, idx) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-muted">
                Need more detail? Review the
                {" "}
                <a className="text-primary underline" href={apiDocs.youtube} target="_blank" rel="noreferrer">
                  resumable upload docs
                </a>
                .
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Instagram Graph API</h3>
              <p className="text-sm text-muted">
                Scopes: <span className="font-mono text-primary">{connectFlow.instagram.scope}</span>
              </p>
              <ol className="space-y-3 text-sm text-muted">
                {connectFlow.instagram.steps.map((step, idx) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20 text-xs font-semibold text-secondary">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-muted">
                Reference the
                {" "}
                <a
                  className="text-primary underline"
                  href={apiDocs.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram media publish guide
                </a>
                .
              </p>
            </div>
          </div>
          <div className="mt-12 rounded-[var(--radius-md)] bg-background p-6">
            <h3 className="text-lg font-semibold text-foreground">Asset manifest</h3>
            <ul className="mt-4 grid gap-2 text-sm text-muted md:grid-cols-3">
              {videoAssets.map((video) => (
                <li key={video.id}>
                  <span className="block font-semibold text-foreground">{video.title}</span>
                  <span className="block">File: {video.file}</span>
                  <span className="block">Captions: {video.transcript}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              Upload endpoints store publish responses in a JSON manifest so your growth squad always knows what’s live.
            </p>
          </div>
          <p className="mt-6 text-xs text-muted">
            Tip: Store tokens in Vercel environment variables and proxy API calls from our secure serverless
            routes. {brand.name} never exposes keys client-side.
          </p>
        </div>
      </div>
    </section>
  );
}
