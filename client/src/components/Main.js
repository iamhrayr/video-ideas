import React, {Component} from 'react';
import {Container} from 'semantic-ui-react';
import {Route} from 'react-router-dom';
import {ProtectedRoute, GuestRoute} from './CustomRoutes';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import IdeasPage from './pages/IdeasPage';
import SingleIdeaPage from './pages/SingleIdeaPage';
import PersonalIdeasPage from './pages/PersonalIdeasPage';
import AddIdeaPage from './pages/AddIdeaPage';
import EditIdeaPage from './pages/EditIdeaPage';
import FlashMessagesList from './FlashMessagesList' 



class Main extends Component {
    render() {
        return (
            <Container>
                <FlashMessagesList />

                {/* Routes */}
                <Route exact path='/' component={HomePage} />
                <Route exact path='/ideas' component={IdeasPage} />
                <Route exact path='/ideas/:id' component={SingleIdeaPage} />
                <GuestRoute path='/login' component={LoginPage} />
                <GuestRoute path='/signup' component={SignupPage} />
                <ProtectedRoute path='/profile' component={ProfilePage} />
                <ProtectedRoute exact path='/my-ideas' component={PersonalIdeasPage} />
                <ProtectedRoute path='/my-ideas/:id' component={EditIdeaPage} />
                <ProtectedRoute path='/add-idea' component={AddIdeaPage} />
            </Container>
        )
    }
}

export default Main;