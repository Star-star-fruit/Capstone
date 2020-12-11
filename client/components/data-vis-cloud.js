import React from 'react'
import ReactWordcloud from 'react-wordcloud'
import {connect} from 'react-redux'
import {fetchWordData} from '../store/wordData'
import {Resizable} from 're-resizable'

class DataVisCloud extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataVisWords: []
    }
    this.dataVis = this.dataVis.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchWordData()
  }

  dataVis() {
    // colors: [
    //   '#79635D',
    //   '#8483A7',
    //   '#53F8CC',
    //   '#D18686',
    //   '#C4F686',
    //   '#8c564b'
    // ],
    const size = this.props.wordData.length <= 2 ? [60, 80] : [40, 60]
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
      fontFamily: 'arial',
      fontSizes: size,
      fontStyle: 'normal',
      fontWeight: 'bold',
      padding: 1,
      rotations: 3,
      rotationAngles: [0, 80],
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
      <Resizable
        defaultSize={{
          width: '100%',
          height: '100%'
        }}
        style={resizeStyle}
      >
        <ReactWordcloud words={this.props.wordData} options={options} />
      </Resizable>
    )
  }

  render() {
    return <div>{this.dataVis()}</div>
  }
}

const mapState = state => ({
  wordData: state.wordData
})

const mapDispatch = dispatch => ({
  fetchWordData: () => dispatch(fetchWordData())
})

export default connect(mapState, mapDispatch)(DataVisCloud)
