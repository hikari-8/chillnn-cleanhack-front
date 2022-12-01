import { Amplify } from '@aws-amplify/core'
export const awsmobile = {
    Auth: {
        region: process.env.AWS_REGION,
        identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.COGNITO_USER_POOL_WEB_CLIENT_ID,
    },
    API: {
        aws_appsync_graphqlEndpoint: process.env.APPSYNC_GRAPHQL_ENDPOINT,
        aws_appsync_region: process.env.AWS_REGION,
        aws_appsync_authenticationType: process.env.APPSYNC_AUTHENTICATIONTYPE,
        aws_appsync_apiKey: process.env.APPSYNC_APIKEY,
    },
    Storage: {
        AWSS3: {
            bucket: process.env.STORAGE_AWSS3_BUCKET!,
            region: process.env.STORAGE_AWSS3_REGION!,
            baseUrl: process.env.STORAGE_AWSS3_BASE_URL!,
        },
    },
}
Amplify.configure({ ...awsmobile, ssr: true })
