describe('Util', function() {
    describe('JSON Cleanup', function() {
        beforeEach(function() {
            this.data = {
                "phone_type": "mobile",
                "address_zip": "676317",
                "state_name": "Kerala",
                "phone_country_code": "+91",
                "editable": 1,
                "phone_city_code": "",
                "address_landmarks": "test",
                "address_street": "test",
                "record_created": "06-JAN-2013 15:59",
                "address_default": "1",
                "user_id": "78",
                "address_id": "550120",
                "record_updated": "06-JAN-2013 15:59",
                "country_code": "IN",
                "country_name": "India",
                "user_recepient_name": "test",
                "state_id": "27",
                "address_type": "shipping",
                "record_imported": "20-JAN-2013 14:06",
                "address_other": "",
                "phone_id": "170797",
                "address_linkable_id": "78",
                "city_id": "398",
                "phone_number": "9916055377",
                "address_area": "test",
                "country_id": "1",
                "city_name": "Malappuram",
                "user_name": "hello@niyaz.pk"
            };

            this.dd = {
                address_zip: {type:"text", label:"Pincode", placeholder:"Pincode", datatype: VD.pincode, required: true, maxlength: 6},
                user_recepient_name: {type:"text", label:"Recipient's Name", placeholder:"Recipient's Name" ,required: true, maxlength: 100},
                address_street: {type:"textarea", label:"Street Address", placeholder:"Street Address", required: true, maxlength: 250},
                address_area: {type:"editable-combo", label:"Locality", placeholder:"Locality", required: true, maxlength: 100},
                "city-state": {type:"select", label:"City / State", placeholder:"City / State", required: true},
                address_landmarks: {type:"text", label:"Landmarks", placeholder:"Landmarks" ,maxlength: 100},
                city_id: {type:"hidden"},
                city_name: {type:"hidden"},
                state_name: {type:"hidden"},
                country_name: {type:"hidden", "default": "India"},
                country_code: {type:"hidden"},
                "misc-info": {type:"hidden"},
                address_other: {type:"hidden", "default":""},
                address_id: {type:"hidden"},
                phone_id: {type:"hidden"},
                phone_number: {type:"text", label:"Recipient's Mobile<span id='nineone'>+91</span>", placeholder:"Recipient's Mobile", datatype: VD.phone, required: true, maxlength: 10},
                phone_type: {type:"hidden", "default": "mobile"},
                phone_city_code: {type:"hidden", "default": ""},
                phone_country_code: {type:"hidden", "default": "+91"},
                phone_default: {type:"hidden", "default": 1},
                address_type: {type:"hidden", "default": "shipping"},
                address_default: {type:"hidden", "default": 1}
            };

            this.settings = {
                service: 'services.user.address'
            };

            this.html = '<header><span>undefined</span></header><form action="undefined" method="POST"><div class="form-item address_zip  text"><label for="address_zip">Pincode</label><div class="required">*</div><span class="address_zip" item-type="text">676317</span><input type="text" data-disablevalidation="false" data-datatype="number" class="form-item-input text address_zip" name="address_zip" value="676317" placeholder="Pincode" size="30" maxlength="6"></div><div class="form-item user_recepient_name  text"><label for="user_recepient_name">Recipient\'s Name</label><div class="required">*</div><span class="user_recepient_name" item-type="text">test</span><input type="text" data-disablevalidation="false" data-datatype="text" class="form-item-input text user_recepient_name" name="user_recepient_name" value="test" placeholder="Recipient\'s Name" size="30" maxlength="100"></div><div class="form-item address_street  textarea"><label for="address_street">Street Address</label><div class="required">*</div><span class="address_street" item-type="textarea">test</span><textarea data-disablevalidation="false" data-datatype="textarea" class="form-item-input textarea address_street" name="address_street" placeholder="Street Address">test</textarea></div><div class="form-item address_area  editable-combo"><label for="address_area">Locality</label><div class="required">*</div><span class="address_area" item-type="editable-combo">test</span><input type="text" data-disablevalidation="false" data-datatype="editable-combo" class="form-item-input editable-combo-input address_area" name="address_area" value="test" placeholder="Locality" size="30" maxlength="100"></div><div class="form-item city-state  select"><label for="city-state">City / State</label><div class="required">*</div><span class="city-state" item-type="select">undefined</span><select data-disablevalidation="false" data-datatype="select" name="city-state" class="form-item-input city-state"></select></div><div class="form-item address_landmarks  text"><label for="address_landmarks">Landmarks</label><span class="address_landmarks" item-type="text">test</span><input type="text" data-disablevalidation="false" data-datatype="text" class="form-item-input text address_landmarks" name="address_landmarks" value="test" placeholder="Landmarks" size="30" maxlength="100"></div><div class="form-item city_id  hidden"><span class="city_id" item-type="hidden">398</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="city_id" name="city_id" value="398"></div><div class="form-item city_name  hidden"><span class="city_name" item-type="hidden">Malappuram</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="city_name" name="city_name" value="Malappuram"></div><div class="form-item state_name  hidden"><span class="state_name" item-type="hidden">Kerala</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="state_name" name="state_name" value="Kerala"></div><div class="form-item country_name  hidden"><span class="country_name" item-type="hidden">India</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="country_name" name="country_name" value="India"></div><div class="form-item country_code  hidden"><span class="country_code" item-type="hidden">IN</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="country_code" name="country_code" value="IN"></div><div class="form-item misc-info  hidden"><span class="misc-info" item-type="hidden">undefined</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="misc-info" name="misc-info" value="undefined"></div><div class="form-item address_other  hidden"><span class="address_other" item-type="hidden">undefined</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="address_other" name="address_other" value="undefined"></div><div class="form-item address_id  hidden"><span class="address_id" item-type="hidden">550120</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="address_id" name="address_id" value="550120"></div><div class="form-item phone_id  hidden"><span class="phone_id" item-type="hidden">170797</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="phone_id" name="phone_id" value="170797"></div><div class="form-item phone_number  text"><label for="phone_number">Recipient\'s Mobile<span id=\'nineone\'>+91</span></label><div class="required">*</div><span class="phone_number" item-type="text">9916055377</span><input type="text" data-disablevalidation="false" data-datatype="number" class="form-item-input text phone_number" name="phone_number" value="9916055377" placeholder="Recipient\'s Mobile" size="30" maxlength="10"></div><div class="form-item phone_type  hidden"><span class="phone_type" item-type="hidden">mobile</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="phone_type" name="phone_type" value="mobile"></div><div class="form-item phone_city_code  hidden"><span class="phone_city_code" item-type="hidden">undefined</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="phone_city_code" name="phone_city_code" value="undefined"></div><div class="form-item phone_country_code  hidden"><span class="phone_country_code" item-type="hidden">+91</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="phone_country_code" name="phone_country_code" value="+91"></div><div class="form-item phone_default  hidden"><span class="phone_default" item-type="hidden">undefined</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="phone_default" name="phone_default" value="undefined"></div><div class="form-item address_type  hidden"><span class="address_type" item-type="hidden">shipping</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="address_type" name="address_type" value="shipping"></div><div class="form-item address_default  hidden"><span class="address_default" item-type="hidden">1</span><input type="hidden" data-disablevalidation="false" data-datatype="hidden" class="address_default" name="address_default" value="1"></div><div class="form-item submit"><a href="javascript:void(0);" class="cancel">cancel</a><a href="javascript:void(0);" class="delete-link">delete</a><a href="javascript:void(0);" class="edit-link">edit</a><button class="blue awesome" type="submit">Submit</button><a href="javascript:void(0);" class="edit-link add">Add new undefined</a></div></form>';

        });

        afterEach(function() {
            delete this.obj;
        });

        it('first html', function() {
            var html = getFormHTML(this.data, this.dd, this.settings);
            expect(html).to.be.equals(this.html);
        });

    });
});
