import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import logo from "../purdueLogo.jpg";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";

require("dotenv").config();
const API_URL = process.env.REACT_APP_API_URL;

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      errors: [],
      formErrors: {
        username: "",
        password: ""
      }
    };
  }

  validateForm = () => {
    let { username, password, errors } = this.state;
    let formIsValid = true;

    if (
      !username ||
      username === "" ||
      username === undefined ||
      username === null
    ) {
      formIsValid = false;
      errors["username"] = "* username is required";
    }

    if (!password || password === null) {
      formIsValid = false;
      errors["password"] = "* Password is required";
    }
    this.setState({ errors });
    return formIsValid;
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.validateForm()) {
      let { username, password } = this.state;
      let body = {
        userName: username,
        password
      };
        localStorage.setItem('username', body.userName);
      axios({
        url: API_URL + "/login/getLoginInfo",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(body)
      })
        .then(response => {
          if (JSON.stringify(response.data.user).length < 15) {
            this.props.history.push("/Home");
          } else {
            this.setState({ errors: response.data.user });
          }
        })
        .catch(error => {
          console.log("Error while routing--> " + error);
        });
    }
  };

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      errors: Object.assign(this.state.errors, { [e.target.name]: "" })
    });

    switch (name) {
      case "username":
        formErrors.username =
          value.length < 6 && value.length > 0
            ? "Username has to be 6 characters"
            : "";
        break;
      case "password":
        formErrors.password =
          value.length > 5 && value.length > 0
            ? ""
            : "Password has to be atleast 6 characters";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {});
  };

  render() {
    const { formErrors, username, errors } = this.state;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar
            title="DonsApp - Social Media Application"
            titleStyle={styles.color}
            style={{ background: "black" }}
          ></AppBar>
          <Grid container justify="center" alignItems="center">
            <Avatar alt="DonsApp Logo" src={logo} style={styles.bigAvatar} />
          </Grid>
          {errors.length > 0 && (
            <span style={styles.errorMessage}>{errors}</span>
          )}
          <br />
          <ThemeProvider theme={theme}>
            <div>
              <Typography variant="subtitle1">Sign In</Typography>
            </div>
          </ThemeProvider>
          <TextField
            hintText="Enter your username"
            floatingLabelText="Username"
            type="text"
            name="username"
            onChange={this.handleChange}
            error={username === ""}
            helperText={username === "" ? errors.username : " "}
          />
          <p style={styles.errorMessage}>{errors.username}</p>
          {formErrors.username.length > 0 && (
            <span style={styles.information}>{formErrors.username}</span>
          )}
          <div>
            <TextField
              id="standard-password-input"
              hintText="Enter your password"
              floatingLabelText="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <p style={styles.errorMessage}>{errors.password}</p>
            <br />
            {formErrors.password.length > 0 && (
              <span style={styles.information}>{formErrors.password}</span>
            )}
          </div>
          <br />
          <StyledButton onClick={this.handleSubmit}>Submit</StyledButton>
          <br />
          <br />
          <p style={styles.errorMessage}>
            <Link style={styles.navigation} to="/validateUserForm">
              Forgot Password
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;
            <Link style={styles.navigation} to="/register">
              New User??
            </Link>
          </p>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

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
  },
  errorMessage: {
    color: "red"
  },
  information: {
    color: "darkgreen",
    fontWeight: 600
  },
  navigation: {
    color: "black",
    fontWeight: 900
  },
  color: {
    color: "#daaa00",
    fontSize: 30
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

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 30
    },
    subtitle: {
      fontSize: 30
    }
  }
});

export default Login;
