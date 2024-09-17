import {
  ImageContainer,
  PoductDetails,
  ProductContainer,
} from "@/styles/pages/product";
import { styled } from "@stitches/react";
import { useRouter } from "next/router";
import React from "react";

// import { Container } from './styles';

const ProductItemDetail: React.FC = () => {
  const { query } = useRouter();
  let { id } = query;
  return (
    <ProductContainer>
      <ImageContainer>
        <img />
      </ImageContainer>
      <PoductDetails>
        <h1>Guitarra B</h1>
        <span>R$ 59.99</span>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
          nihil nemo repellat inventore quis mollitia architecto, perferendis
          enim alias cupiditate ullam deserunt tenetur eius, iste numquam iure
          libero ab placeat.
        </p>
        <button>Comprar agora</button>
      </PoductDetails>
    </ProductContainer>
  );
};

export default ProductItemDetail;
