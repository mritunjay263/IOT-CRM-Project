import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:9090/',
  realm: 'iot-crm',
  clientId: 'auth-api-iotcontrol',
});

export const initKeycloak = (onAuthenticatedCallback: () => void) => {
  keycloak.init({
    onLoad: 'login-required',
    checkLoginIframe: false,
    pkceMethod: 'S256',
    enableLogging: true,
    redirectUri: window.location.origin, // Always redirect to dashboard after login
  }).then((authenticated) => {
    if (authenticated) {
      localStorage.setItem('kc_token', keycloak.token || '');
      onAuthenticatedCallback();
    } else {
      window.location.reload();
    }
  });
};

export const doLogin = keycloak.login;
export const doLogout = keycloak.logout;
export const getToken = () => localStorage.getItem('kc_token');
export const isLoggedIn = () => !!keycloak.token;
export const updateToken = (successCallback: () => void) => {
  keycloak.updateToken(5).then(successCallback).catch(doLogin);
};

export default keycloak;
