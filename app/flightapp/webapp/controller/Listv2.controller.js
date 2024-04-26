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

        this._createFlightV2(oForm);
      },

      _createFlightV2: function (oFlight) {
        var odatamodel = this.getView().getModel("v2model");

        odatamodel.create("/Flights", oFlight, {
          success: function (data, response) {
            MessageBox.success("Data was created successfully");
            odatamodel.refresh();
          },
          error: function (error) {
            MessageBox.error("Error while creating the data");
          },
        });
      },
    });
  }
);
