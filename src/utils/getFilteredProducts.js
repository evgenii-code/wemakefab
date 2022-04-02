export default (products, filters) =>
  products
    .filter((product) =>
      product.name.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter(
      (product) =>
        filters.category.toLowerCase() === "sneakers" ||
        product.categories.includes(filters.category.toLowerCase())
    )
    .filter(
      (product) =>
        filters.sale.toLowerCase() === "all" ||
        (filters.sale.toLowerCase() === "none" && !product.prices.old) ||
        (filters.sale.toLowerCase() === "best sales" && product.prices.old)
    )
    .sort((a, b) => {
      if (filters.sort.toLowerCase() === "price: low") {
        return a.prices.new - b.prices.new;
      }

      return b.prices.new - a.prices.new;
    });
