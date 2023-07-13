// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { CacheOverride } from "fastly:cache-override";
import { ConfigStore } from "fastly:config-store";
import { Client, fql } from "fauna";
import { FastlyFetchClient } from './fauna';

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));


async function handleRequest(event) {
  const req = event.request;
  const method = req.method;
  const requestUrl = new URL(event.request.url);
  const pathname = requestUrl.pathname;

  const dict = new ConfigStore("fauna_env_variables");
  const secret = dict.get("FAUNA_ACCESS_KEY");
  const url = "https://db.fauna.com";
  const backend = "fauna";

  // e.g. GET /
  if (method == "GET" && pathname == "/") {
    try {
      // you can pass in fetch options like this
      const cacheOverride = new CacheOverride("override", { ttl: 60 });
      const options = { cacheOverride }

      const client = new Client({ secret }, new FastlyFetchClient(url, backend, options));
      const res = await client.query(fql`
        let helloWorld = "Hello " + "World"
        helloWorld
      `);

      client.close();

      return new Response(
        JSON.stringify(res.data, null, 2), 
        { status: 200 }
      );
    } catch(err) {
      return new Response(
        err.queryInfo.summary,
        { status: err.httpStatus }
      );
    }
  }

  // e.g. POST /example
  // if (method == "POST" && pathname == "/example") {
  //   ...
  // }

  // e.g PUT /example/{id}
  // if (method == "PUT" && pathname.match(`\/example\/[^\/]+(\/)?$`)) {
  //   const id = decodeURI(pathname.split('/')[2]);
  //   ...
  // }

  // e.g DELETE /example/{id}
  // if (method == "DELETE" && pathname.match(`\/example\/[^\/]+(\/)?$`)) {
  //   const id = decodeURI(pathname.split('/')[2]);
  //   ...
  // }

  return new Response("The page you requested could not be found", {
    status: 404
  });  
}
