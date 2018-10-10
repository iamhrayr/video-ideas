import React, {Component} from 'react';
import {connect} from 'react-redux';
import IdeasList from '../IdeasList';
import {getPublicIdeas} from '../../actions/ideas';

class IdeasPage extends Component {

    componentDidMount(){
        this.props.getPublicIdeas();
    }

    render(){
        return (
            <React.Fragment>
                <h1>Ideas Page</h1>
                <IdeasList ideas={this.props.ideas}/>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state){
    return {
        ideas: state.ideas
    }
}
export default connect(mapStateToProps, {getPublicIdeas})(IdeasPage);