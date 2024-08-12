<?php

namespace WPQT\Response;

class ApiResponse {
    private $success;
    private $messages;
    private $data;

    public function __construct($success, $messages = [], $data = null) {
        $this->success = $success;
        $this->messages = $messages;
        $this->data = $data;
    }

    public function toArray() {
        return [
            'success' => $this->success,
            'messages' => $this->messages,
            'data' => $this->data,
        ];
    }
}