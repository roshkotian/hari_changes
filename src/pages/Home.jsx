import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Posts from "../components/Posts";
import Profile from "../components/Profile";
import Navbar from "../layout/Navbar";

import PropTypes from  'prop-types';
import { connect } from 'react-redux';
import { getallPosts } from '../redux/actions/dataactions';

require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

 class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: null,
      lname: null,
      username: null,
      role: null,
      department: null,
      email: null,
      createdAt: null
    };
  }
  componentDidMount() {
    const username = localStorage.getItem("username"); 
    let body = {
      userName: username
    };
    this.props.getallPosts();
    axios({
      url: API_URL + "/user/getUser",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(body)
    }).then(response => {
      this.setState({
        fname: response.data.firstName,
        lname: response.data.lastName,
        username: response.data.userName,
        role: response.data.role,
        department: response.data.department,
        email: response.data.email,
        image: response.data.image,
        imageName: response.data.imageName,
        createdAt: response.data.createdAt
      });
  
    })
      .catch(function (error) {
        alert("Error occurred : " + error);
      });
  }
  render() {
    const { fname, lname, username, role, department, email,image, imageName, createdAt } = this.state;
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map(post => <Posts post={post} key={post._id}></Posts>)
    ) : (
      <p>Loading...</p>
    );

    let profileMarkup = <Profile fname={fname} lname={lname} username={username} role={role} department={department} email={email} image={image} imageName={imageName} createdAt={createdAt} />
    return (
      <React.Fragment>
        <Navbar className="nav"></Navbar>
        <div className="container">
          <Grid container>
            <Grid item sm={8} xs={12}>
              {recentPostsMarkup}
            </Grid>
            <Grid item sm={1} xs={12}></Grid>
            <Grid item sm={3} xs={12}>
              {profileMarkup}
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  getallPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data 
});

export default connect(
  mapStateToProps,
  { getallPosts }
)(Home);

//export default Home;
