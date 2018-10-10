import React, {Component} from 'react';
import {Card, Image, Label, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';

class Ideas extends Component {

    renderIdeas(){
        return _.map(this.props.ideas.data, (idea) => {
            return (
                <Card key={idea._id}>
                    <Image src={idea.ideaImage} />
                    <Card.Content>
                        <Card.Header>
                            <Link to={`/ideas/${idea._id}`}>{idea.title}</Link>
                        </Card.Header>
                        <Card.Meta>
                            {moment(idea.created).subtract(1, 'days').calendar()}
                        </Card.Meta>
                        <Card.Description>
                            {idea.description}
                        </Card.Description>
                    </Card.Content>
                    {this.props.editable &&
                        <Card.Content extra>
                            <Label color={idea.status === 'public' ? 'teal' : 'orange'}>{idea.status}</Label>
                            <Button basic size='small' color='green' as={Link} to={`/my-ideas/${idea._id}`}>Edit</Button>
                        </Card.Content>
                    }
                </Card>
            )
        })
    }

    render(){
        return (
            <React.Fragment>
                <h1>Ideas List</h1>
                <Card.Group>
                    {this.renderIdeas()}
                </Card.Group>
            </React.Fragment>
        )
    }
}

export default Ideas;