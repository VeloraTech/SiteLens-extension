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
                if (response2 && response2.h1s && response2.h1s.length > 0) {
                  results.innerHTML =
                    `<ul>` +
                    response2.h1s.map((h1) => `<li>${h1}</li>`).join("") +
                    `</ul>`;
                } else {
                  results.innerHTML = `<div class="no-h1-message">No H1 tags found on this page.</div>`;
                }
              },
            );
          },
        );
        return;
      }
      spinner.style.display = "none";
      if (response && response.h1s && response.h1s.length > 0) {
        results.innerHTML =
          `<ul>` +
          response.h1s.map((h1) => `<li>${h1}</li>`).join("") +
          `</ul>`;
      } else {
        results.innerHTML = `<div class="no-h1-message">No H1 tags found on this page.</div>`;
      }
    },
  );
});
