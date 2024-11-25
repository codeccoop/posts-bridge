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
   - **Synchronization**: Trigger manual content synchronizations.
   - **Schedule**: Configuration for automatic content synchronization.
   - **Whitelist backends**: Controls if Posts Bridge should block incomming connections
     from other sources than the listed on de _backends_ setting.
   - **Backends**: List of configured backend connections. Each backend needs a unique
	name, a base URL, and, optional, a map of HTTP headers.
2. REST API
   - **Relations**: A list of handled post types and it's relation with your backend
     endpoints. Each realtion needs a post type, a backend, an endpoint and the remote
     field to be used as foreign key.
3. RPC API
   - **RPC API endpoint**: Entry point of your ERP's RPC external API.
   - **API user login**: Login of the ERP's user to use use on the API authentication requests.
   - **User password**: Password of the user.
   - **Database name**: Database name to be used.
   - **Relations**: A list of handled post types and it's relation with your backend
     models. Each relation needs a post type, a backend and a model.

## Synchronization

The plugin allows two content synchronization strategies between WordPress and the
backends:

- Pull: WordPress performs the synchronization fetching the backend models collections
  and matching them against its posts database. Pull synchronization can be done manually
  from the plugins settings page, or automatically, scheduling recurrent synchronizations.
- Push: Posts Bridge opens new endpoints on the WP REAST API and allow remote sources to
  perform CRUD operations against its database. This way, is the backend who is responsible
  to inform WordPress each time an update ocurs on its database.

## Remote Fields

Each Posts Bridge relations can be configured with remote field mappers. With this mappers,
you can transform your backend payloads into a the WordPress schemas. To allow WordPress
to maintain a post collection as your backend models index, at least, you have to map one
of your backend models fields to the `post_title` field. With mappers, you save yourself
from having to transform your backend API to fit the WP REST API schemas.

## Custom Blocks

Posts Bridge comes packed with a **Remote Field** custom block. This custom block enables
Gutenberg editor to render remote data fields. The block, once inserted into our content,
enables the editor to freely build it's content. There where you want to render your remote
data you have to use the `{{fieldName}}` mark as a replacement mark. On render time, Posts
Bridge will replace this marks with the values of each field on the payload fetched from
the backend.

## REST API Authentication

The plugin opens endpoints on the WP REST API to allow CRUD operations against
your **Remote Posts**. Write operations are protected with authentication. To authenticate
againts the API you can use [native wp methods](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/)
or use the [Http Bridge](https://git.cooopdevs.org/codeccoop/wp/plugins/bridges/http-brdige/)
custom endpoints to gain access over JWT.

## Developers

The plugin offers some hooks to expose its internal API. Go to [documentation](./docs/API.md)
to see more details about the hooks.

If you choose the _push_ synchronization strategy and control how and when your backends notify
WordPress about changes, you should use Posts Bridge custom endpoints to perform this syncrhonizations.
See the [REST API documentation](./docs/REST-API.md) for more details.

## Dependencies

This plugin relays on [HTTP Bridge](https://git.coopdevs.org/codeccoop/wp/plugins/bridges/http-bridge/)
and [Wpct i18n](https://git.coopdevs.org/codeccoop/wp/plugins/wpct/i18n/) as depenendencies,
as well as the [Wpct Plugin Abstracts](https://git.coopdevs.org/codeccoop/wp/plugins/wpct/plugin-abstracts)
snippets. The plugin comes with its dependencies bundled in its releases, so you should
not worry about its managment. You can see this plugins documentation to know more about
its APIs.

