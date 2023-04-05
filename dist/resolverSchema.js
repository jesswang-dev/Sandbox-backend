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
const splache_1 = require("splache");
const graphql_1 = require("graphql");
const fetch = require('node-fetch');
const cache = new splache_1.ResolverCache();
const Person = new graphql_1.GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        name: {
            type: graphql_1.GraphQLString
        },
        height: {
            type: graphql_1.GraphQLString
        },
        mass: {
            type: graphql_1.GraphQLString
        },
        hair_color: {
            type: graphql_1.GraphQLString
        },
        skin_color: {
            type: graphql_1.GraphQLString
        },
        eye_color: {
            type: graphql_1.GraphQLString
        },
        birth_year: {
            type: graphql_1.GraphQLString
        },
        gender: {
            type: graphql_1.GraphQLString
        }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        person: {
            type: Person,
            args: {
                id: {
                    description: 'id of the person',
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
                }
            },
            resolve: (parent, args, context, info) => cache.checkCache(parent, args, context, info, getPerson)
        }
    })
});
//functions getPerson and getPlanet that fetches from SWAPI 
function getPerson(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = args;
        const response = yield fetch(`https://swapi.dev/api/people/${id}`);
        const data = yield response.json();
        return data;
    });
}
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery
});
