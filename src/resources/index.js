import getProductsWithImages from "../utils/getProductsWithImages";

export default async () => {
  const products = await fetch("./data/products.json").then((response) =>
    response.json()
  );

  return getProductsWithImages(products);
};
