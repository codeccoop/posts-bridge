=== Posts Bridge ===
Contributors: codeccoop
Tags: posts, bridge, http, api, backend
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Stable Tag: 4.0.0
Tested up to: 6.7

Bridge any backend or service data to posts collections.

== How it works ==

Posts Bridge handles posts collections as indexes that represents your backend data and allows the use of Gutenberg, the powerful page builder of WordPress, as your backend frontend builder.

== Addons ==

Posts Bridge has core support for REST API connexions and addons for [Odoo](https://www.odoo.com/), [WordPress REST API](https://developer.wordpress.org/rest-api/) and [Google Spreadsheets](https://workspace.google.com/products/sheets/).

== Docs ==

See the official plugin's documentation on our [gitlab repository](https://git.coopdevs.org/codeccoop/wp/plugins/posts-bridge/).

== Changelog ==

= 4.0.0 =
* feat: schemas refactor
* feat: frontend refactor
* feat: improve custom post types ui
* feat: sync ping poll
* feat: remove templates
* feat: remove gsheets addon
* feat: bridge enabled state
* feat: update deps

= 3.0.8 =
* feat: setting sanitization with defaults recovery
* feat: add wp rest mirror template
* feat: wp rest reuse authorization if exists

= 3.0.7 =

* feat: addons mount method
* feat: improve debug console outputs
* fix: exclude loco files from git
