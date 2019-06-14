import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: {},
      showTextArea: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const localPhotos = JSON.parse(localStorage.getItem('photos'));
    if(localPhotos) {
      const existing = localPhotos.filter(photo => {return photo.id === nextProps.photo.id});
      if(existing.length) {
        this.setState({
          photo: existing[0],
          // showTextArea: nextProps.showTextArea
        });
      } else {
        this.setState({
          photo: nextProps.photo,
          // showTextArea: nextProps.showTextArea
        });
      }
    } else {
      this.setState({
        photo: nextProps.photo,
        // showTextArea: nextProps.showTextArea
      }); 
    }
  }

  handleEdit = () => {
    this.setState({ showTextArea: true });
  }

  handleOnChange = (e) => {
    const { photo } = this.state;
    photo['description'] = e.target.value;
    this.setState({ description: photo });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { photo } = this.state;
    const localPhotos = JSON.parse(localStorage.getItem('photos'));

    if(localPhotos) {
      const idx = localPhotos.findIndex(local => local.id === photo.id);
      if(idx >= 0) {
        localPhotos[idx] = photo;
        localStorage.setItem('photos', JSON.stringify(localPhotos));
      } else {
        localPhotos.push(photo);
        localStorage.setItem('photos', JSON.stringify(localPhotos));
      }
    } else {
      localStorage.setItem('photos', JSON.stringify([photo]));
    }
    this.setState({ showTextArea: false });
  }

  render() {
    const { showTextArea, photo } = this.state;
    let textArea;

    if(showTextArea) {
      textArea = (
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Edit Description: </Form.Label>
            <Form.Control 
              as="textarea" 
              rows="3" 
              defaultValue={photo.description}
              onChange={this.handleOnChange}/>
          </Form.Group>
          <Button variant="outline-secondary" type="submit">Submit</Button>
        </Form>
      );
    }

    const descriptionStyles = showTextArea ? {display: 'none'} : {display: 'block'};

    return (
      <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              { photo.title }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-img-wrapper">
              <img src={ photo.url } alt={ photo.title }/>
            </div>
            {textArea}
            <div style={descriptionStyles}>
              <h4 className="description">Description: </h4>
              <p>{ photo.description ? photo.description : 'N/A' }</p>
              <Button variant="outline-secondary" onClick={this.handleEdit}>Edit</Button>
            </div>  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
