import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from "material-ui/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import logo from "../../purdueLogo.jpg";
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

//Password reset confirmation page
export class SucessForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        console.log("Inside successForm handleSubmit()..");
       this.props.history.push('/')
    };
    render() {
        return (
            <MuiThemeProvider>
                        <React.Fragment>
                            <AppBar title="DonsApp - Social Media Application" style={{ background: "#212121" }}> </AppBar>
                            <Grid container justify="center" alignItems="center">
                                <Avatar alt="DonsApp Logo" src={logo} style={styles.bigAvatar} />
                            </Grid>
                            <ThemeProvider theme={theme}>
                                <div>
                                    <Typography variant="subtitle1">Account Recovery</Typography>
                                    <br />
                                    <Typography variant="subtitle">Success! Your Password has been changed!</Typography>
                                </div>
                            </ThemeProvider>
                            <br />
                            <StyledButton onClick={this.handleSubmit} >Visit Home Page</StyledButton>

                        </React.Fragment>
                    </MuiThemeProvider>
        )
    }
}

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

const styles = {
    button: {
        margin: 15
    },
    bigAvatar: {
        margin: 5,
        width: 260,
        height: 300
    },
    title: {
        flexGrow: 1,
        align: "center"
    },
    root: {
        flexGrow: 1
    }
};

const theme = createMuiTheme({
    typography: {
        subtitle1: {
            fontSize: 30,
        },
        subtitle: {
            fontSize: 30,
        }
    },
});

export default SucessForm;
