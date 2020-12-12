import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Popup from 'reactjs-popup'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const ControlledPopup = props => {
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
            Save Draft
          </Button>
          {props.isLoggedIn ? (
            <Popup className="my-popup" open={open} closeOnDocumentClick>
              <div className="modal">
                Draft saved! You can check it out in your account!
              </div>
            </Popup>
          ) : (
            <Popup className="my-popup" open={open} closeOnDocumentClick>
              <div className="modal">
                Your draft is currently saved only on this window. To access it
                anytime, please create an account.
              </div>
            </Popup>
          )}
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default ControlledPopup
