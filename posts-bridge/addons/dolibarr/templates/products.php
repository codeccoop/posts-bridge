<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

return array(
	'title'  => __( 'Products', 'posts-bridge' ),
	'fields' => array(
		array(
			'ref'   => '#bridge',
			'name'  => 'endpoint',
			'value' => '/api/index.php/products',
		),
	),
	'bridge' => array(
		'endpoint'      => '/api/index.php/products',
		'field_mappers' => array(
			array(
				'name'    => 'post_title',
				'foreign' => 'label',
			),
			array(
				'name'    => 'post_content',
				'foreign' => 'description',
			),
			array(
				'name'    => 'post_date',
				'foreign' => 'date_creation',
			),
			array(
				'name'    => 'price',
				'foreign' => 'price',
			),
			array(
				'name'    => 'tva_tx',
				'foreign' => 'tva_tx',
			),
		),
	),
);
