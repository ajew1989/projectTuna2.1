// "use strict";

// Object.defineProperty(exports, "__esModule", { value: true });

// var geolocation = require("nativescript-geolocation");

// var observable_1 = require("data/observable");

// var HelloWorldModel = (function (_super) {
//     __extends(HelloWorldModel, _super);
//     function HelloWorldModel() {
//         var _this = _super.call(this) || this;
//         // Initialize default values.
//         _this._counter = 42;
//         return _this;
//     }
//     Object.defineProperty(HelloWorldModel.prototype, "message", {
//         get: function () {
//             return this._message;
//         },
//         set: function (value) {
//             if (this._message !== value) {
//                 this._message = value;
//                 this.notifyPropertyChange('message', value);
//             }
//         },
//         enumerable: true,
//         configurable: true
//     });
//     HelloWorldModel.prototype.enable = function() {
//         console.log('enable clicked')
//         if (!geolocation.isEnabled()) {
//             console.log('geolocation enabled')
//             geolocation.enableLocationRequest();
//         }
//     };
//     HelloWorldModel.prototype.onTap = function () {
//         var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 200000000, timeout: 20000}).
//         then(function(loc) {
//             if (loc) {
//                 console.log("Current location is: " + loc.latitude)
//                 this._message = "Current location is: " + loc.latitude + ", " + loc.longitude;
//             }
//         }, function(e){
//             console.log("Error: " + e.message);
//         });
//     };
//     return HelloWorldModel;
// }(observable_1.Observable));
// exports.HelloWorldModel = HelloWorldModel;

var geolocation = require("nativescript-geolocation");
var Observable = require("data/observable").Observable;

function getMessage(lat, lng) {
    if (lat) {
        console.log("You are at" + lat + ", " + lng)
        return "Hello";
    } else {
        return "No location found";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.message = getMessage();

    viewModel.enable = function() {
        console.log('enable clicked')
        if (!geolocation.isEnabled()) {
            console.log('geolocation enabled')
            geolocation.enableLocationRequest();
        }
    }

    viewModel.onTap = function() {
        console.log('Find Location clicked')
        viewModel.onTap = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 200000000, timeout: 20000}).
        then(function(loc) {
            console.log('location: ', loc.latitude)
            // if (loc) {
                console.log("Current location is: " + loc.latitude)
                this.set("message", getMessage(loc.latitude, loc.longitude));
                // viewModel.message = getMessage(loc.latitude, loc.longitude);
            // }
        }, function(e){
            console.log("Error: " + e.message);
        });
    }
    return viewModel;
}

exports.createViewModel = createViewModel;