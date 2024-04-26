sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("hogent.flightapp.controller.App", {
      onInit: function () {},
      handleSavePress: function () {
        MessageBox.success("Add Button clicked");
      },
    });
  }
);
