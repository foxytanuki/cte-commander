import { ethers, Wallet } from 'ethers';
const { RPC_HOST, PRIVATE_KEY } = process.env;

const getWallet = (): Wallet => {
  if (RPC_HOST === undefined || PRIVATE_KEY === undefined)
    throw new Error(
      "Enviroment variables to create 'Wallet' are insufficient."
    );

  const provider = new ethers.providers.JsonRpcProvider(RPC_HOST);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  return wallet;
};

export default getWallet;
