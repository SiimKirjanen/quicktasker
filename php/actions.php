<?php

add_action( 'plugins_loaded', 'wpqt_update_db' );
function wpqt_update_db() {
    wpqt_set_up_db();
}

add_action('admin_head', 'wpqt_style_overrides');
function wpqt_style_overrides() {
    echo '<style>
        /* Change the background color of the admin area */
        #wpwrap {
            background-color: #fff;
        }
    </style>';
}


