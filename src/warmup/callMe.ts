import { CallMeChallenge__factory } from '../../types/ethers-contracts';
import { handleError, getWallet } from '../utils';

const CONTRACT_ADDRESS = '0xC19DdB67729B971914c39251Cdbb86A7e0995C65';

const main = async () => {
  const wallet = getWallet();

  const callMe = CallMeChallenge__factory.connect(CONTRACT_ADDRESS, wallet);
  const result = await callMe.callme().catch(handleError);

  console.log(result);
};

main().catch(handleError);
