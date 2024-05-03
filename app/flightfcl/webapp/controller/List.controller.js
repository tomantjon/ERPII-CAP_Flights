sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/f/library"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, fioriLibrary) {
    "use strict";

    return Controller.extend("hogent.flightfcl.controller.List", {
      onInit: function () {},
      handleListItemPress: function (oEvent) {
        var oFCL = this.getView().getParent().getParent();
        oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
      },
    });
  }
);
