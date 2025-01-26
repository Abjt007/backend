const BlockchainGateway = require('../blockchain/gateway');

// Add aid record to blockchain
exports.addAidRecord = async (req, res) => {
  try {
    const { aidData } = req.body;
    const transaction = await BlockchainGateway.addAidRecord(aidData);
    res.json({ message: 'Aid record added to blockchain', transaction });
  } catch (error) {
    res.status(500).json({ error: 'Error adding aid record to blockchain' });
  }
};

// Query aid record from blockchain
exports.queryAidRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await BlockchainGateway.queryAidRecord(id);
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: 'Error querying blockchain' });
  }
};

// Get blockchain events
exports.getBlockchainEvents = async (req, res) => {
  try {
    const events = await BlockchainGateway.getEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blockchain events' });
  }
};
