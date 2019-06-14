import React, { Component } from 'react';
import Nav from './Nav';
import ImageModal from './ImageModal';

export default class Album extends Component {
  state = {
    photos: [],
    selected: {},
    showModal: false
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(res => res.json())
      .then(data => this.setState({photos: data.slice(0, 25)}));
  }

  handleClick = (photo) => {
    this.setState({ 
      showModal: true,
      selected: photo
    });
  }

  closeModal = () => {
    this.setState({ 
      showModal: false
     });
  }

  render() {
    const { photos, selected, showModal } = this.state;
    let images;
    if(photos) {
      images = photos.map(photo => {
        return(
          <div className="image-wrapper" key={photo.id}>
            <img className="image" src={photo.thumbnailUrl} alt={photo.title} onClick={() => this.handleClick(photo)}/>
          </div>
        );
      })
    }

    return (
      <div className="album-container">
        <Nav/>
        <div className="image-container">
          {images}
        </div>
        <ImageModal show={showModal} photo={selected} onHide={this.closeModal} />
      </div>
    )
  }
}
