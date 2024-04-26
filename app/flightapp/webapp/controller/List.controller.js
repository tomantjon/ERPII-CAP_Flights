sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("hogent.flightapp.controller.List", {
      onInit: function () {
        var oFlight = {
          carrID: "",
          connID: "",
          fldate: null,
        };
        var oModel = new JSONModel(oFlight);
        this.getView().setModel(oModel, "form");
      },
      handleSavePress: function () {
        var oForm = this.getView().getModel("form").getData();
        oForm.fldate = new Date(oForm.fldate);

        this._createFlightV4(oForm);
      },

      handleListItemPress: function (oEvent) {
        //Get data from click event on table
        var oSelectedItem = oEvent.getSource().getBindingContext();
        //Retrieve the path of the selected item and strip the starting '/'
        //to avoid an invalid URL
        var sFlightPath = oSelectedItem.getPath().substr(1);

        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("Detail", {
          flightpath: sFlightPath,
        });
      },

      _createFlightV4: function (oFlight) {
        var oContext = this.getView()
          .byId("idFlightsTable")
          .getBinding("items")
          .create(oFlight);

        oContext.created().then(
          function () {
            // Flight successfully created
            MessageBox.success("Data was created successfully");
          },
          function (oError) {
            MessageBox.error("Error while creating the data");
            // handle rejection of entity creation; if oError.canceled === true then the transient entity has been deleted
            if (!oError.canceled) {
              throw oError; // unexpected error
            }
          }
        );
      },
    });
  }
);
