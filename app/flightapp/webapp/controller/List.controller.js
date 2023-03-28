sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageBox, Filter, FilterOperator) {
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

      onSearch: function (oEvent) {
        // add filter for search
        var aFilters = [];
        var sQuery = oEvent.getSource().getValue();
        if (sQuery && sQuery.length > 0) {
          var filter = new Filter("carrID", FilterOperator.Contains, sQuery);
          aFilters.push(filter);
        }

        // update list binding
        var oTable = this.byId("idFlightsTable");
        var oBinding = oTable.getBinding("items");
        oBinding.filter(aFilters, "Application");
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
      handleListItemPress: function (oEvent) {
        //Get data from click event on table
        let sCarrId = oEvent
          .getSource()
          .getBindingContext()
          .getProperty("carrID");
        let sConnId = oEvent
          .getSource()
          .getBindingContext()
          .getProperty("connID");
        let sFlDate = oEvent
          .getSource()
          .getBindingContext()
          .getProperty("fldate");

        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Detail", {
          carrid: sCarrId,
          connid: sConnId,
          fldate: sFlDate,
        });
      },
    });
  }
);
