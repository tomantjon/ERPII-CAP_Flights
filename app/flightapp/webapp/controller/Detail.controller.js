sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/Token",
    "sap/ui/table/Column",
    "sap/m/Column",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Token, UIColumn, MColumn) {
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

        var urlPath = "/" + oArgs.flightpath;

        oView.bindElement({ path: urlPath });
        this._setDefaultTokens();
      },

      _setDefaultTokens: function () {
        var oMultiInput = this.byId("multiInput");
        //oMultiInput.addValidator(this._onMultiInputValidate);
        oMultiInput.setTokens(this._getDefaultTokens());
        this._oMultiInput = oMultiInput;
      },

      // #region Value Help Dialog standard use case with filter bar without filter suggestions
      onValueHelpRequested: function () {
        if (!this.pDialog) {
          this.pDialog = this.loadFragment({
            name: "hogent.flightapp.fragment.ValueHelpDialogGame",
          });
        }
        this.pDialog.then(
          function (oDialog) {
            this._oVHD = oDialog;
            // Initialise the dialog with model only the first time. Then only open it
            if (this._bDialogInitialized) {
              // Re-set the tokens from the input and update the table
              oDialog.setTokens([]);
              oDialog.setTokens(this._oMultiInput.getTokens());
              oDialog.update();

              oDialog.open();
              return;
            }
            this.getView().addDependent(oDialog);

            oDialog.getTableAsync().then(
              function (oTable) {
                //get the games ODataModel
                var oDataModel = this.getView().getModel("v2gameModel");
                oTable.setModel(oDataModel);

                // For Desktop and tabled the default table is sap.ui.table.Table
                if (oTable.bindRows) {
                  // Bind rows to the ODataModel and add columns
                  oTable.bindAggregation("rows", {
                    path: "/Games",
                    events: {
                      dataReceived: function () {
                        oDialog.update();
                      },
                    },
                  });
                  oTable.addColumn(
                    new UIColumn({
                      label: "Game",
                      template: "Name",
                    })
                  );
                  oTable.addColumn(
                    new UIColumn({
                      label: "Publisher",
                      template: "Developer",
                    })
                  );
                }

                // For Mobile the default table is sap.m.Table
                if (oTable.bindItems) {
                  // Bind items to the ODataModel and add columns
                  oTable.bindAggregation("items", {
                    path: "/Games",
                    template: new ColumnListItem({
                      cells: [
                        new Label({ text: "{Name}" }),
                        new Label({ text: "{Developer}" }),
                      ],
                    }),
                    events: {
                      dataReceived: function () {
                        oDialog.update();
                      },
                    },
                  });
                  oTable.addColumn(
                    new MColumn({ header: new Label({ text: "Game" }) })
                  );
                  oTable.addColumn(
                    new MColumn({ header: new Label({ text: "Publisher" }) })
                  );
                }
                oDialog.update();
              }.bind(this)
            );

            oDialog.setTokens(this._oMultiInput.getTokens());

            // set flag that the dialog is initialized
            this._bDialogInitialized = true;
            oDialog.open();
          }.bind(this)
        );
      },

      onValueHelpOkPress: function (oEvent) {
        var aTokens = oEvent.getParameter("tokens");
        this._oMultiInput.setTokens(aTokens);
        this._oVHD.close();
      },

      onValueHelpCancelPress: function () {
        this._oVHD.close();
      },

      // Internal helper methods
      _getDefaultTokens: function () {
        var oToken1 = new Token({
          key: "PD-103",
          text: "Mario Bros",
        });

        var oToken2 = new Token({
          key: "range_0",
          text: "Pac Man",
        });

        return [oToken1, oToken2];
      },
    });
  }
);
