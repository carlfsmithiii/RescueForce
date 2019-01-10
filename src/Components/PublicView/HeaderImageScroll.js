import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Image } from "semantic-ui-react";
import { getAnimals } from "../../ActionCreators";

const styles = {
  img: {
    display: "inline-block",
    borderRadius: "5px",
    transition: "transform .2s",
    width: "120px",
    height: "120px",
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no repeat",
    backgroundSize: "cover",
    padding: "5px",
    backgroundColor: "#D8D8E4",
    margin: "2px"
  },
  segment: {
    margin: "auto",
    paddingTop: "20px",
    overflowX: "scroll",
    whiteSpace: "nowrap",
    borderRadius: "5px",
    backgroundColor: "#D8D8E4"
  }
};

class HeaderImageScroll extends Component {
  componentDidMount() {
    this.props.getAnimals();
  }
  render() {
    const images = this.props.images;
    return (
      <div className="ui segment" style={styles.segment}>
        {images.map((image, index) => (
          <Image
            style={styles.img}
            size="small"
            bordered
            src={image}
            key={`${this.props.animalId}ImgNum${index}`}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    images: (state.animals[0] && state.animals[0].photos) || []
    // images: state.animals.find(animal => animal.id === props.animalId).pictures
  };
};

const mapDispatchToProps = { getAnimals };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderImageScroll);
