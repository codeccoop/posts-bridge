<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

$rest = get_option( 'posts-bridge_rest-api', array() ) ?: array();
update_option( 'posts-bridge_rest', $rest );
delete_option( 'posts-bridge_rest-api' );

$wp = get_option( 'posts-bridge_wp-rest', array() ) ?: array();
update_option( 'posts-bridge_wp', $wp );
delete_option( 'posts-bridge_wp-rest' );

$setting_names = array( 'dolibarr', 'gsheets', 'odoo', 'rest', 'wp' );

foreach ( $setting_names as $setting_name ) {
	$option  = 'posts-bridge_' . $setting_name;
	$setting = get_option( $option, array() ) ?: array();

	if ( ! isset( $setting['bridges'] ) ) {
		$setting['bridges'] = array();
	}

	foreach ( $setting['bridges'] as &$bridge ) {
		$mappers = $bridge['fields'] ?? array();
		unset( $bridge['fields'] );

		$field_mappers = array();
		$tax_mappers   = array();

		foreach ( $mappers as $mapper ) {
			if (
				in_array( $mapper['name'], array( 'post_category', 'tags_input' ), true )
			) {
				$tax_mappers[] = $mapper;
			} else {
				$field_mappers[] = $mapper;
			}
		}

		$bridge['field_mappers'] = $field_mappers;
		$bridge['tax_mappers']   = $tax_mappers;

		if ( $setting_name === 'odoo' ) {
			$bridge['foreign_key'] = 'id';
			$bridge['endpoint']    = $bridge['model'];
			unset( $bridge['model'] );
		} elseif ( $setting_name === 'wp' ) {
			$bridge['foreign_key'] = 'id';
			$bridge['endpoint']    = '/wp-json/wp/v2/' . $bridge['post_type'];
		} elseif ( $setting_name === 'gsheets' ) {
			$bridge['endpoint'] = '/v4/spreadsheets/' . $bridge['spreadsheet'];
			unset( $bridge['spreadsheet'] );
		} else {
			$bridge['foreign_key'] = 'id';
		}
	}

	update_option( $option, $setting );
}
