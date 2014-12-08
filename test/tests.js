var testTableGenerator;
before(function(){
    testTableGenerator = new TableGenerator();
});

describe("TableGenerator.search()", function() {

    var items = [
        {
            "name": "foo",
            "a": {
                "p1": {
                    "sp1": 100
                }
            }
        },{
            "name": "bar",
            "a": {
                "p1": {
                    "sp2": 200
                }
            }
        }
    ]

    /**
     * Note that this functino does not check for  a regular property.
     */
    it("should return return prop value if exists (1 level deep)", function() {
        expect(testTableGenerator.search(
            {foo: 'bar'},
            'foo'
        )).to.equal('bar');
    }); 
    it("should return return prop value if exists (2 levels deep)", function() {
        expect(testTableGenerator.search(
            {foo: {bar: 'baz'}},
            'foo/bar'
        )).to.equal('baz');
    }); 
    it("should return return prop value if exists (3 levels deep)", function() {
        expect(testTableGenerator.search(
            {foo: {bar: {baz: 'goo'}}},
            'foo/bar/baz'
        )).to.equal('goo');
    }); 
    it("should return null if property does not exist exist (1 level deep)", function() {
        expect(testTableGenerator.search({},'foo')).to.be.null;
    }); 
    it("should return null if property does not exist exist (2 levels deep)", function() {
        expect(testTableGenerator.search(
            {foo: {bar: 'baz'}},
            'foo/noo'
        )).to.be.null;
    }); 
    it("should return null if property does not exist exist (3 levels deep)", function() {
        expect(testTableGenerator.search(
            {foo: {bar: {baz: 'goo'}}},
            'foo/bar/noo'
        )).to.be.null;
    }); 
    it("should return prop value if exists and is an object (1 level deep)", function() {
        expect(testTableGenerator.search(
            {foo: {bar: 'baz'}},
            'foo'
        )).to.deep.equal({bar: 'baz'});
    }); 
});

describe("TableGenerator.hasXProp()", function() {

    it("should return true if xprop list has property (1 level deep)", function() {
        expect(testTableGenerator.hasXProp(
            [ {name: 'foo'} ],
            'foo'
        )).to.be.true;
    });
    it("should return false if xprop list doesn't have property (1 level deep)", function() {
        expect(testTableGenerator.hasXProp(
            [ {name: 'foo'} ],
            'bar'
        )).to.be.false;
    });
    it("should return true if xprop list has property (2 levels deep)", function() {
        expect(testTableGenerator.hasXProp(
            [
                {
                    name: 'foo', properties: [
                        {name: 'bar'}
                    ]
                }
            ],
            'foo/bar'
        )).to.be.true;
    });
    it("should return true if xprop list has property (3 levels deep)", function() {
        expect(testTableGenerator.hasXProp(
            [
                {
                    name: 'foo', properties: [
                        {
                            name: 'bar', properties: [
                                {
                                    name: 'baz'
                                }
                            ]
                        }
                    ]
                }
            ],
            'foo/bar/baz'
        )).to.be.true;
    });
    it("should return false if xprop list doesn't have property (3 levels deep)", function() {
        expect(testTableGenerator.hasXProp(
            [
                {
                    name: 'foo', properties: [
                        {
                            name: 'bar', properties: [
                                {
                                    name: 'baz'
                                }
                            ]
                        }
                    ]
                }
            ],
            'foo/bar/noo'
        )).to.be.false;
    });
});