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
import {createMuiTheme, ThemeProvider, useTheme} from '@material-ui/core/styles'
import AboutCard from './about-card'

export default function Home(props) {
  const creators = [
    {
      name: 'Prakruti PK',
      description: 'Hello I am PK',
      imgUrl: '/images/women.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/prakruti-pk/',
      gitHubUrl: 'https://github.com/prakruti-pk'
    },
    {
      name: 'Elisa Levet',
      description: 'Hello I am Elisa',
      imgUrl: '/images/women.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/elisa-levet/',
      gitHubUrl: 'https://github.com/elisalevet'
    },
    {
      name: 'Brooke Parsons',
      description: 'Hello I am Brooke',
      imgUrl: '/images/women.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/brooke-parsons-a09959191/',
      gitHubUrl: 'https://github.com/brookeparsons'
    }
  ]

  const useStyles = makeStyles(theme => ({
    homePrimaryText: {
      color: 'white',
      [theme.breakpoints.down('xs')]: {
        display: 'inline',
        textAlign: 'left'
        //left, top, and width have no effect in the homePrimaryText class
        // left: "-10%",
      },
      [theme.breakpoints.down('sm')]: {
        display: 'inline',
        textAlign: 'left'
      }
    },
    homeBannerContent: {
      //left, top, and width have no effect in the homeBannerContent class !!!!
      //position:absolute (need for text overlay on image) does not work here. must be inside /home.css
      top: '0%',
      left: '0%',
      width: '50%',
      [theme.breakpoints.down('xs')]: {
        top: '0%',
        left: '0%',
        width: '70%'
      },
      [theme.breakpoints.only('sm')]: {
        top: '0%',
        left: '30%',
        width: '70%'
      }
    },
    homeHero: {
      width: '100%',
      marginTop: '-32px',
      marginLeft: '-32px'
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
      [theme.breakpoints.down('xs')]: {
        width: '55%'
      },
      [theme.breakpoints.only('sm')]: {
        width: '70%'
      }
    }
  }))
  const classes = useStyles()
  const theme = useTheme()
  const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const matchesMedium = useMediaQuery(theme.breakpoints.down('md'))
  const matchesLarge = useMediaQuery(theme.breakpoints.down('lg'))
  const matchesXLarge = useMediaQuery(theme.breakpoints.down('xl'))

  return (
    <React.Fragment>
      <div className="home-wrapper">
        <Box className="home-banner-wrapper">
          <img
            className={classes.homeHero}
            src={
              matchesXSmall
                ? '/images/women4.png'
                : '/images/likeABossBkgrnd.png'
            }
            alt="Person climbing to the top"
          />

          <Container
            className="home-banner-content"
            left={matchesXSmall ? '-20%' : undefined}
            width={matchesXSmall ? '50%' : undefined}
          >
            <div position="absolute" className={classes.homeBannerContent}>
              <Typography
                className={classes.homePrimaryText}
                variant={matchesXSmall ? 'h6' : 'h5'}
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
              <br />
            </div>
          </Container>
        </Box>

        <br />
        <br />

        <Paper className={classes.homeSecondaryWrapper}>
          <Typography
            className={classes.homeSecondaryText}
            variant={matchesXSmall ? 'h6' : 'h5'}
            align="center"
            color="textSecondary"
            paragraph
          >
            The text editor made to dismantle the patriarchy, for women and
            nonbinary folks to write professional emails assertively.
          </Typography>
        </Paper>

        <br />
        <br />

        <Box align="center">
          {/* <img src="/images/about-us.png" className={classes.homeAboutHeader} /> */}
        </Box>

        <Container maxWidth="md" className={classes.homeAboutCards}>
          <Grid container spacing={8}>
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

// <div className="home">
//   <div>
//     <div>
//       <Box
//         id="about-app"
//         display="flex"
//         justifyContent="space-between"
//         id="home-image-wrapper"
//       >
//         <Box>
//           <Box id="home-text">
//             <h1>
//               Reveal and replace the passive language <br />
//               in your business emails.
//             </h1>
//             <h3>
//               The text editor made to dismantle the <br /> patriarchy, for
//               women and nonbinary <br />
//               folks to write professional emails <br />
//               assertively. <br />
//             </h3>
//             <br />
//             <Button variant="contained" href="/texteditor">
//               Try our text editor
//             </Button>
//           </Box>

//           <img
//             className="home-main-img"
//             src="/images/likeABossBkgrnd.png"
//             alt="Person climbing to the top"
//           />
//         </Box>
//       </Box>
//     </div>

//     <div id="about-us">
//       <Box display="flex" justifyContent="center">
//         <img
//           className="home-about-img"
//           src="/images/about-us.png"
//           alt="about us"
//         />
//       </Box>
//     </div>
//     <div className="cards">
//       <Box display="flex" justifyContent="center">
//         {creators.map((creator) => (
//           <Box p={2} m={1} key={creator.name}>
//             <AboutCard creator={creator} />
//           </Box>
//         ))}
//       </Box>
//     </div>
//   </div>
// </div>
