# Posts Bridge

Bridge your posts collections with your backend over HTTP API, enabling remote and automated web content management.

## How it works

Posts Bridge treats post collections as indexes that represents your backend data and allow you to use Gutenberg, WordPress' powerful page builder, as the frontend editor of your backend. Whether through manual or automatic synchronization —using ahead-of-time or live fetches— Posts Bridge fully integrates your backend data into the WordPress CMS system.

## Bridges

Think of a bridge as a pipeline through which WordPress

## Addons

Posts Bridge comes with free addons. Each addon adds to the plugin new bridges to work with specific APIs and bridge templates.

Posts Bridge has the following addons:

* [REST API](https://en.wikipedia.org/wiki/REST)
* [Dolibarr](https://wiki.dolibarr.org/index.php/Module_Web_Services_API_REST_(developer))
* [Google Sheets](https://workspace.google.com/products/sheets/)
* [Nextcloud](https://docs.nextcloud.com/server/20/user_manual/en/files/access_webdav.html)
* [Odoo](https://www.odoo.com/)
* [WP](https://developer.wordpress.org/rest-api/)

## Backends

In Posts Bridge, a backend is a set of configurations that handles the information required to get your posts synchronized over HTTP requests with remote systems.

To register a new backend you only have to set 3 fields:

1. A unique name for the new connection
2. The URL of your backend
3. An array of HTTP headers with connection metadata and credentials
4. Optional, an HTTP authentication credential (Basic, Bearer, etc)

Once registered, you can reuse your backend connection on your post bridges.

## Remote Mappers

Remote mappers allow you to mutate your backend's API responses to match the WordPress post model (e.g., `post_title`, `post_content`, `post_name`). This enable automatic conversion of backend data into WordPress posts on each synchronization loop (ahead-of-time).

With mappers you can map backend data to post fields, custom fields and into taxonomy terms (such as categories and tags).

## Remote Field

If you want your backend data loaded dynamically on each render, you can use the **Remote Field** custom block. This block lets you designate parts of your post templates as remote content. On render time, this blocks will be replaced with the data fetched from the backend.

## Templates

To streamline the bridge setup process, Posts Bridge comes packed with templates. Templates are blueprints of bridges you can use to set up your integrations in a matter of minutes.

## Docs

Browse the plugin's documentation on [postsbridge.codeccoop.org](https://postsbridge.codeccoop.org/documentation/).

## Links

* [Official website](https://postsbridge.codeccoop.org/)
* [Gitlab](https://gitlab.com/codeccoop/wp/plugins/posts-bridge/)
* [Còdec](https://www.codeccoop.org)
* [Other plugins](https://profiles.wordpress.org/codeccoop/#content-plugins)

## Dependencies

This plugin relays on [Http Bridge](https://gitlab.com/codeccoop/wp/plugins/http-bridge/)
and [Wpct i18n](https://gitlab.com/codeccoop/wp/plugins/wpct-i18n/) as depenendencies,
as well as the [Wpct Plugin Common](https://gitlab.com/codeccoop/wp/plugins/wpct-plugin-common)
snippets. The plugin comes with its dependencies bundled in its releases, so you should
not worry about its managment. You can see this plugins documentation to know more about
its APIs.
