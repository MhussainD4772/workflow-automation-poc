/**
 * Base API configuration and request helper.
 * Single place for base URL, headers, and normalized error handling.
 */

const getBaseUrl = (): string => {
  const base = import.meta.env.VITE_API_BASE;
  if (typeof base === "string" && base.length > 0) {
    return base.replace(/\/$/, "");
  }
  return "";
};

export const API_BASE = getBaseUrl();

function parseErrorBody(text: string): string | null {
  try {
    const json = JSON.parse(text) as { message?: string; error?: string };
    return json.message ?? json.error ?? null;
  } catch {
    return null;
  }
}

/**
 * Normalized request: JSON body, consistent error handling.
 * Throws with a user-friendly message (from API body or fallback).
 */
export async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE}${path}`;
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Network error";
    throw new Error(message);
  }

  const text = await res.text();
  if (!res.ok) {
    const apiMessage = parseErrorBody(text);
    const message = apiMessage ?? (text || `Request failed (${res.status})`);
    throw new Error(message);
  }

  if (!text || text.trim() === "") {
    return {} as T;
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    const preview = text.trim().slice(0, 80).replace(/\s+/g, " ");
    const hint = preview.startsWith("<")
      ? " Backend may have returned HTML (check backend is running and proxy points to the right port)."
      : ` Response preview: "${preview}${text.length > 80 ? "…" : ""}"`;
    throw new Error("Invalid response from server (expected JSON)." + hint);
  }
}
