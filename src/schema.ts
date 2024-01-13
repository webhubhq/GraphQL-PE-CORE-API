// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// getUser(id: String!): User

export const typeDefs = `#graphql

    type Query {
        services: Service,
    }

    enum ServiceType {
        LAMBDA
        S3
        DYNAMODB
        MONGODB
        EC2
    }

    type Service {
        arn: String!
        name: String!
        uniqueName: String!
        type: ServiceType!
    }

    type Mutation {
        create: Create
        serverResponse: ServerResponse
    }

    type Create {
        service: NewService
    }

    type ServerResponse {
        name: String
    }

    type NewService {
        lambda: NewLambda,
        db: DB,
    }

    type NewLambda {
        init(name: String): Lambda
    }

    type Lambda {
        name: String!
        uniqueName: String!
    }

    type DB {
        s3: S3
        dynamoDB: DynamoDB
        mongoDB: MongoDB
    }

    type S3 {
        name: String!
        uniqueName: String!
    }

    type DynamoDB {
        name: String!
        uniqueName: String!
    }

    type MongoDB {
        name: String!
        uniqueName: String!
    }



`;

export const resolvers = {
    Query: {
      services: () => {
        return {
          lambda: {},
          db: {
            mongodb: {},
          },
        };
      },
    },
    
  
    Mutation: {
        create: (parent) => {
            return {
                service: {},
            }
        },
        serverResponse: (parent) => ({
            name: "server-response",
            parent
        }),
    },

    NewService: {
        lambda: (parent) => ({
            
        }),
    },

    NewLambda: {
        init: (...args) => {
            // console.log('args: ', args)
            const [parent, input, context] = args;

            const { name } = input;
            const randomNumber = Math.floor(Math.random() * 10000);

            return {
                name,
                uniqueName: `unique-name-${name}-${randomNumber}`,
            };
        },
    },
  };