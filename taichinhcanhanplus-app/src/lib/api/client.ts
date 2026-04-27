import { getFirebaseAuth } from "@/lib/firebase/client";

export async function getAuthHeaders() {
  const user = getFirebaseAuth().currentUser;

  if (!user) {
    throw new Error("Bạn cần đăng nhập để thực hiện thao tác này.");
  }

  const token = await user.getIdToken();

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
export async function apiFetch<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T>;
export async function apiFetch<T>(input: RequestInfo | URL, init: RequestInit = {}) {
  const authHeaders = await getAuthHeaders();
  const headers = new Headers(init.headers);

  for (const [key, value] of Object.entries(authHeaders)) {
    headers.set(key, value);
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  const isJsonResponse = response.headers.get("content-type")?.includes("application/json");
  if (isJsonResponse) {
    return response.json() as Promise<T>;
  }

  return response;
}
