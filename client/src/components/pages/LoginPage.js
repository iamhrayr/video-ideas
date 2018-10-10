import React, {Component} from 'react';
import {Button, Input, Form, Container, Message} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {isEmail, equals, isEmpty} from 'validator';
import _ from 'lodash';
import {login} from '../../actions/auth';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault()
        const errors = {};
        
        // at first clear errors from the last submit
        this.setState({errors})

        // validate form before sending
        const {email, password} = this.state;
        if (isEmpty(email)) {
            errors.email = 'Please enter email to login';
        }
        if (isEmpty(password)) {
            errors.password = 'Please enter password to register';
        }
        if (!isEmail(email)) {
            errors.email = 'Please enter valid email address';
        }

        if (_.isEmpty(errors)) {
            this.props.login({email, password})
                .catch(err => {
                    this.setState({errors: err})
                })
        } else {
            this.setState({errors});
        }
    }
    onInputChange(e){
        const errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({
            [e.target.name]: e.target.value,
            errors
        })
    }
    render(){
        return (
            <Container text>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Field error={!!this.state.errors.email}>
                        <label>Email</label>
                        <input type="text" name="email" onChange={this.onInputChange} />
                        {this.state.errors.email && <span>{this.state.errors.email}</span>}
                    </Form.Field>
                    <Form.Field error={!!this.state.errors.password}>
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.onInputChange} />
                        {this.state.errors.password && <span>{this.state.errors.password}</span>}
                    </Form.Field>
                    {this.state.errors.message && <Message negative><p>{this.state.errors.message}</p></Message>}
                    <Button type="submit" primary>Log me in</Button>
                </Form>
            </Container>
        )
    }
}

function mapStateToProps(state){
    return {

    }
}
export default connect(mapStateToProps, {login})(LoginPage);