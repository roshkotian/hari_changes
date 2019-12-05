import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Grid, Tooltip } from '@material-ui/core';

import { connect } from 'react-redux';
import { deletePost } from '../redux/actions/dataactions';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
};

const StyledButton = withStyles({
    root: {
      background: "#daaa00",
      fontWeight: "bolder",
      fontSize: "18px",
      borderRadius: 3,
      border: 0,
      color: "black",
      height: 40,
      padding: "0 30px"
    },
    label: {
      textTransform: "capitalize"
    }
  })(Button);

class DeletePost extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deletePost = (e) => {
      e.preventDefault();
    this.props.deletePost(this.props._id);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
         <Grid container justify="space-between"  >
            <Grid item sm={1} >
                <Tooltip title="Delete Post" placement="top">
                    <Button className={classes.deleteButton} onClick={this.handleOpen}>
                        <DeleteOutline color="secondary" /> 
                    </Button>
                </Tooltip>   
            </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this post ?
          </DialogTitle>
          <DialogActions>
            <StyledButton onClick={this.handleClose} className={classes.submitButton} color="primary">
              Cancel
            </StyledButton>
            <StyledButton onClick={this.deletePost} color="secondary">
              Delete
            </StyledButton>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePost }
)(withStyles(styles)(DeletePost));