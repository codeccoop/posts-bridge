=== Posts Bridge - Remote CMS ===

Contributors: codeccoop
Tags: posts integration, remote cms, synchronization, http api, automation
Donate link: https://buymeacoffee.com/codeccoop
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Stable Tag: 4.1.0
Tested up to: 6.9

Synchronize backend data with WordPress post collections over HTTP APIs, enabling remote and automated web content management.

== Description ==

Synchronize backend data with WordPress post collections over HTTP APIs, enabling remote and automated web content management.

With **Posts Bridge** you can move your workspace from the WordPress admin to collaboration tools like Google Spreadsheets, Airtable or Grist, or get your Odoo and Dolibarr data automatically synchronized with your website. Don't bother your team with context switching and manual web content synchronizations. Work where your data is, and use Posts Bridge to seamlessly transform it to web content without effort.

== How it works ==

Posts Bridge treats post collections as indexes that represents your backend data and allows you to use Gutenberg, WordPress' powerful page builder, as the frontend editor of your backend. Either by manually triggering bulk synchronizations, by scheduling automatic background jobs, or dynamically loading data on renders, Posts Bridge fully integrates your backend data into the WordPress CMS system.

== Add-ons ==

Posts Bridge comes with free add-ons. Each add-on add to the plugin new bridges to work with specific APIs.

Posts Bridge has the following add-ons:

**🗓️ Productivity**

* [Airtable](https://postsbridge.codeccoop.org/documentation/airtable/)
* [Google Calendar](https://postsbridge.codeccoop.org/documentation/google-calendar/)
* [Google Sheets](https://workspace.google.com/products/sheets/)
* [Grist](https://postsbridge.codeccoop.org/documentation/grist/)
* [Nextcloud](https://postsbridge.codeccoop.org/documentation/nextcloud/)

**📦 ERP & Accounting**

* [Dolibarr](https://postsbridge.codeccoop.org/documentation/dolibarr/)
* [Holded](https://postsbridge.codeccoop.org/documentation/holded/)
* [Odoo](https://postsbridge.codeccoop.org/documentation/odoo/)

**✏️ CMS**

* [WordPress](https://postsbridge.codeccoop.org/documentation/wp/)

**Need a custom integration?**

Connect to any custom API using standard HTTP methods and authentication using the abstract **REST API** add-on. Perfect for integrating with proprietary or less common systems.

== Features ==

**Bridges**
Think of a bridge as a mapping that links your backend data with a post type collection from your WordPress web page. Each item on your backend database can be converted to a post, and each field on your backend tables can be mapped to a post field, post meta or taxonomy terms.

**Backends**
Think of it as a "connection profile" for your API. Save your API URL, headers, and credentials once, then reuse them across all your bridges. No need to re-enter details every time!

**Credentials**
Authenticate your HTTP requests using API keys, Basic Auth, Bearer Tokens, OAuth, RPC credentials and Digest Auth.

**Field mappers**
Rename and mutate your backend API responses to match the WordPress post model (e.g., `post_title`, `post_content`, `post_name`, etc.) and taxonomies.

**Remote fields**
Dynamically load backend data on render time and substitute replacement marks in the post HTML with remote data.

**Custom types**
Posts Bridge allows you to register custom post types from the plugin settings with visual and intuitive way, register post meta fields and bind post type to taxonomies.

**REST API endpoints**
Forms Bridge registers custom REST API endpoints for each bridge to easily connect to WordPress from your backend over HTTP requests.

**JWT authentication**
Authenticate your HTTP requests to the WordPress REST API with JWT tokens.

**Debugging console**
Monitor requests, responses, and errors in real time.

== Links ==

* [🌐 Official website](https://postsbridge.codeccoop.org/)
* [📚 Documentation](https://postsbridge.codeccoop.org/documentation/)
* [💻 GitHub](https://github.com/codeccoop/posts-bridge/)
* [🏢 Còdec](https://www.codeccoop.org)
* [⭐ Rate Posts Bridge](https://wordpress.org/plugins/posts-bridge/#reviews)

== Frequently Asked Questions ==

= Do I need to know how to code? =

Nope! Posts Bridge is designed to set up complex HTTP configurations and pipelines of data transformation without the need to write code.

In addition, you can extend Posts Bridge with code using its hooks and PHP APIs.

= Can I connect to my custom API? =

Absolutely! Posts Bridge supports any HTTP API, whether it’s a cloud service or a self-hosted solution (like a Dockerized API on your VPS). If your API uses standard HTTP methods (GET, POST, PUT, etc.), Posts Bridge can connect to it.

Maybe a little understanding about how HTTP and HTTP-like APIs works will be required to set up your custom integrations.

= What if my API requires authentication? =

Posts Bridge supports API keys, Basic Auth, Bearer Tokens, OAuth, RPC credentials, Digest Auth and custom headers.

= Is there a free trial? =

Posts Bridge, including all its add-ons, is free to use.

= How can I get support? =

You can get support from Còdec using the [Posts Bridge support forum](https://wordpress.org/support/plugin/posts-bridge/) for free. We aim to respond to all inquiries within 24-48 hours.

== Screenshots ==

1. Settings page – Configure global plugin options
2. Backends – Save and reuse API connection details
3. Bridges – Create synchronization pipelines for your post collections
4. Debug console – Monitor and troubleshoot requests.

== Changelog ==

= 4.0.1 =
* feat: odoo add-on jobs template
* feat: disable plugin activation if uploads dir is not writable
* fix: avoid warnings with coalescing
* fix: template tax mappers

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
