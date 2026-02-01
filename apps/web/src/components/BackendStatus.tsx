import { useState, useEffect } from 'react';
import { checkBackendHealth } from '../utils/healthCheck';

export function BackendStatus() {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    let intervalId: number;

    const check = async () => {
      const healthy = await checkBackendHealth();
      if (mounted) {
        setIsHealthy(healthy);
        setChecking(false);
      }
    };

    check();
    
    // Check every 10 seconds
    intervalId = window.setInterval(check, 10000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  if (checking) {
    return null; // Don't show anything while initial check
  }

  if (isHealthy) {
    return null; // Don't show anything if backend is healthy
  }

  return (
    <div style={{
      background: '#e74c3c',
      color: 'white',
      padding: '1rem',
      textAlign: 'center',
      fontWeight: 'bold',
    }}>
      ⚠️ Backend API is not responding. Please ensure the API server is running on port 3001.
      <br />
      <small>Run: <code>cd apps/api && npm run dev</code></small>
    </div>
  );
}
