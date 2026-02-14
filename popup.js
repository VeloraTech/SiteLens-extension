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
                  results.innerHTML = renderResults(response2.results);
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
        results.innerHTML = renderResults(response.results);
      } else {
        results.innerHTML = `<div class="no-h1-message">Unable to scan this page.</div>`;
      }
      // Render all rule results in a list format
      function renderResults(resultsArr) {
        if (!Array.isArray(resultsArr) || resultsArr.length === 0) {
          return `<div class="no-h1-message">No scan results found.</div>`;
        }
        return (
          `<ul>` +
          resultsArr
            .map((rule) => {
              let detailHtml = "";
              if (rule.details && rule.details.length > 0) {
                detailHtml =
                  `<ul>` +
                  rule.details.map((d) => `<li>${d}</li>`).join("") +
                  `</ul>`;
              }
              let statusIcon = rule.status === "ok" ? "✅" : "❌";
              return `<li><strong>${statusIcon} ${rule.rule}</strong>${detailHtml}</li>`;
            })
            .join("") +
          `</ul>`
        );
      }
    },
  );
});
