import React, {Component} from 'react'
import {styled} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import AboutCard from './about-card'
import {createMuiTheme} from '@material-ui/core/styles'

const styles = theme => ({
  box: {
    width: 300,
    margin: 'auto'
  },
  Media: {
    height: 550,
    width: '100%',
    objectFit: 'cover'
  }
})

class Home extends Component {
  render() {
    const classes = createMuiTheme({
      box: {
        width: 300,
        margin: 'auto'
      },
      Box: {
        height: 550
        // width: '100%',
        // maxWidth: '100%',

        //objectFit: 'cover'
      }
    })
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
        imgUrl: '/images/elisa.png',
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

    return (
      <div>
        <div>
          <Box
            display="flex"
            justifyContent="space-between"
            id="home-image-wrapper"
          >
            <Box>
              <Box id="home-text">
                <h1>
                  Reveal and replace the passive language in your business
                  emails.
                </h1>
                <h3>
                  The text editor made to dismantle the patriarchy. For women
                  and nonbinary folk to write professional emails assertively.
                  Statistically blah blah.{' '}
                </h3>
                <Button
                  // className={classes.button.textTransform}
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
