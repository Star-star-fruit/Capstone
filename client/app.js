import React from 'react'
import Routes from './routes'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import {DrawerNavbar} from './components'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))

const App = () => {
  const classes = useStyles()
  return (
    <div className={classes.root} id="app">
      <CssBaseline />
      <DrawerNavbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Routes />
          <Box pt={4} />
        </Container>
      </main>
    </div>
  )
}

export default App
