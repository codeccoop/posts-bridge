# Posts Bridge

Bridge backend data to WP posts collections.

Posts Bridge handle posts collections as indexes that represents your backend data and
allows the use of Gutenberg, the powerfull page builder of WordPress, as your backend
frontend builder.

## Installation

Download the [latest release](https://git.coopdevs.org/codeccoop/wp/plugins/bridges/posts-bridge/-/releases/permalink/latest/downloads/plugins/bridges/posts-bridge.zip)
as a zipfile. Once downloaded, go to your site plugins page and upload the zip file
as a new plugin, WordPress will do the rest.

> Go to the [releases](https://git.coopdevs.org/codeccoop/wp/plugins/bridges/posts-bridge/-/releases)
to find previous versions.

If you have access to a console on your server, you can install it with `wp-cli` with
the next command:

```shell
wp plugin install https://git.coopdevs.org/codeccoop/wp/plugins/bridges/posts-bridge/-/releases/permalink/latest/downloads/plugins/bridges/posts-bridge.zip
```

## Getting started

Once installed and activated, go to `Settings > Posts Bridge` to manage plugin
settings. The page has three main sections:

1. General
   - **Post types**: Select which post types do you want to connect with a remote source.
   - **Synchronization**: Controls remote source synchronization strategy.
   - **Whitelist backends**: Controls if Posts Bridge should block incomming connections
     from other sources than the listed on de _backends_ setting.
   - **Backends**: List of configured backend connections. Each backend needs a unique
	name, a base URL, and, optional, a map of HTTP headers.
2. REST API
   - **Relations**: A list of handled post types and it's relation with your backend
     endpoints. Each realtion needs a post type, an endpoint and the remote field to be
     used as relation.
3. RPC API
   - **RPC API endpoint**: Entry point of your ERP's RPC external API.
   - **API user login**: Login of the ERP's user to use use on the API authentication requests.
   - **User password**: Password of the user.
   - **Database name**: Database name to be used.
   - **Relations**: A list of handled post types and it's relation with your backend
     models. Each relation needs a post type and a model.

## Synchronization

The plugin allows two content synchronization strategies between WordPress and the
backend:

- Pull (Automatic): WordPress performs the synchronization fetching the backend models collections
  and matching them against its posts database. We can trigger the synchronization manualy
  from the plugin settings' page.
- Push: WordpPress opens CRUD endpoints on its REAST API and is the backend who has
  the responsability to inform WordPress each time an update ocurs on its database.

## Custom Blocks

### Remote Field

Custom block to render the remote data from the Gutenberg editor. The block, once
inserted into our content, allows you to freely build it's content. There where
you want to render your remote data you have to use the `_field_name_` pattern
as a replacement mark. On render time, the plugin will replace this marks with the
values of each field on the payload fetched from the backend.

## REST API

The plugin opens endpoints on the WP REST API to allow CRUD operations against
your Remote CPTs. Write operations are protected with authentication. To authenticate
over the api you can use [native wp methods](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/)
or use the [Http Bridge](https://git.cooopdevs.org/codeccoop/wp/plugins/bridges/http-brdige/)
custom endpoints to gain access over JWT. \*\*This endpoints are the gateway your backend
should use if you choose the _push synchronization strategy_.
