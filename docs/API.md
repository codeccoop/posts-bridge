# API

## Filters

### `posts_bridge_fetch`

Fired on render time when WP fetches the remote data of your posts. To work properly,
the Remote Field Custom Blocks needs a plain object of key values. If your backend
response does not looks like this, preformat it on this filter.

#### Arguments

1. `array $data`: Array containing the backend response json data.
2. `object $remote_cpt`: Instance of the current Remote CPT.
3. `string $locale`: Language code of the current post.

#### Example

```php
add_filter('posts_bridge_fetch', function ($data, $rcpt, $locale) {
    return $data;
}, 10, 3);
```

### `posts_bridge_endpoint`

When using the REST protocol to synchronization, use this hook to format endpoints
if your API is not standard.

#### Arguments

1. `string $endpoint`: Default endpoint to send GET requests to crawl post's remote data.
2. `string $remote_id`: ID of post's pair model on the backend.
3. `object $remote_cpt`: Instance of the current Remote_CPT.

#### Example

```php
add_filter('posts_bridge_endpoint', function ($endpoint, $remote_id, $rcpt) {
    return $endpoint;
}, 10, 3);
```

### `wpct_http_headers`

Use this hook to filters the headers of the HTTP requests. Use it to
match your backend api requirements. For example, insert the `Authorization`
header.

#### Arguments

1. `array $headers`: Associative array with key values containing request header's.
2. `string $method`: Request method.
3. `string $url`: Request URL.

#### Example

```php
add_filter('wpct_http_headers', function ($headers, $method, $url) {
    return $headers;
}, 10, 3);
```

### `posts_bridge_rest_models`

Filters the list of records recovereds from the backend on pull synchronization over
REST protocol. The plugin waits for a flat collection of models, each of them with
the required data to be inserted as a post.

#### Arguments

1. `array $response`: Array containing the backend response to the models list request.
2. `string $endpoint`: Origin endpoint.

#### Example

```php
add_filter('posts_bridge_rest_models', function ($response, $endpoint) {
    return $response;
}, 10, 2);
```

### `rest_pre_insert_{$post_type}`

Use this native WP hook to filter your backend payload on write operations against
the WP REST API. Your payload has to be conformant to the WP API. If it isn't, use
this hook to preformat your backend payloads.

#### Arguments

1. `object $post_data`: An object representing a single post prepared for inserting
or updating the database. Modify it with your request object.
2. `object $request`: Request object.

#### Example

```php
add_filter('rest_pre_insert_{$post_type}', function ($post_data, $request) {
    return $prepared_post;
}, 10, 2);
```

### `wp_insert_post_data`

On pull synchronizations, the rest_insert hook isn't fired. Use this instead to
preformat your payload.

#### Arguments

1. `array $data`: An array of slashed, sanitized, and processed post data.
2. `array $postarr`: An array of sanitized (and slashed) but otherwise unmodified post data recovered from backend response on each remote cpt synchronization.
3. `array $unsanitized_postarr`: An array of slashed yet *unsanitized* and unprocessed post data as originally passed to wp_insert_post().
4. `bool $update`: True if it's an update operation of an existing post.

#### Example

```php
add_filter('wp_insert_post_data', function ($data, $postarr, $unsanitized_postarr, $update) {
    return $data;
}, 10, 4);
```

## Actions

### `posts_bridge_translation`

Fired each time a remote cpt translation hase been done.

#### Arguments

1. `array $translation`: Array with the translation data:
the bounded translation ID and the language code.
    - `lang`: Language code
    - `bound`: Source post ID
    - `post_id`: Translation  ID

#### Example

```php
add_action('posts_bridge_translation', function () {
    // do something
}, 10);
```

### `rest_insert_{$post_type}`

Fires after a single post is created or updated via the REST API. Use this native WP
hook to perform operations on your posts on write operations from your backend over
the WP REST API. Use it, for example, to store the payload data as post metadata.

#### Arguments

1. `object $post`: Inserted or updated post object.
2. `object $request`: Request object.
3. `bool $creating`: True if its a new post.

#### Example

```php
add_action('rest_insert_{$post_type}', function ($post, $request, $creating) {
    // do something
}, 10, 3);
```

### `rest_after_insert_{$post_type}`

Fires after a single post is completely created or updated via the REST API. Use it
similarly to the `rest_insert_{$post_type}`.

#### Arguments

1. `object $post`: Inserted or updated post object.
2. `object $request`: Request object.
3. `bool $creating`: True if its a new post.

#### Example

```php
add_action('rest_after_insert_{$post_type}', function ($post, $request, $creating) {
    // do something
}, 10, 3);
```

### `wp_insert_post`

On pull synchronizations, the rest_insert actions isn't fireds. Use this action instead to
perform actions after database inserts.

#### Arguments

1. `int $post_id`: Post ID.
2. `object $post`: Post object.

#### Example

```php
add_action('wp_insert_post', function ($post_id, $post) {
    // do something
}, 10, 2);
```
