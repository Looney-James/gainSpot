// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCP8fm5Ov1LFzMO1Pw8kNyeOctL9nU1onI',
    authDomain: 'gainspot-3cbad.firebaseapp.com',
    databaseURL: 'https://gainspot-3cbad-default-rtdb.firebaseio.com',
    projectId: 'gainspot-3cbad',
    storageBucket: 'gainspot-3cbad.appspot.com',
    messagingSenderId: '985128281237',
    appId: '1:985128281237:web:0dde6ed3ef30b54685e79c'
  },
  apiUrl: 'https://localhost:4200'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// firebaseConfig:{
//   apiKey: "AIzaSyCP8fm5Ov1LFzMO1Pw8kNyeOctL9nU1onI",
//   authDomain: "gainspot-3cbad.firebaseapp.com",
//   databaseURL: "https://gainspot-3cbad-default-rtdb.firebaseio.com",
//   projectId: "gainspot-3cbad",
//   storageBucket: "gainspot-3cbad.appspot.com",
//   messagingSenderId: "985128281237",
//   appId: "1:985128281237:web:0dde6ed3ef30b54685e79c",
//   measurementId: "G-D3ZEYWJ1EZ"
// }