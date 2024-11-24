# REST API

The plugin opens endpoints on the WP REST API to allow CRUD operations against
your Remote CPTs. Write operations are protected with authentication. To authenticate
over the api you can use [native wp methods](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/)
or use the [Wpct Http Bridge](https://git.cooopdevs.org/codeccoop/wp/plugins/wpct-http-brdige/)
custom endpoints to gain access over JWT. \*\*This endpoints are the gateway your backend
should use if you choose the _push synchronization strategy_.

## Get posts

**URL**: `wp-json/wp-bridges/v1/posts/<post_type>`

**Method**: `GET`

**Authentication**: No

### Response

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

### Not found

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

## Get post data

**URL**: `/wp-json/wp-bridges/v1/posts/<post_type>/<post_id>`

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

### Not found

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

## Post creation

**URL**: `/wp-json/wp-bridges/v1/posts/<post_type>`

**Method**: `POST`

**Authentication**: Yes

**Body**:

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

### Response

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

## Post delete

**URL**: `wp-json/wp-bridges/v1/posts/<post_type>/<post_id>`

**Method**: `DELETE`

**Authentication**: Yes

### Response

### Unauthorized

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
