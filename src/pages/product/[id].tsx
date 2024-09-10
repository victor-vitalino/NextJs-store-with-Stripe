import { useRouter } from "next/router";
import React from "react";

// import { Container } from './styles';

const ProductItemDetail: React.FC = () => {
  const { query } = useRouter();
  let { id } = query;
  return <div>meu id:{id}</div>;
};

export default ProductItemDetail;
