<?php
/*
 * Plugin Name: Plugin Stat
 *
 * */
defined( 'ABSPATH' ) || exit;

const PLUGIN_STAT_BLOCK_VERSION = '1.0.0';



function plugin_stat_block_js() {

	wp_enqueue_script( 'plugin_stat_block_js' , plugins_url( 'js/block.build.js', __FILE__ ), array( 'wp-blocks', 'wp-i18n', 'wp-element','jquery'  ), filemtime( plugin_dir_path( __FILE__ ) . 'js/block.build.js'  ), PLUGIN_STAT_BLOCK_VERSION);

}

add_action( 'enqueue_block_editor_assets', 'plugin_stat_block_js' );



function plugin_stat_block_editor_style() {

	wp_enqueue_style( 'plugin_stat_block_editor_style', plugins_url( 'css/blocks.style.css', __FILE__ ), array( 'wp-blocks' ), filemtime( plugin_dir_path( __FILE__ ) . 'css/blocks.style.css'), PLUGIN_STAT_BLOCK_VERSION );
}
add_action( 'enqueue_block_editor_assets', 'plugin_stat_block_editor_style' );


function Plugin_block_front_style() {

	//if admin then return only load on front
	if( is_admin() ){

		return ;
	}
	wp_enqueue_style( 'Plugin_block_front_style', plugins_url( 'css/block-front-style.css', __FILE__ ), array( 'wp-blocks' ), filemtime( plugin_dir_path( __FILE__ ) . 'css/block-front-style.css') , PLUGIN_STAT_BLOCK_VERSION );
}
add_action( 'enqueue_block_assets', 'Plugin_block_front_style' );


// Hook server side rendering into render callback
register_block_type( 'inline-status-block/plugin', array(
	'attributes'      => array(
		'plugin_status_slug'      => array(
			'type' => 'string',
			'default' => 'loginpress'
		),
	),
	'render_callback' => 'inline_status_block_plugin_render',
) );
function inline_status_block_plugin_render( $attr ){

 $attr[ 'plugin_status_slug' ];




}