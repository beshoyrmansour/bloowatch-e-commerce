import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { pages } from '../Models/consts'

type Props = {
  pageName: string
}

const Header = (props: Props) => {
  const { pageName } = props;
  const router = useRouter()

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid mx-0 mx-md-5" >
          <Link href="/products" className="navbar-brand ml-5 pl-5" >
            <img src="/bloowatch-logo2.webp" alt="" height="34" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end my-3" id="navbarScroll">
            <ul className="navbar-nav my-2 my-lg-0 navbar-nav-scroll">
              {Object.entries(pages).map((page) => (
                <li key={page[0]} className={'nav-item'}>
                  <Link href={`/${page[0]}`}>
                    <a className={page[1] === pageName ? 'nav-link active' : 'nav-link'}>
                      {(page[1]).toUpperCase()}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </nav>
      <div className=" page_title_wrapper">
        <h1 className='container page_title text-uppercase'>{pageName}</h1>
      </div>
    </header >
  )
}

export default Header