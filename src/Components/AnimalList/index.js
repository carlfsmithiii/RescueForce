import React, { Component, Fragment } from "react";
import { AnimalCard } from "./AnimalCard";
import { connect } from "react-redux";
import { getAnimals } from "../../ActionCreators";

class AnimalList extends Component {
  componentDidMount() {
    this.props.getAnimals(this.props.filter);
  }
  
  render() {
    return (
      <Fragment>
        {this.props.animals.map(animal => (
          <AnimalCard key={animal._id} animal={animal} />
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const filter = props.filter;
  const filterKey = Object.keys(filter)[0];
  return {
    animals: state.animals.filter(animal => animal[filterKey] === filter[filterKey])
  }
};

const mapDispatchToProps = dispatch => ({
  getAnimals: filter => dispatch(getAnimals(filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimalList);
