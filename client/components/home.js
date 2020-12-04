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
        imgUrl: '/images/elisa5.png',
        linkedInUrl: 'blah',
        gitHubUrl: 'https://github.com/prakruti-pk'
      },
      {
        name: 'Elisa Levet',
        description: 'Hello I am Elisa',
        imgUrl: '/images/elisa5.png',
        linkedInUrl: 'https://www.linkedin.com/in/elisa-levet/',
        gitHubUrl: 'https://github.com/elisalevet'
      },
      {
        name: 'Brooke Parsons',
        description: 'Hello I am Brooke',
        imgUrl: '/images/elisa5.png',
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
                <h2>
                  Reveal and replace the passive <br />
                  language in your business emails.
                </h2>
                <h3>
                  The text editor made to dismantle the patriarchy. <br />
                  For women and nonbinary folk to write professional emails
                  assertively. <br /> Statistically blah blah.{' '}
                </h3>
                <Button
                  className={classes.button.textTransform}
                  variant="contained"
                  href="/texteditor"
                >
                  Try our text editor
                </Button>
              </Box>
              <img
                className="home-main-img"
                src="/images/likeABossBkgrnd.png"
                alt="Person climbing to the top"
              />
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
