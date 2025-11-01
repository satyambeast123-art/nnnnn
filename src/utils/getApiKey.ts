export function getApiKeyFromRuntime() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("key");
}
