import { utils, ethers } from "ethers";
import { CallMeChallenge__factory } from "../../types/ethers-contracts";
import handleError from "../utils/errorHandler";

const { RPC_HOST, PRIVATE_KEY } = process.env;
const CONTRACT_ADDRESS = "0xC19DdB67729B971914c39251Cdbb86A7e0995C65";

const main = async () => {
  if (RPC_HOST === undefined || PRIVATE_KEY === undefined) return;

  const provider = new ethers.providers.JsonRpcProvider(RPC_HOST);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const callMe = CallMeChallenge__factory.connect(CONTRACT_ADDRESS, wallet);
  const result = await callMe.callme().catch(handleError);

  console.log(result);
};

main().catch(handleError);
