import { NextRequest } from "next/server";

export const withLogging = (
  handler: (req: NextRequest) => Promise<Response>
) => {
  return async (req: NextRequest) => {
    // Call the handler and get the response
    const res = await handler(req);
    // Extract request body
    let requestBody = "";
    try {
      requestBody = await req.text();
    } catch (error) {
      console.error("Error reading request body:", error);
    }
    // Clone the response to avoid locking the stream
    const cloneResponse = res.clone();
    // Extract request headers
    const headers = Array.from(req.headers.entries())
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    // Extract and log the response body
    await cloneResponse.text();

    // Create log items
    const logItems = [
      "Request: " + req.method,
      "Headers: " + headers,
      "NextURL: " + req.nextUrl.toString(),
      "Status: " + res.status,
      "Body: " + requestBody,
    ];

    // Log the request and response details
    console.log(logItems.join("\n"));

    return res;
  };
};
