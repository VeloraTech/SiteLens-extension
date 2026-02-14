chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scan-h1") {
    const h1s = Array.from(document.querySelectorAll("h1")).map((h1) =>
      h1.textContent.trim(),
    );
    sendResponse({ h1s });
  }
  // Return true to indicate async response if needed (not needed here)
  return false;
});
