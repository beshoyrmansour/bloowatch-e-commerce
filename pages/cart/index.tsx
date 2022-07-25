import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ICartProduct } from '../../Models'
import { pages } from '../../Models/consts'
import styles from './Cart.module.css'
import { BaseURL, EndPoints } from '../api/EndPoints'
import { useMemo, useState } from 'react'
import ProductQuantityControls from '../../components/ProductQuantityControls'

type Props = {
  pageName: string;
  products: ICartProduct[];
}
const Cart: NextPage<Props> = (props) => {
  const { products } = props;
  const [productsList, setproductsList] = useState(products)
  const [shippingFees, setShippingFees] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDeleteProduct = (productId: string) => {
    setIsLoading(true)

    fetch(`${BaseURL}${EndPoints.cart}/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => {
      if (data.status === 200) {
        setproductsList(productsList.filter(product => product.id !== productId))
        setIsLoading(false)
      }
    })
  }
  const totalProductsPrice = useMemo(() => {
    return productsList && productsList.length > 0 ? productsList.reduce((acc, product) => acc + (product.price * product.quantity), 0) : 0
  }, [productsList])


  const handleUpdateProductQuantity: (productId: string, newValue: number) => void = (productId, newValue) => {
    // setIsLoading(true)
    fetch(`${BaseURL}${EndPoints.cart}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: newValue })
    }).then(data => {
      if (data.status === 200) {
        setproductsList(productsList.map(product => product.id === productId ? { ...product, quantity: newValue } : product));
        setIsLoading(false)
      }
    }).catch(err => {
      console.log({ err });
      setIsLoading(false)
      setError(err.message)
      setIsLoading(false);
    })
  }

  const handleApplyCoupon = () => {
    alert('Apply Coupon')

  }
  const handleupdateCart = () => {
    setIsLoading(true);
    fetch(`${BaseURL}${EndPoints.cart}`).then(data => {
      console.log({ data });
      if (data.status === 200) {
        return data.json();
      }
    }).catch(err => {
      console.log({ err });
      setError(err.message)
      setIsLoading(false);
    }).then(data => {
      console.log({ data });
      setproductsList(data)
      setIsLoading(false);
    })

  }

  const handleCheckout = () => {
    alert('Checkout')
  }

  return (
    <>
      <Head>
        <title>Cart Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mb-5">
        <div className="row">
          <div className="col-12 col-md-12">
            {error && <div className="alert alert-danger" role="alert">
              {error}
            </div>}
            {isLoading ?
              <div className='d-flex justify-content-center align-items-center pt-5 w-100'>
                <h2 className='pt-5 text-muted h1 text-uppercase'>
                  <div className="spinner-border me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Loading...</h2>
              </div>
              :
              <div className="col-12">
                {productsList && productsList.length > 0 ?
                  <>
                    <table className="table table-responsive table-borderless align-middle">
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col" className='text-uppercase pb-3'>Products</th>
                          <th scope="col" className='text-uppercase pb-3'>Price</th>
                          <th scope="col" className='text-uppercase pb-3'>Quantity</th>
                          <th scope="col" className='text-uppercase pb-3'>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productsList && productsList.length > 0 && productsList.map((product) => (
                          <tr key={product.id}>
                            <th scope="row">
                              <button type="button" className="btn-close my-2" aria-label="Close"
                                onClick={() => handleDeleteProduct(product.id)}></button>
                            </th>
                            <td>{product.name}</td>
                            <td className={styles.price}>{product.price}</td>
                            {/* {product.quantity} */}
                            <td>
                              <div className={styles.QuantityControls}>
                                <ProductQuantityControls quantity={product.quantity}
                                  minValue={1}
                                  onChange={(newValue) => handleUpdateProductQuantity(product.id, newValue)} />
                              </div>
                            </td>
                            <td className={styles.price}>{product.price * product.quantity}</td>
                          </tr>
                        ))}
                        <tr >
                          <td></td>
                          <td colSpan={3} className={styles.total}>
                            <button disabled={isLoading} className={styles.btnColor} onClick={handleApplyCoupon}>Apply Coupon</button>
                            <button disabled={isLoading} className={`${styles.btnColor} ms-md-4`} onClick={handleupdateCart}>Update Cart</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="pt-4">
                      <hr />
                    </div>
                  </> : <div className='d-flex justify-content-center align-items-center pt-5 w-100'>
                    <h2 className='pt-5 text-muted h1 text-uppercase'>You have no products in your cart</h2>
                  </div>}

              </div>}

            <div className="row">
              <div className="col-12 col-md-8">
                <div className="d-flex justify-content-center align-items-start pt-5 w-100 flex-column">
                  <h2 className={styles.totalTitle}>Cart Total</h2>
                  <div className="row  d-flex flex-column w-100">
                    <div className="col-12">
                      <div className="row d-flex flex-row justify-content-between align-items-center">
                        <div className="col-5 h4 pt-5 text-uppercase">SubTotal</div>
                        <div className={`${styles.price} col-7 h4 pt-5 h5 text-muted text-uppercase`}>{totalProductsPrice}</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row d-flex flex-row justify-content-between align-items-center">
                        <div className="col-5 h4 pt-5 h5 text-uppercase">Shipping</div>
                        <div className="col-7 pt-5">
                          <input id="shippingAddress" className="form-control form-control-sm w-100 border-0" type="text" placeholder="Enter your address to view shipping options." aria-label=".form-control-sm example" />
                          <label htmlFor="shippingAddress" className="form-label text-dark mt-2">Calculate shipping</label>
                        </div>

                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row d-flex flex-row justify-content-between align-items-center">
                        <div className="col-5 h4 pt-5 text-uppercase">Total</div>
                        <div className={`${styles.price} col-7 h4 pt-5 h5 text-muted text-uppercase`}>{totalProductsPrice + shippingFees}</div>

                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button className={styles.btnColor} onClick={() => handleCheckout()} disabled={isLoading}>Proceed to Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
    </>
  )
}
export async function getServerSideProps() {
  const res = await fetch(`${BaseURL}${EndPoints.cart}`)
  const data = await res.json();

  return {
    props: {
      products: data,
      pageName: pages.cart
    }
  }
}
export default Cart
