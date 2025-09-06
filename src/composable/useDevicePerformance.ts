let devicePerformance: boolean | null = null

export function isLowEndDevice(): boolean {
  if (devicePerformance === null) devicePerformance = checkDevice()

  return devicePerformance
}

function checkDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false

  const memory = (navigator as any).deviceMemory || 4
  const cores = navigator.hardwareConcurrency || 4

  return memory < 4 || cores < 2
}
