import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { HomeContainer, ProductItem } from "@/styles/pages/home";

import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Link from "next/link";

// import { Container } from './styles';

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    url: string;
    price: number;
  }[];
}

const Home = ({ products }: HomeProps) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products?.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
          <ProductItem className="keen-slider__slide">
            <Image
              src={product.imageUrl}
              height={550}
              width={250}
              style={{ objectFit: "contain" }}
              alt=""
            />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </ProductItem>
        </Link>
      ))}
    </HomeContainer>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      url: product.url,
      price: new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
    };
  });

  const oneHour = 60 * 60;

  return {
    props: { products },
    revalidate: oneHour * 2,
  };
};
