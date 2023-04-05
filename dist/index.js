"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const graphql_1 = require("graphql");
const cors_1 = __importDefault(require("cors"));
const splache_1 = require("splache");
const splache_2 = require("splache");
const starWarsSchema_1 = __importDefault(require("./starWarsSchema"));
const resolverSchema_1 = __importDefault(require("./resolverSchema"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = 4002;
const wholeCache = new splache_1.SplacheCacheWhole(starWarsSchema_1.default);
const splacheCache = new splache_2.SplacheCache(starWarsSchema_1.default);
app.get('/', (_req, res) => {
    return res.send('Splache Sandbox on Vercel');
});
app.use('/graphql/resolver', (req, res) => {
    (0, graphql_1.graphql)({ schema: resolverSchema_1.default, source: req.body.query })
        .then((response) => {
        console.log('in resolver', response);
        res.json(response);
    });
});
app.use('/graphql/cacheWhole', wholeCache.wholeCache, (req, res) => {
    res.status(200).json(res.locals.queryResult);
});
app.use('/graphql/splacheCache', splacheCache.GQLquery, (req, res) => {
    res.status(200).json(res.locals.queryResult);
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
