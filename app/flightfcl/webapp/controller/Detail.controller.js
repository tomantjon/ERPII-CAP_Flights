sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/f/library"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, fioriLibrary) {
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
        this._flight =
          oEvent.getParameter("arguments").flightpath || this._flight || "0";
        this.getView().bindElement({
          path: "/" + this._flight,
        });
      },

      handleFullScreen: function () {
        this.oRouter.navTo("Detail", {
          layout: fioriLibrary.LayoutType.MidColumnFullScreen,
          flightpath: this._flight,
        });
      },

      handleExitFullScreen: function () {
        this.oRouter.navTo("Detail", {
          layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
          flightpath: this._flight,
        });
      },

      handleClose: function () {
        this.oRouter.navTo("List", {
          layout: fioriLibrary.LayoutType.OneColumn,
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
