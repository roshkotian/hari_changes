import React, { Component } from "react";
import { Link } from "react-router-dom";
//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "@material-ui/core/Button";
import { Grid, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardMedia from "@material-ui/core/CardMedia";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import axios from "axios";
import { connect } from "react-redux";
import { getallPosts } from "../redux/actions/dataactions";

//dayjs
import dayjs from "dayjs";
import Noimg from "../noimg.png";
import PostsDialog from "./PostsDialog";
require("dotenv").config();
const API_URL = process.env.REACT_APP_API_URL;
const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 160,
    maxHeight: 150
  },
  content: {
    padding: 25,
    objectFit: "cover"
  },
  body2: {
    fontFamily: "Segoe UI",
    fontSize: "0.925rem"
  },
  username: {
    fontFamily: "Segoe UI",
    color: "#daaa00"
  },
  deleteButton: {
    position: "absolute",
    left: "90%"
  },
  favouriteicon: {
    color: "#daaa00"
  }
};

class Posts extends Component {
  state = {
    like: false,
    id: ""
  };

  likePost = () => {
    let { id, like, userid } = this.state;
    let body = {
      postId: id,
      isLike: like,
      userId: userid
    };
    axios({
      url: API_URL+ "/like/addLike",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(body)
    })
      .then(response => {
        this.props.getallPosts();
      })
      .catch(error => {
        this.props.getallPosts();
      });
  };

  render() {
    let { like } = this.state;
    dayjs.extend(relativeTime);
    const {
      classes,
      post: { createdAt, userid, _id, body  }
    } = this.props;
    console.log("gssg", this.state.like);
    return (
      <Card className={classes.card}>
        <CardMedia
          image={Noimg}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Grid container justify="space-between">
            <Grid item sm={11}>
              <Typography
                variant="h5"
                className={classes.username}
                component={Link}
                to="/Home"
              >
                {userid}
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography
                variant="body1"
                className={classes.body2}
                color="textSecondary"
              >
                {dayjs(createdAt).fromNow()}
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography className={classes.body2} variant="body2">
                {body}
              </Typography>
            </Grid>
          </Grid>

          <Button
            className={classes.favouriteicon}
            onClick={() =>
              this.setState(
                { like: this.props.post.isLike, id: this.props.post._id },
                () => this.likePost(this.props.post._id)
              )
            }
          >

              {this.props.post.isLike == false ? (
              <div>
                <ThumbUpIcon />{""}
              </div>
            ) : (
              <div>
                <span></span>&nbsp;&nbsp;&nbsp;
                <ThumbUpIcon color="primary" />
              </div>
            )} 
          </Button>

          {this.props.post.isLike == false ? (
            <span>
              {" "}
              {this.props.post.likecount != 0
                ? this.props.post.likecount
                : ""}{" "}
            </span>
          ) : (
            <span>
              {" "}
              {this.props.post.likecount != 0
                ? this.props.post.likecount
                : ""}{" "}
            </span>
          )}
          <PostsDialog _id={_id} userid={userid}></PostsDialog>
        </CardContent>
      </Card>
    );
  }
}

export default connect(null, { getallPosts })(withStyles(styles)(Posts));
