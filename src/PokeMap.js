import React from "react";
import { View, Text, Image } from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Fab,
  Content,
  Container
} from "native-base";
import { MapView } from "expo";
import Meteor, { withTracker, Accounts } from "react-native-meteor";

const mapStyle = [
  {
    featureType: "administrative",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#f1ffb8"
      },
      {
        weight: "2.29"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a1f199"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on"
      },
      {
        hue: "#ff0000"
      }
    ]
  },
  {
    featureType: "landscape.natural.landcover",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#37bda2"
      }
    ]
  },
  {
    featureType: "landscape.natural.terrain",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#37bda2"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#afa0a0"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#f1ffb8"
      }
    ]
  },
  {
    featureType: "poi.attraction",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.business",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#e4dfd9"
      }
    ]
  },
  {
    featureType: "poi.business",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.government",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.medical",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#37bda2"
      }
    ]
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.school",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.sports_complex",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#84b09e"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#fafeb8"
      },
      {
        weight: "1.25"
      },
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#f1ffb8"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#f1ffb8"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#f1ffb8"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#f1ffb8"
      },
      {
        weight: "1.48"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#5ddad6"
      }
    ]
  }
];

class PokeMap extends React.Component {
  state = {
    location: {
      latitude: 28.8528,
      longitude: 77.1921,
      longitudeDelta: 0.0922,
      latitudeDelta: 0.0421
    }
  };

  recordEvent = x => {
    this.setState({ location: x });
    console.log(x);
  };

  addPokemon = () => {
    Meteor.call("pokemon.add", this.state.location, (err, res) => {
      console.log("pokemon add status" + err, res);
    });
  };

  renderPokemon = () => {
    console.log("mapview");
    return this.props.pokemon.map(p => {
      return (
        <MapView.Marker
          coordinate={{ latitude: p.latitude, longitude: p.longitude }}
          key={p._id}
        >
          <Image
            source={{ uri: "http://localhost:3000/" + p.image }}
            style={{ height: 50, width: 50 }}
          />
        </MapView.Marker>
      );
    });
  };

  removePokemon = () => {
    if (this.props.pokemon.length === 0) return;
    const remove = this.props.pokemon[0]._id;
    Meteor.call("pokemon.sub", remove, (err, res) => {
      console.log("remove function", err, res);
    });
  };

  logout = () => {
    Meteor.logout();
    this.props.flipLogin(false);
  };

  render() {
    console.log(this.props.pokemon);
    return (
      <Container style={{ width: "100%", height: "100%" }}>
        <Header>
          <Left />
          <Body>
            <Text>PokeMap</Text>
          </Body>
          <Right>
            <Button transparent onPress={this.logout}>
              <Icon name="power" />
            </Button>
          </Right>
        </Header>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.location}
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          onRegionChangeComplete={x => this.recordEvent(x)}
        >
          {this.renderPokemon()}
        </MapView>
        <Fab
          active={this.state.active}
          direction="up"
          postition="bottomRight"
          style={{ backgroundColor: "red" }}
          onPress={this.removePokemon}
        >
          <Icon name="remove" />
        </Fab>
        <Fab
          direction="left"
          postition="bottomLeft"
          style={{ backgroundColor: "green" }}
          containerStyle={{}}
          onPress={this.addPokemon}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}

export default withTracker(params => {
  Meteor.subscribe("pokemon");
  return { pokemon: Meteor.collection("pokemon").find({}) };
})(PokeMap);
