import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PetList from '../PetList'
import PetStuff from '../PetStuff'
import GlucoseReading from '../GlucoseReadings'
import LogInjection from '../LogInjection'

import './app.scss'

const App = () => {
  return (
    <div className="App">
      <Router>
        <header>App Header</header>
        <main>
          <PetList />
          <Switch>
            <Route path="/pets/:petname" component={PetStuff} />
          </Switch>
          {/* <LogInjection /> */}
          {/* <GlucoseReading /> */}
        </main>
        <footer>App Footer</footer>
      </Router>
    </div>
  )
}

export default App
