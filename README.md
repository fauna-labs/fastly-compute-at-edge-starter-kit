# Fauna + Fastly Compute@Edge Starter Kit

> This is a starter-kit for using the [Fauna JavaScript Driver](https://github.com/fauna/faunadb-js) 
> on [Compute@Edge](https://www.fastly.com/products/edge-compute). 



[![Deploy to Fastly](https://deploy.edgecompute.app/button)](https://deploy.edgecompute.app/deploy)

**For more details about this and other starter kits for Compute@Edge, see the [Fastly Developer Hub](https://developer.fastly.com/solutions/starters/)**.


---

## About this Starter

This starter kit provides the necessary dependencies and configuration allowing you to immediately write queries that
store and retrieve data from [Fauna](#about-fauna). It is also a sample for building REST APIs with Compute@Edge.
The sample simply implements a `GET /` endpoint, providing an example of sending query requests to Fauna.
In this contrived example, the query simply asks the database to concatenate the words "Hello" and "World", 
returning the string "Hello World" as a response, but you should be able to send any query to the database.

## Fauna Setup
Follow [these](https://docs.fauna.com/fauna/current/learn/quick_start/client_quick_start?lang=javascript#prerequisites)
instructions from steps 1 through 3 to obtain an access key. For local development, 
copy and paste the value of the acces key into `FAUNA_ACCESS_KEY` in the [fastly.toml](./fastly.toml) file.


## Test locally
```
fastly compute serve
```

## Deploy using [Fastly CLI](https://developer.fastly.com/learning/compute/#install-the-fastly-cli)
* Deploy
  ```
  fastly compute publish --status-check-off
  ```
  When prompted, provide the following values:
  * Create a new service: `y`
  * Service name: *Provide name or use defaulted value*
  * Domain: *Provide domain name or use dafaulted value*
  * Backend (hostname or IP address, or leave blank to stop adding backends): `db.fauna.com`
  * Backend port number: `443`
  * Backend name: `fauna`
* Create a [private dictionary](https://developer.fastly.com/learning/concepts/dynamic-config/#private-dictionaries) 
using the [web interface](https://docs.fastly.com/en/guides/working-with-dictionaries-using-the-web-interface#creating-a-dictionary), 
[API](https://developer.fastly.com/reference/api/dictionaries/dictionary/#create-dictionary) 
or [fastly CLI](https://developer.fastly.com/reference/cli/dictionary/create/):

  * Dictionary name = `fauna_env_variables`
  * Set write-only = `true`
  * Create a dictionary item with the key = `FAUNA_ACCESS_KEY` and value = the access key obtained from the Fauna database.

  Example steps using CLI:
  1. Create dictionary
      ```
      fastly dictionary create \
      --version=active --autoclone --write-only \
      --name=fauna_env_variables
      ```
  2. Get the dictionary Id
      ```
      fastly dictionary list --version=latest
      ```  
  3. Enter the key-value pair
      ```
      fastly dictionary-entry update \
      --dictionary-id=DICTIONARY-ID \
      --key=FAUNA_ACCESS_KEY \
      --value=<ACCESS_KEY>
      ```

* Activate the service
  ```
  fastly service-version activate --version=latest
  ```
* Monitor logs
  ```
  fastly log-tail
  ```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md).

## About Fauna
Fauna is a distributed document-relational database delivered as a cloud API. 
It combines support for semi-structured data with powerful relational features such as foreign keys, views, and joins. 
It's native serverless architecture means having to worry less about operations, and is well suited to building
edge applications using Fastly's Compute@Edge.

## Additional Resources
* [Fastly - Compute@Edge Documentation](https://docs.fastly.com/products/compute-at-edge)
* [Fauna JavaScript Driver Documentation](https://docs.fauna.com/fauna/current/drivers/supported#jsdriver)
