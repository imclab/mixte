d3.select('.container')
    .call(mixte()
         .tubes([
             {
                 name: 'Uppercase That String',
                 type: ['string', 'string'],
                 fn: function(str) {
                    return str.toUpperCase();
                 }
             },
             {
                 name: 'Postfix that string with Tom',
                 type: ['string', 'string'],
                 fn: function(str) {
                    return str + ', Tom';
                 }
             },
             {
                 name: 'Postfix that string with a word',
                 type: ['string', 'string'],
                 fn: function(str) {
                    return str + ', Tom';
                 }
             }
         ]));
