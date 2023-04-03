import express, { Request, Response } from 'express';
import { graphql } from 'graphql';
import cors from 'cors';
import { SplacheCacheWhole } from 'splache';
import { SplacheCache } from 'splache';
import starWarsSchema from './starWarsSchema';
import resolverSchema from './resolverSchema';

const app = express();
app.use(express.json());
app.use(cors());
const port = 4002;

const wholeCache = new SplacheCacheWhole(starWarsSchema)
const splacheCache = new SplacheCache(starWarsSchema)


app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel')
})

app.use('/graphql/resolver', (req, res) => {
    graphql({ schema: resolverSchema, source: req.body.query})
      .then((response: any) => {
        console.log('in resolver',response);
        res.json(response);
      })
  })

app.use('/graphql/cacheWhole', wholeCache.wholeCache, (req, res) => {
    res.status(200).json(res.locals.queryResult);
  })

app.use('/graphql/splacheCache', splacheCache.GQLquery, (req, res) => {
    res.status(200).json(res.locals.queryResult);
  })

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})