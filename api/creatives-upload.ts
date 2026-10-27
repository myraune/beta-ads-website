import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { json, isAdmin } from "./_lib/creatives";

/* Client uploads for the creative library admin: the browser sends the video and
   the poster straight to the public Blob store (no 4.5 MB function body limit);
   this route only hands out the upload token, and only with the admin password
   (sent as clientPayload). */

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!isAdmin(clientPayload)) throw new Error("Wrong password.");
        if (!/^library\/[\w.-]+$/.test(pathname)) throw new Error("Bad file name.");
        return {
          allowedContentTypes: ["video/mp4", "video/webm", "image/webp", "image/jpeg", "image/png"],
          maximumSizeInBytes: 150 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    return json(result);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Upload failed." }, 400);
  }
}
