const API_URL = "https://w43gpvjrx64bomxantai2m3ije0yiadj.lambda-url.ap-northeast-2.on.aws/";

export async function fetchExtensions(): Promise<string[]> {
  const res = await fetch(API_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch extensions: ${res.statusText}`);
  }

  const data: { extensions: string[] } = await res.json();
  return data.extensions;
}


export async function addExtension(ext: string): Promise<void> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "add",
      extension: ext,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to add extension: ${res.statusText}`);
  }
}

export async function removeExtension(ext: string): Promise<void> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "remove",
      extension: ext,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to remove extension: ${res.statusText}`);
  }
}