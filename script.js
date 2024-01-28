require(["esri/Map", "esri/layers/CSVLayer", "esri/views/MapView", "esri/widgets/Legend"], (
        Map,
        CSVLayer,
        MapView,
        Legend
      ) => {
        const url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";

        // Paste the url into a browser's address bar to download and view the attributes
        // in the CSV file. These attributes include:
        // * mag - magnitude
        // * type - earthquake or other event such as nuclear test
        // * place - location of the event
        // * time - the time of the event

        const template = {
          title: "Crime committed at {ILEADSStreet}"
        };

        // The heatmap renderer assigns each pixel in the view with
        // an intensity value. The ratio of that intensity value
        // to the maxPixel intensity is used to assign a color
        // from the continuous color ramp in the colorStops property

        const renderer = {
          type: "heatmap",
          colorStops: [
            { ratio: 0, color: "rgba(255,255,153, 0)" },
            { ratio: 0.2, color: "rgba(255,255,153, 1)" },
            { ratio: 0.5, color: "rgba(255, 140, 0, 1)" },
            { ratio: 0.8, color: "rgba(255, 140, 0, 1)" },
            { ratio: 1, color: "rgba(255, 0, 0, 1)" }
          ],
          maxDensity: 0.1,
          minDensity: 0,
          radius: 15,
        };

        const layer = new CSVLayer({
          url: url,
          title: "St. Louis Crime Heatmap",
          copyright: "St. Louis Police Department",
          latitudeField:"Lat",
          longitudeField:"Lon",
          popupTemplate: template,
          renderer: renderer
          // labelsVisible: true,
          // labelingInfo: [
          //   {
          //     symbol: {
          //       type: "text", // autocasts as new TextSymbol()
          //       color: "white",
          //       font: {
          //         family: "Noto Sans",
          //         size: 8
          //       },
          //       haloColor: "#472b77",
          //       haloSize: 0.75
          //     },
          //     labelPlacement: "center-center",
          //     labelExpressionInfo: {
          //       expression: "Text($feature.mag, '#.0')"
          //     },
          //     where: "mag > 5"
          //   }
          // ]
        });

        const map = new Map({
          basemap: "dark-gray-vector",
          layers: [layer]
        });

        const view = new MapView({
          container: "viewDiv",
          center: [-90.19090187620964, 38.62621546011977],
          zoom: 12,
          map: map
        });

        view.ui.add(
          new Legend({
            view: view
          }),
          "bottom-right"
        );
      });
