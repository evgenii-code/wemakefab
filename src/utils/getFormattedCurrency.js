export default ({ value = 0, currency = "USD", locale = "en" }) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
