const fetch = require("node-fetch");
const cheerio = require("cheerio");
require("dotenv").config();

const HF_API_KEY = process.env.HF_API_KEY;

// fetch page metadata with short description
async function fetchMetadata(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    // Title
    const title =
      $("title").text() || $("h1").first().text() || "Untitled Link";

    // Description (prefer meta, fallback to first <p>)
    let description =
      $('meta[name="description"]').attr("content") ||
      $("p").first().text() ||
      "";

    // Shorten description (30 words max)
    if (description) {
      const words = description.split(/\s+/).slice(0, 30);
      description = words.join(" ") + (words.length >= 30 ? "..." : "");
    } else {
      description = "No description available";
    }

    // Favicon
    const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;

    return { title, description, favicon };
  } catch (err) {
    console.error("Metadata error:", err);
    return { title: "Untitled Link", description: "No description available", favicon: "" };
  }
}

// Hugging Face call
async function hfCall(model, inputs, parameters = {}) {
  const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs, parameters }),
  });
  return await res.json();
}

// generate summary, category, keywords
async function processContent(text) {
  const summaryData = await hfCall("facebook/bart-large-cnn", text);
  const summary = summaryData[0]?.summary_text || "No summary";

  const categoryData = await hfCall("facebook/bart-large-mnli", text, {
    candidate_labels: [
      "Technology",
      "Education",
      "Health",
      "News",
      "Entertainment",
      "Business",
      "Research",
      "Other",
    ],
  });
  const category = categoryData.labels ? categoryData.labels[0] : "Other";

  const keywords = Array.from(new Set(text.split(/\s+/))).slice(0, 5);

  return { summary, category, keywords };
}

module.exports = { fetchMetadata, processContent };
