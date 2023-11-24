<?php

/*
  Plugin Name: GoldUnitConverter
  Version: 1.0
  Author: Saad


*/

if (!defined('ABSPATH'))
  exit; // Exit if accessed directly

class goldunitconverter
{
  function __construct()
  {
    add_action('init', array($this, 'onInit'));
  }

  function onInit()
  {
    wp_register_script('goldunitconverterScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
    wp_register_style('goldunitconverterStyle', plugin_dir_url(__FILE__) . 'build/index.css');

    register_block_type(
      'goldunitconverternamespace/goldunitconverter-block-name',
      array(
        'render_callback' => array($this, 'renderCallback'),
        'editor_script' => 'goldunitconverterScript',
        'editor_style' => 'goldunitconverterStyle'
      )
    );
  }

  function renderCallback($attributes)
  {
    if (!is_admin()) {
      wp_enqueue_script(
        'goldunitconverterFrontendScript',
        plugin_dir_url(__FILE__) . 'build/frontend.js',
        array('wp-element'),
        '1.0.0',
        array(
          'strategy' => 'defer',
          'in_footer' => true, // Note: This is the default value.
        )
      );
      wp_enqueue_style('goldunitconverterFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
    }

    ob_start(); ?>
    <div class="goldunitconverter-update-me">
      <pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre>
    </div>
    <?php return ob_get_clean();

  }

  function renderCallbackBasic($attributes)
  {
    return '<div class="goldunitconverter-frontend">Hello, the sky is ' . $attributes['skyColor'] . ' and the grass is ' . $attributes['grassColor'] . '.</div>';
  }
}

$bradsBoilerplate = new goldunitconverter();
