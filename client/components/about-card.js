import React from 'react'
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea
} from '@material-ui/core'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'

export default function AboutCard(props) {
  const {imgUrl, name, description, linkedInUrl, gitHubUrl} = props.creator

  return (
    <div>
      <Card>
        <CardActionArea>
          <CardMedia component="img" image={imgUrl} title={name} />
          <CardContent>
            <h3> {name} </h3>
            <p> {description}</p>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" href={linkedInUrl}>
              <LinkedInIcon />
            </Button>
            <Button size="small" color="primary" href={gitHubUrl}>
              <GitHubIcon />
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  )
}
