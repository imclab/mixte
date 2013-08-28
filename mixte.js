function mixte() {

    var tubes = [],
        chain = [];

    function g(y) {
        return function(d) {
            return d[y];
        };
    }

    function render(selection) {

        selection.append('h3').text('Input');

        var input = selection
            .append('input')
            .attr('placeholder', 'input')
            .on('keyup', evalChain)
            .on('change', evalChain);

        selection.append('h3').text('Chain');

        var selector = selection
            .append('select');

        selector.selectAll('option')
            .data(tubes)
            .enter()
            .append('option')
            .text(g('name'));

        selection
            .append('button')
            .text('Add')
            .on('click', function() {
                chain.push(selector
                    .selectAll('option')
                    .filter(function() {
                        return this.selected;
                    }).datum());
                renderChain();
            });

        var chainsel = selection
            .append('div');

        selection.append('h3').text('Output');

        var output = selection
            .append('pre')
            .text('output');

        evalChain();

        function renderChain() {
            var sel = chainsel.selectAll('div.tube')
                .data(chain, g('name'));

            sel.exit().remove();

            var t = sel.enter()
                .append('div')
                .attr('class', 'tube pad1');

            t.append('strong').text(g('name'));
            t.append('button')
                .text('remove')
                .on('click', function(d) {
                    chain = chain.filter(function(c) {
                        return c !== d;
                    });
                    renderChain();
                });
            evalChain();
        }

        function evalChain() {
            var inputValue = input.property('value');
            var outputValue = chain.reduce(function(mem, link) {
                return link.fn(mem);
            }, inputValue);
            output.text(outputValue);
        }
    }

    render.tubes = function(_) {
        if (!arguments.length) return tubes;
        tubes = _;
        return render;
    };

    return render;
}
