import React, {Component} from 'react'
import {styled} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import AboutCard from './about-card'

// const MyButton = styled(Button)({
//   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//   border: 0,
//   borderRadius: 3,
//   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   color: 'white',
//   height: 48,
//   padding: '0 30px',
// });
// import { createMuiTheme } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';
// import green from '@material-ui/core/colors/green';
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: purple[500],
//     },
//     secondary: {
//       main: green[500],
//     },
//   },
//   spacing: 50,
// });
class Home extends Component {
  render() {
    const creators = [
      {
        name: 'Prakruti PK',
        description: 'Hello I am PK',
        imgUrl:
          'https://cdn2.iconfinder.com/data/icons/green-2/32/expand-color-web2-23-512.png',
        linkedInUrl: 'blah',
        gitHubUrl: 'https://github.com/prakruti-pk'
      },
      {
        name: 'Elisa Levet',
        description: 'Hello I am Elisa',
        imgUrl:
          'https://cdn2.iconfinder.com/data/icons/green-2/32/expand-color-web2-23-512.png',
        linkedInUrl: 'https://www.linkedin.com/in/elisa-levet-256160144/',
        gitHubUrl: 'https://github.com/elisalevet'
      },
      {
        name: 'Brooke Parsons',
        description: 'Hello I am Brooke',
        imgUrl:
          'https://cdn2.iconfinder.com/data/icons/green-2/32/expand-color-web2-23-512.png',
        linkedInUrl: 'https://www.linkedin.com/in/brooke-parsons-a09959191/',
        gitHubUrl: 'https://github.com/brookeparsons'
      }
    ]
    //sign up / login button. continue as a guest button
    //image of women on stairs
    // LIKE A BOSS text editor logo
    //mission and vision
    // about us
    return (
      <div>
        <Box id="home-nav" display="flex" justifyContent="flex-end" p={1} m={1}>
          <Box p={2}>
            <Button
              className="nav-button"
              variant="contained"
              color="primary"
              href="/login"
            >
              LOGIN / SIGN UP
            </Button>
          </Box>
          <Box p={2}>
            <Button
              className="nav-button"
              variant="contained"
              color="secondary"
              href="/texteditor"
            >
              CONTINUE AS A GUEST
            </Button>
          </Box>
        </Box>

        {/* flexDirection="column" justifyContent="center" */}
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          p={6}
          m={1}
        >
          <Box display="flex" justifyContent="center">
            <img
              src="/images/logoTransparent.png"
              alt="Like a Boss"
              height="100%"
              width="55%"
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <p>
              Reveal and replace the passive language in your bussiness writing.
            </p>
            <div>
              <Button
                className="nav-button"
                variant="contained"
                color="primary"
                href="/texteditor"
              >
                Try our text editor
              </Button>
            </div>
          </Box>
        </Box>

        <Box id="about-app" display="flex" justifyContent="space-between">
          <Box id="home-image">
            <Box id="home-text">
              <img
                src="/images/logoTransparent.png"
                alt="Like a Boss"
                height="100%"
                width="55%"
              />

              {/* <h1>LIKE A BOSS</h1> */}

              <h3>
                The text editor made to dismantle the patriarchy. For Women and
                Nonbinary to write professional emails assertively.
                Statistically blah blah.{' '}
              </h3>
              <Button
                className="nav-button"
                variant="contained"
                color="secondary"
                href="/texteditor"
              >
                Try our text editor
              </Button>
            </Box>
            <img
              src="/images/likeABossBkgrnd.png"
              alt="Person climbing to the top"
            />
          </Box>
        </Box>

        <div id="about-us">
          <Box display="flex" justifyContent="center">
            <h2>
              <span>About Us</span>
            </h2>
          </Box>
          <Box display="flex" p={2} m={1}>
            {creators.map(creator => (
              <Box p={2} m={1} key={creator.name}>
                <AboutCard creator={creator} />
              </Box>
            ))}
          </Box>
        </div>
      </div>
    )
  }
}
export default Home
