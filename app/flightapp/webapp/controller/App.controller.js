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
        console.log(oForm);
        MessageBox.success("Add Button clicked");
      },
    });
  }
);
