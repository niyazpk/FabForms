(function($) {

    // 'use strict';

    $.fn.serializeJSON = function() {
        var json = {};
        $.map($(this).serializeArray(), function(n, i) {
            json[n.name] = n.value;
        });
        return json;
    };

    function getformItemHTML(item, dd, value) {

        value = value || defaultValue;
        var klass = dd[item].klass || '';   // any additional classes provided ?
        var defaultValue = dd[item]['default'] || '';
        var placeholder = dd[item].placeholder || '';
        var datatype = (dd[item].datatype && dd[item].datatype.type) || dd[item].type;
        var disableValidation = dd[item].disableValidation || false;

        // only for check-boxes
        var onValue = dd[item].onValue || 1;
        var offValue = dd[item].offValue || 0;

        html = '<div class="form-item ' + item + ' ' + klass + ' ' +  dd[item].type + '">';

        // label for the form field
        if ( ! _.isUndefined(dd[item].label) ) {
            html += '<label for="' + item + '">' + dd[item].label + '</label>';
        }

        if(dd[item].required) {
            html += '<div class="required">*</div>';
        }

        // for displaying data
        html += '<span class="' + item + '" item-type="' + dd[item].type + '">' + value + '</span>';

        var commonStr =  'data-disablevalidation="{{disableValidation}}" data-datatype="{{datatype}}" class="{{class}}" name="{{name}}" value="{{value}}" ';

        // for  editing data
        switch (dd[item].type) {
        case 'hidden':
            html += '<input type="hidden" data-disablevalidation="' + disableValidation + '" data-datatype="' + datatype + '" class="' + item + '" name="' + item + '" value="' + value + '">';
            // html += '<input type="hidden"' + commonStr + '">';
            break;
        case 'text':
            html += ['<input type="text" data-disablevalidation="' + disableValidation + '" data-datatype="' + datatype + '" class="form-item-input text ', item, '" name="', item, '" value="', value, '" placeholder="', placeholder, '" size="30" maxlength="', dd[item].maxlength, '">'].join('');
            break;
        case 'password':
            html += ['<input type="password" data-disablevalidation="' + disableValidation + '" data-datatype="' + datatype + '" class="form-item-input text password ', item, '" name="', item, '" value="', value, '" placeholder="', placeholder, '" size="30" maxlength="', dd[item].maxlength, '">'].join('');
            break;
        case 'textarea':
            html += ['<textarea data-disablevalidation="' + disableValidation + '" data-datatype="' + datatype + '" class="form-item-input textarea ', item, '" name="', item, '" placeholder="', placeholder, '">', value, '</textarea>'].join('');
            break;
        case 'check':
            html += ['<input type="checkbox" data-disablevalidation="' + disableValidation + '" data-datatype="' + datatype + '" class="form-item-input checkbox ', item, '" value="', value, '" name="', item, '" ', value ? 'checked="checked" ' : '', '>'].join('');
            break;
        case 'static':
            html += ['<input type="text" data-disablevalidation="' + disableValidation + '" data-datatype="' + datatype + '" class="form-item-input text static ', item, '" name="', item, '" value="', value, '" disabled size="30">'].join('');
            break;
        case 'editable-combo':
            html += ['<input type="text" data-disablevalidation="' + disableValidation + '" data-datatype="' + datatype + '" class="form-item-input editable-combo-input ', item, '" name="', item, '" value="', value, '" placeholder="', placeholder, '" size="30" maxlength="', dd[item].maxlength, '">'].join('');
            break;
        case 'select':
            html += '<select data-disablevalidation="' + disableValidation + '" data-datatype="' + datatype + '" name="' + item + '" class="form-item-input ' + item + '">';

            var options = dd[item].options;
            var selected;

            var isObject = function(obj) {
                return obj === Object(obj);
            };

            for (var option in options) {
                var x = options[option];

                if(isObject(x)){
                    selected = (x.value === value ? 'selected' : '');
                    html += '<option ' + selected + ' value="' + x.value + '">' + x.text + '</option>';
                }else{
                    selected = (x === value ? 'selected' : '');
                    html += '<option ' + selected + ' value="' + x + '">' + x + '</option>';
                }
            }

            html += '</select>';
            break;
        case 'image':
            html += ['<img class="form-item-input image ', item, '" name="', item, '" src="', value, '">'].join('');
            break;
        case 'html':
            html += dd[item].value;
            break;
        default:
            log('Problem with json: ' + settings.service.url + ' : ' + dd[item].label);
        }
        html += '</div>';

        return html;
    }


    getFormHTML = function(data, reference, settings) {
        var html = '';
        html += '<header><span>' + settings.title + '</span></header>';
        html +=         '<form action="' + settings.service.url + '" method="POST">';

        for(var item in reference) {
            html += getformItemHTML(item, reference, data && data[item]);
        }

        html += '<div class="form-item submit">';
        html += '<a href="javascript:void(0);" class="cancel">cancel</a>';
        if (data && data.editable && data.editable > 0) {
            html += '<a href="javascript:void(0);" class="delete-link">delete</a>';
            html += '<a href="javascript:void(0);" class="edit-link">edit</a>';
        }

        html += '<button class="blue awesome" type="submit">' + (settings.submitText || 'Submit') + '</button>';
        html += '<a href="javascript:void(0);" class="edit-link add">Add new ' + settings.title + '</a>';
        html += '</div></form>';

        return html;
    };


    $.fn.renderEditableData = function (data, reference, settings) {

        var defaults = {
            title: '',
            submitText: 'Submit',
            loaderText: 'Saving...'
        };

        var isArray = Array.isArray || function(obj) {
          return toString.call(obj) == '[object Array]';
        };

        settings = $.extend({}, defaults, settings);

        var editable = $('<div class="editable ' + (data ? 'current': 'new') + '">');

        var html = getFormHTML(data, reference, settings);

        editable.append(html);

        $(this).append(editable);

        $('input:text, textarea, select', editable).blur(function() {
            validateField(this, reference);
        });

        // ajaxify form submit
        $('form', editable).submit(function() {

            var form = this;
            if (validateForm(this, reference)) {


                $('.form-error-message', form).remove();
                $('.submit button', form).spinner({ position: settings.spinnerPosition || 'left' });

                // Get data to be sent
                var formJson = $(form).serializeJSON();

                // Any modifications to be done before sending
                if(settings.dataTransform){
                    formJson = settings.dataTransform(formJson, editable);
                }

                if(settings.submit) {
                    return settings.submit(form, formJson);
                } else {

                    if(settings.beforeAjax) {
                        settings.beforeAjax(form, formJson);
                    }

                    zovi.ajax({
                        type: data ? 'PUT' : 'POST',
                        service: settings.service,
                        data: JSON.stringify(formJson)
                    }).done(function(data) {
                        if(settings.done) {
                            // callback is passed the request data & response data
                            settings.done(data, formJson);
                        }
                        $('.submit button', form).spinner('remove');
                    }).fail(function(jqXHR){
                        if(settings.fail) {
                            settings.fail(jqXHR, form);
                        }
                        if(settings.errorMessageHandler) {
                            var message = settings.errorMessageHandler(jqXHR, form);
                            $(form).append('<div class="form-error-message">' + message + '</div>');
                        }
                        $('.submit button', form).spinner('remove');
                    });

                }

            }
            return false; // block the default form submit
        });

        // Allow only numbers in numeric fields
        $(editable).on('keydown', '.form-item .form-item-input', function(e) {
            if( $(this).data('datatype') === 'number' ||
                $(this).data('datatype') === 'creditcard') {
                zovi.util.allowOnlyDigits(e);
            }
        });

        // placeholder for IE
        $('input, textarea').placeholder();

        return $(this);  // allow jQuery chaining

    };


    /**
    * xxxxxxxxxxx
    *
    *
    * @method renderNewForm
    * @for $
    * @param {Object} obj xxxxxxxx x xxxx
    * @param {String} path xxx xxxx xxxxx
    * @return {Object} xxxx xxxxxx x xxxxx
    */
    $.fn.renderNewForm = function (reference, settings) {
        return $(this).renderEditableData(undefined, reference, settings);
    };

    $('.edit-link, .cancel', '.editable').on('click', function() {
        $('.form-item .error-message').remove();
        $('.form-item.error').removeClass('error');
        $(this).closest('.editable').toggleClass('editing');
        return false;
    });


})(jQuery);