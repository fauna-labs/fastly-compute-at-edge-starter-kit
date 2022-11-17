// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { q, faunaClient } from './fauna';

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  const req = event.request;
  const method = req.method;
  const url = new URL(event.request.url);
  const pathname = url.pathname;

  const dict = new ConfigStore("fauna_env_variables");
  const API_KEY = dict.get("FAUNA_ACCESS_KEY");
  
  // e.g. GET /
  if (method == "GET" && pathname == "/") {
    try {      
      const cacheOverride = new CacheOverride("override", { ttl: 60 });

      const res = await faunaClient.query(
        // Place FQL query here. e.g. 
        q.Concat(["Hello", "World"], " "),
        {
          secret: API_KEY, // Provides the API key to the Fauna database
          cacheOverride    // fetch() options (e.g. cacheOverride) can be passed in as such
        } 
      )
      return new Response(
        JSON.stringify(res, null, 2), 
        { status: 200 }
      );
    } catch(err) {
      return new Response(
        err.message,
        { status: err.requestResult.statusCode }
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
