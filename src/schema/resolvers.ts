const resolvers = {
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
        create: (_, { name }, ctx) => {
            return {
                name,
                nameID: `${name}-id`
            };  
        },
        
        delete: (_, { nameID }, ctx) => {
            return {
                name: 'name',
                nameID,
            }
        },
        
        execute: (_, { nameID }, ctx) => {
            return {
                name: 'name',
                nameID,
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
            create: { nameID },
            delete: { nameID },
            dynamodb: { nameID },
            s3: { nameID },
            lambda: { nameID },
        }),

        // AWSWebsocketResourceManager
        websocket: (_, { nameID }, ctx) => {
            return {
                name: 'name',
                nameID,
            };
        },
    },

        AWSCreateResource: {

            // AWSCreateApiGateway
            apigateway: (_, { name }, ctx) => {
                return {
                    name,
                    nameID: `${name}-id`,
                };
            },

            // AWSCreateWebsocket
            websocket: (_, { name }, ctx) => {
                return {
                    name,
                    nameID: `${name}-id`,
                };
            },
        },

        AWSDeleteResource: {

            // AWSDeleteApiGateway
            apigateway: (_, { nameID }, ctx) => {
                return {
                    name: 'name',
                    nameID,
                };
            },

            // AWSDeleteWebsocket
            websocket: (_, { nameID }, ctx) => {
                return {
                    name: 'name',
                    nameID,
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
                return {
                    name: 'name',
                    nameID,
                };
            },

            // AWSS3ResourceManager
            s3: (_, { nameID }, ctx) => {
                return {
                    name: 'name',
                    nameID,
                };
            },

            // AWSLambdaResourceManager
            lambda: (_, { nameID }, ctx) => {
                return {
                    name: 'name',
                    nameID,
                };
            },

        },

            AWSCreateApiGatewayResource: {

                // AWSCreateDynamoDB
                dynamodb: (_, { name }, ctx) => {
                    return {
                        name,
                        nameID: `${name}-id`,
                    };
                },

                // AWSCreateS3
                s3: (_, { name }, ctx) => {
                    return {
                        name,
                        nameID: `${name}-id`,
                    };
                },

                // AWSCreateLambda
                lambda: (_, { name }, ctx) => {
                    return {
                        name,
                        nameID: `${name}-id`,
                    };
                },
            },

            AWSDeleteApiGatewayResource: {

                // AWSDeleteDynamoDB
                dynamodb: (_, { nameID }, ctx) => {
                    return {
                        name: 'name',
                        nameID,
                    };
                },

                // AWSDeleteS3
                s3: (_, { nameID }, ctx) => {
                    return {
                        name: 'name',
                        nameID,
                    };
                },

                // AWSDeleteLambda
                lambda: (_, { nameID }, ctx) => {
                    return {
                        name: 'name',
                        nameID,
                    };
                },
            },
    
    MongoDBRequest: {

        // CreateMongoDB
        create: (_, { name }, ctx) => {
            return {
                name,
                nameID: `${name}-id`
            };  
        },
        
        // DeleteMongoDB
        delete: (_, { nameID }, ctx) => {
            return {
                name: 'name',
                nameID,
            }
        },

        // MongoDBResourceManager
        db: (_, { nameID }, ctx) => {
            return {
                name: 'name',
                nameID,
            }
        },
    },

    NextJsRequest: {

        // CreateNextJsResource
        create: (_, { name }, ctx) => {
            return {
                name,
                nameID: `${name}-id`
            };  
        },
        
        // DeleteNextJsResource
        delete: (_, { nameID }, ctx) => {
            return {
                name: 'name',
                nameID,
            }
        },

        // NextJsResourceManager
        resource: (_, { nameID }, ctx) => {
            return {
                name: 'name',
                nameID,
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
            api: {},
            ec2: {},
            apigateway: {},
            websocket: {},
            mongodb: {},
            nextjs: {},
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
                return {
                    rid: 'api-rid'
                };
            },

            // [EC2EnvironmentVariablesLedger]
            ec2: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                        id: 'id',
                    }
                ];
            },

            // [ApiGatewayEnvironmentVariablesLedger]
            apigateway: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                        dynamodb: {},
                        s3: {},
                        lambda: {},
                    }
                ];
            },

            // [WebsocketEnvironmentVariablesLedger]
            websocket: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [MongoDBEnvironmentVariablesLedger]
            mongodb: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [NextJsEnvironmentVariablesLedger]
            nextjs: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },
        },

            ApiGatewayEnvironmentVariablesLedger: {

                // [DynamoEnvironmentVariablesLedger]
                dynamodb: (_, { nameID }, ctx) => {
                    return [
                        {
                            name: 'name',
                            nameID,
                        }
                    ];
                },

                // [S3SEnvironmentVariablesLedger]
                s3: (_, { nameID }, ctx) => {
                    return [
                        {
                            name: 'name',
                            nameID,
                        }
                    ];
                },
                
                // [LambdaEnvironmentVariablesLedger]
                lambda: (_, { nameID }, ctx) => {
                    return [
                        {
                            name: 'name',
                            nameID,
                        }
                    ];
                },
            },

        AppSecretsLedger: {

            // APISecretsLedger
            api: () => {
                return {
                    apiKey: 'api-key'
                };
            },

            // [EC2SecretsLedger]
            ec2: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [ApiGatewaySecretsLedger]
            apigateway: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                        dynamodb: {},
                        s3: {},
                        lambda: {},
                    }
                ];
            },

            // [WebsocketSecretsLedger]
            websocket: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [MongoDBSecretsLedger]
            mongodb: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [NextJsSecretsLedger]
            nextjs: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },
        },

            ApiGatewaySecretsLedger: {

                // [DynamoDBSecretsLedger]
                dynamodb: (_, { nameID }, ctx) => {
                    return [
                        {
                            name: 'name',
                            nameID,
                        }
                    ];
                },

                // [S3SecretsLedger]
                s3: (_, { nameID }, ctx) => {
                    return [
                        {
                            name: 'name',
                            nameID,
                        }
                    ];
                },
                
                // [LambdaSecretsLedger]
                lambda: (_, { nameID }, ctx) => {
                    return [
                        {
                            name: 'name',
                            nameID,
                        }
                    ];
                },
            },

        AppEventsLedger: {

            // APIEventsLedger
            api: () => {
                return {
                    createdAt: 'date',
                };
            },

            // [GraphQLScriptsEventsLedger] 
            graphqlscripts: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [EC2EventsLedger]
            ec2: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [ApiGatewayEventsLedger]
            apigateway: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                        dynamodb: {},
                        s3: {},
                        lambda: {},
                    }
                ];
            },

            // [WebsocketEventsLedger]
            websocket: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [MongoDBEventsLedger]
            mongodb: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [NextJsEventsLedger]
            nextjs: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },
        },

            ApiGatewayEventsLedger: {

                // [DynamoDBEventsLedger]
                dynamodb: (_, { nameID }, ctx) => {
                    return [
                        {
                            name: 'name',
                            nameID,
                        }
                    ];
                },

                // [S3EventsLedger]
                s3: (_, { nameID }, ctx) => {
                    return [
                        {
                            name: 'name',
                            nameID,
                        }
                    ];
                },
                
                // [LambdaEventsLedger]
                lambda: (_, { nameID }, ctx) => {
                    return [
                        {
                            name: 'name',
                            nameID,
                        }
                    ];
                },
            },

        AppArchitectureLedger: {

            // APIArchitectureLedger
            api: () => {
                return {
                    createdAt: 'date',
                };
            },

            // [EC2ArchitectureLedger]
            ec2: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [ApiGatewayArchitectureLedger]
            apigateway: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [WebsocketArchitectureLedger]
            websocket: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [MongoDBArchitectureLedger]
            mongodb: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },

            // [NextJsArchitectureLedger]
            nextjs: (_, { nameID }, ctx) => {
                return [
                    {
                        name: 'name',
                        nameID,
                    }
                ];
            },
        },


  };

export default resolvers;