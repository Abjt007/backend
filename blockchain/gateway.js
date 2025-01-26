const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const { FABRIC_CONNECTION_PROFILE, WALLET_PATH } = require('../config/keys');
const logger = require('../utils/logger');

const connectGateway = async (identity = 'admin') => {
  try {
    // Read the connection profile
    const ccpPath = path.resolve(__dirname, FABRIC_CONNECTION_PROFILE);
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    const wallet = await Wallets.newFileSystemWallet(WALLET_PATH);

    // Connect to Fabric Gateway
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity,
      discovery: { enabled: true, asLocalhost: true },
    });

    logger.logInfo('Connected to Fabric network successfully');
    return gateway;
  } catch (error) {
    logger.logError('Error while connecting to the Fabric network:', error);
    throw new Error('Failed to connect to the Fabric network');
  }
};

module.exports = { connectGateway };