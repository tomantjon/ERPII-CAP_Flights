sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/f/library"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, fioriLibrary) {
    "use strict";

    return Controller.extend("hogent.flightfcl.controller.List", {
      onInit: function () {
        this.oView = this.getView();
        this.oFlightsTable = this.oView.byId("idFlightsTable");
        this.oRouter = this.getOwnerComponent().getRouter();
      },
      handleListItemPress: function (oEvent) {
        //Get data from click event on table
        var oSelectedItem = oEvent.getSource().getBindingContext();
        //Retrieve the path of the selected item and strip the starting '/'
        //to avoid an invalid URL
        var sFlightPath = oSelectedItem.getPath().substr(1);

        this.oRouter.navTo("Detail", {
          layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
          flightpath: sFlightPath,
        });
      },
    });
  }
);
