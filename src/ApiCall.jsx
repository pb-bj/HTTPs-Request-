import React, { useEffect, useState } from 'react'

const ApiCall = () => {
  const [ products, setProducts ] = useState([]);
  const [ loadingState, setLoadingState ] = useState(false);

  useEffect(() => {
    setLoadingState(true);
    const getAllProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/product');
          if(!response.ok) throw Error('Did not find the products');
        const data = await response.json();
  
          if( data && data.products && data.products.length > 0) {
            setTimeout(() => {  // setTime out just for the waiting scenario
              setProducts(data.products);
              setLoadingState(false)
            }, 3000)
          }
      } catch(err) {
        console.log(err.message);
      }
    }
    getAllProducts();
  }, [])

  if(loadingState) {
    return <p>Loading... Please wait</p>
  }


  return (
    <div style={{
        // display: 'flex',  
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // gap: '15px',
        // margin: '0 auto',
        // maxWidth: '1200px',
        // width: '100%'
    }}>
      { products && products.length > 0 ? (
        products.map((product) => {
          const { id, title, description, images, price} = product;
          return (
          <div key={id}>
              <div>
              <img src={images[1]} alt="" width={90} />
              </div>
              <div>{title}</div>
              <div>{price}</div>
              <p>{ description}</p>
          </div>

          )
        })
      ) : null}
    </div>
  )
}

export default ApiCall