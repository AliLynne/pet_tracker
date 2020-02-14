import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PetList from '../PetList'
import Header from '../Header'
import Footer from '../Footer'

import './app.scss'

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <PetList />
      </main>
      <Footer />
    </div>
  )
}

export default App
