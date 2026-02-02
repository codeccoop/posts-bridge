<?php
/**
 * Class GSheets_Post_Bridge
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

use WP_Error;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Google Sheets post bridge.
 */
class GSheets_Post_Bridge extends Post_Bridge {

	/**
	 * Handles spreadhseet rows data in memory.
	 *
	 * @var array
	 */
	private static $rows = null;

	/**
	 * Bridge constructor.
	 *
	 * @param array $data Bridge data.
	 */
	public function __construct( $data ) {
		parent::__construct( $data, 'gsheets' );
	}

	private function values_to_rows( $values ) {
		$headers = $values[0] ?? array();

		$rows = array();

		$l = count( $values );
		for ( $i = 1; $i <= $l; $i++ ) {
			$row = array();
			$m   = count( $headers );
			for ( $j = 0; $j < $m; $j++ ) {
				$row[ $headers[ $j ] ] = $values[ $i ][ $j ] ?? '';
			}

			$rows[] = $row;
		}

		return $rows;
	}

	public function get_headers( $backend = null ) {
		if ( ! $this->is_valid ) {
			return new WP_Error( 'invalid_bridge' );
		}

		if ( ! $backend ) {
			$backend = $this->backend;
		}

		$range = rawurlencode( $this->tab ) . '!1:1';

		$response = $backend->get( $this->endpoint . '/values/' . $range );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$values = $response['data']['values'];

		self::$rows = $this->values_to_rows( $values );
		return $values[0] ?? array();
	}

	private function add_sheet( $index, $title, $backend ) {
		$response = $backend->post(
			$this->endpoint . ':batchUpdate',
			array(
				'requests' => array(
					array(
						'addSheet' => array(
							'properties' => array(
								'sheetId'        => time(),
								'index'          => $index,
								'title'          => $title,
								'sheetType'      => 'GRID',
								'gridProperties' => array(
									'rowCount'    => 1000,
									'columnCount' => 26,
								),
								'hidden'         => false,
							),
						),
					),
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return $response['data'];
	}

	private function get_sheets( $backend ) {
		$response = $backend->get( $this->endpoint );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$sheets = array();
		foreach ( $response['data']['sheets'] as $sheet ) {
			$sheets[] = strtolower( $sheet['properties']['title'] );
		}

		return $sheets;
	}

	public function fetch( $foreign_id = null, $params = array(), $headers = array() ) {
		if ( ! $this->is_valid ) {
			return new WP_Error( 'invalid_bridge' );
		}

		$rows = $this->get_rows();
		if ( is_wp_error( $rows ) ) {
			return $rows;
		}

		foreach ( $rows as $row ) {
			if ( $row[ $this->foreign_key ] === $foreign_id ) {
				return array(
					'headers'       => array(),
					'cookies'       => array(),
					'filename'      => null,
					'body'          => wp_json_encode( $row ),
					'response'      => array(
						'status'  => 200,
						'message' => 'Success',
					),
					'http_response' => array(
						'data'    => null,
						'headers' => null,
						'status'  => null,
					),
					'data'          => $row,
				);
			}
		}

		return new WP_Error( 'not_found' );
	}

	private function get_rows() {
		if ( null !== self::$rows ) {
			return self::$rows;
		}

		$backend = $this->backend;

		$sheets = $this->get_sheets( $backend );
		if ( is_wp_error( $sheets ) ) {
			return $sheets;
		}

		if ( ! in_array( strtolower( $this->tab ), $sheets, true ) ) {
			$result = $this->add_sheet( count( $sheets ), $this->tab, $backend );
			if ( is_wp_error( $result ) ) {
				return $result;
			}
		}

		$endpoint = $this->endpoint . '/values/' . rawurldecode( $this->tab ); // . '!A1:Z';

		$response = $this->backend->get( $endpoint );
		if ( is_wp_error( $response ) ) {
			return $response;
		}

		self::$rows = $this->values_to_rows( $response['data']['values'] );
		return self::$rows;
	}

	protected function list_remotes() {
		$rows = $this->get_rows();

		if ( is_wp_error( $rows ) ) {
			return $rows;
		}

		return $rows;
	}
}
