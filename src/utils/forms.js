
export const FORM_ERROR_MESSAGESS = {
    first_name_is_required : 'First name is required',
    last_name_is_required : 'Last name is required',
    email_is_required : 'Email is required',
    description_is_required : 'Description is required'
}

export function is_empty(value,field_name) {
    if(value === ''){

    }
}

if(is_empty(this.state.first_name,'first_name')){

}
if(this.state.first_name == ''){
    form_valid = false;
    error_msg = 'First Name is required';
    error_field = 'first_name';
    return conclude();
}

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
    