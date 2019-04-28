import React from "react";
import { MapView } from "expo";
// import { Callout } from "react-native-maps";
// import { createStackNavigator } from "react-navigation";
// import { SingleStack } from "../screens/SingleLocation";
import { connect } from "react-redux";
import { getAllLocations } from "../store/locations";
import { withNavigation } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  Button
} from "react-native";

const Images = [
  {
    uri:
      "http://lisamariestudio.com/wp/wp-content/uploads/2018/07/LisaMarie_LOVE_reflections_extended_lo_cropped.jpg"
  },
  {
    uri:
      "https://i.pinimg.com/originals/09/41/26/09412692c3564c28a7604211e792a732.png"
  },
  {
    uri: "https://s3-media1.fl.yelpcdn.com/bphoto/B2SQTk7xM-W4nmuBbOkLSA/o.jpg"
  },
  {
    uri:
      "https://static.wixstatic.com/media/2fdcea_750bde66d7a74a88b19042cf2757a682~mv2.jpg/v1/fill/w_630,h_420,al_c,q_80,usm_0.66_1.00_0.01/2fdcea_750bde66d7a74a88b19042cf2757a682~mv2.jpg"
  },
  {
    uri:
      "http://mediad.publicbroadcasting.net/p/wlrn/files/styles/x_large/public/201612/File_000_0.jpeg"
  },
  {
    uri:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Old_Westbury_Gardens_18.JPG/220px-Old_Westbury_Gardens_18.JPG"
  },
  {
    uri:
      "https://img.grouponcdn.com/pwa_test/45jakseyovcTErH37YqPgt9FpC9M/45-1440x810/v1/c700x420.jpg"
  },
  {
    uri:
      "https://blankslatepages.s3.amazonaws.com/5637ea2cbd653-Janes-Carousel-4-thumb-550x366.jpg"
  }
];

const { width, height } = Dimensions.get("window");

const cardHeight = height / 4;
const cardWidth = cardHeight - 50;

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Pheed"
  };

  state = {
    markers: [
      {
        coordinate: {
          latitude: 38.9086624,
          longitude: -76.9990501
        },
        title: "Heart Wall",
        description:
          "Icing cheesecake cheesecake bear claw tiramisu apple pie candy macaroon macaroon. Jelly-o dragée bear claw chupa chups sweet roll candy canes sesame snaps cake. Soufflé candy canes liquorice gummi bears. Tootsie roll halvah donut halvah dessert tart.",
        image: Images[0]
      },
      {
        coordinate: {
          latitude: 38.910948,
          longitude: -77.027537
        },
        title: "Watermelon Wall",
        description:
          "Bear claw muffin marshmallow liquorice macaroon. Tootsie roll icing lemon drops. Pastry chocolate cake tiramisu candy marzipan donut sesame snaps. Danish tiramisu biscuit candy dragée toffee lollipop jujubes.",
        image: Images[1]
      },
      {
        coordinate: {
          latitude: 40.7210019,
          longitude: -73.9968509
        },
        title: "Pietro Nolita",
        description:
          "Chupa chups sweet roll soufflé candy canes marzipan liquorice liquorice. Pie sesame snaps cotton candy tiramisu bonbon carrot cake. Gummies cake caramels sesame snaps fruitcake chocolate bar caramels donut chupa chups.",
        image: Images[2]
      },
      {
        coordinate: {
          latitude: 38.9084356,
          longitude: -76.9996593
        },
        title: "Union Market",
        description:
          "Icing candy tart chocolate bar macaroon sesame snaps jujubes soufflé. Liquorice sweet roll fruitcake ice cream. Brownie lollipop sugar plum wafer tart wafer. Toffee tiramisu donut cupcake powder dragée apple pie.",
        image: Images[3]
      },
      {
        coordinate: {
          latitude: 40.7543661,
          longitude: -73.9944267
        },
        title: "305 Fitness",
        description:
          "Macaroon cheesecake jujubes lemon drops jelly lemon drops caramels marzipan pastry. Toffee pie tiramisu. Topping caramels jelly. Cotton candy soufflé cupcake.",
        image: Images[4]
      },
      {
        coordinate: {
          latitude: 40.774637,
          longitude: -73.6039843
        },
        title: "Old Westbury Gardens",
        description:
          "Icing cheesecake cheesecake bear claw tiramisu apple pie candy macaroon macaroon. Jelly-o dragée bear claw chupa chups sweet roll candy canes sesame snaps cake. Soufflé candy canes liquorice gummi bears. Tootsie roll halvah donut halvah dessert tart.",
        image: Images[5]
      },
      {
        coordinate: {
          latitude: 40.774637,
          longitude: -73.6039843
        },
        title: "Bushwick Collective",
        description:
          "Bear claw muffin marshmallow liquorice macaroon. Tootsie roll icing lemon drops. Pastry chocolate cake tiramisu candy marzipan donut sesame snaps. Danish tiramisu biscuit candy dragée toffee lollipop jujubes.",
        image: Images[6]
      },
      {
        coordinate: {
          latitude: 40.7045544,
          longitude: -73.9945468
        },
        title: "Jane's Carousel",
        description:
          "Chupa chups sweet roll soufflé candy canes marzipan liquorice liquorice. Pie sesame snaps cotton candy tiramisu bonbon carrot cake. Gummies cake caramels sesame snaps fruitcake chocolate bar caramels donut chupa chups.",
        image: Images[7]
      }
    ],
    region: {
      latitude: 38.910948,
      longitude: -77.027537,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068
    }
  };

  componentWillMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.props.getLocations();
    });

    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }
  componentDidMount() {
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / cardWidth + 0.3);
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            300
          );
        }
      }, 10);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.props.navigation.navigate);
    console.log("Hey", this.props.state);

    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 0.7) * cardWidth,
        index * cardWidth,
        (index + 0.7) * cardWidth
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp"
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp"
      });
      return { scale, opacity };
    });

    return this.state.markers.length === 0 ? (
      <View>
        <Text>Loading...</Text>
      </View>
    ) : (
      <React.Fragment>
        <MapView
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale
                }
              ]
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />

              <View style={styles.text}>
                <TouchableOpacity
                  style={styles.cardtitle}
                  onPress={() => navigate("Single", { name: index })}
                >
                  <Text>{marker.title}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - cardWidth
  },
  card: {
    padding: 5,
    elevation: 2,
    backgroundColor: "#79f8c3",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { x: 3, y: -3 },
    height: cardHeight,
    width: cardWidth,
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  text: {
    flex: 1,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center"
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
    justifyContent: "center"
  },

  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: "#f88379",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
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
  )(HomeScreen)
);
