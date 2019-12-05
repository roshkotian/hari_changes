import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
// Redux stuff
import { connect } from 'react-redux';
import { addComment, clearErrors } from '../redux/actions/dataactions';
import { Tooltip } from '@material-ui/core';

const styles = {
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10,
        background: "#daaa00",
        fontWeight: "bolder",
        fontSize: "18px",
        borderRadius: 3,
        border: 0,
        color: "black",
        height: 40,
        padding: "0 30px"
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '85%',
        top: '6%'
    },
    submitButton: {
        marginTop: 10,
        background: "#daaa00",
        fontWeight: "bolder",
        fontSize: "14px",
        border: 0,
        color: "black",
        height: 30,
        padding: "0 30px"
    }

}
class AddComment extends Component {

    state = {
        open: false,
        body: '',
        errors: {},
        username: localStorage.username

    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {} });
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    };
    handleChange = (event) => {
        this.setState({ errors: {} });
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        let { body, errors } = this.state;
        if (body === "") {
            errors["body"] = "* Comment something......";
            this.setState({ errors });
            return;
        }
        this.props.addComment({ body: this.state.body, userId: this.state.username, postid:this.props._id,userimage:'' });
    };
    render() {
        const { errors, username } = this.state;
        const {
            classes,
            UI: { loading }
        } = this.props;
        return (
            <Fragment>
                <Grid item sm={12} style={{ textAlign: 'center' }}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="Post a comment"
                            error={errors.comment ? true : false}
                            helperText={errors.comment}
                            value={this.state.body}
                            onChange={this.handleChange}
                            fullWidth
                            className={classes.textField}
                        />
                        <Button
                            type="submit"
                            className={classes.submitButton}
                        >
                            SUBMIT
          </Button>
                    </form>
                    <hr className={classes.visibleSeparator} />
                </Grid>
            </Fragment>
        );
    }
}
AddComment.propTypes = {
    addComment: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(
    mapStateToProps,
    { addComment, clearErrors }
)(withStyles(styles)(AddComment));