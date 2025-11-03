export function ApiDebugInfo() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black/80 text-white rounded-lg text-xs font-mono max-w-xs overflow-hidden">
      <div>API URL:</div>
      <div className="truncate">{process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'Not configured'}</div>
    </div>
  );
}