// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'sheltervn-cms',
    appId: '1:500152358209:web:44f58e39933bef4582bdc0',
    storageBucket: 'sheltervn-cms.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyAjvvM9mRAGhUZeeWqdobmUSA2ABq-K348',
    authDomain: 'sheltervn-cms.firebaseapp.com',
    messagingSenderId: '500152358209',
  },
  production: false,
  envName: 'DEV',
  i18nPrefix: '',
  appName: 'Shelter Vietnam',
  appShortName: 'Shelter',
  appPrefix: 'ACS',
  domain: {
    app: 'https://sheltervn-cms.web.app'
  },
  API: 'http://localhost:5001/sheltervn-cms/us-central1/webApi',
  // proxy: 'http://localhost:5001/moli-content/us-central1/webApi/api/v1/facebook/proxy/',
  // proxy: 'https://us-central1-moli-cors.cloudfunctions.net/proxyWithCorsAnywhere/',
  // proxy: 'https://cors.bridged.cc/',
  // proxy: 'http://www.whateverorigin.org/get?url=',
  proxy: 'https://square-sound-ef49.mathroya.workers.dev/corsproxy/?apiurl=',
  useEmulators: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
