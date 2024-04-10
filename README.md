# Wpct Remote CPT

Plugin per a gestió remota de posts de WP.

## Instal·lació

### Manual

Visitar la pàgina de [llançaments](../../releases) o descarregar l'[*última versió*](../../releases/permalink/latest/downloads/plugins/wpct-remote-cop.zip).

Un cop disposis de l'arxiu zip amb la versió de codi desitjada, s'haurà d'anar
a la pàgina de gestió de plugins de l'administrador de WordPress, activar el mode
d'instal·lació d'extensions i indicar que es vol pujar manualment un arxiu.

> Els llançaments es generen de forma automàtica via pipelines del CI/CD de Gitlab
amb cada tag de git compatible amb l'estàndard **semver**. Per tal de fer correr
la pipeline, [etiqueta](../../tags/new) el _commit_ que vulguis convertir en un
llançament amb l'[apropiat nombre de versió](https://semver.org/).

### Linia de comandaments

Es pot instal·lar el plugin en una instància de WordPress existent via línia de 
comandaments amb la utilitat [wp-cli](https://wp-cli.org/) amb la comanda següent:

```sh
wp plugin install \
    https://git.coopdevs.org/codeccoop/wp/wpct-remote-cpt/-/releases/<version>/downloads/plugins/wpct-remote-cpt.zip
```

O bé, per instal·lar l'última versió:

```sh
wp plugin install \
    https://git.coopdevs.org/codeccoop/wp/wpct-remote-cpt/-/releases/permalink/latest/downloads/plugins/wpct-remote-cpt.zip
```

## Dependències

1. [Wpct Http Backend](https://git.coopdevs.org/codeccoop/wp/wpct-http-backend/):
Per a la gestió de les connexións HTTP amb la font remota de dades.
2. [Wpct i18n](https://git.coopdevs.org/codeccoop/wp/wpct-i18n/): Per a la gestió
de les traduccions.

## Ús

Per tal de convertir els _post types_ de la teva instància WP en _remote cpt_ 
s'ha de fer ús del filter `wpct_rcpt_post_types` i retornar en forma d'array
els _slugs_ dels custom post types que volen ser connectats amb una font remota
de dades:

```php
add_filter('wpct_rcpt_post_types', function ($post_types = ['remote-cpt']) {
    return ['my-custom-post-type']; 
});
```

Aquest filtre s'haurà d'incloure a l'arxiu `functions.php` del vostre tema. Un
cop implementat el ganxo, el **Wpct Remote Cpt** ens exposarà a través de la
REST API de WordPress els endpoints necessàris per a fer operacions CRUD de forma
remota.

```bash
GET /wp-json/wpct-remote/v1/my-custom-post-type
GET /wp-json/wpct-remote/v1/my-custom-post-type/1
POST /wp-json/wpct-remote/v1/my-custom-post-type
PUT /wp-json/wpct-remote/v1/my-custom-post-type/1
DELETE /wp-json/wpct-remote/v1/my-custom-post-type/1
```

Per últim, i per tal que WordPress conegui els endpoints des d'on recuperar les
dades remotes associades al post, haurem d'utilitzar el hook `wpct_rcpt_endpoint`:

```php
add_filter('wpct_rcpt_endpoint', function (
    $endpoint = '/wp-json/wp/v2/my-custom-post-type/1',
    $post = <WP_Post>
) {
    if ($post->post_type === 'my-custom-post-type') {
        $endpoint = 'api/resource/' . $post->get('remote_id');
    }
   
   return $endpoint;
});
```

## Custom Blocks

### Remote Field

Bloc custom per a la recuperació de dades remotes a les plantilles de l'editor
de Gutenberg. EL bloc, un cop inserit a la nostra plantilla, ens permetrà construir
lliurement un conjunt de blocs amb els que representar el valor del nostre camp
remot. Allà on volguem introduir el valor, haurem d'indicar-ho amb una cadena de
text amb el patró `_field_name_`. Wpct Remote Cpt s'encarregarà de substituir aquest
patró pel valor recuperat a través de la REST API de la nostra font de dades remota.

## Hooks

### Filters

* `wpct_rcpt_post_types`: Ens permet indicar al plugin quins tipus de post volem
que siguin gestionats per Wpct Remote Cpt. El filtre ens passarà a la nostra funció
de tornada una array amb el tipus de post per defecte, `['remote-cpt']`, i que 
haurem de modificar per retornar-la amb els _slugs_ dels nostres posts informats.
* `wpct_rcpt_endpoint`: Ens permet indicar al plugin quin és l'endpoint des d'on
recuperar les dades remotes dels posts. El filtre ens passarà, a la nostra funció 
de tornada, un endpoint d'exemple i una instància de la clase `Remote_CPT` amb
informació del post en qüestió.
* `rest_pre_insert_{$post_type}`: Aquest és un filtre pròpi de WordPress però
que haurem de fer servir per transformar el contingut de les peticions POST 
rebudes a la Rest API de WordPress en cas que el seu contingut no compleixi els
requisits de WordPress per a la creació de posts.

### Actions

* `wpct_rcpt_translation`: Aquesta acció es dispararà cada cop que Wpct Remote CPT
realitzi una traducció d'algun dels posts gestionats. A la funció de tornada ens
passarà com a paràmetre una array on ens informarà del `post_id`, del `bound`, o
id del post original, i `lang` com a descriptor de l'idioma.

## REST API

### Get posts

**URL**: `wp-json/wpct-remote/v1/<post_type>`

**Mètode**: `GET`

**Autenticació**: No

#### Resposta

**Codi**: 200

**Contingut**:

```json
[
    {
        "id": 1,
        "date": "2024-04-09T14:32:57",
        "date_gmt": "2024-04-09T14:32:57",
        "guid": {
            "rendered": "https://example.coop/?post_type=remote-cpt&#038;p=6222"
        },
        "modified": "2024-04-10T08:27:53",
        "modified_gmt": "2024-04-10T08:27:53",
        "slug": "post-slug",
        "status": "publish",
        "type": "remote-cpt",
        "link": "https://example.coop/remote-cpt/post-slug/",
        "title": {
            "rendered": "Post title"
        },
        "excerpt": {
            "rendered": "<p>Lorem ipsum dolor sit amet<\/p>\n",
            "protected": false
        },
        "featured_media": 1,
        "template": "",
        "meta": [],
        "translations": {
            "es": "https://example.coop/es/remote-cpt/post-slug/"
        },
        "_links": {
            "self": [
                {
                    "href": "https://example.coop/wp-json/wp/v2/remote-cpt/1"
                }
            ],
            "collection": [
                {
                    "href": "https:\/\/example.coop\/wp-json\/wp\/v2\/remote-cpt"
                }
            ],
            "about": [
                {
                    "href": "https://example.coop/wp-json/wp/v2/types/remote-cpt"
                }
            ],
            "wp:featuredmedia": [
                {
                    "embeddable": true,
                    "href": "https://somcomunitats.coop/wp-json/wp/v2/media/1"
                }
            ],
            "wp:attachment": [
                {
                    "href": "https://example.coop/wp-json/wp/v2/media?parent=1"
                }
            ],
            "curies": [
                {
                    "name": "wp",
                    "href": "https://api.w.org/{rel}",
                    "templated": true
                }
            ]
        }
    }
]
```

#### No trobada

**Condició**: El tipus de post no és vàlid

**Codi**: 404

**Contingut**:

```json
{
    "code": "rest_no_route",
    "message": "No s'ha trobat cap ruta que coincideixi amb l'URL i el mètode de la sol·licitud.",
    "data": {
        "status": 404
    }
}
```

### Get post data

**URL**: `/wp-json/wpct-remote/v1/<post_type>/<post_id>`

**Mètode**: `GET`

**Autenticació**: No

#### Resposta

**Codi**: 200

**Contingut**:

```json
{
    "id": 1,
    "date": "2024-04-09T14:32:57",
    "date_gmt": "2024-04-09T14:32:57",
    "guid": {
        "rendered": "https://example.coop/?post_type=remote-cpt&#038;p=6222"
    },
    "modified": "2024-04-10T08:27:53",
    "modified_gmt": "2024-04-10T08:27:53",
    "slug": "post-slug",
    "status": "publish",
    "type": "remote-cpt",
    "link": "https://example.coop/remote-cpt/post-slug/",
    "title": {
        "rendered": "Post title"
    },
    "excerpt": {
        "rendered": "<p>Lorem ipsum dolor sit amet<\/p>\n",
        "protected": false
    },
    "featured_media": 1,
    "template": "",
    "meta": [],
    "translations": {
        "es": "https://example.coop/es/remote-cpt/post-slug/"
    },
    "_links": {
        "self": [
            {
                "href": "https://example.coop/wp-json/wp/v2/remote-cpt/1"
            }
        ],
        "collection": [
            {
                "href": "https:\/\/example.coop\/wp-json\/wp\/v2\/remote-cpt"
            }
        ],
        "about": [
            {
                "href": "https://example.coop/wp-json/wp/v2/types/remote-cpt"
            }
        ],
        "wp:featuredmedia": [
            {
                "embeddable": true,
                "href": "https://somcomunitats.coop/wp-json/wp/v2/media/1"
            }
        ],
        "wp:attachment": [
            {
                "href": "https://example.coop/wp-json/wp/v2/media?parent=1"
            }
        ],
        "curies": [
            {
                "name": "wp",
                "href": "https://api.w.org/{rel}",
                "templated": true
            }
        ]
    }
}
```

#### No trobada

**Condició**: L'ID no és vàlid

**Codi**: 404

**Contingut**:

```json
{
    "code": "rest_post_invalid_id",
    "message": "Identificador de l'entrada no vàlid.",
    "data": {
        "status": 404
    }
}
```

### Creació d'un nou post

**URL**: `/wp-json/wpct-remote/v1/<post_type>`

**Mètode**: `POST`

**Autenticació**: Sí

**Contingut**:

```json
{
    "title": "Remote CPT 1",
    "excerpt": "Testing",
    "status": "publish",
    "slug": "remote-cpt-1",
    "remote_media": {
        "url": "https://erp-prod.somcomunitats.coop/web/image/landing.page/20/primary_image_file/20-primary_image_file.jpeg",
        "modified": "2023-09-01 12:40:14.967115"
    },
    "meta": {
        "ref_code": "AA",
        "price": 99.99,
        "colors": ["#FFFF00", "#ff0000", "#00ff00", "#0000FF"]
    }
}
```

#### Resposta

**Codi**: 201

```json
{
    "id": 1,
    "date": "2024-04-09T14:32:57",
    "date_gmt": "2024-04-09T14:32:57",
    "guid": {
        "rendered": "https://example.coop/?post_type=remote-cpt&#038;p=6222"
    },
    "modified": "2024-04-10T08:27:53",
    "modified_gmt": "2024-04-10T08:27:53",
    "slug": "post-slug",
    "status": "publish",
    "type": "remote-cpt",
    "link": "https://example.coop/remote-cpt/post-slug/",
    "title": {
        "rendered": "Post title"
    },
    "excerpt": {
        "rendered": "<p>Lorem ipsum dolor sit amet<\/p>\n",
        "protected": false
    },
    "featured_media": 1,
    "template": "",
    "meta": [],
    "translations": {
        "es": "https://example.coop/es/remote-cpt/post-slug/"
    },
    "_links": {
        "self": [
            {
                "href": "https://example.coop/wp-json/wp/v2/remote-cpt/1"
            }
        ],
        "collection": [
            {
                "href": "https:\/\/example.coop\/wp-json\/wp\/v2\/remote-cpt"
            }
        ],
        "about": [
            {
                "href": "https://example.coop/wp-json/wp/v2/types/remote-cpt"
            }
        ],
        "wp:featuredmedia": [
            {
                "embeddable": true,
                "href": "https://somcomunitats.coop/wp-json/wp/v2/media/1"
            }
        ],
        "wp:attachment": [
            {
                "href": "https://example.coop/wp-json/wp/v2/media?parent=1"
            }
        ],
        "curies": [
            {
                "name": "wp",
                "href": "https://api.w.org/{rel}",
                "templated": true
            }
        ]
    }
}
```

### Petició invàlida

**Condició**: El cos de la petició no conté les dades necessàries

**Codi**: 500

**Contingut**:

```json
{
    "code": "db_insert_error",
    "message": "Could not insert post into the database.",
    "data": {
        "status": 500
    },
    "additional_data": ["Column 'post_excerpt' cannot be null"]
}
```

### Eliminació d'un post

**URL**: `wp-json/wpct-remote/v1/<post_type>/<post_id>`

**Mètode**: `DELETE`

**Autenticació**: Sí

#### Resposta

#### No autoritzat

**Condició**: L'usuari no té permisos per esborrar el post

**Codi**: 401

**Contingut**:

```json
{
    "code": "rest_cannot_delete",
    "message": "Sorry, you are not allowed to delete this post.",
    "data": {
        "status": 401
    }
}
```
