import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import relativeTime from 'dayjs/plugin/relativeTime'
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getComments, clearErrors } from '../redux/actions/dataactions';
import ChatIcon from '@material-ui/icons/Chat';
import Comments from './Comments';
import AddComment from './AddComment';
const styles = {
    card:
    {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 160,
        maxHeight: 150,

    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    body2:
    {
        fontFamily: 'Segoe UI',
        fontSize: '0.925rem'

    },
    username:
    {
        fontFamily: 'Segoe UI',
        color: '#daaa00'

    },
    deleteButton: {
        position: 'absolute',
        left: '90%',
    },
    closeButton: {
        position: 'absolute',
        left: '87%',
        top: '2%'
    },
    favouriteicon: {
        color: '#daaa00'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    profileImage: {
        maxWidth: 160,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    }

}

class PostsDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: '',
        username: localStorage.username
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getComments(this.props._id);
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false });
    };
    render() {
        dayjs.extend(relativeTime);
        const {
            classes, post: {
                _id,
                body,
                createdAt,
                userid,
                userImage
            },
            UI: { loading }
        } = this.props;
        const { comments } = this.props.data;
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
                <Grid container justify="space-between" >
                    <Grid item sm={5}>
                        <img src={userImage} alt="Profile" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography variant="h5" className={classes.username} component={Link} to="/Home" >{userid}</Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1">{body}</Typography>
                    </Grid>
                    <hr className={classes.visibleSeparator} />
                    <AddComment _id={_id}></AddComment>
                    <Comments comments={comments} />
                </Grid>
            );
        return (
            <Fragment>
                <Button
                    onClick={this.handleOpen}
                    tip="Click to view Comments"
                    className={classes.expandButton} >
                    <ChatIcon className={classes.favouriteicon} />
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <Button
                        tip="Close"
                        onClick={this.handleClose}
                        className={classes.closeButton}>
                        <CloseIcon />
                    </Button>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}


PostsDialog.propTypes = {
    getComments: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    comments: state.data.comments,
    post: state.data.post,
    data: state.data,
    UI: state.UI
});

const mapActionsToProps = {
    getComments,
    clearErrors
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(PostsDialog));