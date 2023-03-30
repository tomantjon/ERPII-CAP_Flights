sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("hogent.flightapp.controller.Detail", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.attachRouteMatched(this._onRouteMatched, this);
      },

      _onRouteMatched: function (oEvent) {
        var oArgs = oEvent.getParameter("arguments");
        var oView = this.getView();
        var urlPath =
          "/Flights(carrID='" +
          oArgs.carrid +
          "',connID='" +
          oArgs.connid +
          "',fldate=datetimeoffset'" +
          oArgs.fldate +
          "')";

        var oDataModel = oView.getModel("v2model");

        oView.bindElement({ path: urlPath, model: "v2model" });

        this.readElement(urlPath, oDataModel).done(
          function (oData) {
            oData;
          }.bind(this)
        );
      },

      readElement: function (path, odatamodel, filter) {
        var oDeferred = jQuery.Deferred();

        odatamodel.read(path, {
          filter: [filter],
          success: function (oData) {
            return oDeferred.resolve(oData);
          }.bind(this),
          error: function (oError) {
            return oDeferred.reject(oError);
          }.bind(this),
        });

        return oDeferred.promise();
      },
    });
  }
);
