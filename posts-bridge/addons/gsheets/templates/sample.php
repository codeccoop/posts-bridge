<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

return array(
	'title'  => __( 'Sample', 'posts-bridge' ),
	'fielfs' => array(),
	'bridge' => array(
		'tax_mappers'   => array(
			array(
				'name'    => 'tags_input',
				'foreign' => 'tags',
			),
		),
		'field_mappers' => array(
			array(
				'name'    => 'post_title',
				'foreign' => 'title',
			),
			array(
				'name'    => 'post_excerpt',
				'foreign' => 'excerpt',
			),
			array(
				'name'    => 'post_content',
				'foreign' => 'content',
			),
		),
	),
);
