<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

return array(
	'title'  => __( 'Knowledge Pages', 'posts-bridge' ),
	'fields' => array(
		array(
			'ref'   => '#bridge',
			'name'  => 'endpoint',
			'value' => 'document.page',
		),
	),
	'bridge' => array(
		'endpoint'      => 'document.page',
		'tax_mappers'   => array(
			array(
				'name'    => 'post_category',
				'foreign' => 'parent_id[1]',
			),
		),
		'field_mappers' => array(
			array(
				'name'    => 'post_title',
				'foreign' => 'name',
			),
			array(
				'name'    => 'post_date',
				'foreign' => 'content_date',
			),
			array(
				'name'    => 'post_content',
				'foreign' => 'content',
			),
		),
	),
);
