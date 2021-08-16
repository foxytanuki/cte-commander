const handleError = (e: Error) => {
  console.error(e);
  process.exit(1);
};

export default handleError;
