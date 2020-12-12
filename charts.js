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
      var otuids = chartArray.slice(0,10).map(chartSamples => chartSamples.otu_ids);
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
      //var yticks = otuids.map(chartzero => chartzero).reverse().slice(0,10);
      //var yticks = otuids.slice(0,10).sort((a,b) => a.otu_ids - b.otu_ids).reverse();
      //var yticks = otuids.map(chart10 => chart10.otu_ids).reverse();
      //var yticks = chartArray.map(chartSamples => chartSamples.otu_ids).sort((a,b) => a - b).reverse();
      //var yticks = otuids.slice(0,10)//.map(otuID => `OTU ${otuID}`).reverse();
      //var yticks = otuids.slice(0, 10).map(otuID =>  `OTU ${otuID}` ).reverse();
      var yticks = otuids.slice(0, 10).map(otuID =>  `OTU ${otuID}` ).reverse();
       //var yticks = otuids.sort(function(x, y){
        //   return d3.descending(x.otu_ids, y.otu_ids);
      // })
      console.log("yticks");
      console.log(yticks);

    // 8. Create the trace for the bar chart. 
    //var barData = [
      
    //];
    // 9. Create the layout for the bar chart. 
    //var barLayout = {
     
    //};
    // 10. Use Plotly to plot the data with the layout. 
    
  });
}
