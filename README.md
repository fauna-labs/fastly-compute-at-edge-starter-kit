# Starter Kit for Fauna

[![Deploy to Fastly](https://deploy.edgecompute.app/button)](https://deploy.edgecompute.app/deploy)


**For more details about other starter kits for Compute@Edge, see the [Fastly developer hub](https://developer.fastly.com/solutions/starters)**

## 

This is a Fauna starter-kit for running the [FaunaDB JavaScript Driver](https://github.com/fauna/faunadb-js) 
on Compute@Edge.

## Fauna Setup
Follow [these](https://docs.fauna.com/fauna/current/learn/quick_start/client_quick_start?lang=javascript#prerequisites)
instructions from steps 1 through 3 to obtain an access key. For local development, 
copy and paste the value of the acces key into `API_KEY` in the [fastly.toml](./fastly.toml) file.


## Test locally
```
fastly compute serve
```

## Deploy
* Deploy using the CLI
  ```
  fastly compute deploy
  ```
  When prompted, provide the following values:
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

  e.g.
  ```
  fastly dictionary create \
  --version=active --autoclone --write-only=true \
  --name=fauna_env_variables \
  --service-id=<the-service-id>
  
  fastly dictionary-item update \
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

## Security issues

Please see our [SECURITY.md](SECURITY.md) for guidance on reporting security-related issues.
