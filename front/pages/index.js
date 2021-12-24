import Page from "../components/Page";
import ProductCard from "../components/ProductCard";

import { getProducts } from "../lib/products";

export default function Home({ products }) {
  return (
    <Page title="products">
      <div className="bg-white">
        <div className="max-w-2xl px-4 py-16 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 mt-6 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps(context) {
  const products = await getProducts();
  return {
    props: {
      products,
    }, // will be passed to the page component as props
    revalidate: 30, // will (ISR) every 10 sec   Regenerating
  };
}
