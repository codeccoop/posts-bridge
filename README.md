# Wpct Remote CPT

Plugin to allow remote managment of your posts. Use WordPress and it's block editor
as a frontend of your backend database.

## Installation

Download the [latest release](https://git.coopdevs.org/codeccoop/wp/plugins/wpct-remote-cpt/-/releases/permalink/latest/downloads/plugins/wpct-remote-cpt.zip)
as a zipfile. Once downloaded, decompress and place its content on your WP instance
`wp-content/plugins`'s directory.

> Go to the [releases](https://git.coopdevs.org/codeccoop/wp/plugins/wpct-remote-cpt/-/releases)
to find previous versions.

You can install it with `wp-cli` with the next command:

```shell
wp plugin install https://git.coopdevs.org/codeccoop/wp/plugins/wpct-erp-forms/-/releases/permalink/latest/downloads/plugins/wpct-erp-forms.zip
```

## Settings

Once installed and activated, go to `Settings > Wpct Remote CPT` to manage plugin
settings. The page has thre main sections:

1. General
    * **Backend base URL**:
    * **Backend API key**:
2. REST API
    * **Relations**: A list of handled post types and it's relation with your backend
    endpoints. Each realtion needs a post type, an endpoint and the remote field to be
    used as relation.
3. RPC API
	* **RPC API endpoint**: Entry point of your ERP's RPC external API.
	* **API user login**: Login of the ERP's user to use use on the API authentication requests.
	* **User password**: Password of the user.
	* **Database name**: Database  name to be used.
    * **Relations**: A list of handled post types and it's relation with your backend
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

## Hooks

### Filters

#### `wpct_rcpt_fetch`

Fired on render time when WP fetches the remote data of your posts. To work properly,
the Remote Field Custom Blocks needs a plain object of key values. If your backend
response does not looks like this, preformat it on this filter.

Arguments:

1. `array $data`: Array containing the backend response json data.
2. `object $remote_cpt`: Instance of the current Remote CPT.
3. `string $locale`: Language code of the current post.

Example:

```php
add_filter('wpct_rcpt_fetch', function ($data, $rcpt, $locale) {
    return $data;
}, 10, 3);
```

#### `wpct_rcpt_endpoint`

When using the REST protocol to synchronization, use this hook to format endpoints
if your API is not standard.

Arguments:

1. `string $endpoint`: Default endpoint to send GET requests to crawl post's remote data.
2. `string $remote_id`: ID of post's pair model on the backend.
3. `object $remote_cpt`: Instance of the current Remote_CPT.

Example:

```php
add_filter('wpct_rcpt_endpoint', function ($endpoint, $remote_id, $rcpt) {
    return $endpoint;
}, 10, 3);
```

#### `wpct_rcpt_rest_models`

Filters the list of records recovereds from the backend on pull synchronization over
REST protocol. The plugin waits for a flat collection of models, each of them with
the required data to be inserted as a post.

Arguments:

1. `array $response`: Array containing the backend response to the models list request.
2. `string $endpoint`: Origin endpoint.

Example:

```php
add_filter('wpct_rcpt_rest_models', function ($response, $endpoint) {
    return $response;
}, 10, 2);
```

#### `rest_pre_insert_{$post_type}`

Use this native WP hook to filter your backend payload on write operations against
the WP REST API. Your payload has to be conformant to the WP API. If it isn't, use
this hook to preformat your backend payloads.

Arguments:

1. `object $post_data`: An object representing a single post prepared for inserting
or updating the database. Modify it with your request object.
2. `object $request`: Request object.

Example:

```php
add_filter('rest_pre_insert_{$post_type}', function ($post_data, $request) {
    return $prepared_post;
}, 10, 2);
```

#### `wp_insert_post_data`

On pull synchronizations, the rest_insert hook isn't fired. Use this instead to
preformat your payload.

Arguments:

1. `array $data`: An array of slashed, sanitized, and processed post data.
2. `array $postarr`: An array of sanitized (and slashed) but otherwise unmodified post data recovered from backend response on each remote cpt synchronization.
3. `array $unsanitized_postarr`: An array of slashed yet *unsanitized* and unprocessed post data as originally passed to wp_insert_post().
4. `bool $update`: True if it's an update operation of an existing post.

Example:

```php
add_filter('wp_insert_post_data', function ($data, $postarr, $unsanitized_postarr, $update) {
    return $data;
}, 10, 4);
```

### Actions

#### `wpct_rcpt_translation`

Fired each time a remote cpt translation hase been done.

Arguments:

1. `array $translation`: Array with the translation data:
the bounded translation ID and the language code.
    - `lang`: Language code
    - `bound`: Source post ID
    - `post_id`: Translation  ID

Example:

```php
add_action('wpct_rcpt_translation', function () {
    // do something
}, 10);
```

#### `rest_insert_{$post_type}`

Fires after a single post is created or updated via the REST API. Use this native WP
hook to perform operations on your posts on write operations from your backend over
the WP REST API. Use it, for example, to store the payload data as post metadata.

Arguments:

1. `object $post`: Inserted or updated post object.
2. `object $request`: Request object.
3. `bool $creating`: True if its a new post.

Example:

```php
add_action('rest_insert_{$post_type}', function ($post, $request, $creating) {
    // do something
}, 10, 3);
```

#### `rest_after_insert_{$post_type}`

Fires after a single post is completely created or updated via the REST API. Use it
similarly to the `rest_insert_{$post_type}`.

Arguments:

1. `object $post`: Inserted or updated post object.
2. `object $request`: Request object.
3. `bool $creating`: True if its a new post.

Example:

```php
add_action('rest_after_insert_{$post_type}', function ($post, $request, $creating) {
    // do something
}, 10, 3);
```

#### `wp_insert_post`

On pull synchronizations, the rest_insert actions isn't fireds. Use this action instead to
perform actions after database inserts.

Arguments:

1. `int $post_id`: Post ID.
2. `object $post`: Post object.

Example:

```php
add_action('wp_insert_post', function ($post_id, $post) {
    // do something
}, 10, 2);
```

## REST API

The plugin opens endpoints on the WP REST API to allow CRUD operations against
your Remote CPTs. Write operations are protected with authentication. To authenticate
over the api you can use [native wp methods](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/)
or use the [Wpct Http Bridge](https://git.cooopdevs.org/codeccoop/wp/plugins/wpct-http-brdige/)
custom endpoints to gain access over JWT. **This endpoints are the gateway your backend
should use if you choose the _push synchronization strategy_.

### Get posts

**URL**: `wp-json/wpct/v1/remote/<post_type>`

**Method**: `GET`

**Authentication**: No

#### Response

**Code**: 200

**Content**:

```json
[
  {
    "id": 1,
    "date": "2024-04-09T14:32:57",
    "date_gmt": "2024-04-09T14:32:57",
    "guid": {
      "rendered": "https://example.coop/?post_type=remote-cpt&#038;p=6222"
    },
    "modified": "2024-04-10T08:27:53",
    "modified_gmt": "2024-04-10T08:27:53",
    "slug": "post-slug",
    "status": "publish",
    "type": "remote-cpt",
    "link": "https://example.coop/remote-cpt/post-slug/",
    "title": {
      "rendered": "Post title"
    },
    "excerpt": {
      "rendered": "<p>Lorem ipsum dolor sit amet</p>\n",
      "protected": false
    },
    "featured_media": 1,
    "template": "",
    "meta": [],
    "translations": {
      "es": "https://example.coop/es/remote-cpt/post-slug/"
    },
    "_links": {
      "self": [
        {
          "href": "https://example.coop/wp-json/wp/v2/remote-cpt/1"
        }
      ],
      "collection": [
        {
          "href": "https://example.coop/wp-json/wp/v2/remote-cpt"
        }
      ],
      "about": [
        {
          "href": "https://example.coop/wp-json/wp/v2/types/remote-cpt"
        }
      ],
      "wp:featuredmedia": [
        {
          "embeddable": true,
          "href": "https://somcomunitats.coop/wp-json/wp/v2/media/1"
        }
      ],
      "wp:attachment": [
        {
          "href": "https://example.coop/wp-json/wp/v2/media?parent=1"
        }
      ],
      "curies": [
        {
          "name": "wp",
          "href": "https://api.w.org/{rel}",
          "templated": true
        }
      ]
    }
  }
]
```

#### Not found

**Condition**: Invalid post type

**Code**: 404

**Content**:

```json
{
  "code": "rest_no_route",
  "message": "No s'ha trobat cap ruta que coincideixi amb l'URL i el mètode de la sol·licitud.",
  "data": {
    "status": 404
  }
}
```

### Get post data

**URL**: `/wp-json/wpct/v1/remote/<post_type>/<post_id>`

**Method**: `GET`

**Authentication**: No

#### Response

**Code**: 200

**Content**:

```json
{
  "id": 1,
  "date": "2024-04-09T14:32:57",
  "date_gmt": "2024-04-09T14:32:57",
  "guid": {
    "rendered": "https://example.coop/?post_type=remote-cpt&#038;p=6222"
  },
  "modified": "2024-04-10T08:27:53",
  "modified_gmt": "2024-04-10T08:27:53",
  "slug": "post-slug",
  "status": "publish",
  "type": "remote-cpt",
  "link": "https://example.coop/remote-cpt/post-slug/",
  "title": {
    "rendered": "Post title"
  },
  "excerpt": {
    "rendered": "<p>Lorem ipsum dolor sit amet</p>\n",
    "protected": false
  },
  "featured_media": 1,
  "template": "",
  "meta": [],
  "translations": {
    "es": "https://example.coop/es/remote-cpt/post-slug/"
  },
  "_links": {
    "self": [
      {
        "href": "https://example.coop/wp-json/wp/v2/remote-cpt/1"
      }
    ],
    "collection": [
      {
        "href": "https://example.coop/wp-json/wp/v2/remote-cpt"
      }
    ],
    "about": [
      {
        "href": "https://example.coop/wp-json/wp/v2/types/remote-cpt"
      }
    ],
    "wp:featuredmedia": [
      {
        "embeddable": true,
        "href": "https://somcomunitats.coop/wp-json/wp/v2/media/1"
      }
    ],
    "wp:attachment": [
      {
        "href": "https://example.coop/wp-json/wp/v2/media?parent=1"
      }
    ],
    "curies": [
      {
        "name": "wp",
        "href": "https://api.w.org/{rel}",
        "templated": true
      }
    ]
  }
}
```

#### Not found

**Condition**: Invalid ID

**Codi**: 404

**Content**:

```json
{
  "code": "rest_post_invalid_id",
  "message": "Identificador de l'entrada no vàlid.",
  "data": {
    "status": 404
  }
}
```

### Post creation

**URL**: `/wp-json/wpct/v1/remote/<post_type>`

**Method**: `POST`

**Authentication**: Yes

**Content**:

```json
{
  "title": "Remote CPT 1",
  "excerpt": "Testing",
  "status": "publish",
  "slug": "remote-cpt-1",
  "remote_media": {
    "url": "https://erp-prod.somcomunitats.coop/web/image/landing.page/20/primary_image_file/20-primary_image_file.jpeg",
    "modified": "2023-09-01 12:40:14.967115"
  },
  "meta": {
    "ref_code": "AA",
    "price": 99.99,
    "colors": ["#FFFF00", "#ff0000", "#00ff00", "#0000FF"]
  }
}
```

#### Response

**Code**: 201

```json
{
  "id": 1,
  "date": "2024-04-09T14:32:57",
  "date_gmt": "2024-04-09T14:32:57",
  "guid": {
    "rendered": "https://example.coop/?post_type=remote-cpt&#038;p=6222"
  },
  "modified": "2024-04-10T08:27:53",
  "modified_gmt": "2024-04-10T08:27:53",
  "slug": "post-slug",
  "status": "publish",
  "type": "remote-cpt",
  "link": "https://example.coop/remote-cpt/post-slug/",
  "title": {
    "rendered": "Post title"
  },
  "excerpt": {
    "rendered": "<p>Lorem ipsum dolor sit amet</p>\n",
    "protected": false
  },
  "featured_media": 1,
  "template": "",
  "meta": [],
  "translations": {
    "es": "https://example.coop/es/remote-cpt/post-slug/"
  },
  "_links": {
    "self": [
      {
        "href": "https://example.coop/wp-json/wp/v2/remote-cpt/1"
      }
    ],
    "collection": [
      {
        "href": "https://example.coop/wp-json/wp/v2/remote-cpt"
      }
    ],
    "about": [
      {
        "href": "https://example.coop/wp-json/wp/v2/types/remote-cpt"
      }
    ],
    "wp:featuredmedia": [
      {
        "embeddable": true,
        "href": "https://somcomunitats.coop/wp-json/wp/v2/media/1"
      }
    ],
    "wp:attachment": [
      {
        "href": "https://example.coop/wp-json/wp/v2/media?parent=1"
      }
    ],
    "curies": [
      {
        "name": "wp",
        "href": "https://api.w.org/{rel}",
        "templated": true
      }
    ]
  }
}
```

### Bad request

**Condition**: The payload is not conformant

**Code**: 500

**Content**:

```json
{
  "code": "db_insert_error",
  "message": "Could not insert post into the database.",
  "data": {
    "status": 500
  },
  "additional_data": ["Column 'post_excerpt' cannot be null"]
}
```

### Post delete

**URL**: `wp-json/wpct/v1/remote/<post_type>/<post_id>`

**Method**: `DELETE`

**Authentication**: Yes

#### Response

#### Unauthorized

**Condition**: Invalid credentials or insufficient permissions

**Code**: 401

**Content**:

```json
{
  "code": "rest_cannot_delete",
  "message": "Sorry, you are not allowed to delete this post.",
  "data": {
    "status": 401
  }
}
```
