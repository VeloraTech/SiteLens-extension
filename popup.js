document.getElementById("scanBtn").addEventListener("click", async () => {
  const spinner = document.getElementById("spinner");
  const results = document.getElementById("results");
  spinner.style.display = "flex";
  results.innerHTML = "";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(
    tab.id,
    { action: "scan-h1" },
    function handleResponse(response) {
      if (chrome.runtime.lastError) {
        // Try to inject content.js and retry
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: ["content.js"],
          },
          () => {
            // Retry sending the message after injection
            chrome.tabs.sendMessage(
              tab.id,
              { action: "scan-h1" },
              (response2) => {
                spinner.style.display = "none";
                if (chrome.runtime.lastError) {
                  results.innerHTML = `<div class="no-h1-message">Unable to scan this page.</div>`;
                  return;
                }
                if (response2 && response2.results) {
                  renderResults(response2.results, results);
                } else {
                  results.innerHTML = `<div class="no-h1-message">Unable to scan this page.</div>`;
                }
              },
            );
          },
        );
        return;
      }
      spinner.style.display = "none";
      if (response && response.results) {
        renderResults(response.results, results);
      } else {
        results.innerHTML = `<div class="no-h1-message">Unable to scan this page.</div>`;
      }
    },
  );
});

// Severity mapping for rules (customize as needed)
const SEVERITY = {
  "H1 Tags": "medium",
  "Meta Description": "high",
  "Viewport Meta": "high",
};

// Render all rule results as collapsible sections with severity
function renderResults(resultsArr, container) {
  if (!Array.isArray(resultsArr) || resultsArr.length === 0) {
    container.innerHTML = `<div class="no-h1-message">No scan results found.</div>`;
    return;
  }
  container.innerHTML = "";
  resultsArr.forEach((rule, idx) => {
    const section = document.createElement("div");
    section.className = `result-section severity-${SEVERITY[rule.rule] || "low"}`;

    // Collapsible header
    const header = document.createElement("button");
    header.className = "collapsible";
    header.setAttribute("aria-expanded", "false");
    header.innerHTML = `<span class="status-icon">${rule.status === "ok" ? "✅" : "❌"}</span> <span>${rule.rule}</span>`;

    // Collapsible content
    const content = document.createElement("div");
    content.className = "collapsible-content";
    if (rule.details && rule.details.length > 0) {
      content.innerHTML =
        `<ul>` + rule.details.map((d) => `<li>${d}</li>`).join("") + `</ul>`;
    } else {
      content.innerHTML = `<span class="no-details">No details available.</span>`;
    }

    // Animation: collapse/expand
    content.style.maxHeight = "0px";
    content.style.overflow = "hidden";
    content.style.transition = "max-height 0.3s cubic-bezier(0.4,0,0.2,1)";

    header.addEventListener("click", function () {
      const expanded = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", !expanded);
      if (!expanded) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = "0px";
      }
    });

    section.appendChild(header);
    section.appendChild(content);
    container.appendChild(section);
    // Animate in
    setTimeout(() => {
      section.classList.add("fade-in");
    }, 50 * idx);
  });
}
