describe('Util', function() {
    describe('JSON Cleanup', function() {
        beforeEach(function() {
            this.obj = obj = {
                name: '<>script',
                age: 24,
                children: [{
                    name: '<script>alert("hi")</script>',
                    age: 11
                }, {
                    name: '<script>alert("hi")</script>',
                    age: 11
                }]
            };
        });

        afterEach(function() {
            delete this.obj;
        });

        it('processJSON should work fine', function() {
            zovi.util.processJSON(this.obj, zovi.util.cleanupJSON)
            expect(this.obj).property('name', '&lt;&gt;script');
        });

        it('processJSON should work fine on children nodes', function() {
            zovi.util.processJSON(this.obj, zovi.util.cleanupJSON)
            expect(this.obj.children[0]).property('name', '&lt;script&gt;alert("hi")&lt;/script&gt;');
        });
    });
});
