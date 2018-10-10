import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Message} from 'semantic-ui-react';
import {removeFlashMessage} from '../actions/flashMessages';

class FlashMessagesList extends Component {

    renderFlashMessages(){
        return (
            this.props.messages.map(message => {
                let color;
                switch (message.type) {
                    case 'success': color = 'green'; break;
                    case 'error': color = 'red'; break;
                }
                return( 
                    <Message 
                        key={message.id} 
                        color={color} 
                        onDismiss={() => this.props.removeFlashMessage(message.id)}>
                        <p style={{marginTop: 0}}>{message.text}</p>
                    </Message>
                )
            })
        );
    }

    render(){
        return (
            <div className='flash-message-list'>
                {this.renderFlashMessages()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        messages: state.flashMessages
    }
}

export default connect(mapStateToProps, {removeFlashMessage})(FlashMessagesList)

