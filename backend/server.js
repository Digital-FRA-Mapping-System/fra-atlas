import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Claim from "./models/Claim.js"; // ⚠️ .js extension required
import Beneficiary from "./models/Beneficiary.js"; 
import Settings from "./models/Settings.js"; 
const app = express();
app.use(cors());
app.use(express.json());

// ✅ CONNECT MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/fra_system")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));


// ========================
// GET ALL CLAIMS
// ========================
app.get("/claims", async (req, res) => {
  const claims = await Claim.find();
  res.json(claims);
});


// ========================
// ADD CLAIM
// ========================
app.post("/claims", async (req, res) => {
  const data = req.body;

  let suggestions = [];

  if (data.land_data?.water < 10) {
    suggestions.push("Provide irrigation scheme");
  }

  if (data.land_data?.crops < 20) {
    suggestions.push("Provide agriculture subsidy");
  }

  const claim = new Claim({
    ...data,
    suggestions
  });

  await claim.save();
  res.json(claim);
});


// ========================
// UPDATE STATUS
// ========================
app.put("/claims/:id", async (req, res) => {
  const { status, reason } = req.body;

  const updated = await Claim.findByIdAndUpdate(
    req.params.id,
    { status, reason },
    { new: true }
  );

  res.json(updated);
});
app.get("/beneficiaries", async (req, res) => {
    const data = await Beneficiary.find();
    res.json(data);
  });
  app.post("/beneficiaries", async (req, res) => {
    try {
      const b = new Beneficiary(req.body);
      await b.save();
      res.json(b);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  // ========================
// ANALYTICS API
// ========================
app.get("/analytics", async (req, res) => {
    try {
      // ✅ STATUS COUNT
      const statusData = await Claim.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ]);
  
      // ✅ LAND AVERAGE
      const landData = await Claim.aggregate([
        {
          $group: {
            _id: null,
            avgWater: { $avg: "$land_data.water" },
            avgCrops: { $avg: "$land_data.crops" },
            avgTrees: { $avg: "$land_data.trees" }
          }
        }
      ]);
  
      // ✅ TOTAL CLAIMS
      const total = await Claim.countDocuments();
  
      res.json({
        total,
        status: statusData,
        land: landData[0] || {}
      });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/upload-gee", async (req, res) => {
    const data = JSON.parse(fs.readFileSync("fra_plot.geojson"));
  
    for (const f of data.features) {
      const groups = f.properties.assets;
  
      const claim = new Claim({
        claim_id: f.properties.plot_id,
        village: f.properties.village,
  
        land_data: {
          water: extract(groups, 0),
          trees: extract(groups, 1),
          crops: extract(groups, 4)
        },
  
        status: "Pending"
      });
  
      await claim.save();
    }
  
    res.json({ message: "Stored successfully" });
  });
  app.get("/settings", async (req, res) => {
    let settings = await Settings.findOne();
  
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
  
    res.json(settings);
  });
  app.put("/settings", async (req, res) => {
    const { waterThreshold, cropsThreshold } = req.body;
  
    let settings = await Settings.findOne();
  
    if (!settings) {
      settings = new Settings();
    }
  
    settings.waterThreshold = waterThreshold;
    settings.cropsThreshold = cropsThreshold;
    settings.updatedAt = new Date();
  
    await settings.save();
  
    res.json(settings);
  });

app.listen(5000, () => console.log("🚀 Server running on 5000"));