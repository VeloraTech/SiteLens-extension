// Basic rules engine
function runRules() {
  const results = [];

  // Rule: H1 tags
  const h1s = Array.from(document.querySelectorAll("h1")).map((h1) =>
    h1.textContent.trim(),
  );
  if (h1s.length > 0) {
    results.push({
      rule: "H1 Tags",
      status: "ok",
      details: h1s,
    });
  } else {
    results.push({
      rule: "H1 Tags",
      status: "missing",
      details: [],
    });
  }

  // Rule: Meta description
  const metaDesc = document.querySelector("meta[name='description']");
  if (metaDesc && metaDesc.content.trim().length > 0) {
    results.push({
      rule: "Meta Description",
      status: "ok",
      details: [metaDesc.content.trim()],
    });
  } else {
    results.push({
      rule: "Meta Description",
      status: "missing",
      details: [],
    });
  }

  // Rule: Viewport meta
  const viewportMeta = document.querySelector("meta[name='viewport']");
  if (viewportMeta) {
    results.push({
      rule: "Viewport Meta",
      status: "ok",
      details: [viewportMeta.getAttribute("content") || ""],
    });
  } else {
    results.push({
      rule: "Viewport Meta",
      status: "missing",
      details: [],
    });
  }

  return results;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scan-h1") {
    const results = runRules();
    sendResponse({ results });
  }
  return false;
});
