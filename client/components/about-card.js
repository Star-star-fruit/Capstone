import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'

export default function AboutCard(props) {
  const {imgUrl, name, description, linkedInUrl, gitHubUrl} = props.creator

  return (
    <div>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={`About ${name}`}
            height="70"
            image={imgUrl}
            title={`About ${name}`}
          />
          <CardContent>
            <h3>{name}</h3>
            <h5>{description}</h5>
          </CardContent>
          <CardActions>
            <Button href={linkedInUrl}>
              <LinkedInIcon />
            </Button>
            <Button href={gitHubUrl}>
              <GitHubIcon />
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  )
}
