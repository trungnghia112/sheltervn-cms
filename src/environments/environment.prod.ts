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
  production: true,
  envName: 'PROD',
  i18nPrefix: '',
  appName: 'Shelter Vietnam',
  appShortName: 'Shelter',
  appPrefix: 'ACS',
  domain: {
    app: 'https://sheltervn-cms.web.app'
  },
  API: 'https://us-central1-sheltervn-cms.cloudfunctions.net/webApi',
  // proxy: 'http://localhost:5001/moli-content/us-central1/webApi/api/v1/facebook/proxy/',
  // proxy: 'https://us-central1-moli-cors.cloudfunctions.net/proxyWithCorsAnywhere/',
  // proxy: 'https://cors.bridged.cc/',
  // proxy: 'http://www.whateverorigin.org/get?url=',
  proxy: 'https://square-sound-ef49.mathroya.workers.dev/corsproxy/?apiurl=',
  useEmulators: false
};
