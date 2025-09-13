const express = require("express");
const { db } = require("../config/firebase");
const { fetchMetadata, processContent } = require("../services/linkParser");

const router = express.Router();

router.post("/add", async (req, res) => {
  const { url, userId } = req.body;

  try {
    const { title, description, favicon } = await fetchMetadata(url);
    const { summary, category, keywords } = await processContent(description || title);

    const docRef = await db.collection("links").add({
      url,
      userId,
      createdAt: new Date(),
      title,
      description,
      favicon,
      summary,
      category,
      keywords,
    });

    res.json({ id: docRef.id, url, title, summary, category, keywords });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add link" });
  }
});

module.exports = router;
