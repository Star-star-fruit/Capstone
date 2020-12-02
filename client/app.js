import React from 'react'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Home />  holds pics, mission statement, link to text editor*/}
      <Routes />
    </div>
  )
}

export default App
