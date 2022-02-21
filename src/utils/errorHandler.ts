const handleError = (e: unknown) => {
  console.error(e);
  process.exit(1);
};

export { handleError };
