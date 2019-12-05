import React, { Component ,Fragment} from 'react';
import { Link } from 'react-router-dom';
//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import relativeTime from 'dayjs/plugin/relativeTime'
import { Grid } from '@material-ui/core';
//dayjs
import dayjs from 'dayjs';
const styles = {
    image: {
        minWidth: 160,
        maxHeight: 150
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
    }
}

class Comments extends Component {
    render() {
        dayjs.extend(relativeTime);
        const {  classes } = this.props;
        const {comments}  = this.props.comments;
        return (
            <Fragment>
            {this.props.comments.map((comment,index)=>  
           (
            <Fragment key ={index}>
               <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    {/* <img
                      src={comment.userImage}
                      alt="comment"
                      className={classes.commentImage}
                    /> */}
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                    <Typography variant="h5" className={classes.username} component={Link} to="/Home" >{comment.userId}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(comment.createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <Typography variant="body1">{comment.body}</Typography>
                      <hr className={classes.invisibleSeparator} />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
          </Fragment>         
        ))
    }
    </Fragment>
        )     
    }
}

  export default withStyles(styles)(Comments);
  