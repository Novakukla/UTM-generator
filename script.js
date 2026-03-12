const form = document.getElementById("utm-form");
const resultBox = document.getElementById("result");
const outputUrl = document.getElementById("output-url");
const copyBtn = document.getElementById("copy-btn");
const errorMsg = document.getElementById("error-msg");

function normalizeValue(value) {
  return value.trim().replace(/\s+/g, "_").toLowerCase();
}

function buildUtmUrl(baseUrl, campaign, source, medium, content) {
  const parsed = new URL(baseUrl);

  if (campaign.trim()) {
    parsed.searchParams.set("utm_campaign", normalizeValue(campaign));
  }

  if (source.trim()) {
    parsed.searchParams.set("utm_source", normalizeValue(source));
  }

  if (medium.trim()) {
    parsed.searchParams.set("utm_medium", normalizeValue(medium));
  }

  if (content.trim()) {
    parsed.searchParams.set("utm_content", normalizeValue(content));
  }

  return parsed.toString();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMsg.textContent = "";

  const baseUrl = document.getElementById("base-url").value;
  const campaign = document.getElementById("campaign").value;
  const source = document.getElementById("source").value;
  const medium = document.getElementById("medium").value;
  const content = document.getElementById("content").value;

  if (!baseUrl) {
    resultBox.hidden = true;
    errorMsg.textContent = "Please enter a link.";
    return;
  }

  try {
    const generated = buildUtmUrl(baseUrl, campaign, source, medium, content);
    outputUrl.textContent = generated;
    resultBox.hidden = false;
  } catch (_error) {
    resultBox.hidden = true;
    errorMsg.textContent = "Please enter a valid URL that starts with http:// or https://.";
  }
});

copyBtn.addEventListener("click", async () => {
  const value = outputUrl.textContent;
  if (!value) {
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = "Copy Link";
    }, 1400);
  } catch (_error) {
    errorMsg.textContent = "Could not copy automatically. Please copy the link manually.";
  }
});
