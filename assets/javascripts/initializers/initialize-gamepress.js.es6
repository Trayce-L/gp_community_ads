import { withPluginApi } from "discourse/lib/plugin-api";
import TopicRoute from 'discourse/routes/topic';
import TopicNavigation from 'discourse/components/topic-navigation';

export default {
  name: "initialize-gamepress",
  initialize(container) {
    TopicRoute.reopen({
      activate: function() {
        this._super();
        if(window.googletag) {
          window.googletag.cmd.push(() => {
            window.googletag.pubads().refresh();
          });
        }
      },

      deactivate: function() {
        this._super();
        if(window.googletag) {
          window.googletag.cmd.push(() => {
            window.googletag.pubads().refresh();
          });
        }
      }
    });

    TopicNavigation.reopen({
      activate: function() {
        this._super();
        if(window.googletag) {
          window.googletag.cmd.push(() => {
            window.googletag.pubads().refresh();
          });
        }
      },

      deactivate: function() {
        this._super();
        if(window.googletag) {
          window.googletag.cmd.push(() => {
            window.googletag.pubads().refresh();
          });
        }
      }
    });
  }
};
