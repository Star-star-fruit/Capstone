import React, {Component} from 'react'
import {styled} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import AboutCard from './about-card'
import {createMuiTheme} from '@material-ui/core/styles'

class Home extends Component {
  render() {
    const classes = createMuiTheme({
      button: {
        textTransform: 'none'
      }
    })
    const creators = [
      {
        name: 'Prakruti PK',
        description: 'Hello I am PK',
        imgUrl: '/images/women.png',
        linkedInUrl: 'https://github.com/prakruti-pk',
        gitHubUrl: 'https://github.com/prakruti-pk'
      },
      {
        name: 'Elisa Levet',
        description: 'Hello I am Elisa',
        imgUrl: '/images/women.png',
        linkedInUrl: 'https://www.linkedin.com/in/elisa-levet/',
        gitHubUrl: 'https://github.com/elisalevet'
      },
      {
        name: 'Brooke Parsons',
        description: 'Hello I am Brooke',
        imgUrl: '/images/women.png',
        linkedInUrl: 'https://www.linkedin.com/in/brooke-parsons-a09959191/',
        gitHubUrl: 'https://github.com/brookeparsons'
      }
    ]

    return (
      <div>
        <div>
          <Box
            id="about-app"
            display="flex"
            justifyContent="space-between"
            id="home-image-wrapper"
          >
            <Box>
              <Box id="home-text">
                <h1>
                  Reveal and replace the passive language <br />
                  in your business emails.
                </h1>
                <h3>
                  The text editor made to dismantle the <br /> patriarchy, for
                  women and nonbinary <br />
                  folks to write professional emails <br />
                  assertively. <br />
                </h3>
                <br />
                <Button
                  className={classes.button.textTransform}
                  variant="contained"
                  href="/texteditor"
                >
                  Try our text editor
                </Button>
              </Box>
              <div className="home-main-img">
                <img
                  className="home-main-img"
                  src="/images/likeABossBkgrnd.png"
                  alt="Person climbing to the top"
                />
              </div>
            </Box>
          </Box>
        </div>

        <div id="about-us">
          <Box display="flex" justifyContent="center">
            <img
              className="home-about-img"
              src="/images/about-us.png"
              alt="about us"
            />
          </Box>
        </div>
        <div className="cards">
          <Box display="flex" justifyContent="center">
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
