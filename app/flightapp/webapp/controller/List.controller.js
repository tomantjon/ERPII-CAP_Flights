sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("flightapp.controller.List", {
      onInit: function () {
        var oFlight = {
          carrID: "",
          connID: "",
          fldate: null,
        };
        var oModel = new JSONModel(oFlight);
        this.getView().setModel(oModel, "form");
      },
      onPress: function () {
        var oForm = this.getView().getModel("form").getData();
        oForm.fldate = new Date(oForm.fldate);

        var odatamodel = this.getView().getModel("v2model");

        odatamodel.create("/Flights", oForm, {
          success: function () {
            MessageToast.show("Data was added");
          },
          error: function () {
            MessageToast.show("Error");
          },
        });
      },
      handleListItemPressed: function (oEvent) {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Detail", {
          flightpath: oEvent
            .getSource()
            .getBindingContext()
            .getPath()
            .substr(1),
        });
      },
    });
  }
);
