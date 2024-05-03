sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("hogent.flightfcl.controller.Detail", {
      onInit: function () {
        var oOwnerComponent = this.getOwnerComponent();

        this.oRouter = oOwnerComponent.getRouter();
        this.oModel = oOwnerComponent.getModel();

        this.oRouter
          .getRoute("List")
          .attachPatternMatched(this._onRouteMatched, this);
        this.oRouter
          .getRoute("Detail")
          .attachPatternMatched(this._onRouteMatched, this);
      },

      _onRouteMatched: function (oEvent) {
        this._product =
          oEvent.getParameter("arguments").flightpath || this._product || "0";
        this.getView().bindElement({
          path: "/" + this._product,
        });
      },

      onExit: function () {
        this.oRouter
          .getRoute("List")
          .detachPatternMatched(this._onRouteMatched, this);
        this.oRouter
          .getRoute("Detail")
          .detachPatternMatched(this._onRouteMatched, this);
      },
    });
  }
);
