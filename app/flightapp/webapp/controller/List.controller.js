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
      onAfterRendering: function () {
        this.getView();
      },

      onPress: function () {
        //var carrID = this.getView().byId("inCarrID").getValue();
        var oForm = this.getView().getModel("form").getData();

        oForm.fldate = new Date(oForm.fldate);

        var oData = this.getView().getModel("v2model");
        oData.create("/Flights", oForm, {
          success: function () {
            MessageBox.show("The flight was created correctly");
          },
          error: function () {
            MessageBox.show("Failed to create a flight");
          },
        });
      },
      handleListItemPressed: function (oEvent) {
        var sCarrID = oEvent
          .getSource()
          .getBindingContext()
          .getProperty("carrID");
        var sConnID = oEvent
          .getSource()
          .getBindingContext()
          .getProperty("connID");
        var sFldate = oEvent
          .getSource()
          .getBindingContext()
          .getProperty("fldate");

        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("Detail", {
          carrid: sCarrID,
          connid: sConnID,
          fldate: sFldate,
        });
      },
    });
  }
);
