const formatCurrency = (() => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (value: number) => formatter.format(value);
})();

export { formatCurrency };
