# Posts Bridge

Bridge backend data to WP posts collections.

Plugin to allow remote managment of your posts. Use WordPress and it's block editor
as a frontend of your backend database.

## Installation

Download the [latest release](https://git.coopdevs.org/codeccoop/wp/plugins/wpct-remote-cpt/-/releases/permalink/latest/downloads/plugins/wpct-remote-cpt.zip)
as a zipfile. Once downloaded, decompress and place its content on your WP instance
`wp-content/plugins`'s directory.

> Go to the [releases](https://git.coopdevs.org/codeccoop/wp/plugins/wpct-remote-cpt/-/releases)
> to find previous versions.

You can install it with `wp-cli` with the next command:

```shell
wp plugin install https://git.coopdevs.org/codeccoop/wp/plugins/wpct-erp-forms/-/releases/permalink/latest/downloads/plugins/wpct-erp-forms.zip
```

## Settings

Once installed and activated, go to `Settings > Wpct Remote CPT` to manage plugin
settings. The page has thre main sections:

1. General
   - **Backend base URL**:
   - **Backend API key**:
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

- Pull: WordPress performs the synchronization fetching the backend models collections
  and matching them against its posts database. We can trigger the synchronization manualy
  from the plugin settings' page.
- Push: WordpPress opens CRUD endpoints on it's REAST API and is the backend who has
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
or use the [Wpct Http Bridge](https://git.cooopdevs.org/codeccoop/wp/plugins/wpct-http-brdige/)
custom endpoints to gain access over JWT. \*\*This endpoints are the gateway your backend
should use if you choose the _push synchronization strategy_.
