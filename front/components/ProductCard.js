import Link from "next/link";
import Image from "next/image";

function ProductCard(product) {
  const { id, imageSrc, price, title } = product;

  return (
    <div className="relative group">
      <div className="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 group-hover:opacity-75">
        <Image
          width={563}
          height={845}
          src={imageSrc}
          alt="asd"
          className="object-cover object-center w-full h-full lg:w-full lg:h-full"
        />
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <h3 className="text-sm text-gray-700 lg:max-w-xs">
            <Link href={`products/${id}`}>
              <a>
                <span aria-hidden="true" className="absolute inset-0" />
                {title}
              </a>
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">${price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
