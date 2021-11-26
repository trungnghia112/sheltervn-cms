<?php

/**
 * Plugin Name:       Custom send Contact Form 7
 * Plugin URI:        https://github.com/trungnghia112
 * Description:       Change form action url for contact form 7 with this plugin.
 * Version:           1.0.0
 * Requires at least: 5.8
 * Requires PHP:      7.3
 * Author:            John Tran
 * Author URI:        https://github.com/trungnghia112
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://github.com/trungnghia112
 * Text Domain:       cf7-api-sender
 */

 add_action('wpcf7_before_send_mail', 'firebase_cf7_api_sender');

 function firebase_cf7_api_sender($contact_form){
    $submission = WPCF7_Submission::get_instance();

    if($submission){
        $posted_data = $submission->get_posted_data();
        firebase_cf7_send_json($posted_data);
    }
 }

 function firebase_cf7_send_json($posted_data){
     // API URL
    $url = 'https://us-central1-sheltervn-cms.cloudfunctions.net/webApi/api/v1/wpapi/cf7';

    // Create a new cURL resource
    $ch = curl_init($url);

    // Setup request to send json via POST

    $name = $posted_data['your-name'];
    $mobile = $posted_data['your-mobile'];
    $email = $posted_data['your-email'];
    $message = $posted_data['your-message'];
    $type = $posted_data['your-type']; // selectbox

    $data = array(
        'name' => $name,
        'mobile' => $mobile,
        'email' => $email,
        'message' => $message,
        'type' => $type[0]
    );
    $payload = json_encode($data);

    // Attach encoded JSON string to the POST fields
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

    // Set the content type to application/json
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

    // Return response instead of outputting
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the POST request
    $result = curl_exec($ch);

    // Close cURL resource
    curl_close($ch);

 }


/* <label> Your name
    [text* your-name] </label>

<label> Your email
    [email* your-email] </label>

<label> Subject
    [text* your-subject] </label>

<label> Your message (optional)
    [textarea your-message] </label>

[submit "Submit"] */
