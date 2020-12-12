import React from 'react'
import {
  makeStyles,
  useMediaQuery,
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Paper
} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import AboutCard from './about-card'

const Home = props => {
  const creators = [
    {
      name: 'Prakruti PK',
      description: 'Hello I am PK',
      imgUrl: '/images/Woman_3.jpeg',
      linkedInUrl: 'https://www.linkedin.com/in/prakruti-pk/',
      gitHubUrl: 'https://github.com/prakruti-pk'
    },
    {
      name: 'Elisa Levet',
      description: 'Hello I am Elisa',
      imgUrl: '/images/Woman_2.jpeg',
      linkedInUrl: 'https://www.linkedin.com/in/elisa-levet/',
      gitHubUrl: 'https://github.com/elisalevet'
    },
    {
      name: 'Brooke Parsons',
      description: 'Hello I am Brooke',
      imgUrl: '/images/Woman_1.jpeg',
      linkedInUrl: 'https://www.linkedin.com/in/brooke-parsons-a09959191/',
      gitHubUrl: 'https://github.com/brookeparsons'
    }
  ]

  const useStyles = makeStyles(theme => ({
    Typography: {
      //doesn't apply.
      fontFamily: 'Roboto'
    },
    homePrimaryText: {
      color: '#F0F0F0',
      fontWeight: 500,
      [theme.breakpoints.down('xs')]: {
        display: 'inline',
        textAlign: 'left',
        color: '#303030'
      },
      [theme.breakpoints.down('sm')]: {
        display: 'inline',
        textAlign: 'left'
      }
    },
    homeBannerContent: {
      //left, top, and width have no effect in the homeBannerContent class !!!!
      //position:absolute (need for text overlay on image) does not work here. must be inside /home.css
      width: '50%',
      [theme.breakpoints.down('600')]: {
        top: '50%',
        width: '70%'
      },
      [theme.breakpoints.only('600')]: {
        top: '-10px',
        left: '-10px%'
      },
      [theme.breakpoints.only('sm')]: {
        left: '30%',
        width: '70%'
      }
    },
    homeHero: {
      width: '107%',
      marginTop: '-32px',
      marginLeft: '-32px',
      [theme.breakpoints.down('920')]: {
        width: '110%'
      },
      [theme.breakpoints.down('680')]: {
        width: '115%'
      },
      [theme.breakpoints.down('600')]: {
        width: '113%'
      },
      [theme.breakpoints.down('445')]: {
        width: '118%'
      },
      [theme.breakpoints.down('350')]: {
        width: '122%'
      }
    },
    homeSecondaryText: {
      textAlign: 'center'
    },
    homeSecondaryWrapper: {},
    homeAboutHeader: {
      [theme.breakpoints.down('xs')]: {
        width: '35%'
      },
      [theme.breakpoints.only('sm')]: {
        width: '25%'
      },
      [theme.breakpoints.only('md')]: {
        width: '20%'
      },
      [theme.breakpoints.up('lg')]: {
        width: '15%'
      }
    },
    homeAboutCards: {
      width: '55%',
      [theme.breakpoints.down('xs')]: {
        width: '45%'
      },
      [theme.breakpoints.only('sm')]: {
        width: '50%'
      }
    }
  }))
  const classes = useStyles()
  const theme = useTheme()
  const matchesIphoneX = useMediaQuery(theme.breakpoints.down('375'))
  const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const matchesMedium = useMediaQuery(theme.breakpoints.down('md'))
  const matchesLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const matchesBannerMin = useMediaQuery(theme.breakpoints.up('600'))

  return (
    <React.Fragment>
      <div className="home-wrapper">
        <Box className="home-banner-wrapper">
          <img
            className={classes.homeHero}
            src={
              matchesXSmall
                ? '/images/womenB_cropped.png'
                : '/images/womenB.png'
            }
            alt="Person climbing to the top"
          />
          <Container className="home-banner-content">
            <div position="absolute" className={classes.homeBannerContent}>
              <Container maxWidth="sm">
                {//display main text over banner only when screen > 420px wide
                matchesBannerMin ? (
                  <div>
                    <Typography
                      className={classes.homePrimaryText}
                      variant={matchesSmall ? 'h5' : 'h4'}
                      align="center"
                      color="textPrimary"
                      gutterBottom
                    >
                      Reveal and replace the passive language in your business
                      emails.
                    </Typography>
                    <br />
                    <Grid container justify="center">
                      <Grid item>
                        <Button
                          variant="contained"
                          href="/texteditor"
                          align="center"
                        >
                          Try our text editor
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                ) : (
                  <span />
                )}
              </Container>
              {matchesLarge ? (
                <div>
                  <br />
                  <Typography
                    //className={classes.homeSecondaryText}
                    variant="h5"
                    align="center"
                    paragraph
                  >
                    The text editor made to dismantle the patriarchy, for women
                    and nonbinary folks to write professional emails
                    assertively.
                  </Typography>
                </div>
              ) : (
                <div> </div>
              )}
            </div>
          </Container>
        </Box>

        <br />
        {//display main text over banner only when screen > 420px wide
        matchesBannerMin ? (
          <span />
        ) : (
          <div>
            <Typography
              //className={classes.homePrimaryText}
              variant={matchesSmall ? 'h5' : 'h4'}
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Reveal and replace the passive language in your business emails.
            </Typography>
            <br />
            <Grid container justify="center">
              <Grid item>
                <Button variant="contained" href="/texteditor" align="center">
                  Try our text editor
                </Button>
              </Grid>
            </Grid>
          </div>
        )}

        {matchesLarge ? (
          <div> </div>
        ) : (
          <div>
            <br />
            <Typography
              //className={classes.homeSecondaryText}
              variant={matchesSmall ? 'h6' : 'h5'}
              align="center"
              paragraph
            >
              The text editor made to dismantle the patriarchy, for women and
              nonbinary folks to write professional emails assertively.
            </Typography>
          </div>
        )}

        <Paper className={classes.homeSecondaryWrapper}>
          <Typography
            className={classes.homeSecondaryText}
            variant={matchesXSmall ? 'body1' : 'h6'}
            align="center"
            color="textSecondary"
          >
            About the use of passive language amoung women and nonbinary folks.
          </Typography>
        </Paper>

        <br />
        <br />

        <Box align="center">
          <img src="/images/about-us.png" className={classes.homeAboutHeader} />
        </Box>

        <Container maxWidth="sm" className={classes.homeAboutCards}>
          <Grid container spacing={4}>
            {creators.map(creator => (
              <Grid item key={creator.name} xs={12} sm={6} md={4}>
                <AboutCard creator={creator} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Home
