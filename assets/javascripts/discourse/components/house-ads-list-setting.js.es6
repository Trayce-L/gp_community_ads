import HouseAdsSetting from "discourse/plugins/gp_community_ads/discourse/components/house-ads-setting";

export default HouseAdsSetting.extend({
  classNames: "house-ads-setting house-ads-list-setting",
  adNames: Ember.computed.mapBy("allAds", "name")
});
