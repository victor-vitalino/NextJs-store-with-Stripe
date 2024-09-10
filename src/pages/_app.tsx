// pages/_app.tsx
import Header from "@/components/Header";
import { globalStyles } from "@/styles/global";
import { Container } from "@/styles/pages/app";
import type { AppProps } from "next/app";

// Executa os estilos globais para todas as páginas no diretório pages/
globalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
