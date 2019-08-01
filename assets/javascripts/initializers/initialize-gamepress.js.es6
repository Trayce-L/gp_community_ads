import { withPluginApi } from "discourse/lib/plugin-api";
const TopicRoute = require("discourse/routes/topic").default;

export default {
  name: "initialize-gamepress",
  initialize(container) {
    TopicRoute.reopen({
      activate: function() {
        this._super();
        window.googletag.cmd.push(() => {
          window.googletag.pubads().refresh();
        });
      },

      deactivate: function() {
        this._super();
        window.googletag.cmd.push(() => {
          window.googletag.pubads().refresh();
        });
      }
    });
  }
};
