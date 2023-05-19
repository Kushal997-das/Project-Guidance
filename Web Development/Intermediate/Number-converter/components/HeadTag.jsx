import Head from "next/head";

const HeadTag = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Free Number Converter" />
      <meta
        name="keywords"
        content="binary to decimal, decimal to binary, octal to decimal, decimal to octal"
      />
      <meta name="author" content="Ukhang" />
      <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
      <title> Number Converter </title>
    </Head>
  );
};

export default HeadTag;
