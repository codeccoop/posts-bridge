# API

## Getters

### `posts_bridge_is_remote`

Checks if the current global post is a Remote CPT handled by Posts Bridge.

#### Arguments

1. `boolean $default`: Default value.

#### Returns

1. `boolean $is_remote`: Boolean value.

#### Example

```php
$is_remote = apply_filters('posts_bridge_is_remote', false);
if ($is_remote) {
	// do something
}
```

### `posts_bridge_backend`

Returns an instance of the Remote_Backend object by name.

#### Arguments

1. `mixed $default`: Default value.
2. `string $backend_name`: Name of the backend.

#### Returns

1. `Remote_Backend|null $backend`: Instance of the backend.

#### Example

```php
$backend = apply_filters('posts_bridge_backend', null, 'Odoo');
if ($backend) {
	// do something
}
```

### `posts_bridge_backends`

Returns the collection of configured backends as Remote_Backend instances.

#### Arguments

1. `array $default`: Default value.

#### Returns

1. `array $backends`: Array of Remote_Backend instances.

#### Example

```php
$backends = apply_filters('posts_bridge_backends', []);
foreach ($backends as $backend) {
	// do something
}
```

### `posts_bridge_relation`

Returns an instance of the Remote_Relation object by post type.

#### Arguments

1. `mixed $default`: Default value.
2. `string $post_type`: Post type slug.

#### Returns

1. `Remote_Relation|null`: Instance of the relation.

#### Example

```php
$relation = apply_filters('posts_bridge_relation', null, 'product');
if ($relation) {
	// do something
}
```

### `posts_bridge_relations`

Returns the collection of configured remote relations as Remote_Relation instances.

#### Arguments

1. `array $default`: Default value.

#### Returns

1. `array $relations`: Array of Remote_Relation instances.

#### Example

```php
$relations = apply_filters('posts_bridge_relations', []);
foreach ($relations as $relation) {
	// do something
}
```

### `posts_bridge_remote_cpts`

Returns the list of post type linked to remote backends.

#### Arguments

1. `array $default`: Default value.

#### Returns

1. `array $post_types`: Array of post type slugs.

#### Example

```php
$remote_cpts = apply_filters('posts_bridge_remote_cpts', []);
foreach ($remote_cpts as $remote_cpt) {
	// do something
}
```

## Filters

### `posts_bridge_fetch`

Fired on render time when WP fetches the remote data of your posts. To work properly,
the Remote Field Custom Blocks needs a plain object of key values. If your backend
response does not looks like this, preformat it on this filter.

#### Arguments

1. `array $data`: Array containing the backend response JSON data.
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
3. `object $remote_cpt`: Instance of the current Remote_CPT.

#### Example

```php
add_filter('posts_bridge_endpoint', function ($endpoint, $rcpt) {
    return $endpoint;
}, 10, 2);
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

# Some other usful WP standard hooks

A part from the custom hooks Posts Bridge offers, its worth to mention some other
hooks you, as a develper, may want to use to control the lifecycle of your remote cpts.

## Filters

### `rest_pre_insert_{$post_type}`

Use this native WP hook to filter your backend payload on write operations against
the WP REST API. Your payload has to be conformant to the WP API. If it isn't, use
this hook to preformat your backend payloads.

#### Arguments

1. `object $prepared_post`: An object representing a single post prepared for inserting
or updating the database. Modify it with your request object.
2. `WP_REST_Request $request`: Current request instance.

#### Example

```php
add_filter('rest_pre_insert_{$post_type}', function ($prepared_post, $request) {
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
