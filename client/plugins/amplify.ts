import { Amplify } from '@aws-amplify/core'
// 使えるログ ↓
//cognito
console.error(process.env)
console.log(
    'nuxt.config.jsでdev.envのパスが通っているかどうかAWS_REGION:',
    process.env.AWS_REGION
)
console.log(
    'nuxt.config.jsでdev.envのパスが通っているかどうか:COGNITO_IDENTITY_POOL_ID',
    process.env.COGNITO_IDENTITY_POOL_ID
)
console.log(
    'nuxt.config.jsでdev.envのパスが通っているかどうか:COGNITO_USER_POOL_ID',
    process.env.COGNITO_USER_POOL_ID
)
console.log(
    'nuxt.config.jsでdev.envのパスが通っているかどうか:COGNITO_USER_POOL_WEB_CLIENT_ID',
    process.env.COGNITO_USER_POOL_WEB_CLIENT_ID
)

// appsync
console.log(
    'nuxt.config.jsでdev.envのパスが通っているかどうかAPPSYNC_GRAPHQL_ENDPOINT:',
    process.env.APPSYNC_GRAPHQL_ENDPOINT
)
console.log(
    'nuxt.config.jsでdev.envのパスが通っているかどうかAPPSYNC_AUTHENTICATIONTYPE:',
    process.env.APPSYNC_AUTHENTICATIONTYPE
)
console.log(
    'nuxt.config.jsでdev.envのパスが通っているかどうかAPPSYNC_APIKEY:',
    process.env.APPSYNC_APIKEY
)

//s3
console.log(
    'nuxt.config.jsでdev.envのパスが通っているかどうかSTORAGE_AWSS3_BUCKET:',
    process.env.STORAGE_AWSS3_BUCKET
)
console.log(
    'nuxt.config.jsでdev.envのパスが通っているかどうかSTORAGE_AWSS3_REGION:',
    process.env.STORAGE_AWSS3_REGION
)
console.log(
    'nuxt.config.jsでdev.envのパスが通っているかどうかSTORAGE_AWSS3_BASE_URL:',
    process.env.STORAGE_AWSS3_BASE_URL
)
export const awsmobile = {
    // Auth: {
    //     region: 'ap-northeast-1',
    //     identityPoolId: 'ap-northeast-1:d325a6da-3c60-4427-94a5-31998a94e470',
    //     userPoolId: 'ap-northeast-1_Kb5taqf8B',
    //     userPoolWebClientId: '6fblhrptkk5l14segqgbrr90mj',
    // },
    // API: {
    //     aws_appsync_graphqlEndpoint:
    //         'https://c5ukhljm3jc65hfhd4pmo5xkmy.appsync-api.ap-northeast-1.amazonaws.com/graphql',
    //     aws_appsync_region: 'ap-northeast-1'!,
    //     aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    //     aws_appsync_apiKey: 'da2-dkc3nnifd5d5pcvii7s2d54ofm',
    // },
    // Storage: {
    //     AWSS3: {
    //         bucket: 'chillnn-cleanhack-static-asset-dev'!,
    //         region: 'ap-northeast-1'!,
    //         baseUrl: 'https://dev.chillnn-training.chillnn-cleanhack.link'!,
    //     },
    // },
    Auth: {
        region: process.env.AWS_REGION,
        identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.COGNITO_USER_POOL_WEB_CLIENT_ID,
    },
    API: {
        aws_appsync_graphqlEndpoint: process.env.APPSYNC_GRAPHQL_ENDPOINT,
        aws_appsync_region: process.env.AWS_REGION!,
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
