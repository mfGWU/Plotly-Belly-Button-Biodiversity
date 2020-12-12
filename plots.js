//Create dropdown menu of ID number dynamically from Samples.json
function init() {
    //d3.select() method is used to select the dropdown menu, 
    //which has an id of #selDataset. The dropdown menu is assigned 
    //to the variable selector.
    var selector = d3.select("#selDataset");

    //d3.json() method is used to read the data from samples.json. 
    //The data from the entire JSON file is assigned the (arbitrary) 
    //argument name data.
    d3.json("samples.json").then((data) => {
      console.log(data);
      //Inside the data object, the names array, as seen from console.log(data), 
      //contains the ID numbers of all the study participants. The variable 
      //sampleNames is assigned to this array.
      var sampleNames = data.names;
      // forEach() method is called on the sampleNames array. For each element in 
      //the array, 
      //a dropdown menu option is appended. The text of each dropdown menu 
      //option is the ID. Its value property is also assigned the ID.
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}

  //Argument name newSample refers to the value of the selected menu option. 
  //In index.html, onchange=optionChanged(this.value)passes the selected 
  //menu option's value to the optionChanged()function. This function gives 
  //this information the argument name newSample. In other words,this.value 
  //and newSample are equivalent.
function optionChanged(newSample) {
    buildMetadata(newSample);
    //buildCharts(newSample);
    //console.log(newSample);
  }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      //This section populates the Demographic Info panel with 
      //the rest of the demographic data when a menu option is selected:
      PANEL.append("h5").text(`ID: ${result.id}`);
      PANEL.append("h5").text(`ETHNICITY: ${result.ethnicity}`);
      PANEL.append("h5").text(`GENDER: ${result.gender}`);
      PANEL.append("h5").text(`AGE: ${result.age}`);
      PANEL.append("h5").text(`LOCATION: ${result.location}`);
      PANEL.append("h5").text(`BBTYPE: ${result.bbtype}`);
      PANEL.append("h5").text(`WFREQ: ${result.wfreq}`);
    });

  }

  init();