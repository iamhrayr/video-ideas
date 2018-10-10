import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Grid, Divider, Image, Button} from 'semantic-ui-react';
import {editProfile} from '../../actions/auth';
import _ from 'lodash';

class ProfilePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            image: '',
            imagePrev: '',
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.setStateOnLoad = this.setStateOnLoad.bind(this);
    }
    setStateOnLoad(props){
        this.setState({
            email: props.user.email || '',
            firstName: props.user.firstName || '',
            lastName: props.user.lastName || '',
            imagePrev: '/'+props.user.image || ''
        })
    }
    componentDidMount(){
        this.setStateOnLoad(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.setStateOnLoad(nextProps);
    }

    onInputChange(e){
        if (e.target.type === 'file') {
            let file = e.target.files[0];
            this.setState({
                [e.target.name]: file
            });
            
            let reader = new FileReader();
            reader.onloadend = (e) => {
                this.setState({
                    imagePrev: e.target.result
                })
            }
            reader.readAsDataURL(file)
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    onFormSubmit(e){
        let formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('image', this.state.image);
        this.props.editProfile(formData);
    }

    render(){
        return (
            <React.Fragment>
                <h1>Profile Page</h1>
                <h3>This route is protected. Only Authorized user can see it!!!</h3>
                <Grid>
                    <Grid.Column width={3}>
                        <Image src={this.state.imagePrev}/>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Form onSubmit={this.onFormSubmit}>
                            <Grid columns={2}>
                                <Grid.Column>
                                    <Form.Input label='First Name' name='firstName' onChange={this.onInputChange} value={this.state.firstName}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input label='Last Name' name='lastName' onChange={this.onInputChange} value={this.state.lastName}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input label='Email' name='email' onChange={this.onInputChange} value={this.state.email}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input type='file' label='Profile Image' name='image' onChange={this.onInputChange}/>
                                </Grid.Column>
                            </Grid>
                            <Divider />
                            <Grid columns={3}>
                                <Grid.Column>
                                    <Form.Input type='password' label='Old Password' name='oldPassword' onChange={this.onInputChange}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input type='password' label='New Password' name='newPassword' onChange={this.onInputChange}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input type='password' label='Confirm New Password' name='confirmPassword' onChange={this.onInputChange}/>
                                </Grid.Column>
                            </Grid>
                            <Divider/>
                            <Button type='submit' primary>Save</Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {editProfile})(ProfilePage);