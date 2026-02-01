/**
 * Check if the backend API is available
 * @returns Promise<boolean> - true if backend is healthy, false otherwise
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch('/api/health', {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Wait for backend to become available
 * @param maxAttempts - Maximum number of retry attempts (default: 5)
 * @param delayMs - Delay between attempts in milliseconds (default: 2000)
 * @returns Promise<boolean> - true if backend becomes available, false if timeout
 */
export async function waitForBackend(
  maxAttempts: number = 5,
  delayMs: number = 2000
): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    const isHealthy = await checkBackendHealth();
    if (isHealthy) {
      return true;
    }
    if (i < maxAttempts - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  return false;
}
