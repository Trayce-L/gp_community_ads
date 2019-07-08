import AdComponent from "discourse/plugins/gp_community_ads/discourse/components/ad-component";
import { default as computed } from "ember-addons/ember-computed-decorators";

const serve_id = Discourse.SiteSettings.carbonads_serve_id,
  placement = Discourse.SiteSettings.carbonads_placement;

export default AdComponent.extend({
  init() {
    this.set("serve_id", serve_id);
    this._super();
  },

  @computed("serve_id")
  url(serveId) {
    return `//cdn.carbonads.com/carbon.js?serve=${serveId}&placement=${placement}`.htmlSafe();
  },

  @computed("currentUser.trust_level")
  showToTrustLevel(trustLevel) {
    return !(
      trustLevel &&
      trustLevel > Discourse.SiteSettings.carbonads_through_trust_level
    );
  },

  @computed("showToTrustLevel", "showToGroups", "showOnCurrentPage")
  showAd(showToTrustLevel, showToGroups, showOnCurrentPage) {
    return (
      placement &&
      serve_id &&
      showToTrustLevel &&
      showToGroups &&
      showOnCurrentPage
    );
  }
});
