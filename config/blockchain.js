const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const { FABRIC_CONNECTION_PROFILE, WALLET_PATH } = require('./keys');

const getBlockchainGateway = async () => {
  try {
    const ccpPath = path.resolve(__dirname, FABRIC_CONNECTION_PROFILE);
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    const wallet = await Wallets.newFileSystemWallet(WALLET_PATH);

    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: 'admin',
      discovery: { enabled: true, asLocalhost: true },
    });

    return gateway;
  } catch (err) {
    console.error('Error connecting to blockchain:', err);
    throw err;
  }
};

module.exports = { getBlockchainGateway };