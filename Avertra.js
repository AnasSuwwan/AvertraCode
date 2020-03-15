am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

var data=[
  {
    "sector": "R1",
    "success": 70 ,
    "failur": 30
  },
  {
    "sector": "R2",
    "success": 50,
    "failur": 50
  },
  {
    "sector": "R3",
    "success": 20,
    "failur": 80,
    
  }
];

let series=[];
      
// Config Legend
chart.legend = new am4charts.Legend();
chart.legend.position = "right";
chart.legend.valign = "top";
chart.legend.itemContainers.template.paddingTop = 5;
chart.legend.itemContainers.template.paddingBottom = 5;
chart.legend.useDefaultMarker = true;
chart.legend.labels.template.text = "[font-size:10px {color}]{name}[/]";
var markerTemplate = chart.legend.markers.template;
markerTemplate.width = 12;
markerTemplate.height = 12;

// Config scrollbarX
chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.dy = -30;

// Config padding
chart.paddingLeft = 2;
chart.paddingTop = 30;

// Add data chart
chart.data = data;

// Create category axis
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "sector";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 15;
categoryAxis.renderer.cellStartLocation = 0.1;
categoryAxis.renderer.cellEndLocation = 0.9;

// Config value axis
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inside = false;
valueAxis.renderer.labels.template.disabled = false;
valueAxis.extraMax = 0;
valueAxis.strictMinMax = false;
      
series = reduceSeries(data); 

series.forEach((v) => {
  if(v !== 'sector'){
    createSeries(v, v);
  }
});

// Config label calculateTotals
var totalBullet = totalSeries.bullets.push(new am4charts.LabelBullet());
totalBullet.dy = -20;
totalBullet.label.text = "{valueY.total}";
totalBullet.label.hideOversized = false;
totalBullet.label.fontSize = 11;
totalBullet.label.background.fill = totalSeries.stroke;
totalBullet.label.dy = -10;
totalBullet.label.background.fillOpacity = 0.2;
totalBullet.label.padding(5, 0, 5, 0);
totalBullet.label.truncate = false;


// Create series
function createSeries(field, name) {
  // Set up series
  let series = chart.series.push(new am4charts.ColumnSeries());

  series.name = name;
  series.dataFields.valueY = field;
  series.dataFields.categoryX = "sector";
  series.sequencedInterpolation = true;

  // Make it stacked
  series.stacked = true;

  // Configure columns
  series.columns.template.width = am4core.percent(95);
  series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY} %"; 

  // Add label Bullet
  let labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.label.text = "{valueY}";
  labelBullet.label.fill = am4core.color("#fff");
  labelBullet.label.fontSize = 11;
  labelBullet.label.dy = 0;
  labelBullet.label.hideOversized = true;
  labelBullet.locationY = 0.5;

  return series;
}

// Add legend
chart.legend = new am4charts.Legend();


/*
* Objenemos los nombres únicos para generar series
*/
function reduceSeries(x) {
  let a = x.reduce(function (res, obj) {
    let keys = Object.keys(obj);
    keys.forEach(item => {
      if (!(item in res)) {
        res.__array.push(res[item] = item);
      }
    });

    return res;
  }, { __array: [] }).__array;

  return a;
}