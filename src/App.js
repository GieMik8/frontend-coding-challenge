import React, { Component } from 'react'

import './style/grid.scss'
import './style/style.scss'
import ContactForm from './containers/ContactForm/ContactForm'
import { Auxy as Aux } from './hoc/Aux'

class App extends Component {
  render() {
    return (
      <Aux>
        <header></header>
        <main className="layout ms_j-center ms_a-center">
          <div className="container">
            <ContactForm />
          </div>
        </main>
        <footer></footer>
      </Aux>
    )
  }
}

export default App;
