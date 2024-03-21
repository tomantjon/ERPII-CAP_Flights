sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("flightapp.controller.Detail", {
      onInit: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.attachRouteMatched(this._onRouteMatched, this);
        //Bind the model to the selected flightpath
      },

      _onRouteMatched: function (oEvent) {
        var oArgs = oEvent.getParameter("arguments");
        var oUrl = "/" + oArgs.flightpath;

        this.getView().bindElement({ path: oUrl });
      },
    });
  }
);
