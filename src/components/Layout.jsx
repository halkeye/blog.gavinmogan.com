import React from 'react'

import '../css/main.css'

import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Sidebar from './Sidebar.jsx'

const Template = ({ children }) => (
  <>
    <Header />
    <article className="main">
      <section className="main-content">
        {children}
      </section>
      <Sidebar />
    </article>
    <Footer />
  </>
)

export default Template
