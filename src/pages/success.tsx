import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";

// import { Container } from './styles';

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

const Success = ({ customerName, product }: SuccessProps) => {
  return (
    <SuccessContainer>
      <h1>Compra Efetuada</h1>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={50} height={140} />
      </ImageContainer>
      <p>
        Showw <strong>{customerName}</strong>, sua compra foi efetuada com
        sucesso e esta a caminho da sua casa!
      </p>
      <Link href="/">Voltar ao catalogo</Link>
    </SuccessContainer>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id);
 

  const response = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", 'line_items.data.price.product'],
  });



  const customerName = response.customer_details!.name;
  const product = response.line_items!.data[0].price!.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
