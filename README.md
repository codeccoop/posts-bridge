# Posts Bridge

![Posts Bridge]()

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
     to the `wp-bridges` REST API namespace from other sources than the listed on de
     _backends_ setting.
   - **Backends**: List of configured backend connections. Each backend needs a unique
     name, a base URL, and, optional, a map of HTTP headers.
2. REST API
   - **Relations**: A list of handled post types and it's relation with your backend
     endpoints. Each realtion needs a post type, a backend, an endpoint and the remote
     field to be used as foreign key.
3. Odoo JSON-RPC
   - **RPC API endpoint**: Entry point of your Odoo's JSON-RPC external API.
   - **API user login**: Login of the Odoo's user to use use on the API authentication
     requests.
   - **User password**: Password or APIKEY of the user.
   - **Database name**: Database name to be used.
   - **Relations**: A list of handled post types and it's relation with your backend
     models. Each relation needs a post type, a backend and a model.

Once configured, run your first content synchronization with the **synchronize** button
from the general settings page. You can perform this synchronization in two modes:

- **Light**: Fetch remote models IDs and performs a search on the posts collection, then
  removes each post without a corresponfing pair on the backend, and creates as news as
  remote models without corresponding pairs on the WP posts table. The rest will be skipped.
- **Full**: Like a light synchronization, but Posts Bridge will fetch data for every post
  on the local database and updates its remote data.

## Synchronization

The plugin allows two content synchronization strategies between WordPress and the
backends:

- **Pull**: WordPress performs the synchronization fetching the backend models collections
  and matching them against its posts database. Pull synchronization can be done manually
  from the plugins settings page, or automatically, scheduling recurrent synchronizations.
- **Push**: Posts Bridge opens new endpoints on the WP REAST API and allow remote sources
  to perform CRUD operations against its database. This way, is the backend who is
  responsible to inform WordPress each time an update occurs on its database.

## Remote Fields

On synchronization time, Posts Bridge will fetch the remote data of your remote cpts. If
your backend payload fits the [WordPress REST API schema](https://developer.wordpress.org/rest-api/reference/posts/#schema)
the post's attributes will be filled with it automatically.

To handle not standard remote data you can follow two approches:

- **Live**: Remote data will be fetched on demand each time WordPress is rendering a Remote
  CPT. Posts on the WordPress instance works only as an index with the ability to crawl
  remote data when required. The source of truth is your backend database, and Posts Bridge
  ask it for information. **Use `Remote Field` custom block or `remote_fields` shortcode to
  fetch the remote data on render time**.
- **Ahead of time**: On synchronizations, Posts Bridge map custom remote fields to post's
  fields. Posts on the WordPress instance works as a copy of your backend models and your
  backend data is fetched once, on the synchronization. **Use remote relation's field mappers
  to map your remote fields to the post schema**.

> You can mix both approches, and store some remote fields as post attributes, like the title,
> the excerpt, and the featured media, and load other fields on render time. In this way, WP
> can render archives of your remote cpts without the need for recursive loads from the
> backend, and fetch remote data only on single templates.

### Field mappers

Each remote relation can be configured with field mappers to map your backend endpoint payload
schema to the post schema. Mappers can map your remote fields to post standard attributes or
to post's custom fields. On synchronization time, Posts Bridge will use this mappers to 
prepare the database inserts. **You can use JSON Fingers to traverse your backend payloads**

### JSON Fingers

The remote field's mappers supports JSON Fingers as foreign attribute names. A JSON Finger
is a hierarchical pointer to array attributes like `children[0].name.rendered`. The former
will point to the attribute `rendered` from the array `name` inside the first `child` in
the array `children`. Use this fingers to get your attributes from your backend payloads.

For example, if your backend send a payload like this:

```
[
	'id' => 1,
	'contact' => [
		2,
		'Bob',
	],
];
```

Then you can set your `contact_name` custom field's foreign key as `contact[1]` and the
finger will set `Bob` as its value.

## Custom Blocks

Posts Bridge comes packed with a **Remote Fields** custom block. This custom block enables
Gutenberg editor to render remote data fields. The block, once inserted into the post
template, enables the editor to freely build its contents. There where you want to render
your remote data you have to use the `{{fieldName}}` mark as a replacement mark. If you
want to render an attribute called `stock_qty`, then use the mark `{{stock_qty}}`. On
render time, Posts Bridge will replace this marks with the values of each field on the
payload fetched from the backend.

If do you prefer, you can use Posts Bridge shortcodes directly. They are described on
the [documentation](./docs/API.md#shortcodes).

## REST API Authentication

The plugin opens endpoints on the WP REST API to allow CRUD operations against
your **Remote Posts**. Write operations are protected with authentication. To authenticate
againts the API you can use [native wp methods](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/)
or use the [Http Bridge](https://git.cooopdevs.org/codeccoop/wp/plugins/bridges/http-brdige/)
custom endpoints to gain access over JWT.

## Developers

The plugin offers some hooks to expose its internal API. Go to [documentation](./docs/API.md)
to see more details about the hooks.

If you choose the _push_ synchronization strategy and control how and when your backends
notify WordPress about changes, you should use Posts Bridge custom endpoints to perform
this syncrhonizations. See the [REST API documentation](./docs/REST-API.md) for more
details.

### Local development

The repository handles dependencies as [git submodules](https://www.atlassian.com/git/tutorials/git-submodule).
In order to work local, you have to clone this repository and initialize its submodules
with this command:

```bash
git submodule update --init --recursive
```

Once done, you will need to install frontend dependencies with `npm install`. To build
the admin's react client, run `npm run dev` for development, or `npm run build` for
production builts.

> We work WordPress with docker. See our [development setup](https://github.com/codeccoop/wp-development/)
> if you are interested.

## Dependencies

This plugin relays on [Http Bridge](https://git.coopdevs.org/codeccoop/wp/plugins/bridges/http-bridge/)
and [Wpct i18n](https://git.coopdevs.org/codeccoop/wp/plugins/wpct/i18n/) as depenendencies,
as well as the [Wpct Plugin Abstracts](https://git.coopdevs.org/codeccoop/wp/plugins/wpct/plugin-abstracts)
snippets. The plugin comes with its dependencies bundled in its releases, so you should
not worry about its managment. You can see this plugins documentation to know more about
its APIs.
