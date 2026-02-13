# Posts Bridge

[![Plugin version](https://img.shields.io/wordpress/plugin/v/posts-bridge)](https://wordpress.org/plugins/posts-bridge/)
![GitHub Actions Tests Workflow Status](https://img.shields.io/github/actions/workflow/status/codeccoop/posts-bridge/tests.yml?label=tests)

Synchronize backend data with WordPress post collections over HTTP APIs, enabling remote and automated web content management.

With **Posts Bridge** you can move your workspace from the WordPress admin to collaboration tools like Google Spreadsheets, Airtable or Grist, or get your Odoo and Dolibarr data automatically synchronized with your website. Don't bother your team with context switching and manual web content synchronizations. Work where your data is, and use Posts Bridge to seamlessly transform it to web content without effort.

## How it works

Posts Bridge treats post collections as indexes that represents your backend data and allows you to use Gutenberg, WordPress' powerful page builder, as the frontend editor of your backend. Either by manually triggering bulk synchronizations, by scheduling automatic background jobs, or dynamically loading data on renders, Posts Bridge fully integrates your backend data into the WordPress CMS system.

## Add-ons

Posts Bridge comes with free add-ons. Each add-on add to the plugin new bridges to work with specific APIs.

Posts Bridge has the following add-ons:

**🗓️ Productivity**

- [Airtable](https://postsbridge.codeccoop.org/documentation/airtable/)
- [Google Calendar](https://postsbridge.codeccoop.org/documentation/google-calendar/)
- [Google Sheets](https://postsbridge.codeccoop.org/documentation/google-sheets/)
- [Grist](https://postsbridge.codeccoop.org/documentation/grist/)
- [Nextcloud](https://postsbridge.codeccoop.org/documentation/nextcloud/)

**📦 ERP & Accounting**

- [Dolibarr](https://postsbridge.codeccoop.org/documentation/dolibarr/)
- [Holded](https://postsbridge.codeccoop.org/documentation/holded/)
- [Odoo](https://postsbridge.codeccoop.org/documentation/odoo/)

**✏️ CMS**

- [WordPress](https://postsbridge.codeccoop.org/documentation/wordpress/)

**Need a custom integration?**

Connect to any custom API using standard HTTP methods and authentication using the abstract **REST API** add-on. Perfect for integrating with proprietary or less common systems.

## Features

### Bridges

Bridges act as dynamic mappings between your backend data and WordPress post type collections. Seamlessly convert each database item into a WordPress post, and map backend fields directly to post fields, metadata, or taxonomy terms—effortlessly synchronizing your data.

### Backends

Create a reusable "connection profile" for your API. Store your API URL, headers, and credentials once, and apply them across all your bridges. No repetitive setup required—just connect and go.

### Credentials

Secure your HTTP requests with flexible authentication options: API keys, Basic Auth, Bearer Tokens, OAuth, RPC credentials, or Digest Auth. Choose the method that fits your needs.

### Field Mappers

Transform your backend API responses to align with WordPress’s post structure (e.g., post_title, post_content, post_name).

With mappers you can map backend data to post fields, custom fields and into taxonomy terms (such as categories and tags).

### Remote Field

Load backend data dynamically at render time. Replace placeholder marks in your post HTML with real-time remote data, ensuring your content is always up to date.

### Background synchronizations

Automate your content workflow by scheduling synchronizations to run in the background. Keep your WordPress site fresh with minimal manual intervention.

### Custom types

Easily register custom post types directly from the plugin settings using an intuitive visual interface. Define post meta fields and link post types to taxonomies—no coding required.

### REST API Endpoints

Forms Bridge registers custom REST API endpoints for each bridge to easily connect to WordPress from your backend over HTTP requests.

### JWT Authentication

Authenticate your HTTP requests to the WordPress REST API with JWT tokens.

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
