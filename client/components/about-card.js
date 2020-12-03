import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'

export default function AboutCard(props) {
  const {imgUrl, name, description, linkedInUrl, gitHubUrl} = props.creator

  return (
    //card display w person img, name, email, description
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={`About ${name}`}
          height="140"
          image={imgUrl}
          title={`About ${name}`}
        />
        <CardContent>
          <h2>{name}</h2>
          <h5>{description}</h5>
        </CardContent>
        <CardActions>
          <Button href={linkedInUrl}>LinkedIn</Button>
          <Button href={gitHubUrl}>GitHub</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
