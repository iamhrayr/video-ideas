import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Button} from 'semantic-ui-react';
import {addIdea} from '../../actions/ideas';

class AddIdeaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            status: '',
            description: '',
            image: ''
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onFormSubmit(){
        let formData = new FormData();
        let {title, status, description, image} = this.state
        formData.append('title', title);
        formData.append('status', status);
        formData.append('description', description);
        formData.append('image', image);
        this.props.addIdea(formData);
    }

    onInputChange(e, data){
        if (data.type === 'file') {
            this.setState({
                [data.name]: e.target.files[0]
            });
        } else {
            this.setState({
                [data.name]: data.value
            });
        }
    }

    render(){
        const statusOptions = [
            {key: 'public', value: 'public', text: 'Public'},
            {key: 'private', value: 'private', text: 'Private'},
        ]

        return (
            <Form onSubmit={this.onFormSubmit} name='myForm' id='myForm'>
                <Form.Input type='file' label='Image' name='image' onChange={this.onInputChange} />
                <Form.Input label='Title' name='title' onChange={this.onInputChange} />
                <Form.Select label='Status' name='status' placeholder='Select idea status' options={statusOptions} onChange={this.onInputChange} />
                <Form.TextArea label='Description' name='description' onChange={this.onInputChange} />
                <Button primary type='sumit'>Save</Button>
            </Form>
        )
    }
}

export default connect(null, {addIdea})(AddIdeaPage);