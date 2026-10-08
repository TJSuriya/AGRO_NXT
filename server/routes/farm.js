const express = require('express');
const Farm = require('../models/Farm');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create farm
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { farmName, location, landSize, soilPH, nitrogen, phosphorus, potassium, moisture } = req.body;

    // Validate required fields
    if (!farmName || !location) {
      return res.status(400).json({ error: 'Farm Name and Location are required' });
    }

    // Convert numeric fields if provided
    const farmData = {
      userId: req.userId,
      farmName,
      location,
    };

    if (landSize !== undefined) farmData.landSize = parseFloat(landSize);
    if (soilPH !== undefined) farmData.soilPH = parseFloat(soilPH);
    if (nitrogen !== undefined) farmData.nitrogen = parseFloat(nitrogen);
    if (phosphorus !== undefined) farmData.phosphorus = parseFloat(phosphorus);
    if (potassium !== undefined) farmData.potassium = parseFloat(potassium);
    if (moisture !== undefined) farmData.moisture = parseFloat(moisture);

    // Validate numeric values
    Object.entries(farmData).forEach(([key, value]) => {
      if (typeof value === 'number' && isNaN(value)) {
        throw new Error(`Invalid value for ${key}`);
      }
    });

    const farm = new Farm(farmData);
    await farm.save();

    res.status(201).json({
      message: 'Farm created successfully',
      farm,
    });
  } catch (error) {
    console.error('Farm creation error:', error);
    res.status(500).json({ error: error.message || 'Failed to create farm' });
  }
});

// Get all farms for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.userId });
    res.json(farms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single farm
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const farm = await Farm.findOne({ _id: req.params.id, userId: req.userId });
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }
    res.json(farm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update farm
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const farm = await Farm.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }
    res.json({
      message: 'Farm updated successfully',
      farm,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete farm
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const farm = await Farm.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }
    res.json({ message: 'Farm deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add crop to history
router.post('/:id/crop-history', authMiddleware, async (req, res) => {
  try {
    const { cropName, season, yield: yieldAmount } = req.body;
    const farm = await Farm.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      {
        $push: {
          cropHistory: {
            cropName,
            season,
            yield: yieldAmount,
            date: new Date(),
          },
        },
      },
      { new: true }
    );
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }
    res.json({
      message: 'Crop added to history',
      farm,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
