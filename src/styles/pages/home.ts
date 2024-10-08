import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  // gap: "3rem",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",
  minHeight: 656,
});

export const ProductItem = styled("span", {
  display: "flex",
  background: "linear-gradient(180deg,#097179 0%, #000 100%)",
  borderRadius: 8,
  // padding: "0.25rem",
  cursor: "pointer",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  width: 520,
  color:'$gray100',

  img: {
    objectFit: "cover",
  },
  footer: {
    padding: "1rem",
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",

    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "rgba(0,0,0,0.6)",

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",
    overflow: "hidden",

    strong: {
      fontSize: "$lg",
    },
    span: {
      fontSize: "$xl",
      fontWeight: "bold",
      color: "$green300",
    },
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: "1",
    },
  },
});
