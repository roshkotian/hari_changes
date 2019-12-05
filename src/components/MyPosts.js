import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import relativeTime from 'dayjs/plugin/relativeTime'
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import { Grid, Tooltip } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import CardMedia from '@material-ui/core/CardMedia';
//dayjs
import dayjs from 'dayjs';
import Noimg from "../noimg.png";
import DeletePost from "../components/DeletePost";
import { connect } from 'react-redux';

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
    favouriteicon: {
        color: '#daaa00'
    }

}

class MyPosts extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, post: { body, createdAt, userid, _id } } = this.props

        return (
            <Card className={classes.card}>
                <CardMedia
                        image={Noimg}
                        title="Profile image"
                        className={classes.image}
                    />
                <CardContent className={classes.content}>
                    
                    <Grid container justify="space-between"  >
                        <Grid item sm={11}>
                            <Typography variant="h5" className={classes.username} component={Link} to="/Home" >{userid}</Typography>
                        </Grid>
                        <Grid item sm={1} > 
                            <DeletePost _id={_id}></DeletePost>
                        </Grid>
                        <Grid item sm={12} >
                            <Typography variant="body1" className={classes.body2} color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                        </Grid>
                        <Grid item sm={12} >
                            <Typography className={classes.body2} variant="body2">{body}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card >
        );
    }
}

MyPosts.propTypes = {
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(MyPosts));
