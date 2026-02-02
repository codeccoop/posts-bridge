<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

return array(
	'title'  => __( 'Posts', 'posts-bridge' ),
	'fields' => array(
		array(
			'ref'   => '#bridge',
			'name'  => 'endpoint',
			'value' => '/wp-json/wp/v2/posts',
		),
		array(
			'ref'     => '#bridge',
			'name'    => 'post_type',
			'default' => 'post',
		),
	),
	'bridge' => array(
		'endpoint'      => '/wp-json/wp/v2/posts',
		'tax_mappers'   => array(
			array(
				'name'    => 'post_category',
				'foreign' => 'categories',
			),
			array(
				'name'    => 'tags_input',
				'foreign' => 'tags',
			),
		),
		'field_mappers' => array(
			array(
				'name'    => 'post_title',
				'foreign' => 'title.raw',
			),
			array(
				'name'    => 'post_name',
				'foreign' => 'slug',
			),
			array(
				'name'    => 'post_excerpt',
				'foreign' => 'excerpt.raw',
			),
			array(
				'name'    => 'post_content',
				'foreign' => 'content.raw',
			),
			array(
				'name'    => 'post_date',
				'foreign' => 'date',
			),
			array(
				'name'    => 'featured_media',
				'foreign' => 'featured_media',
			),
			array(
				'name'    => 'post_status',
				'foreign' => 'status',
			),
		),
	),
);
