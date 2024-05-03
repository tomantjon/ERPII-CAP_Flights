/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "hogent/flightfcl/model/models",
    "sap/ui/model/json/JSONModel",
    "sap/f/library",
  ],
  function (UIComponent, Device, models, JSONModel, fioriLibrary) {
    "use strict";

    return UIComponent.extend("hogent.flightfcl.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        var oLayoutModel = new JSONModel();
        this.setModel(oLayoutModel, "layoutModel");

        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // enable routing
        var oRouter = this.getRouter();
        oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
        oRouter.initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
      },

      _onBeforeRouteMatched: function (oEvent) {
        var oLayoutModel = this.getModel("layoutModel"),
          sLayout = oEvent.getParameters().arguments.layout;

        // If there is no layout parameter, set a default layout (normally OneColumn)
        if (!sLayout) {
          sLayout = fioriLibrary.LayoutType.OneColumn;
        }

        oLayoutModel.setProperty("/layout", sLayout);
      },
    });
  }
);
