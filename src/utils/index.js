export const splitAddress = (address, start = 5, end = -4) => {
  return (
    (address && address.slice(0, start) + "..." + address.slice(end)) || ""
  );
};
