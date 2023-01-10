import React from 'react'

import '../css/main.css'
import '../css/twitter.css'

import Header from './Header.jsx'
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
  </>
)

export default Template
