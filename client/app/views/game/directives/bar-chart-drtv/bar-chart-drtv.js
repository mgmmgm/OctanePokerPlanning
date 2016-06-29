(function() {
  'use strict';

  var gameModule = angular.module('opp.game');

  gameModule.directive('barChartDrtv', [function() {
    return {
      restrict: 'E',
      template: '<div class="bar-chart"></div>',
      scope: {
        data: '='
      },
      link: function(scope, element) {

        var data = [
          { name: 'aaaaa', value: 2 },
          { name: 'bbbbbb', value: 21 },
          { name: 'cc', value: 12 },
          { name: 'ddd', value: 8 }
        ];

        var margin = {top: 20, right: 20, bottom: 20, left: 20},
          width = 500 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

        var colors = d3.scale.category20();

        var x = d3.scale.ordinal()
          .domain(data.map(function(d) { return d.name; }))
          .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
          .domain([0, d3.max(data, function(d) { return d.value; })])
          .range([height - margin.top, 0]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

        var el = d3.select(element.find('.bar-chart')[0]);


        var svg = el.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + (margin.left + margin.right) + "," + (margin.top) + ")");


        // x axis
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (height - margin.top) + ")")
          .call(xAxis)
          .append("text")
          .attr("x", width / 2)
          .attr("y", margin.bottom + 5)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Players");

        // y axis
        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("x", -height/2)
          .attr("y", -(margin.bottom + margin.top))
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Values");

        // bars
        svg.append("g")
          .attr("class", "bars")
          .selectAll(".bar")
          .data(data)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.name); })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return (height - margin.top) - y(d.value); })
          .attr("width", x.rangeBand())
          .attr('fill', function() { return '#'+Math.floor(Math.random()*16777215).toString(16); }); // generate random color

        svg.append("g")
          .attr("class", "text-group")
          .selectAll(".bartext")
          .data(data)
          .enter()
          .append("text")
          .attr("class", "bartext")
          .attr("text-anchor", "middle")
          .attr("x", function(d) {
            return x(d.name)+x.rangeBand()/2;
          })
          .attr("y", function(d,i) {
            return y(d.value) - 5;
          })
          .text(function(d){
            return d.value;
          });
      }
    }
  }])

})();