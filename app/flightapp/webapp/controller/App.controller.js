sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("hogent.flightapp.controller.App", {
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

        var odatamodel = this.getView().getModel("v2model");

        odatamodel.create("/Flights", oForm, {
          success: function (data, response) {
            MessageBox.success("Data was created successfully");
          },
          error: function (error) {
            MessageBox.error("Error while creating the data");
          },
        });
      },
    });
  }
);
