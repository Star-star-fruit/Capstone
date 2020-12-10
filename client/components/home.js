import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import CardActionArea from '@material-ui/core/CardActionArea'

class Home extends Component {
  render() {
    const creators = [
      {
        name: 'Prakruti PK',
        description: 'Hello I am PK',
        imgUrl: '/images/cloud3.png',
        linkedInUrl: 'https://www.linkedin.com/in/prakruti-pk/',
        gitHubUrl: 'https://github.com/prakruti-pk'
      },
      {
        name: 'Elisa Levet',
        description: 'Hello I am Elisa',
        imgUrl: '/images/cloud3.png',
        linkedInUrl: 'https://www.linkedin.com/in/elisa-levet/',
        gitHubUrl: 'https://github.com/elisalevet'
      },
      {
        name: 'Brooke Parsons',
        description: 'Hello I am Brooke',
        imgUrl: '/images/cloud3.png',
        linkedInUrl: 'https://www.linkedin.com/in/brooke-parsons-a09959191/',
        gitHubUrl: 'https://github.com/brookeparsons'
      }
    ]

    return (
      <React.Fragment>
        <div className="firstHome">
          <main>
            <Container maxWidth="sm">
              <Typography
                component="h2"
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Reveal and replace the passive language in your business emails.
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                The text editor made to dismantle the patriarchy, for women and
                nonbinary folks to write professional emails assertively.
              </Typography>
            </Container>
            <br />
            <Grid container justify="center">
              <Grid item>
                <Button variant="contained" href="/texteditor" align="center">
                  Try our text editor
                </Button>
              </Grid>
            </Grid>
            <br />

            <Container maxWidth="md">
              <Grid container spacing={4}>
                {creators.map(creator => (
                  <Grid item key={creator.name} xs={12} sm={6} md={4}>
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image="/images/women4.png"
                          title="Image title"
                        />
                        <CardContent>
                          <h3> {creator.name} </h3>
                          <h5> {creator.description}</h5>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            color="primary"
                            href={creator.linkedInUrl}
                          >
                            <LinkedInIcon />
                          </Button>
                          <Button
                            size="small"
                            color="primary"
                            href={creator.gitHubUrl}
                          >
                            <GitHubIcon />
                          </Button>
                        </CardActions>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
        </div>
      </React.Fragment>
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
    )
  }
}
export default Home
