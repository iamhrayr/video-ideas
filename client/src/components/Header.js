import React, {Component} from 'react';
import {Button, Dropdown, Menu, Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions/auth';

class Header extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        this.props.logout();
    }

    render() {
        return (
            <Menu>
                <Container>
                    <Menu.Item as={Link} to='/' name='home'/>
                    <Menu.Item as={Link} to='/ideas' name='ideas'/>

                    {!this.props.auth.isAuthenticated && 
                        <Menu.Menu position='right'>
                            <Menu.Item as={Link} to='/login'>Login</Menu.Item>
                            <Menu.Item>
                                <Button primary as={Link} to='/signup'>Signup</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    }

                    {this.props.auth.isAuthenticated && 
                        <Menu.Menu position='right'>
                            <Dropdown item text={this.props.auth.user.email}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to='/profile'>Profile</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/my-ideas'>My Ideas</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    }
                </Container>
            </Menu>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, {logout})(Header);