import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en">
    <Head>
      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      <link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Playfair+Display:wght@600;700&display=swap"
  rel="stylesheet"
/>

      
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </Head>

    <body>
      <div id="portal"></div>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;