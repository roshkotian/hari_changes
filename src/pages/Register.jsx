import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import TextField from "material-ui/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import logo from "../purdueLogo.jpg";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "material-ui/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

require("dotenv").config();
const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  customWidth: {
    width: 270
  }
}));
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
  textField: {
    width: 400
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

class Register extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "",
    userName: "",
    department: "",
    securityQuestion: "",
    securityAnswer: "",
    errors: {}
  };
  /*************************************************************************************
							  HANDLE VALUES FOR INPOYT FIELDS
	 **************************************************************************************/

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangerole = event => {
    this.setState({
      role: event.target.value,
      errors: Object.assign(this.state.errors, { role: "" })
    });
  };
  handleChangdepartment = event => {
    this.setState({
      department: event.target.value,
      errors: Object.assign(this.state.errors, { department: "" })
    });
  };
  handleChangsecurity = event => {
    this.setState({
      securityQuestion: event.target.value,
      errors: Object.assign(this.state.errors, { securityQuestion: "" })
    });
  };
  /*************************************************************************************
                             HANDLE  FORM ERRORS
    **************************************************************************************/
  validateForm = () => {
    let {
      email,
      userName,
      password,
      errors,
      role,
      firstName,
      lastName,
      securityAnswer,
      confirmPassword,
      department,
      securityQuestion
    } = this.state;
    let formIsValid = true;
    if (!firstName || firstName === "") {
      formIsValid = false;
      errors["firstName"] = "* firstName is required";
    }
    if (firstName !== "") {
      var pattern1 = new RegExp(/^[a-zA-Z]+$/);
      if (!pattern1.test(firstName)) {
        formIsValid = false;
        errors["firstName"] =
          "firstName should not contain  numbers and  special characters";
      } else if (firstName.length > 15) {
        formIsValid = false;
        errors["firstName"] = "firstName should  be less then 15 characters";
      }
    }
    if (!lastName || lastName === "") {
      formIsValid = false;
      errors["lastName"] = "* lastName is required";
    }

    if (!userName || userName === "" || userName === undefined) {
      formIsValid = false;
      errors["userName"] = "* userName is required";
    }

    if (!role || role === "" || role === undefined) {
      formIsValid = false;
      errors["role"] = "* role is required";
    }

    if (
      !securityQuestion ||
      securityQuestion === "" ||
      securityQuestion === undefined
    ) {
      formIsValid = false;
      errors["securityQuestion"] = "* security Question is required";
    }
    if (!department || department === "" || department === undefined) {
      formIsValid = false;
      errors["department"] = "* department is required";
    }
    if (lastName !== "") {
      var pattern2 = new RegExp(/^[a-zA-Z]+$/);
      if (!pattern2.test(lastName)) {
        formIsValid = false;
        errors["lastName"] =
          "lastName  should not contain  numbers and special characters";
      } else if (lastName.length > 15) {
        formIsValid = false;
        errors["lastName"] = "lastName should  be less then 15 characters";
      }
    }

    if (!userName || userName === "") {
      formIsValid = false;
      errors["userName"] = "* userName is required";
    }

    if (!email || email === "") {
      formIsValid = false;
      errors["email"] = "* Email is required";
    }
    if (email !== "") {
      var pattern3 = new RegExp(/^[a-zA-Z0-9]+\@pfw.edu/);
      if (!pattern3.test(email)) {
        formIsValid = false;
        errors["email"] = "* email address should be in format mail@pfw.edu ";
      }
    }
    if (!password) {
      formIsValid = false;
      errors["password"] = "* Password is required";
    }

    if (password !== "") {
      var pattern = new RegExp(/^.{6,}/);
      if (!pattern.test(password)) {
        formIsValid = false;
        errors["password"] = " * Password should be minimum 6 characters.";
      }
    }
    if (!confirmPassword || confirmPassword === "") {
      formIsValid = false;
      errors["confirmPassword"] = "* confirmPassword is required";
    }
    if (confirmPassword !== "") {
      if (password !== confirmPassword) {
        formIsValid = false;
        errors["confirmPassword"] =
          " * Confirm password should be same as new password.";
      }
    }
    if (!securityAnswer || securityAnswer === "") {
      formIsValid = false;
      errors["securityAnswer"] = "* security answer is required";
    }
    this.setState({ errors });
    return formIsValid;
  };

  /*************************************************************************************
						Register API CALLING 
	 **************************************************************************************/
  register = async event => {
    event.preventDefault();
    if (this.validateForm()) {
      let {
        email,
        userName,
        password,
        role,
        firstName,
        lastName,
        securityAnswer,
        securityQuestion,
        department
      } = this.state;
      let body = {
        firstName,
        lastName,
        role,
        userName,
        securityQuestion,
        securityAnswer,
        department,
        email,
        password,
        image: "public/uploads/noimg.png",
        imageName: "noimg.png"
      };
      axios({
        url: API_URL + "/user/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(body)
      })
        .then(response => {
          console.log(JSON.stringify(response.data.result).length);
          if (JSON.stringify(response.data.result).length < 25) {
            this.setState({ errors: response.data.result });
          } else {
            this.props.history.push("/successfullRegistration");
          }
        })
        .catch(error => {});
    }
  };

  render() {
    let {
      email,
      password,
      errors,
      role,
      securityQuestion,
      firstName,
      lastName,
      confirmPassword,
      userName,
      department,
      securityAnswer
    } = this.state;

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
              <Typography variant="subtitle1">Registration Page</Typography>
            </div>
          </ThemeProvider>
          <TextField
            hintText="Enter your first name"
            floatingLabelText="Firstname"
            type="text"
            name="firstName"
            style={styles.textField}
            value={firstName}
            onChange={this.handleChange("firstName")}
            margin="normal"
          />
          <p style={styles.errorMessage}>{errors.firstName}</p>
          <TextField
            hintText="Enter your last name"
            floatingLabelText="LastName"
            style={styles.textField}
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.handleChange("lastName")}
            margin="normal"
          />
          <p style={styles.errorMessage}>{errors.lastName}</p>
          <TextField
            hintText="Enter your email"
            floatingLabelText="email"
            style={styles.textField}
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange("email")}
            margin="normal"
          />
          <p style={styles.errorMessage}>{errors.email}</p>
          <div className="form-group">
            <FormControl className="form-control">
              <InputLabel htmlFor="age-simple">Select role</InputLabel>
              <Select
                value={role}
                onChange={this.handleChangerole}
                style={useStyles.customWidth}
              >
                <MenuItem value={"Student"}>Student</MenuItem>
                <MenuItem value={"Professor"}>Professor</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </FormControl>
            <p style={styles.errorMessage}>{errors.role}</p>
          </div>
          <div className="form-group">
            <FormControl className="form-control">
              <InputLabel width="30%" htmlFor="age-simple">
                Select department
              </InputLabel>
              <Select
                width="30%"
                value={department}
                onChange={this.handleChangdepartment}
                style={useStyles.customWidth}
              >
                <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
                <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                <MenuItem value={"Music"}>Music</MenuItem>
              </Select>
            </FormControl>
            <p style={styles.errorMessage}>{errors.department}</p>
          </div>
          <TextField
            hintText="Enter your userName"
            floatingLabelText="UserName"
            style={styles.textField}
            type="text"
            name="userName"
            value={userName}
            onChange={this.handleChange("userName")}
            margin="normal"
          />
          <p style={styles.errorMessage}>{errors.userName}</p>
          <TextField
            hintText="Enter your password"
            floatingLabelText="Password"
            style={styles.textField}
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange("password")}
            margin="normal"
          />
          <p style={styles.errorMessage}>{errors.password}</p>
          <TextField
            hintText=" Confirm Password"
            floatingLabelText="Confirm Password"
            style={styles.textField}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange("confirmPassword")}
            margin="normal"
          />
          <p style={styles.errorMessage}>{errors.confirmPassword}</p>
          <div className="form-group">
            <FormControl className="form-control">
              <InputLabel htmlFor="age-simple">
                Select Security question
              </InputLabel>
              <Select
                value={securityQuestion}
                onChange={this.handleChangsecurity}
              >
                <MenuItem value={"what is the name of your pet?"}>
                  what is the name of your pet?
                </MenuItem>
                <MenuItem value={"What is your favourite car?"}>
                  What is your favourite car?
                </MenuItem>
                <MenuItem value={"Where were you Born?"}>
                  Where were you Born?
                </MenuItem>
              </Select>
            </FormControl>
            <p style={styles.errorMessage}>{errors.securityQuestion}</p>
          </div>
          <TextField
            hintText=" Security Answer"
            floatingLabelText="Security Answer"
            style={styles.textField}
            type="text"
            name="securityAnswer"
            value={securityAnswer}
            onChange={this.handleChange("securityAnswer")}
            margin="normal"
          />
          <p style={styles.errorMessage}>{errors.securityAnswer}</p>
          <StyledButton onClick={e => this.register(e)}>
            Register
          </StyledButton>{" "}
          <br />
          <br />
          <Link style={styles.navigation} to="/">
            Already registered ??
          </Link>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}
export default Register;
