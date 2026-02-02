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
			'value' => 'product.variant',
		),
	),
	'bridge' => array(
		'endpoint'      => 'product.variant',
		'tax_mappers'   => array(
			array(
				'name'    => 'post_category',
				'foreign' => 'categ_id[1]',
			),
		),
		'field_mappers' => array(
			array(
				'name'    => 'post_title',
				'foreign' => 'display_name',
			),
			array(
				'name'    => 'post_date',
				'foreign' => 'create_date',
			),
			array(
				'name'    => 'currency',
				'foreign' => 'currency_id[1]',
			),
			array(
				'name'    => 'price',
				'foreign' => 'price',
			),
		),
	),
);
