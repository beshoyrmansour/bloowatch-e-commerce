import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  pageName: string
}

const Header = (props: Props) => {
  const { pageName } = props;
  const router = useRouter()

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid" >
          <Link href="/products" className="navbar-brand ml-5 pl-5" >
            <img src="/bloowatch-logo2.webp" alt="" height="34" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end my-3" id="navbarScroll">
            <ul className="navbar-nav my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <Link href="/products"><a className="nav-link active" aria-current="page">SHOP</a></Link>
              </li>
              <li className="nav-item">
                <Link href="/products"><a className="nav-link">BLOG</a></Link>
              </li>
              <li className="nav-item">
                <Link href="/cart"><a className="nav-link">SEARCH</a></Link>
              </li>
              <li className="nav-item">
                <Link href="/cart"><a className="nav-link">CART</a></Link>
              </li>

            </ul>

          </div>
        </div>
      </nav>
      <div className=" page_title_wrapper">
        <h1 className='container page_title'>{pageName}</h1>
      </div>
    </header>
  )
}

export default Header