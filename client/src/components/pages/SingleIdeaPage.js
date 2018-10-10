import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSingleIdea, postIdeaComment} from '../../actions/ideas';
import {Grid, Dimmer, Loader, Segment, Icon, Image, Comment, Header, Form, Button} from 'semantic-ui-react'
import moment from 'moment';
import _ from 'lodash';

class SingleIdeaPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newCommentBody: ''
        }
        this.onCommentFormSubmit = this.onCommentFormSubmit.bind(this);
        this.onCommentInputChange = this.onCommentInputChange.bind(this);
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.getSingleIdea(id);
    }

    renderComments(comments){
        if (!comments.length > 0) {
            return <span>No Comments</span>
        } else {
            return _.map(comments, (comment) => {
                return (
                    <Comment key={comment._id}>
                        <Comment.Avatar src={'/' + comment.user.image} />
                        <Comment.Content>
                            <Comment.Author as='a'>{comment.user.firstName}</Comment.Author>
                            <Comment.Metadata>
                                <div>{moment(comment.date).format("MMMM Do YY")}</div>
                            </Comment.Metadata>
                            <Comment.Text>{comment.body}</Comment.Text>
                            {/* <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions> */}
                        </Comment.Content>
                    </Comment>
                )
            });
        }
    }

    onCommentInputChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onCommentFormSubmit(e){
        let ideaId = this.props.match.params.id;
        this.props.postIdeaComment({comment: this.state.newCommentBody}, ideaId);
        this.setState({newCommentBody: ''});
        e.target.reset();
    }

    render(){
        if (this.props.idea.fetched) {
            let {status, created, comments, title, description, user, ideaImage} = this.props.idea.data;
            return (
                <React.Fragment>
                    <Grid>
                        <Grid.Column width={8}>
                            <h1>{title}</h1>
                            <div>
                                <span><Icon name='calendar outline'/>{moment(created).format("MMMM Do YY")}</span>
                                {' by '}
                                <span>{user.firstName}</span>
                            </div>
                            <br /><br />
                            <p>{description}</p>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Image src={'/'+ideaImage} />
                        </Grid.Column>
                    </Grid>
                    <Comment.Group>
                        <Header as='h3'>Comments:</Header>
                        {this.renderComments(comments)}
                    </Comment.Group>
                    <Form onSubmit={this.onCommentFormSubmit}>
                        <Form.TextArea label='Your comment' name='newCommentBody' onChange={this.onCommentInputChange}/>
                        <Button primary type='submit'>Post Comment</Button>
                    </Form>
                </React.Fragment>
            )
            return <span>Blah blah</span>
        }
        if (this.props.idea.fetching) {
            return <Dimmer active><Loader /></Dimmer>
        }
        return <h1>Fetching Error</h1>
    }
}

function mapStateToProps(state){
    return {
        idea: state.idea
    }
}
export default connect(mapStateToProps, {getSingleIdea, postIdeaComment})(SingleIdeaPage);