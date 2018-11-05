import { Meteor } from "meteor/meteor";
import { Pokemon } from "../imports/collections/pokemon";
import fs from "fs";

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  "pokemon.add": loc => {
    const user = this.userId;
    if (!user) {
      console.log("user not signed in");
      //return;
    }

    const range = 0.035;
    const range1 = Math.random() > 0.5 ? range : -range;
    const range2 = Math.random() > 0.5 ? range : -range;
    let long = loc.longitude;

    long = long + Math.random() * range1;
    let lat = loc.latitude;
    lat = lat + Math.random() * range2;

    const iconPath = process.env.PWD + "/public";
    const icons = fs.readdirSync(iconPath);

    const min = Math.ceil(0);
    const max = Math.ceil(250);
    const random = Math.floor(Math.random() * (max - min)) + min;
    return Pokemon.insert({
      image: icons[random],
      longitude: long,
      latitude: lat
    });
  },
  "pokemon.sub": x => {
    return Pokemon.remove(x);
  }
});
