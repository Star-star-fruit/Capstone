import {Receipt} from '@material-ui/icons'
import React from 'react'
import ReactWordcloud from 'react-wordcloud'
import {connect} from 'react-redux'
import {fetchWordsInEmail} from '../store/wordsInEmail'

const wordsTest = [
  {
    text: 'sorry',
    value: 64
  },
  {
    text: 'expert',
    value: 11
  },
  {
    text: 'sorry about that',
    value: 16
  },
  {
    text: 'I am no expert',
    value: 17
  },
  {
    text: 'I am not an expert',
    value: 17
  },
  {
    text: 'I apologize',
    value: 17
  },
  {
    text: 'apologize',
    value: 17
  },
  {
    text: 'I believe',
    value: 17
  },
  {
    text: 'just',
    value: 17
  },
  {
    text: 'I feel',
    value: 17
  },
  {
    text: 'I just think',
    value: 17
  },
  {
    text: 'possibly',
    value: 17
  },
  {
    text: 'kind of',
    value: 17
  },
  {
    text: 'it is likely',
    value: 17
  },
  {
    text: 'make sense',
    value: 17
  },
  {
    text: 'Am I making sense',
    value: 17
  },
  {
    text: 'am I making sense',
    value: 17
  },
  {
    text: "I don't know if this is right",
    value: 17
  },
  {
    text: 'I might be wrong',
    value: 17
  },
  {
    text: 'It is my fault',
    value: 60
  },
  {
    text: 'It was my fault',
    value: 17
  },
  {
    text: 'sort of like',
    value: 17
  },
  {
    text: 'just wondering',
    value: 70
  },
  {
    text: 'actually',
    value: 17
  },
  {
    text: 'I will try my best',
    value: 17
  },
  {
    text: 'I am not sure',
    value: 45
  },
  {
    text: 'I have no idea if',
    value: 17
  },
  {
    text: 'I should have',
    value: 17
  }
]

const minimizingWords = [
  'sorry',
  'expert',
  'sorry about that',
  'I am no expert',
  'I am not an expert',
  'I apologize',
  'apologize',
  'I believe',
  'just',
  'I feel',
  'I just think',
  'possibly',
  'kind of',
  'it is likely',
  'make sense',
  'Am I making sense',
  'am I making sense',
  "I don't know if this is right",
  'I might be wrong',
  'It is my fault',
  'It was my fault',
  'sort of like',
  'just wondering',
  'actually',
  'I will try my best',
  'I am not sure',
  'I have no idea if',
  'I should have'
]

class DataVisCloud extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      words: []
    }
    this.dataVis = this.dataVis.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.fetchCommonWords()

      //put word and count into array of objects for <ReactWordcloud words />
      const words = this.props.commonWords.map(word => ({
        text: minimizingWords[word.wordId - 1],
        value: word.count
      }))

      this.setState({
        words: words
      })
    } catch (error) {
      console.error(
        'Error occured while fetching frequently used words: ',
        error
      )
    }
  }

  dataVis() {
    const size = [600, 400]
    const color = '#0000FF'
    const blue = 'blue'
    const options = {
      colors: [
        '#1f77b4',
        '#ff7f0e',
        '#2ca02c',
        '#d62728',
        '#9467bd',
        '#8c564b'
      ],
      enableTooltip: true,
      deterministic: false,
      fontFamily: 'impact',
      fontSizes: [40, 60],
      fontStyle: 'normal',
      fontWeight: 'normal',
      padding: 1,
      rotations: 3,
      rotationAngles: [0, 90],
      scale: 'sqrt',
      spiral: 'archimedean',
      transitionDuration: 1000
    }
    const resizeStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'solid 1px #ddd',
      background: '#f0f0f0'
    }
    return (
      <ReactWordcloud
        words={this.state.words}
        options={options}
        style={resizeStyle}
      />
    )
  }

  render() {
    return <div>{this.dataVis()}</div>
  }
}

const mapState = state => ({
  commonWords: state.wordsInEmail
})

const mapDispatch = dispatch => ({
  fetchCommonWords: () => dispatch(fetchWordsInEmail())
})

export default connect(mapState, mapDispatch)(DataVisCloud)
