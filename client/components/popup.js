import React from 'react'

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_open">
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>{this.props.text}</button>
        </div>
      </div>
    )
  }
}
export default Popup

// {this.props.isLoggedIn && this.props.showPopup
//   ? <Popup text="Draft saved! You can check it out in your account."/>
//   : <Popup text="Your draft is currently saved only on this window. To access it anytime, please create an account." />
// }

// togglePopup() {
//   this.setState({
//        showPopup: !this.state.showPopup
//   });
//    }

//this.togglePopup = this.togglePopup.bind(this)

//      showPopup: false,
