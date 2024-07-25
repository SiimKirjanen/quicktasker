<?php

add_action( 'plugins_loaded', 'wpqt_update_db' );
function wpqt_update_db() {
    wpqt_set_up_db();
}
