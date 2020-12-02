import React, {Component} from 'react'
import {styled} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

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
        <Box
          id="about-app"
          display="flex"
          justifyContent="space-between"
          p={4}
          m={2}
        >
          <Box>
            <h1>LIKE A BOSS</h1>
            <h3>
              The text editor made to dismantle the patriarchy. For Women and
              Nonbinary to write professional emails assertively. Statistically
              blah blah.{' '}
            </h3>
          </Box>
          {/* {require("./public/images/climbing_like_a_boss.png")}  */}
          <Box>
            {/* <img src={require(".../public/images/climbing_like_a_boss.png")} alt="Person climbing to the top" /> */}
            <img
              src="https://media.istockphoto.com/vectors/flat-illustration-with-business-ladies-climbing-on-top-of-white-on-vector-id1141278192?k=6&m=1141278192&s=612x612&w=0&h=qKf55R47YgA8ny5_YkWTFes-UNw4qYzFM6XW0j_Ds6k="
              alt="empowering img"
            />
          </Box>
        </Box>
      </div>
    )
  }
}
export default Home
