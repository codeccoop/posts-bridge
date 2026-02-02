<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

return array(
	'title'  => __( 'Job Offers', 'posts-bridge' ),
	'fields' => array(
		array(
			'ref'   => '#bridge',
			'name'  => 'endpoint',
			'value' => 'hr.job',
		),
	),
	'bridge' => array(
		'endpoint'      => 'hr.job',
		'tax_mappers'   => array(
			array(
				'name'    => 'post_category',
				'foreign' => 'contract_type_id[1]',
			),
		),
		'field_mappers' => array(
			array(
				'name'    => 'post_content',
				'foreign' => 'description',
			),
			array(
				'name'    => 'post_title',
				'foreign' => 'display_name',
			),
			array(
				'name'    => 'post_name',
				'foreign' => 'name',
			),
			array(
				'name'    => 'post_date',
				'foreign' => 'create_date',
			),
			array(
				'name'    => 'no_of_recruitment',
				'foreign' => 'no_of_recruitment',
			),
			array(
				'name'    => 'email_to',
				'foreign' => 'alias_email',
			),
		),
	),
);
