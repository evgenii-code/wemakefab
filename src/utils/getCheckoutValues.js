import getFormattedCurrency from "./getFormattedCurrency";

export default (products) => {
  const initial = { subtotal: 0, sale: 0, total: 0 };

  const result = products.reduce((acc, product) => {
    acc.subtotal += product.prices.old ?? product.prices.new;
    acc.sale +=
      product.prices.old > product.prices.new
        ? product.prices.old - product.prices.new
        : 0;
    acc.total = acc.subtotal - acc.sale;

    return acc;
  }, initial);

  for (const key in result) {
    result[key] = getFormattedCurrency({ value: result[key] });
  }

  return result;
};
