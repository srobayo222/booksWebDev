import React, {Component} from "react";
import {Meteor} from "meteor/meteor";
import {render} from "react-dom";
import {renderRoutes} from "../imports/Client/routes";

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('target'));
});