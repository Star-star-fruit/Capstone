import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Popup from 'reactjs-popup'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const ControlledPopup2 = props => {
  const [open, setOpen] = useState(false)
  const handleClickAway = () => {
    setOpen(false)
  }
  return (
    <div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Button
            color="primary"
            variant="contained"
            type="button"
            className="button"
            onClick={() => setOpen(o => !o)}
          >
            Send Email
          </Button>
          {props.isLoggedIn ? (
            <Popup className="my-popup" open={open} closeOnDocumentClick>
              <div className="modal">Email sent!</div>
            </Popup>
          ) : (
            <Popup className="my-popup" open={open} closeOnDocumentClick>
              <div className="modal">Login with Gmail to send your email!</div>
            </Popup>
          )}
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default ControlledPopup2
