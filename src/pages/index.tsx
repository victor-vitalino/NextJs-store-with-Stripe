import React from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { HomeContainer, ProductItem } from "@/styles/pages/home";

import { useKeenSlider } from "keen-slider/react";

import guitar1 from "@/assets/guitars/1.png";
import guitar2 from "@/assets/guitars/2.png";
import guitar3 from "@/assets/guitars/3.png";

import "keen-slider/keen-slider.min.css";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

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

const Home: React.FC = ({ products }: HomeProps) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((i) => (
        <ProductItem key={i.id} className="keen-slider__slide">
          <Image
            src={i.imageUrl}
            height={550}
            width={250}
            style={{ objectFit: "contain" }}
            alt=""
          />
          <footer>
            <strong>{i.name}</strong>
            <span>R$ {i.price}</span>
          </footer>
        </ProductItem>
      ))}
    </HomeContainer>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
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
      price: price.unit_amount / 100,
    };
  });
  return {
    props: { products },
  };
};
