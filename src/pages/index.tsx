import React from "react";
import Image from "next/image";
import { HomeContainer, ProductItem } from "@/styles/pages/home";

import guitar1 from "@/assets/guitars/1.png";
import guitar2 from "@/assets/guitars/2.png";

// import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <ProductItem>
        <Image src={guitar1} height={550}  alt="" />
        <footer>
          <strong>Guitarra X</strong>
          <span>R$ 79,99</span>
        </footer>
      </ProductItem>
      <ProductItem>
        <Image src={guitar2} height={550}  alt="" />
        <footer>
          <strong>Guitarra X</strong>
          <span>R$ 79,99</span>
        </footer>
      </ProductItem>
    </HomeContainer>
  );
};

export default Home;
