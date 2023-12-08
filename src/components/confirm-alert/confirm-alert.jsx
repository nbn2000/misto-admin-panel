import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function ConfirmAlert({ agree, setAgree, title, body, onAgree }) {
  const handleAgree = () => {
    setAgree({ open: false, agree: true });
    onAgree();
  };
  const handleDisagree = () => {
    setAgree({ open: false, agree: false });
  };

  return (
    <Dialog
      open={agree.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>Disagree</Button>
        <Button onClick={handleAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmAlert.propTypes = {
  agree: PropTypes.shape({
    open: PropTypes.bool,
    agree: PropTypes.bool,
  }).isRequired,
  setAgree: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onAgree: PropTypes.func.isRequired,
};
