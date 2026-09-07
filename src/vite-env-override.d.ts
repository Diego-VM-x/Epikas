interface Window {
  plausible?: (event: string, options?: { u?: string; props?: Record<string, string | number> }) => void;
}
