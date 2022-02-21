import { log } from './log';

const handleError = (e: unknown) => {
  log.error('Error:', e);
  process.exit(1);
};

export { handleError };
