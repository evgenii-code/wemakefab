const getFilePath = (name, size = "@1x") => {
  return `./images/${name}${size}.jpg`;
};

export default (products = []) =>
  products.map((product) => ({
    ...product,
    images: {
      regular: getFilePath(product.image_name, "@1x"),
      large: getFilePath(product.image_name, "@2x"),
    },
  }));
