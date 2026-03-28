export async function getProducts(catId? : string) {

  const base =  `${process.env.NEXT_PUBLIC_BASE_URL}/products`;
  const url = catId ? `${base}?category[in]=${catId}` : base;

    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },

      },
    );
  
    const responseData = await response.json();
  
    return responseData;
  }