# API

## Table of Contents

1. [Shortcodes](#shortcodes)
2. [Getters](#getters)
3. [Filters](#filters)
4. [Actions](#actions)

## Shortcodes

### `posts_bridge_remote_fields`

Replace many post's remote field values inside the content string.

#### Arguments

1. `string $content`: Content with replace marks with your field names.

#### Returns

1. `string`: The content with marks replaced with the remote values.

#### Example

```php
$content = '<p>{{lastname}}, {{firstname}}</p>';
do_shortcode("[remote_fields]<?= $content ?>[remote_fields]'");
```

### `posts_bridge_remote_callback`

Gets post's remote cpt instance and pass its as input to the callback. Use it if do you want to render complex data values.

#### Arguments

1. `string $fn`: Name of a global available callback function. Callback will recive the
parammeters: `Remote_CPT $rcpt` with the Remote CPT instance, `array $atts` with the
shortcode attributes, and `string $content` with the shortcode content.
2. `string $content`: Optional, content to be passed to the callback.

#### Returns

Returns the output of the callback function.

#### Example

```php
$content = '<p>My Tags</p>';
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

## Filters

### `posts_bridge_remote_data`

Filters the posts' remote data before render. With this filter you can
format your data before it was stored on the Remote_CPT instance.

#### Arguments

1. `array $data`: Array containing the backend response JSON data.
2. `object $remote_cpt`: Instance of the current Remote CPT.
3. `string $locale`: Language code of the current post.

#### Example

```php
add_filter('posts_bridge_remote_data', function ($data, $rcpt, $locale) {
    return $data;
}, 10, 3);
```

### `posts_bridge_endpoint`

When using the REST protocol to synchronization, use this hook to format endpoints
if your API endpoints does not comply with the RESY standards.

#### Arguments

1. `string $endpoint`: Default endpoint to send GET requests to crawl post's remote data.
2. `string $foreign_id`: Remote CPT foreig key value.
3. `object $remote_cpt`: Instance of the current Remote_CPT.

#### Example

```php
add_filter('posts_bridge_endpoint', function ($endpoint, $foreign_id, $rcpt) {
    return $endpoint;
}, 10, 2);
```

### `posts_bridge_default_thumbnail`

Filter to change the path to the plugin's default thumbnail image.

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

Fired before Posts Bridge ask a backend for its models' foreig keys.

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

Fired before Posts Bridge fetches data for a remote post.

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
