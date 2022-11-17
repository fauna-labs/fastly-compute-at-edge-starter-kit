// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'; // polyfills AbortController, which is required by the driver
import faunadb from 'faunadb';

export const q = faunadb.query;

export const faunaClient = new faunadb.Client({
  // setTimeout() is not supported while running inside Compute@Edge. 
  // We can disable HTTP timeouts on the client-side setting the option value to null
  timeout: null,
  // CustomFetch: Sends the fetch request to the "fauna" backend
  fetch: (url, params) => fetch(url, { backend: "fauna", ...params })
})
