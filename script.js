    var margin = {
        top: 20,
        left: 50,
        bottom: 70,
        right: 20
    };

    var height = 400 - margin.top - margin.bottom;
    var width = 800 - margin.left - margin.right;

    var xAxis;
    var yAxis;
    var color;
    var svg = d3
        .select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    function start_over(data) {

        x_axis = d3 //x axis
            .scaleBand()
            .domain(
                data.map(p => p.date)
            )
            .range([0, width])
            .padding(0.2);

        y_axis = d3.scaleLinear().domain([0, 200]).range([height, 0]); //y axis
        color = d3.scaleLinear().domain([0, 70]).range(["#faf3e0", "#1e212d"]);
        svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x_axis));
        svg.append("g").call(d3.axisLeft(y_axis));




        svg
            .selectAll('rect')
            .data(data)

        .enter()
            .append("rect")
            .attr("x", function(d) {
                return x_axis(d.date);
            })
            .attr("y", function() {
                return y_axis(0);
            })
            .attr("width", x_axis.bandwidth())
            .attr("height", function() {
                return height - y_axis(0);
            })
            .attr("fill", function(d) {
                console.log(color(d.new_tested));
                return color(d.new_tested);

            });


        svg.selectAll("rect").transition().duration(800)
            .attr("y", function(d) {
                return y_axis(d.new_tested);
            })
            .attr("height", function(d) {
                return height - y_axis(d.new_tested);
            }).delay(function(d, i) {
                return i * 100
            })
    }

    function update_chart(data) {
        svg
            .selectAll('rect')
            .data(data)
            .enter()
            .append("rect");


        svg.selectAll("rect").transition().duration(800)
            .attr("y", function(d) {
                return y_axis(d.new_tested);
            })
            .attr("height", function(d) {
                return height - y_axis(d.new_tested);
            })
            .attr('fill', function(d) {
                return color(d.new_tested)
            })
            .delay(function(d, i) {
                return i * 50
            })
    }

    d3.csv("data.csv", function(csv_data) {
        start_over(csv_data)
    });

    //button functions

    function update() {
        d3.csv("data1.csv", function(csv_data) {
            update_chart(csv_data)
        });
    }

    function update_() {

        d3.csv("data.csv", function(csv_data) {
            update_chart(csv_data)
        });
    }