# Posts Bridge

[![Plugin version](https://img.shields.io/wordpress/plugin/v/posts-bridge)](https://wordpress.org/plugins/posts-bridge/)
![GitHub Actions Tests Workflow Status](https://img.shields.io/github/actions/workflow/status/codeccoop/posts-bridge/tests.yml?label=tests)

Synchronize backend data with WordPress post collections over HTTP APIs, enabling remote and automated web content management.

## How it works

Posts Bridge treats post collections as indexes that represents your backend data and allows you to use Gutenberg, WordPress' powerful page builder, as the frontend editor of your backend. Whether through manual or automatic synchronization —using ahead-of-time or live fetches— Posts Bridge fully integrates your backend data into the WordPress CMS system.

## Bridges

Think of a bridge as a mapping that links your backend data with a post type collection from your WordPress web page. Each item on your backend database can be converted to a post, and each field on your backend tables can be mapped to a post field or taxonomy. Once a bridge is configured, you can trigger manual synchronizations, or let Posts Bridge automatically synchronize content between the two sides in the background.

## Add-ons

Posts Bridge comes with free add-ons. Each add-on add to the plugin new bridges to work with specific APIs, and bridge templates.

Posts Bridge has the following add-ons:

- [REST API](https://en.wikipedia.org/wiki/REST)
- [Dolibarr](<https://wiki.dolibarr.org/index.php/Module_Web_Services_API_REST_(developer)>)
- [Google Sheets](https://workspace.google.com/products/sheets/)
- [Odoo](https://www.odoo.com/)
- [WP](https://developer.wordpress.org/rest-api/)

## Backends

In Posts Bridge, a backend is a set of configurations that handles the information required to get your posts synchronized over HTTP requests with remote systems.

To register a new backend you only have to set 3 fields:

1. A unique name for the new connection
2. The URL of your backend
3. An array of HTTP headers with connection metadata and credentials
4. Optional, an HTTP authentication credential (Basic, Bearer, etc)

Once registered, you can reuse your backend connection on your post bridges.

## Field Mappers

Field mappers allow you to mutate your backend API responses to match the WordPress post model (e.g., `post_title`, `post_content`, `post_name`, etc.). This enable automatic conversion of backend data into WordPress posts on each synchronization loop (ahead-of-time).

With mappers you can map backend data to post fields, custom fields and into taxonomy terms (such as categories and tags).

## Remote Field

If you want your backend data loaded dynamically on each render, you can use the **Remote Field** custom block. This block lets you designate parts of your post templates as remote content. On render time, this blocks will be replaced with the data fetched from the backend.

## Templates

To streamline the bridge setup process, Posts Bridge comes packed with templates. Templates are blueprints of bridges you can use to set up your integrations in a matter of minutes.

## Docs

Browse the plugin's documentation on [postsbridge.codeccoop.org](https://postsbridge.codeccoop.org).

## Links

- [Official website](https://postsbridge.codeccoop.org)
- [Gitlab](https://gitlab.com/codeccoop/wp/plugins/posts-bridge/)
- [Còdec](https://www.codeccoop.org)
- [Other plugins](https://profiles.wordpress.org/codeccoop/#content-plugins)

## Development

### API

The plugin offers some hooks to expose its interanl API. Go to
[documentation](https://postsbridge.codeccoop.org/documentation/#api) to see more details about the hooks.

### Dependencies

The repository handles dependencies as [git submodules](https://www.atlassian.com/git/tutorials/git-submodule).

In order to work local, you have to clone this repository and initialize its submodules
with this command:

```
git submodule sync
git submodule update --init
```

Once done, install JS dependenices with `npm install` and PHP dependencies with
`composer install`.

### Build

Frontend builds are made with [esbuild](https://esbuild.github.io/). Once you
have your JS dependencies installed you can run `npm run dev` to perform
a live build, or `npm run build` to get a production build.

### Lint and format

For JavaScript the project uses [prettier](https://prettier.io/) as a formatter
[eslint](https://eslint.org/) as the linter.

For PHP the project uses [phpcs](https://github.com/squizlabs/PHP_CodeSniffer)
as the linter and formatter.

Lint and format will be applied to staged files before each commit. In addition,
merge requests performs a lint test in order to be accepted.

### Tests

To run the projects test you have to execute the script `bin/install-wp-tests.sh`
in order to get the WordPress test suit installed in your local machine. Once done,
run `composer run test` to run project's unit tests.

If you have docker on your local machine, you can run tests in an ephemeral environment
with the script `bin/test-on-docker.sh`.
