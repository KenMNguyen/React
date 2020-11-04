import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;

// renderCampSite
function RenderCampsite({campsite}) {
    return (
        <div className='col-md-5 m-1'>
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

// renderComments
function RenderComments({comments, addComment, campsiteId}) {
    if(comments) {
        return(
            <div className='col-md-5 m-1'>
                <h4>Comments</h4>
                {comments.map((comment) => {
                    return(
                        <div key={comment.id}>
                            <p>
                                {comment.text}
                                <br></br>
                    -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    );
                })}
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </div>
        );
    }
    return <div />;
}

//render
function CampsiteInfo(props) {
    if(props.campsite) { 
        return (
            <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderCampsite campsite={props.campsite} />
                <RenderComments 
                    comments={props.comments}
                    addComment={props.addComment}
                    campsiteId={props.campsite.id}
                />
            </div>
        </div>
        );
    };
    
    return <div />;        
}

//CommentForm
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
    }
    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg"  /> Submit Comment
                </Button>
                {/* Modal  */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <div className='form-group'>
                            <Label htmlFor='rating'>Rating</Label>
                            <Control.select
                                model= '.rating'
                                id='rating'
                                name= 'rating'
                                className='form-control' >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option> 
                                
                            </Control.select>
                        </div>

                        <div className='form-group'>
                            <Label htmlFor='author'>Your Name</Label>
                            <Control.text
                                model= '.author'
                                id='author'
                                name= 'author'
                                placeholder= 'Your Name'
                                className='form-control'
                                validators= {{
                                    minLength: minLength(2),
                                    maxLength: maxLength(15),
                                }}
                            />
                            <Errors
                                className='text-danger'
                                model= '.author'
                                show= 'touched'
                                component= 'div'
                                messages={{
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                        </div>

                        <div className='form-group'>
                            <Label htmlFor='text'>Comment</Label>
                            <Control.textarea
                                model= '.text'
                                id='text'
                                name= 'text'
                                row= '6'
                                className='form-control'
                            />
                        </div>

                        <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                
            </div>
        )
    }
}
    
export default CampsiteInfo;
