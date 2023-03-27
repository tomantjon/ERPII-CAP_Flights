sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("hogent.flightapp.controller.Detail", {
      onInit: function () {
        this.oOwnerComponent = this.getOwnerComponent();
        this.oRouter = this.oOwnerComponent.getRouter();
        this.oRouter.attachRouteMatched(this._onRouteMatched, this);
      },
      _onRouteMatched: function (oEvent) {
        var oArgs = oEvent.getParameter("arguments");
        var oView = this.getView();
        var oDataModel = oView.getModel("v2model");

        //oArgs.fldate = new Date(oArgs.fldate).toJSON();
        var urlPath =
          "/Flights(carrID='" +
          oArgs.carrid +
          "',connID='" +
          oArgs.connid +
          "',fldate=datetimeoffset'" +
          encodeURI(oArgs.fldate.substr(0, 20)) +
          "')";

        oView.bindElement({ path: urlPath, model: "v2model" });

        this.readElement(urlPath, oDataModel).done(
          function (oData) {
            oDataModel.refresh(true);
            var newModel = this.getView().getModel("v2model");
          }.bind(this)
        );
      },

      readElement: function (path, odatamodel, filter) {
        var oDeferred = jQuery.Deferred();

        odatamodel.read(path, {
          filters: [filter],
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
