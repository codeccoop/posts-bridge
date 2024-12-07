# API

## Table of Contents

1. [Shortcodes](#shortcodes)
2. [Getters](#getters)
3. [Filters](#filters)
4. [Actions](#actions)

## Shortcodes

### `posts_bridge_remote_fields`

Replace post's remote fields values inside the content string. Use replace mark to get your remote
fields values. A replace mark is the field name surrounded by double brackets.

#### Arguments

1. `string $content`: HTML string with replace marks with your field names.

#### Returns

1. `string`: The content with marks replaced with the remote values.

#### Example

```php
$content = '<p>{{lastname}}, {{firstname}}</p>';
do_shortcode("[remote_fields]<?= $content ?>[remote_fields]'");
```

### `posts_bridge_remote_callback`

Gets post's remote cpt instance and pass it as the first input to the callback. In addition,
callback gets the shortcode attributes and content as its second and third argument. Use it if
do you want to render complex data values.

#### Arguments

1. `string $fn`: Name of a global available callback function.
2. `array $atts`: Array with shortcode attributes.
2. `string $content`: String with the shortcode content.

#### Returns

Returns the output of the callback function.

#### Example

```php
function my_remote_callback($rcpt, $atts, $content = '') {
	$tags = $rcpt->get('tags');

	$output .= '<ul>';
	foreach ($tags as $tag) {
		$output .= '<li>' . $tag . '</li>';
	}
	$output .= '</ul>';

	return $content . '<div class="tags">' . $output . '</div>';
}

do_shortcode('[remote_callback fn="my_remote_callback"]');
```

## Getters

### `posts_bridge_relation`

Returns an instance of the remote relation object by post type.

#### Arguments

1. `mixed $default`: Fallback value.
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

1. `array $default`: Fallback value.

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

1. `array $default`: Fallback value.

#### Returns

1. `array $post_types`: Array of post type slug strings.

#### Example

```php
$rcpts = apply_filters('posts_bridge_remote_cpts', []);
foreach ($rcpts as $rcpt) {
	// do something
}
```

### `posts_bridge_is_remote`

Checks if the current global post is a remote cpt handled by Posts Bridge.

#### Arguments

1. `boolean $default`: Fallback value.

#### Returns

1. `boolean $is_remote`: True if the global post is a remote cpt.

#### Example

```php
$is_remote = apply_filters('posts_bridge_is_remote', false);
if ($is_remote) {
	// do something
}
```

## Filters

### `posts_bridge_remote_data`

Filters the post's remote data before render. With this filter you can format your data
before it was stored on the Remote_CPT instance.

#### Arguments

1. `array $data`: Array containing the backend response data.
2. `object $remote_cpt`: Instance of the current Remote_CPT.
3. `string $locale`: Language code of the current post.

#### Example

```php
add_filter('posts_bridge_remote_data', function ($data, $rcpt, $locale) {
    return $data;
}, 10, 3);
```

### `posts_bridge_endpoint`

When using the REST protocol to synchronization, use this hook to format endpoints
if your API endpoints are not REST-compliant.

#### Arguments

1. `string $endpoint`: Default endpoint to send GET requests to crawl post's remote data.
2. `string $foreign_id`: Remote CPT foreig key value.
3. `object $rcpt`: Instance of the current Remote_CPT.

#### Example

```php
add_filter('posts_bridge_endpoint', function ($endpoint, $foreign_id, $rcpt) {
    return $endpoint;
}, 10, 2);
```

### `posts_bridge_default_thumbnail`

Posts Bridge sets use a placeholder image as the default remote cpts thumbnail. Use this filter to change the path
to the plugin's default thumbnail image. Use it to define a custom fallback thumbnail. This filter is
triggered on plugin's activation and deactivation time.

#### Arguments

1. `string $filpath`: Path to the image file.

#### Example

```php
add_filter('posts_bridge_default_thumbnail', function ($filepath) {
	return $filepath;
});
```

## Actions

### `posts_bridge_before_search`

Fired before Posts Bridge ask a backend for its models' foreig keys index.

#### Arguments

1. `Remote_Relation $relation`: Instance of the remote relation object.

#### Example

```php
add_action('posts_bridge_before_search', function ($relation) {
	if ($relation->endpoint() === '/products') {
		// do something
	}
});
```

### `posts_after_after_search`

Fired with the response to the Posts Bridge ask for foreig keys.

#### Arguments

1. `array $response`: HTTP request response data, or error.
2. `Remote_Relation $relation`: Instance of the remote relation object.

#### Example

```php
add_action('posts_bridge_after_search', function ($response, $relation) {
	if ($response['response']['code'] === 200) {
		// do something;
	}
}, 10, 2);
```

### `posts_bridge_before_fetch`

Fired before Posts Bridge fetches data for a remote cpt.

#### Arguments

1. `string $endpoint`: Target endpoint of the request.
2. `Remote_CPT $rcpt`: Instance of the Remote_CPT who is triggering the request.

#### Example

```php
add_action('posts_bridge_before_fetch', function ($endpoint, $rcpt) {
	if ($rcpt->post_type === 'post') {
		// do something
	}
}, 10, 2);
```

### `posts_bridge_after_fetch`

Fired with the response to the Posts Bridge remote data request.

#### Arguments

1. `array|WP_Error $response`: HTTP request response data, or error.
2. `string $endpoint`: Source endpoint of the response.
3. `Remote_CPT $rcpt`: Instance of the Remote_CPT who has requested remote data.

#### Example

```php
add_action('posts_bridge_after_fetch', function ($response, $endpoint, $rcpt) {
	if ($response['headers']['Content-Type'] !== 'application/json') {
		// do something
	}
}, 10, 3);
```

### `posts_bridge_before_rpc_login`

Fired before Posts Bridge stablishes a new RPC session.

#### Arguments

1. `string $url`: Destination URL.
2. `array $payload`: JSON-RPC login payload.

#### Example

```php
add_action('posts_bridge_before_rpc_login', function ($url, $payload) {
	if ($payload['params']['args'][1] === 'ERP') {
		// do something
	}
}, 10, 3);
```

### `posts_bridge_after_rpc_login`

Fired with the response to the Posts Bridge login call.

#### Arguments

1. `array|WP_Error $response`: Result from the login request.
2. `string $url`: Source URL of the result.
3. `array $payload`: Submitted payload.

#### Example

```php
add_action('posts_bridge_after_rpc_login', function ($response, $url, $payload) {
	if (is_wp_error($response)) {
		// do something
	}
}, 10, 3);
```

### `posts_bridge_translation`

Fired each time a remote cpt translation hase been done.

#### Arguments

1. `array $translation`: Array with the translation data. The array contains
the new post ID, its language as slug, and its translation post ID.

#### Example

```php
add_action('posts_bridge_translation', function ($trans) {
	if ($trans['lang'] === 'ca') {
		// do something
	}
});
```

# Some other usful WP standard hooks

A part from the custom hooks Posts Bridge offers, its worth to mention some other
hooks you, as a develper, may want to use to control the lifecycle of your remote cpts.

## Filters

### `rest_pre_insert_{$post_type}`

Use this native WP hook to filter your backend payload on write operations against
the WP REST API. Your payload has to be conformant to the WP API. If it isn't, and
JSON Fingers are not enough, use this hook to preformat your backend payloads.

#### Arguments

1. `object $prepared_post`: An object representing a single post prepared for inserting
   or updating the database. Modify it with your request object.
2. `WP_REST_Request $request`: Current REST request instance.

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
3. `array $unsanitized_postarr`: An array of slashed yet _unsanitized_ and unprocessed post data as originally passed to wp_insert_post().
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
