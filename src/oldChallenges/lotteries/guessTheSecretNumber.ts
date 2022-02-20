import { utils, PayableOverrides } from 'ethers';
import { isBytesLike } from 'ethers/lib/utils';
import { GuessTheSecretNumberChallenge__factory } from '../../../types/ethers-contracts';
import { handleError, getWallet } from '../../utils';

const CONTRACT_ADDRESS = '0xb47ac018996551Ad434043C2AE01Cc66689d6612';

const searchAns = () => {
  const ansHash =
    '0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365';
  for (let i = 0; i < 256; i++) {
    const hex = utils.hexlify(i);
    const hash = utils.keccak256(hex);
    if (hash === ansHash) {
      console.log(i);
      return i;
    }
  }
  throw new Error('Could not find answer.');
};

const main = async () => {
  const wallet = getWallet();

  const guesser = GuessTheSecretNumberChallenge__factory.connect(
    CONTRACT_ADDRESS,
    wallet
  );

  const ans = searchAns();
  const overrides: PayableOverrides = {
    value: utils.parseEther('1'),
    gasLimit: '50000',
  };

  const result = await guesser.guess(ans, overrides);

  console.log(result);
};

main().catch(handleError);
