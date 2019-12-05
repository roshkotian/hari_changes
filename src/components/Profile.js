import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import relativeTime from 'dayjs/plugin/relativeTime'
import { Grid } from '@material-ui/core';
import MyButton from '../pages/MyButton';
import EditIcon from '@material-ui/icons/Edit';
import Noimg from "../noimg.png";
import CalendarToday from '@material-ui/icons/CalendarToday';
import LocationOn from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import axios from "axios";

//dayjs
import dayjs from 'dayjs';
export const LOADING_USER = 'LOADING_USER';
export const SET_USER = 'SET_USER';
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
    }

    handleImageChange = (event) => {
        const username = localStorage.getItem("username"); 
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        formData.append('imageName', image.name);
        formData.append('userName', username)
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
          })
        axios({
            url: API_URL + '/image/updateImage',
            method: "PUT",
            data: formData
        }).then((response) => {
            console.log(response.data) })
        axios({
            url: API_URL + '/image/changeImage',
            method: "PUT",
            data: formData
        }).then((response) => {
            console.log(response.data)
           }).catch((err) => console.log(err));
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    render() {
        dayjs.extend(relativeTime);
        const { classes, fname, lname, username, role, department, email, image, imageName, createdAt } = this.props
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Grid container justify="space-between">
                        <Grid item sm={11}>
                            <div className={classes.profile}>
                                <div className="image-wrapper">
                                    <img src={this.state.file !=null ? this.state.file : "uploads/" + imageName} alt="profile" className="profile-image" className={classes.image} />
                                    <input
                                        type="file"
                                        id="imageInput"
                                        hidden="hidden"
                                        onChange={this.handleImageChange}
                                    />
                                    <MyButton
                                        tip="Edit profile picture"
                                        onClick={this.handleEditPicture}
                                        btnClassName="button"
                                    >
                                        <EditIcon color="primary" />
                                    </MyButton>
                                </div>
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography variant="h5" className={classes.username} component={Link} to="/Home" >@ {lname}, {fname}</Typography>
                        </Grid>
                        <div>
                            <Fragment>
                                <PersonIcon className={classes.favouriteicon} color="primary" /> <span>{role}</span>
                                <br />
                                <AssignmentIndIcon className={classes.favouriteicon} color="primary" /> <span>{department} Department</span>
                                <br />
                                <EmailIcon className={classes.favouriteicon} color="primary" /> <span>{email}</span>
                                <br />
                                <LocationOn className={classes.favouriteicon} color="primary" /> <span>Purdue, Fort Wayne, USA</span>
                                <br />
                                <CalendarToday className={classes.favouriteicon} color="primary" />{' '}
                                <span className={classes.body2} variant="body2" color="textSecondary">Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                            </Fragment>
                        </div>
                    </Grid>
                </CardContent>
            </Card >
        );
    }
}
const styles = {
    card:
    {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 160,
        maxHeight: 180,

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

    favouriteicon: {
        color: '#daaa00'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '90%'
            }
        }
    }, '& .profile-image': {
        width: 160,
        height: 180,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
            verticalAlign: 'middle'
        },
        '& a': {
            color: '#00bcd4'
        }
    }, '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
    },
    '& svg.button': {
        '&:hover': {
            cursor: 'pointer'
        }
    }
}

export default withStyles(styles)(Profile);