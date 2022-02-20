import { utils } from 'ethers';
import { CaptureTheEther__factory } from '../../../types/ethers-contracts';
import { handleError, getWallet } from '../../utils';

const CONTRACT_ADDRESS = '0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee';

const main = async () => {
  const wallet = getWallet();

  const nickname = 'foxyTanuki';
  const nicknameBytes32 = utils.formatBytes32String(nickname);

  const cte = CaptureTheEther__factory.connect(CONTRACT_ADDRESS, wallet);
  const result = await cte.setNickname(nicknameBytes32).catch(handleError);

  console.log(result);
};

main().catch(handleError);
