import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  PoductDetails,
  ProductContainer,
} from "@/styles/pages/product";
import { styled } from "@stitches/react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Stripe from "stripe";

// import { Container } from './styles';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    url: string;
    price: string;
    description: string;
  };
}

const ProductItemDetail = ({ product }: ProductProps) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <img src={product?.imageUrl} alt="" />
      </ImageContainer>
      <PoductDetails>
        <h1>Guitarra B</h1>
        <span>R$ 59.99</span>
        <p>{product?.description}</p>
        <button>Comprar agora</button>
      </PoductDetails>
    </ProductContainer>
  );
};

export default ProductItemDetail;

const ONE_HOUR = 60 * 60;

export const getStaticPaths: GetStaticPaths = async () => {
  /**
   * fallback:false = apenas gera as pagina pre geradas
   * fallback:true = gera a prop loading, e o dev pode gerar uma pagina de carregamento ate baixar a s informações
   * fallback:blocking = espera carregar tudo para depois exibir
   */

  return {
    paths: [{ params: { id: "" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  let productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        url: product.url,
        price: new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
      },
    },
    revalidate: ONE_HOUR * 1,
  };
};
