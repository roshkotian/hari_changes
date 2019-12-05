import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Posts from '../components/Posts';
import MyPosts from '../components/MyPosts'
import Navbar from "../layout/Navbar";

import PropTypes from  'prop-types';
import { connect } from 'react-redux';

const API_URL = process.env.REACT_APP_API_URL;

export class MyPost extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] , username: null};
    } 

     componentDidMount() {
        const username = localStorage.getItem('username');
         this.setState({
            username: username
          }); 
    }
    
    render() {
      const {  username  } = this.state;  
      const { posts, loading } = this.props.data;
        
        let recentPostsMarkup = !loading ? (
          posts.filter(post => post.userid === username)
                .map(post => <MyPosts post={post} key={post._id}></MyPosts>)
          ) : (
            <p>Loading...</p>
          );

        return (
        <React.Fragment>
          <Navbar className="nav"></Navbar>  
          <div className="container">
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {recentPostsMarkup}
                </Grid>
                <Grid item sm={1} xs={12}>
       
                </Grid>
            </Grid>
            </div>
            </React.Fragment>
        )
    }

}

MyPost.propTypes = {
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data 
  });
  
  export default connect(
    mapStateToProps
  )(MyPost);

       
   