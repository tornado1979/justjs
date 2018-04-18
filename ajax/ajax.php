<?php
header('Access-Control-Allow-Origin: http://localhost:3000');

call_user_func( $_POST[ 'action' ] );
die();

function get_data () {

  $json = file_get_contents( "./data.json" );

  echo $json;
}