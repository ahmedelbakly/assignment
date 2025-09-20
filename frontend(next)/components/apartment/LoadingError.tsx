"use client";

export function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Loading apartments...</div>
    </div>
  );
}

export function ErrorState({ error }: { error: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 text-lg">{error}</div>
    </div>
  );
}
