import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Button, Image, Divider} from 'semantic-ui-react';
import {getSingleIdea, editIdea} from '../../actions/ideas';

class EditIdeaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            status: '',
            description: '',
            image: '',
            imagePrev: ''
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount(){
        this.props.getSingleIdea(this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.title,
                    description: res.description,
                    status: res.status,
                    imagePrev: '/' + res.ideaImage
                })
            })
    }
    

    onFormSubmit = () => {
        let formData = new FormData();
        let {title, status, description, image, id} = this.state
        formData.append('title', title);
        formData.append('status', status);
        formData.append('description', description);
        formData.append('image', image);
        this.props.editIdea(formData, this.props.match.params.id);
    }

    onInputChange(e, data){
        if (data.type === 'file') {
            let file = e.target.files[0];
            this.setState({
                [data.name]: file
            });
            // Set image preview 
            let reader = new FileReader();
            reader.onload = event => {
                this.setState({
                    imagePrev: event.target.result
                });
            }
            reader.readAsDataURL(file);
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
                <Image src={`${this.state.imagePrev}`}/>
                <Divider />
                <Form.Input type='file' label='Image' name='image' onChange={this.onInputChange}/>
                <Form.Input label='Title' name='title' onChange={this.onInputChange} value={this.state.title}/>
                <Form.Select label='Status' name='status' placeholder='Select idea status' options={statusOptions} onChange={this.onInputChange} value={this.state.status}/>
                <Form.TextArea label='Description' name='description' onChange={this.onInputChange} value={this.state.description}/>
                <Button primary type='sumit'>Save</Button>
            </Form>
        )
    }
}

function mapStateToProps(state){
    return {
        idea: state.idea
    }
}

export default connect(mapStateToProps, {getSingleIdea, editIdea})(EditIdeaPage);