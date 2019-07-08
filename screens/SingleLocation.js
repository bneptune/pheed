import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllLocations } from "../store/locations";
import { withNavigation } from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image
} from "react-native";

class SingleLocation extends Component {
  state = {};
  //change to stateless component

  render() {
    const locationIndex = this.props.navigation.getParam("name");

    const currentLocation = this.props.locations[locationIndex];

    return (
      <View style={styles.container}>
        <Text>{currentLocation.title}</Text>
        <Text>{currentLocation.description}</Text>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `maps://app?daddr=${currentLocation.coordinate.latitude}+${
                currentLocation.coordinate.longitude
              }`
            )
          }
        >
          <Text>Navigate</Text>
        </TouchableOpacity>
        <Image
          source={currentLocation.image}
          style={{ width: 400, height: 400 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  bodyText: {
    padding: 10,
    fontSize: 15,
    color: "#5D5D5D"
  }
});

const mapStateToProps = state => {
  return {
    locations: state.locations.locations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLocations: () => dispatch(getAllLocations())
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SingleLocation)
);
