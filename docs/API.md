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
echo do_shortcode("[posts_bridge_remote_fields]{$content}[remote_fields]'");
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

do_shortcode('[posts_bridge_remote_callback fn="my_remote_callback"]');
```

## Getters

### `posts_bridge_bridge`

Returns an instance of the bridge  object by post type.

#### Arguments

1. `mixed $value`: Fallback value.
2. `string $post_type`: Post type slug.

#### Returns

1. `Post_Bridge|null`: Instance of the relation.

#### Example

```php
$relation = apply_filters('posts_bridge_bridge', null, 'product');
if ($relation) {
	// do something
}
```

### `posts_bridge_bridges`

Returns a collection of post bridges instances, optionaly filtered by API.

#### Arguments

1. `array $default`: Fallback value.
2. `string $api`: API name.

#### Returns

1. `array $bridges`: Array of Post_Bridge instances.

#### Example

```php
$bridges = apply_filters('posts_bridge_bridges', [], 'odoo');
foreach ($bridges as $bridge) {
	// do something
}
```

### `posts_bridge_remote_cpts`

Returns the list of post type bridgeds to remote backends.

#### Arguments

1. `array $default`: Fallback value.
2. `string $api`: API name.

#### Returns

1. `array $post_types`: Array of post type key strings.

#### Example

```php
$rcpts = apply_filters('posts_bridge_remote_cpts', []);
foreach ($rcpts as $rcpt) {
	// do something
}
```

## Filters

### `posts_bridge_foreign_ids`

Filters the list of foreign ids for a given bridge.

#### Arguments

1. `array $foreign_ids`: Array with the bridge foreign ids.
2. `Post_Bridge $bridge`: Instance of the current bridge.

#### Example

```php
add_filter(`posts_bridge_foreign_ids`, function ($foreign_ids, $bridge) {
	if ($bridge->post_type === 'faqs') {
		// do something
	}
}, 10, 2);
```

### `posts_bridge_remote_data`

Filters the post's remote data. With this filter you can format your data
before it was stored on the Remote_CPT instance. Fired on render and synchronization
time.

#### Arguments

1. `array $data`: Array containing the backend response data.
2. `object $remote_cpt`: Instance of the current Remote_CPT.

#### Example

```php
add_filter('posts_bridge_remote_data', function ($data, $remote_cpt) {
    return $data;
}, 10, 2);
```

### `posts_bridge_skip_syncrhonization`

Allow to filter syncrhonization for a given remote custom post type.

#### Arguments

1 `boolean $skip`: Boolean to control if Posts Bridge should skip syncrhonization for the given remote cpt.
2. `Remote_CPT $rcpt`: Instance of the current remote custom post type.
3. `array $data`: Remote data of the Remote_CPT.

#### Example

```php
add_filter('posts_bridge_skip_synchronization', function ($skip, $remote_cpt, $data) {
	return false;
}, 10, 3);
```

### `posts_bridge_default_thumbnail`

Posts Bridge use a placeholder image as the default remote cpts' thumbnail. Use this filter to change the path
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

### `posts_bridge_before_syncrhonization`

Fired before a new remote cpt creation on a syncrhonization loop.

#### Arguments

1. `Remote_CPT $remote_cpt`: Instance of the new remote cpt.
2. `array $data`: Remote data of the current remote cpt.

#### Example

```php
add_action('posts_bridge_before_synchronization', function ($remote_cpt, $data) {
	if ($remote_cpt->post_type === 'page' && $data['title'] === 'Hello, Posts Bridge!') {
		// do something
	}
}, 10, 2);
```

### `posts_bridge_syncrhonization`

Fired after a new remote cpt creation on a syncrhonization loop.

#### Arguments

1. `Remote_CPT $remote_cpt`: Instance of the new remote cpt.
2. `array $data`: Remote data of the current remote cpt.

#### Example

```php
add_action('posts_bridge_synchronization', function ($remote_cpt, $data) {
	if ($remote_cpt->foreign_id === 101) {
		// do something
	}
}, 10, 2);
```

### `posts_bridge_before_fetch`

Fired before Posts Bridge fetches data for a remote cpt.

#### Arguments

1. `Post_Bridge $bridge`: Instance of the current bridge.
2. `int|string $foreign_id`: Bridge's foreign key value.

#### Example

```php
add_action('posts_bridge_before_fetch', function ($bridge, $foreign_id) {
	if ($bridge->post_type === 'post') {
		// do something
	}
}, 10, 2);
```

### `posts_bridge_fetch`

Fired with the response to the Posts Bridge remote data request.

#### Arguments

1. `array|WP_Error $response`: HTTP request response data, or error.
2. `Post_Bridge $bridge`: Instance of the current bridge.

#### Example

```php
add_action('posts_bridge_fetch', function ($response, $bridge) {
	if ($response['headers']['Content-Type'] !== 'application/json') {
		// do something
	}
}, 10, 3);
```

### `posts_bridge_fetch_error`

Fired with the response error when Posts Bridge fails to fetch remote data for a given remote cpt.

#### Arguments

1. `WP_Erro $error`: HTTP request response error.
2. `Post_Bridge $bridge`: Instance of the current bridge.

#### Example

```php
add_action('posts_bridge_fetch', function ($error, $bridge) {
	if ($bridge->name === 'Products') {
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
