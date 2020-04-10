export enum response_status_codes {
    success = 200,                      // Success
    internal_server_error = 500,        // Internal Server Error
    unauthorized = 401,                 // Unauthorized
    invalid_user_error = 403,           // Forbidden
    not_found_error = 404,              // Not Found
    token_expired_error = 419,          // Token Expire Error
    input_error = 422,                  // Un-processable Entity
    login_expired_error = 440,
    token_still_valid_error = 441,
}

export enum gender {
    male = 'male',
    female = 'female'
}

export enum severity {
    High = 'high',
    Moderate = 'moderate',
    Low = 'low'
}