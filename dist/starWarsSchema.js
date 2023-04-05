"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql = require('graphql');
//used to convert the JS data types and custom data types into GraphQL-friendly types for compilation
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLNonNull } = require('graphql');
const fetch = require('node-fetch');
//two versions of demo app - one uses splacheCache and cacheWhole
// type Person {
//     id: ID!
//     name: String!
//     height: Int
//     mass: Int
//     hair_color: String
//     skin_color: String
//     eye_color: String
//     birth_year: String
//     gender: String
// }
//Root Query: the type that represents all the possible entry points into the GraphQL API
const Person = new graphql.GraphQLObjectType({
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
        birth_year: {
            type: GraphQLString
        },
        gender: {
            type: GraphQLString
        }
    })
});
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
            resolve: (_source, { id }) => getPerson(id)
        }
    })
});
//function getPerson that fetches from SWAPI 
function getPerson(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://swapi.dev/api/people/${id}`);
        const data = yield response.json();
        return data;
    });
}
exports.default = new GraphQLSchema({
    query: RootQuery
});
