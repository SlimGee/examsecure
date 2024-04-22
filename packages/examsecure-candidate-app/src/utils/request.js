import Amplify, { API, Auth } from 'aws-amplify';
import { retryWrapper } from '.';

const settings = window.rekognitionSettings || {};
const region = settings.region || 'eu-west-1';

Amplify.configure({
  Auth: {
    identityPoolId: settings.cognitoIdentityPool,
    region,
    mandatorySignIn: true,
    userPoolId: settings.cognitoUserPoolId,
    userPoolWebClientId: settings.cognitoUserPoolClientId,
  },
  API: {
    endpoints: [
      {
        name: 'apiGateway',
        endpoint: settings.apiGateway,
        region,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          };
        },
      },
    ],
  },
});

export default (url, method, data) =>
  retryWrapper(() =>
    API[method || 'get']('apiGateway', url, {
      body: data || undefined,
      headers: { 'Content-Type': 'application/json' },
    }),
  );
