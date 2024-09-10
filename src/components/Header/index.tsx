import React from "react";
import logo from "@/assets/guitarra-eletrica.svg";
import { MyHeader } from "./styles";
import Image from "next/image";

const Header: React.FC = () => {
  console.log(logo);
  return (
    <>
      <MyHeader>
        <div>
          <Image src={logo} alt="" style={{ height: 52, width: 100 }} />
          <h3>Guitar Shop</h3>
        </div>
      </MyHeader>
    </>
  );
};

export default Header;
