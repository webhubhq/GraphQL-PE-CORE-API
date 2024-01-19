import axios from 'axios';

const baseUrl = 'http://localhost:5000';

const resolvers = {

    ApiEndpoint: {
        method: (_) => _.method,
        path: (_) => _.path,
        url: (_) => _.url
    },

    Query: {

        // [APIRequest]
        api: () => {
            return [{
                graphql: {},
                aws: {},
                mongodb: {},
                nextjs: {},
                ledger: {},
            }]
        },
    },

    GraphQLScriptRequest: {

        // CreateGraphQLScriptRequest
        create: (_, { name }, ctx) => {
            const apiendpoint = {
                method: 'POST',
                path: '/v1/api/graphqlscripts/create/:graphqlscriptsname',
                url: `/v1/api/graphqlscripts/create/${name}`
            };
            return {
                name,
                nameID: `${name}-id`,
                apiendpoint
            };  
        },
        
        // DeleteGraphQLScriptRequest
        delete: (_, { nameID }, ctx) => {
            const apiendpoint = {
                method: 'POST',
                path: '/v1/api/graphqlscripts/delete/:graphqlscriptsname',
                url: `/v1/api/graphqlscripts/delete/${nameID}`
            };
            return {
                name: 'name',
                nameID,
                apiendpoint,
            }
        },
        
        // ExecuteGraphQLScriptRequest
        execute: (_, { nameID }, ctx) => {
            const apiendpoint = {
                method: 'POST',
                path: '/v1/api/graphqlscripts/execute/:graphqlscriptsname',
                url: `/v1/api/graphqlscripts/execute/${nameID}`
            };
            return {
                name: 'name',
                nameID,
                apiendpoint
            }
        },
    },

    AWSRequest: {

        // AWSCreateResource
        create: () => ({
            apigateway: {},
            websocket: {},
        }),

        // AWSDeleteResource
        delete: () => ({
            apigateway: {},
            websocket: {},
        }),

        // AWSApiGatewayResourceManager
        apigateway: (_, { nameID }, ctx) => ({
            create: { _apigatewaynameID: nameID },
            delete: { _apigatewaynameID: nameID },
            dynamodb: { _apigatewaynameID: nameID },
            s3: { _apigatewaynameID: nameID },
            lambda: { _apigatewaynameID: nameID },
        }),

        // AWSWebsocketResourceManager
        websocket: async (_, { nameID }, ctx) => {
            const apiendpoint = {
                method: 'POST',
                path: '/v1/api/aws/websocket/:websocketnameID',
                url: `/v1/api/aws/websocket/${nameID}`
            };

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    // 'api-key': '75pQZG2c9zFlpG0g6XCrQCT2BH7fvv1KDYpDJAPUQysxI4Etjrpqvff9n7thEsXP',
                    'Accept': '*/*'
                },
                url: baseUrl + apiendpoint.url,
                method: apiendpoint.method,
            };
            
            const res = await axios(options)
                .then(response => {
                    // Handle successful response
                    // const { data } = response;
                    console.log('Response:', JSON.stringify(response.data));
                    
                    return {
                        
                    };
                })
                .catch(error => {
                    // Handle error
                    console.error('Error:', error);
                    return { error };
                });

            return {
                name: 'name',
                nameID,
                apiendpoint,
            };
        },
    },

        AWSCreateResource: {

            // AWSCreateApiGateway
            apigateway: (_, { name }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/aws/create/apigateway/:apigatewayname',
                    url: `/v1/api/aws/create/apigateway/${name}`
                };
                return {
                    name,
                    nameID: `${name}-id`,
                    apiendpoint,
                };
            },

            // AWSCreateWebsocket
            websocket: (_, { name }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/aws/create/websocket/:websocketname',
                    url: `/v1/api/aws/create/websocket/${name}`
                };
                return {
                    name,
                    nameID: `${name}-id`,
                    apiendpoint,
                };
            },
        },

        AWSDeleteResource: {

            // AWSDeleteApiGateway
            apigateway: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/aws/delete/apigateway/:apigatewaynameID',
                    url: `/v1/api/aws/delete/apigateway/${nameID}`
                };
                return {
                    name: 'name',
                    nameID,
                    apiendpoint,
                };
            },

            // AWSDeleteWebsocket
            websocket: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/aws/delete/websocket/:websocketnameID',
                    url: `/v1/api/aws/delete/websocket/${nameID}`
                };
                return {
                    name: 'name',
                    nameID,
                    apiendpoint,
                };
            },
        },

        AWSApiGatewayResourceManager: {

            // AWSCreateApiGatewayResource
            create: () => ({
                dynamodb: {},
                s3: {},
                lambda: {},
            }),

            // AWSDeleteApiGatewayResource
            delete: () => ({
                dynamodb: {},
                s3: {},
                lambda: {},
            }),

            // AWSDynamoDBResourceManager
            dynamodb: (_, { nameID }, ctx) => {
                console.log('_: ', _)
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/aws/apigateway/:apigatewaynameID/dynamodb/:dynamodbnameID',
                    url: `/v1/api/aws/apigateway/${_?.dynamodb?._apigatewaynameID}/dynamodb/${nameID}`
                };
                return {
                    name: 'name',
                    nameID,
                    apiendpoint,
                };
            },

            // AWSS3ResourceManager
            s3: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/aws/apigateway/:apigatewaynameID/s3/:s3nameID',
                    url: `/v1/api/aws/apigateway/${_?.s3?._apigatewaynameID}/s3/${nameID}`
                };
                return {
                    name: 'name',
                    nameID,
                };
            },

            // AWSLambdaResourceManager
            lambda: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/aws/apigateway/:apigatewaynameID/lambda/:s3nameID',
                    url: `/v1/api/aws/apigateway/${_?.lambda?._apigatewaynameID}/lambda/${nameID}`
                };
                return {
                    name: 'name',
                    nameID,
                    apiendpoint,
                };
            },

        },

            AWSCreateApiGatewayResource: {

                // AWSCreateDynamoDB
                dynamodb: (_, { name }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/aws/apigateway/:apigatewaynameID/create/dynamodb/:dynamodbname',
                        url: `/v1/api/aws/apigateway/${_?.lambda?._apigatewaynameID}/create/dynamodb/${name}`
                    };
                    return {
                        name,
                        nameID: `${name}-id`,
                        apiendpoint,
                    };
                },

                // AWSCreateS3
                s3: (_, { name }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/aws/apigateway/:apigatewaynameID/create/s3/:s3name',
                        url: `/v1/api/aws/apigateway/${_?.s3?._apigatewaynameID}/create/s3/${name}`
                    };
                    return {
                        name,
                        nameID: `${name}-id`,
                    };
                },

                // AWSCreateLambda
                lambda: (_, { name }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/aws/apigateway/:apigatewaynameID/create/lambda/:lambdaname',
                        url: `/v1/api/aws/apigateway/${_?.lambda?._apigatewaynameID}/create/lambda/${name}`
                    };
                    return {
                        name,
                        nameID: `${name}-id`,
                        apiendpoint,
                    };
                },
            },

            AWSDeleteApiGatewayResource: {

                // AWSDeleteDynamoDB
                dynamodb: (_, { nameID }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/aws/apigateway/:apigatewaynameID/delete/dynamodb/:dynamodbnameID',
                        url: `/v1/api/aws/apigateway/${_?.dynamodb?._apigatewaynameID}/delete/dynamodb/${nameID}`
                    };
                    return {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    };
                },

                // AWSDeleteS3
                s3: (_, { nameID }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/aws/apigateway/:apigatewaynameID/delete/s3/:s3nameID',
                        url: `/v1/api/aws/apigateway/${_?.s3?._apigatewaynameID}/delete/s3/${nameID}`
                    };
                    return {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    };
                },

                // AWSDeleteLambda
                lambda: (_, { nameID }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/aws/apigateway/:apigatewaynameID/delete/lambda/:lambdanameID',
                        url: `/v1/api/aws/apigateway/${_?.lambda?._apigatewaynameID}/delete/lambda/${nameID}`
                    };
                    return {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    };
                },
            },
    
    MongoDBRequest: {

        // CreateMongoDB
        create: (_, { name }, ctx) => {
            const apiendpoint = {
                method: 'POST',
                path: '/v1/api/mongodb/create/:mongodbnameID',
                url: `/v1/api/mongodb/create/${name}`
            };
            return {
                name,
                nameID: `${name}-id`
            };  
        },
        
        // DeleteMongoDB
        delete: (_, { nameID }, ctx) => {
            const apiendpoint = {
                method: 'POST',
                path: '/v1/api/mongodb/delete/:mongodbnameID',
                url: `/v1/api/mongodb/delete/${nameID}`
            };
            return {
                name: 'name',
                nameID,
                apiendpoint,
            }
        },

        // MongoDBResourceManager
        db: (_, { nameID }, ctx) => {
            const apiendpoint = {
                method: 'POST',
                path: '/v1/api/mongodb/:mongodbnameID',
                url: `/v1/api/mongodb/${nameID}`
            };
            return {
                name: 'name',
                nameID,
                apiendpoint,
            }
        },

        // MongoDBResourceScript
        script: () => ({
            execute: {},
            executegraphql: {},
        })
    },

        MongoDBResourceScript: {
            execute: async (_, { mongodbscript }, ctx) => {

                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/mongodb/script',
                    url: '/v1/api/mongodb/script',
                }

                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': '75pQZG2c9zFlpG0g6XCrQCT2BH7fvv1KDYpDJAPUQysxI4Etjrpqvff9n7thEsXP',
                        'Accept': '*/*'
                    },
                    url: 'https://us-east-1.aws.data.mongodb-api.com/app/data-bhaqy/endpoint/custom/webhub/api/dev',
                    method: 'POST',
                    data: mongodbscript,
                };
                
                const res = await axios(options)
                    .then(response => {
                        // Handle successful response
                        const { data } = response;
                        // console.log('Response:', Object.keys(data.response));
                        console.log('JSON.stringify(data.status): ', JSON.stringify(data.response.status))
                        console.log('JSON.stringify(data.variables): ', JSON.stringify(data.response.variables))
                        return {
                            status: JSON.stringify(data.response.status),
                            variables: JSON.stringify(data.response.variables),
                            apiendpoint,
                        };
                    })
                    .catch(error => {
                        // Handle error
                        console.error('Error:', error);
                        return { status: `failed: ${error}`, variables: '{}', apiendpoint };
                    });

                return { ...res };
            },

            executegraphql: async (_, { mongodbscriptbuild }, ctx) => {

                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/mongodb/script',
                    url: '/v1/api/mongodb/script',
                }

                console.log('mongodbscriptbuild: ', mongodbscriptbuild)
                console.log('mongodbscriptbuild: ', JSON.stringify(mongodbscriptbuild))

                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': '75pQZG2c9zFlpG0g6XCrQCT2BH7fvv1KDYpDJAPUQysxI4Etjrpqvff9n7thEsXP',
                        'Accept': '*/*'
                    },
                    url: 'https://us-east-1.aws.data.mongodb-api.com/app/data-bhaqy/endpoint/custom/webhub/api/dev',
                    method: 'POST',
                    data: JSON.stringify(mongodbscriptbuild),
                };
                
                const res = await axios(options)
                    .then(response => {
                        // Handle successful response
                        const { data } = response;
                        // console.log('Response:', Object.keys(data.response));
                        // console.log('JSON.stringify(data.status): ', JSON.stringify(data.response.status))
                        // console.log('JSON.stringify(data.variables): ', JSON.stringify(data.response.variables))
                        return {
                            status: JSON.stringify(data.response.status),
                            variables: JSON.stringify(data.response.variables),
                            apiendpoint,
                        };
                    })
                    .catch(error => {
                        // Handle error
                        console.error('Error:', error);
                        return { status: `failed: ${error}`, variables: '{}', apiendpoint };
                    });

                return { ...res };
            },

        },
        

    NextJsRequest: {

        // CreateNextJsResource
        create: (_, { name }, ctx) => {
            const apiendpoint = {
                method: 'POST',
                path: '/v1/api/nextjs/create/:nextjsnameID',
                url: `/v1/api/nextjs/create/${name}`
            };
            return {
                name,
                nameID: `${name}-id`,
                apiendpoint,
            };  
        },
        
        // DeleteNextJsResource
        delete: (_, { nameID }, ctx) => {
            const apiendpoint = {
                method: 'POST',
                path: '/v1/api/nextjs/delete/:nextjsnameID',
                url: `/v1/api/nextjs/delete/${nameID}`
            };
            return {
                name: 'name',
                nameID,
                apiendpoint,
            }
        },

        // NextJsResourceManager
        resource: (_, { nameID }, ctx) => {
            const apiendpoint = {
                method: 'POST',
                path: '/v1/api/nextjs/:nextjsnameID',
                url: `/v1/api/nextjs/${nameID}`
            };
            return {
                name: 'name',
                nameID,
                apiendpoint,
            }
        },
    },

    LedgerRequest: {

        // AppEnvironmentVariablesLedger
        environmentVariables: () => ({
            api: {},
            ec2: {},
            apigateway: {},
            websocket: {},
            mongodb: {},
            nextjs: {},
        }),

        // AppSecretsLedger
        secrets: (_, { secretApiKey }, ctx) => ({
            api: { secretApiKey },
            ec2: { secretApiKey },
            apigateway: { secretApiKey },
            websocket: { secretApiKey },
            mongodb: { secretApiKey },
            nextjs: { secretApiKey },
        }),

        // AppEventsLedger
        events: () => ({
            api: {},
            graphqlscripts: {},
            ec2: {},
            apigateway: {},
            websocket: {},
            mongodb: {},
            nextjs: {},
        }),
        
        // AppArchitectureLedger
        architecture: () => ({
            api: {},
            ec2: {},
            apigateway: {},
            websocket: {},
            mongodb: {},
            nextjs: {},
        }),

    },

        AppEnvironmentVariablesLedger: {

            // APIEnvironmenVariablesLedger
            api: () => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/environmentvariables/api',
                    url: `/v1/api/ledger/environmentvariables/api`
                };
                return {
                    rid: 'api-rid',
                    apiendpoint,
                };
            },

            // [EC2EnvironmentVariablesLedger]
            ec2: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/environmentvariables/ec2/:ec2nameID',
                    url: `/v1/api/ledger/environmentvariables/ec2/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        id: 'id',
                        apiendpoint,
                    }
                ];
            },

            // [ApiGatewayEnvironmentVariablesLedger]
            apigateway: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/environmentvariables/apigateway/:apigatewaynameID',
                    url: `/v1/api/ledger/environmentvariables/apigateway/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        dynamodb: { _apigatewaynameID: nameID },
                        s3: { _apigatewaynameID: nameID },
                        lambda: { _apigatewaynameID: nameID },
                        apiendpoint,
                    }
                ];
            },

            // [WebsocketEnvironmentVariablesLedger]
            websocket: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/environmentvariables/websocket/:websocketnameID',
                    url: `/v1/api/ledger/environmentvariables/websocket/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },

            // [MongoDBEnvironmentVariablesLedger]
            mongodb: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/environmentvariables/mongodb/:mongodbnameID',
                    url: `/v1/api/ledger/environmentvariables/mongodb/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },

            // [NextJsEnvironmentVariablesLedger]
            nextjs: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/environmentvariables/nextjs/:nextjsnameID',
                    url: `/v1/api/ledger/environmentvariables/nextjs/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },
        },

            ApiGatewayEnvironmentVariablesLedger: {

                // [DynamoEnvironmentVariablesLedger]
                dynamodb: (_, { nameID }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/ledger/environmentvariables/apigateway/:apigatewaynameID/dynamodb/:dynamodbnameID',
                        url: `/v1/api/ledger/environmentvariables/apigateway/${_?.dynamodb?._apigatewaynameID}/dynamodb/${nameID ? '/' + nameID : ''}`
                    };
                    return [
                        {
                            name: 'name',
                            nameID,
                            apiendpoint,
                        }
                    ];
                },

                // [S3SEnvironmentVariablesLedger]
                s3: (_, { nameID }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/ledger/environmentvariables/apigateway/:apigatewaynameID/s3/:s3nameID',
                        url: `/v1/api/ledger/environmentvariables/apigateway/${_?.s3?._apigatewaynameID}/s3/${nameID ? '/' + nameID : ''}`
                    };
                    return [
                        {
                            name: 'name',
                            nameID,
                            apiendpoint,
                        }
                    ];
                },
                
                // [LambdaEnvironmentVariablesLedger]
                lambda: (_, { nameID }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/ledger/environmentvariables/apigateway/:apigatewaynameID/lambda/:lambdanameID',
                        url: `/v1/api/ledger/environmentvariables/apigateway/${_?.lambda?._apigatewaynameID}/lambda/${nameID ? '/' + nameID : ''}`
                    };
                    return [
                        {
                            name: 'name',
                            nameID,
                            apiendpoint,
                        }
                    ];
                },
            },

        AppSecretsLedger: {

            // APISecretsLedger
            api: () => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/secrets/api',
                    url: `/v1/api/ledger/secrets/api`
                };
                return {
                    apiKey: 'api-key',
                    apiendpoint,
                };
            },

            // [EC2SecretsLedger]
            ec2: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/secrets/ec2/:ec2nameID',
                    url: `/v1/api/ledger/secrets/ec2/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },

            // [ApiGatewaySecretsLedger]
            apigateway: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/secrets/apigateway/:apigatewaynameID',
                    url: `/v1/api/ledger/secrets/apigateway/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        dynamodb: { _apigatewaynameID: nameID },
                        s3: { _apigatewaynameID: nameID },
                        lambda: { _apigatewaynameID: nameID },
                        apiendpoint,
                    }
                ];
            },

            // [WebsocketSecretsLedger]
            websocket: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/secrets/websocket/:websocketnameID',
                    url: `/v1/api/ledger/secrets/websocket/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },

            // [MongoDBSecretsLedger]
            mongodb: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/secrets/mongodb/:mongodbnameID',
                    url: `/v1/api/ledger/secrets/mongodb/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },

            // [NextJsSecretsLedger]
            nextjs: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/secrets/nextjs/:nextjsnameID',
                    url: `/v1/api/ledger/secrets/nextjs/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },
        },

            ApiGatewaySecretsLedger: {

                // [DynamoDBSecretsLedger]
                dynamodb: (_, { nameID }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/ledger/secrets/apigateway/:apigatewaynameID/dynamodb/:dynamodbnameID',
                        url: `/v1/api/ledger/secrets/apigateway/${_?.dynamodb?._apigatewaynameID}/dynamodb/${nameID ? '/' + nameID : ''}`
                    };
                    return [
                        {
                            name: 'name',
                            nameID,
                        }
                    ];
                },

                // [S3SecretsLedger]
                s3: (_, { nameID }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/ledger/secrets/apigateway/:apigatewaynameID/s3/:s3nameID',
                        url: `/v1/api/ledger/secrets/apigateway/${_?.s3?._apigatewaynameID}/s3/${nameID ? '/' + nameID : ''}`
                    };
                    return [
                        {
                            name: 'name',
                            nameID,
                            apiendpoint,
                        }
                    ];
                },
                
                // [LambdaSecretsLedger]
                lambda: (_, { nameID }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/ledger/secrets/apigateway/:apigatewaynameID/lambda/:lambdanameID',
                        url: `/v1/api/ledger/secrets/apigateway/${_?.lambda?._apigatewaynameID}/lambda/${nameID ? '/' + nameID : ''}`
                    };
                    return [
                        {
                            name: 'name',
                            nameID,
                            apiendpoint,
                        }
                    ];
                },
            },

        AppEventsLedger: {

            // APIEventsLedger
            api: () => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/events/api',
                    url: `/v1/api/ledger/events/api`
                };
                return {
                    createdAt: 'date',
                    apiendpoint,
                };
            },

            // [GraphQLScriptsEventsLedger] 
            graphqlscripts: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/events/graphqlscripts/:graphqlscriptsnameID',
                    url: `/v1/api/ledger/events/graphqlscripts/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },

            // [EC2EventsLedger]
            ec2: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/events/ec2/:ec2nameID',
                    url: `/v1/api/ledger/events/ec2/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },

            // [ApiGatewayEventsLedger]
            apigateway: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/events/apigateway/:apigatewaynameID',
                    url: `/v1/api/ledger/events/apigateway/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        dynamodb: { _apigatewaynameID: nameID },
                        s3: { _apigatewaynameID: nameID },
                        lambda: { _apigatewaynameID: nameID },
                        apiendpoint,
                    }
                ];
            },

            // [WebsocketEventsLedger]
            websocket: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/events/websocket/:websocketnameID',
                    url: `/v1/api/ledger/events/websocket/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },

            // [MongoDBEventsLedger]
            mongodb: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/events/mongodb/:mongodbnameID',
                    url: `/v1/api/ledger/events/mongodb/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },

            // [NextJsEventsLedger]
            nextjs: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/events/nextjs/:nextjsnameID',
                    url: `/v1/api/ledger/events/nextjs/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },
        },

            ApiGatewayEventsLedger: {

                // [DynamoDBEventsLedger]
                dynamodb: (_, { nameID }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/ledger/events/apigateway/:apigatewaynameID/dynamodb/:dynamodbnameID',
                        url: `/v1/api/ledger/events/apigateway/${_?.dynamodb?._apigatewaynameID}/dynamodb/${nameID ? '/' + nameID : ''}`
                    };
                    return [
                        {
                            name: 'name',
                            nameID,
                            apiendpoint,
                        }
                    ];
                },

                // [S3EventsLedger]
                s3: (_, { nameID }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/ledger/events/apigateway/:apigatewaynameID/s3/:s3nameID',
                        url: `/v1/api/ledger/events/apigateway/${_?.s3?._apigatewaynameID}/s3/${nameID ? '/' + nameID : ''}`
                    };
                    return [
                        {
                            name: 'name',
                            nameID,
                            apiendpoint,
                        }
                    ];
                },
                
                // [LambdaEventsLedger]
                lambda: (_, { nameID }, ctx) => {
                    const apiendpoint = {
                        method: 'POST',
                        path: '/v1/api/ledger/events/apigateway/:apigatewaynameID/lambda/:lambdanameID',
                        url: `/v1/api/ledger/events/apigateway/${_?.lambda?._apigatewaynameID}/lambda/${nameID ? '/' + nameID : ''}`
                    };
                    return [
                        {
                            name: 'name',
                            nameID,
                            apiendpoint,
                        }
                    ];
                },
            },

        AppArchitectureLedger: {

            // APIArchitectureLedger
            api: () => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/architecture/api',
                    url: `/v1/api/ledger/architecture/api`
                };
                return {
                    createdAt: 'date',
                    apiendpoint,
                };
            },

            // [EC2ArchitectureLedger]
            ec2: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/architecture/ec2/:ec2nameID',
                    url: `/v1/api/ledger/architecture/ec2/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },

            // [ApiGatewayArchitectureLedger]
            apigateway: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/architecture/apigateway/:apigatewaynameID',
                    url: `/v1/api/ledger/architecture/apigateway/:apigatewaynameID${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [WebsocketArchitectureLedger]
            websocket: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/architecture/websocket/:websocketnameID',
                    url: `/v1/api/ledger/architecture/websocket/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },

            // [MongoDBArchitectureLedger]
            mongodb: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/architecture/mongodb/:mongodbnameID',
                    url: `/v1/api/ledger/architecture/mongodb/${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },

            // [NextJsArchitectureLedger]
            nextjs: (_, { nameID }, ctx) => {
                const apiendpoint = {
                    method: 'POST',
                    path: '/v1/api/ledger/architecture/nextjs/:nextjsnameID',
                    url: `/v1/api/ledger/architecture/nextjs${nameID ? '/' + nameID : ''}`
                };
                return [
                    {
                        name: 'name',
                        nameID,
                        apiendpoint,
                    }
                ];
            },
        },


  };

export default resolvers;