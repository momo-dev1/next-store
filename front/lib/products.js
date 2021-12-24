import { fetchJson } from "./api";

const CMS_URL = "http://localhost:1337/products";
const URL = "http://localhost:1337";

function stripProduct(product) {
  return {
    id: product.id,
    title: product.title,
    desc: product.description,
    price: product.price,
    imageSrc: URL + product.img[0].url,
  };
}

export async function getProduct(id) {
  const product = await fetchJson(`${CMS_URL}/${id}`);

  return stripProduct(product);
}

export async function getProducts() {
  const products = await fetchJson(CMS_URL);

  return products.map(stripProduct);
}
