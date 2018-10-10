import React, {Component} from 'react';
import {Button, Input, Form, Container, Message} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {signup} from '../../actions/auth';
import {addFlashMessage} from '../../actions/flashMessages';
import {isEmail, equals, isEmpty} from 'validator';
import _ from 'lodash';

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        let errors = {};

        // at first clear errors from the last submit
        this.setState({errors})
        
        // validate form before sending
        const {email, password, confirmPassword} = this.state;
        if (isEmpty(email)) {
            errors.email = 'Please enter email to register';
        }
        if (isEmpty(password)) {
            errors.password = 'Please enter password to register';
        }
        if (isEmpty(confirmPassword)) {
            errors.confirmPassword = 'Please confirm the password';
        }
        if (!isEmail(email)) {
            errors.email = 'Please enter valid email address';
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (_.isEmpty(errors)) {
            this.props.signup({email, password})
                .then(res => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: res.message
                    // })
                })
                .catch(err => {
                    this.setState({errors: err.response.data})
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
                        <input type="text" name="email" onChange={this.onInputChange}/>
                        {this.state.errors.email && <span>{this.state.errors.email}</span>}
                    </Form.Field>
                    <Form.Field error={!!this.state.errors.password}>
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.onInputChange}/>
                        {this.state.errors.password && <span>{this.state.errors.password}</span>}
                    </Form.Field>
                    <Form.Field error={!!this.state.errors.confirmPassword}>
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" onChange={this.onInputChange}/>
                        {this.state.errors.confirmPassword && <span>{this.state.errors.confirmPassword}</span>}
                    </Form.Field>
                    <Button type="submit" primary>Sign up</Button>
                </Form>
            </Container>
        )
    }
}

// function mapStateToProps(state){
//     return {}
// }
export default connect(null, {signup, addFlashMessage})(SignupPage);