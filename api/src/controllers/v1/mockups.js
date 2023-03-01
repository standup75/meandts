const Mockup = require("src/models/mockup");
const base = require("./base");
const fetch = require('node-fetch');

module.exports = base(Mockup, {
  async index(req, res) {
    const find = {};
    if (!req.query.all) {
      find.published = true;
    }
    res.status(200).json({ mockups: await Mockup.find(find).exec() });
  },
  async refresh(req, res) {
    let smartmockups = await fetch(
      `https://public-api.smartmockups.com/v1/mockups`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.SMARTMOCKUP_API_KEY,
        },
      }
    );
    smartmockups = await smartmockups.json();
    smartmockups = smartmockups.filter((m) =>
      Mockup.categories.includes(m.category)
    );
    let mockups = await Mockup.find();
    let mockupRemoved = 0;
    let mockupAdded = 0;

    // Delete mockups
    const smartmockupsUrls = smartmockups.map((s) => s.thumb);
    for (const mockup of mockups) {
      if (!smartmockupsUrls.includes(mockup.url)) {
        mockupRemoved++;
        await mockup.remove();
      }
    }

    // Add mockups
    const mockupUrls = mockups.map((m) => m.url);
    for (const smartmockup of smartmockups) {
      if (!mockupUrls.includes(smartmockup.thumb)) {
        mockupAdded++;
        await Mockup.create({
          smartMockupId: smartmockup.id,
          url: smartmockup.thumb,
          height: smartmockup.image_width,
          width: smartmockup.image_height,
          category: smartmockup.category,
        });
      }
    }
    res.status(201).json({
      removed: mockupRemoved,
      added: mockupAdded,
    });
  },
});
