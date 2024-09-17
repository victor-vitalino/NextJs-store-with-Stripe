import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  PoductDetails,
  ProductContainer,
} from "@/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
    defaultPriceId: string;
  };
}

const ProductItemDetail = ({ product }: ProductProps) => {
  const [creatingCheckout, setCreatingCheckout] = useState(false);
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  const handleBuyProduct = async () => {
    try {
      setCreatingCheckout(true);
      const response = await axios.post(`/api/checkout`, {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (error) {
      setCreatingCheckout(false);
      alert("Falha ao ir para checkout");
    }
  };

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product?.imageUrl} alt="" priority width={226} height={656} objectFit="cover"/>
      </ImageContainer>
      <PoductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product?.description}</p>
        <button disabled={creatingCheckout} onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </PoductDetails>
    </ProductContainer>
  );
};

export default ProductItemDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  /**
   * fallback:false = apenas gera as pagina pre geradas
   * fallback:true = gera a prop loading, e o dev pode gerar uma pagina de carregamento ate baixar a s informações
   * fallback:blocking = espera carregar tudo para depois exibir
   */

  return {
    paths: [],
    fallback: true,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  console.log("product", product);

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        url: product.url,
        defaultPriceId: price.id,
        price: new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
      },
    },
  };
};
