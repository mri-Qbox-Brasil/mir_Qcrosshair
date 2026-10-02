const resourceName =
  (window as any).GetParentResourceName?.() ?? 'level5_crosshair'

export async function fetchNui<T = any>(
  event: string,
  data?: Record<string, unknown>,
): Promise<T> {
  const resp = await fetch(`https://${resourceName}/${event}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data ?? {}),
  })
  return resp.json() as T
}

export function isEnvBrowser(): boolean {
  return !(window as any).GetParentResourceName
}
