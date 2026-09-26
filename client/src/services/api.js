/**
 * API service for Smart Expense Manager
 */

export const fetchHealthStatus = async () => {
  const startTime = performance.now();
  try {
    const res = await fetch('/api/health');
    const latency = Math.round(performance.now() - startTime);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return {
      connected: true,
      data,
      latency,
      statusCode: res.status,
      timestamp: new Date().toLocaleTimeString(),
    };
  } catch (error) {
    const latency = Math.round(performance.now() - startTime);
    return {
      connected: false,
      error: error.message,
      latency,
      statusCode: null,
      timestamp: new Date().toLocaleTimeString(),
    };
  }
};
