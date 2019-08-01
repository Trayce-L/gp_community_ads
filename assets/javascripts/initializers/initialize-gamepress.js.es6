import { withPluginApi } from "discourse/lib/plugin-api";
import TopicRoute from 'discourse/routes/topic';

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

    api.onPageChange(url => {
      window.googletag.cmd.push(() => {
        window.googletag.pubads().refresh();
      });
    });
  }
};
