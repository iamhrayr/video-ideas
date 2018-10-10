import React, {Component} from 'react';
import {connect} from 'react-redux';
import IdeasList from '../IdeasList';
import {getPersonalIdeas, getPublicIdeas} from '../../actions/ideas';

class PersonalIdeasPage extends Component {

    componentDidMount(){
        this.props.getPersonalIdeas();
    }

    render(){
        return (
            <React.Fragment>
                <h1>Persoanl Ideas Page</h1>
                <IdeasList ideas={this.props.personalIdeas} editable />
            </React.Fragment>
        )
    }
}


function mapStateToProps(state){
    return {
        personalIdeas: state.personalIdeas
    }
}
export default connect(mapStateToProps, {getPersonalIdeas})(PersonalIdeasPage);