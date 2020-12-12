function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
   buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    console.log("metadata");
    console.log(metadata);
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    //console.log(result);
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

//1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
      var chartMetadata = data.samples;
      console.log("chartMetadata");
      console.log(chartMetadata);
    // 4. Create a variable that filters the samples for the object with the 
    //desired sample number.
      var chartArray = chartMetadata.filter(sampleObj => sampleObj.id == sample);
      console.log("chartArray");
      console.log(chartArray);
    //  5. Create a variable that holds the first sample in the array.
      var chartResult = chartArray[0];
      console.log("chartResult");
      console.log(chartResult);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otuids = chartArray.map(chartSamples => chartSamples.otu_ids);
      console.log("otuids");
      console.log(otuids);
      var otulabels = chartArray.map(chartSamples => chartSamples.otu_labels);
      console.log("otulabels");
      console.log(otulabels);
      var samplevalues = chartArray.map(chartSamples => chartSamples.sample_values);
      console.log("samplevalues");
      console.log(samplevalues);
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
      var yticks = otuids[0].slice(0, 10).sort((a,b) => a - b);
      console.log("yticks");
      console.log(yticks);

      var xaxis_chart = samplevalues[0].slice(0, 10).sort((a,b) => a - b);
      console.log("xaxis_chart");
      console.log(xaxis_chart);

      var text_chart = otulabels[0].slice(0, 10).sort((a,b) => a - b);
      console.log("text_chart");
      console.log(text_chart);
    // 8. Create the trace for the bar chart. 
      var trace = {
        x: xaxis_chart,
        y: `OTU ${yticks}`,
        type: "bar",
        orientation: "h",
        //hovertemplate: text_chart,
        text: otulabels.map(String)
      };
    var barData = [trace];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      showlegend: false
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

        // Use Plotly to plot the data with the layout. 
    // Create the trace for the bubble chart.
    var traceBubble = {
      x: yticks,
      y: xaxis_chart,
      mode: 'markers',
      text: text_chart,
      marker: {
        size: xaxis_chart,
        color: yticks
      }
    };
    var bubbleData = [traceBubble];

    // Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures per Sample',
      xaxis: {title: "OTU ID"}
    };
    // D2: 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
    // // 4. Create the trace for the gauge chart.

    var gaugeData = [
      {
        
        type: "indicator",
        mode: "gauge+number",
        value: 2,
        title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
        
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "black" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 2], color: "cyan" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "rgb(159, 226, 191)" },
            { range: [8, 10], color: "rgb(46, 139, 87)" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 9.9
          }
        }
      }


    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600, height: 500, margin: { t: 0, b: 0 }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
