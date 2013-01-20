var VD = {
    phone: {
        type: "number",
        length: 10,
        message: "Enter a 10 digit mobile number without '0' as prefix"
    },
    email: {
        type: "email",
        message: "Enter a valid email address"
    },
    pincode: {
        type: "number",
        length: 6,
        message: "Enter a 6 digit pincode"
    },
    cvv: {
        type: "number",
        length: 3,
        message: "Enter 3 digit CVV number on back of your card"
    },
    creditcard: {
        type: "creditcard",
        message: "Enter a valid card number"
    },
    debitcard: {
        type: "debitcard",
        message: "Enter card number without spaces"
    },
    name: {
        type: "name",
        message: "Please enter first and last name"
    },
    title: {
        type: "title",
        message: "Select"
    },
    comboid: {
        type: "comboid",
        message: "Select an option"
    },
    ifscode: {
        length: 11,
        message: "Enter 11 characters"
    },
    loyaltypin: {
        length: 6,
        message: "Enter 6 digit pin"
    },
    loyaltynumber: {
        type: "number",
        length: 16,
        message: "Enter 16 digit Card Number"
    },
    chars: {
        type: "chars",
        message: "Enter name without digits."
    }
};

function validateForm(form, dd) {
    $('.form-item .error-message', $(form)).remove();
    $('.form-item.error', $(form)).removeClass('error');
    var formItems = formToJson(form);
    var isValid = true;
    for(var item in dd) {

        var disableValidation = $('.form-item-input.' + item,  form).data('disablevalidation') || false;
        // log(item, dd[item], disableValidation);

        // if validation is disabled for this form-item
        if(disableValidation){
            continue;
        }

        if(dd[item].required) {
            var fieldVal = $.trim(formItems[item]);
            var $item = $('.form-item.' + item, $(form));  // form item DOM reference

            if (dd[item].type === 'select' && fieldVal === 'placeholder'){
                if(dd[item].error){
                    $item.addClass('error').prepend('<div class="error-message">' + dd[item].error + '</div>');
                } else {
                    $item.addClass('error').prepend('<div class="error-message">Please select an option</div>');
                }
                isValid = false;
            }

            if((!fieldVal || fieldVal.indexOf('Eg:') !== -1) && (item !== "user_title") || fieldVal === $('#' + item, form).attr('placeholder')) { //For placeholder in IE
                $item.addClass('error').prepend('<div class="error-message">This field is required</div>');
                isValid = false;
            } else if(dd[item].datatype && !checkRule(dd[item].datatype, fieldVal)) { // Check for rules
                $item.addClass('error').prepend('<div class="error-message">' + dd[item].datatype.message + '</div>');
                isValid = false;
            } else if(dd[item].maxlength && fieldVal.length > dd[item].maxlength) {
                $item.addClass('error').prepend('<div class="error-message">Should not be more than ' + dd[item].maxlength + ' chars</div>');
                isValid = false;
            }
        }
    }
    return isValid;
}

function validateField(field, dd) {
    var fieldName = $(field).attr('name');
    var fieldVal = $.trim($(field).val());

    $(field).siblings('.error-message').remove(); // remove existing error message
    $(field).closest('.form-item').removeClass('error');

    if (fieldVal !== '' && dd[fieldName].datatype && !checkRule(dd[fieldName].datatype, fieldVal)) {
        $('.form-item.' + fieldName, $(field).closest('form')).addClass('error').prepend('<div class="error-message">' + dd[fieldName].datatype.message + '</div>');
        return false;
    } else if (fieldVal !== '' && dd[fieldName].maxlength && fieldVal.length > dd[fieldName].maxlength) {
        $('.form-item.' + fieldName, $(field).closest('form')).addClass('error').prepend('<div class="error-message">Should not be more than ' + dd[fieldName].maxlength + ' chars</div>');
        return false;
    }

    return true;
}

function checkRule(rule, value) {

    switch(rule.type) {
    case 'number':
        if(!isNumber(value)) {
            return false;
        }
        break;
    case 'email':
        if(!looksLikeEmail(value)) {
            return false;
        }
        break;
    case 'creditcard':
        if(!isCreditCard(value)) {
            return false;
        }
        break;
    case 'name':
        if(!isFullName(value)) {
            return false;
        }
        break;
    case 'title':
        if(value < 1) {
            return false;
        }
        break;
    case 'comboid':
        if(value < 1) {
            return false;
        }
        break;
    case 'chars':
        if(!charactersOnly(value)) {
            return false;
        }
        break;
    case 'debitcard':
        var re = new RegExp(/\s/g);
        if(re.test($('#card-number', '#debit-card').val())) {
            return false;
        }
        break;
    }

    if(rule.length) {
        if(value.length !== rule.length) {
            return false;
        }
    }

    return true;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isFullName(str) {
    return $.trim(str).indexOf(" ") !== -1;
}

function charactersOnly(str) {
    return str.search(/\d/g) === -1;
}

/* Don't go inside this rabbit-hole. Test email validity by sending email. Leave this method alone */
function looksLikeEmail(str) {
    var re = new RegExp(/^\S+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/);
    return re.test(str);
}

function isCreditCard(cardNumber) {

    if(cardNumber.length > 19) {
        return(false);
    }

    var cardType = zovi.util.findCardType(cardNumber);
    if(cardType === 1 || cardType === 2) {
        if(cardNumber.length !== 16) {
            return false;
        }
    }

    var sum = 0, mul = 1, l = cardNumber.length;
    var digit, tproduct;

    for(var i = 0; i < l; i++) {
        digit = cardNumber.substring(l - i - 1, l - i);
        tproduct = parseInt(digit, 10) * mul;
        if(tproduct >= 10) {
            sum += (tproduct % 10) + 1;
        } else {
            sum += tproduct;
        }

        mul = mul === 1 ? 2 : 1;
    }

    return sum % 10 === 0;
}

