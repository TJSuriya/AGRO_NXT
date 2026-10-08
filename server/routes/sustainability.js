const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Calculate sustainability score
const calculateSustainabilityScore = (waterUsage, soilHealth, chemicalUsage) => {
  let score = 100;

  // Water usage scoring (ideal: 400-500mm per season)
  if (waterUsage < 300) score -= 5;
  else if (waterUsage > 600) score -= 15;

  // Soil health scoring
  if (soilHealth < 30) score -= 20;
  else if (soilHealth < 50) score -= 10;

  // Chemical usage scoring (lower is better)
  if (chemicalUsage > 100) score -= 25;
  else if (chemicalUsage > 50) score -= 15;

  return Math.max(score, 0);
};

// Get sustainability metrics
router.post('/calculate', authMiddleware, async (req, res) => {
  try {
    const { waterUsage, soilHealth, chemicalUsage, organicMatter, biodiversity } = req.body;

    // Convert to numbers and validate
    const numWaterUsage = parseFloat(waterUsage);
    const numSoilHealth = parseFloat(soilHealth);
    const numChemicalUsage = parseFloat(chemicalUsage);
    const numBiodiversity = parseFloat(biodiversity) || 70;

    if (isNaN(numWaterUsage) || isNaN(numSoilHealth) || isNaN(numChemicalUsage)) {
      return res.status(400).json({ error: 'Invalid input values. Please provide valid numbers.' });
    }

    const waterScore = Math.min((numWaterUsage / 500) * 100, 100);
    const soilScore = numSoilHealth || 65;
    const chemicalScore = Math.max(100 - (numChemicalUsage / 100) * 100, 0);
    const bioScore = numBiodiversity;

    const overallScore = calculateSustainabilityScore(numWaterUsage, numSoilHealth, numChemicalUsage);
    const carbonFootprint = Math.max(100 - (numWaterUsage / 6 + numChemicalUsage / 2 + (100 - numSoilHealth) / 2), 0);
    const ecoRating = overallScore > 80 ? 'Excellent' : overallScore > 60 ? 'Good' : overallScore > 40 ? 'Fair' : 'Poor';

    res.json({
      waterScore: waterScore.toFixed(1),
      soilScore: soilScore.toFixed(1),
      chemicalScore: chemicalScore.toFixed(1),
      biodiversityScore: bioScore.toFixed(1),
      overallSustainabilityScore: overallScore.toFixed(1),
      carbonFootprint: carbonFootprint.toFixed(1),
      ecoRating,
      recommendations: [
        waterScore < 60 ? 'Consider drip irrigation to reduce water usage' : '',
        soilScore < 50 ? 'Increase organic matter through composting' : '',
        chemicalScore < 50 ? 'Reduce chemical fertilizers, transition to organic' : '',
        bioScore < 60 ? 'Plant crop diversification patterns' : '',
      ].filter(Boolean),
    });
  } catch (error) {
    console.error('Sustainability calculation error:', error);
    res.status(500).json({ error: 'Failed to calculate sustainability. Please try again.' });
  }
});

// Get sustainability data
router.get('/', authMiddleware, async (req, res) => {
  try {
    const mockData = {
      waterUsage: 420,
      soilHealth: 72,
      chemicalUsage: 35,
      organicMatter: 3.2,
      biodiversity: 78,
      carbonEmissions: 2.5,
    };

    res.json(mockData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
