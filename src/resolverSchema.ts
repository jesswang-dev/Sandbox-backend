import { ResolverCache } from 'splache';
import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLNonNull } from 'graphql';
const fetch = require('node-fetch');

const cache = new ResolverCache();

const Person = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        name: {
            type: GraphQLString
        },
        height: {
            type: GraphQLString
        },
        mass: {
            type: GraphQLString
        },
        hair_color: {
            type: GraphQLString
        },
        skin_color: {
            type: GraphQLString
        },
        eye_color: {
            type: GraphQLString
        },
        birth_year:{
            type: GraphQLString
        },
        gender:{
            type: GraphQLString
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        person: {
            type: Person, 
            args: {
                id: {
                    description: 'id of the person',
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent: any, args: any, context: any, info: any) => cache.checkCache(parent, args, context, info, getPerson)
        }
    })
});

//functions getPerson and getPlanet that fetches from SWAPI 
async function getPerson(args:{id:number}) {
    const {id} = args;
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    const data = await response.json();
    return data;
}


export default new GraphQLSchema({
    query: RootQuery
})

