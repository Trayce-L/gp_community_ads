import AdComponent from "discourse/plugins/discourse-adplugin/discourse/components/ad-component";
import {
  default as computed,
  observes
} from "ember-addons/ember-computed-decorators";

const adConfig = Ember.Object.create({
  "google-adsense": {
    settingPrefix: "adsense", // settings follow naming convention
    enabledSetting: "adsense_publisher_code",
    nthPost: "adsense_nth_post_code"
  },
  "google-dfp-ad": {
    settingPrefix: "dfp", // settings follow naming convention
    enabledSetting: "dfp_publisher_id",
    nthPost: "dfp_nth_post_code"
  },
  "amazon-product-links": {
    settingPrefix: "amazon",
    enabledSetting: false,
    nthPost: "amazon_nth_post_code",
    desktop: {
      "topic-list-top": "amazon_topic_list_top_src_code",
      "post-bottom": "amazon_post_bottom_src_code",
      "topic-above-post-stream": "amazon_topic_above_post_stream_src_code",
      "topic-above-suggested": "amazon_topic_above_suggested_src_code"
    },
    mobile: {
      "topic-list-top": "amazon_mobile_topic_list_top_src_code",
      "post-bottom": "amazon_mobile_post_bottom_src_code",
      "topic-above-post-stream":
        "amazon_mobile_topic_above_post_stream_src_code",
      "topic-above-suggested": "amazon_mobile_topic_above_suggested_src_code"
    }
  },
  "codefund-ad": {
    settingPrefix: "codefund",
    enabledSetting: "codefund_property_id",
    nthPost: "codefund_nth_post",
    desktop: {
      "topic-list-top": "codefund_top_of_topic_list_enabled",
      "post-bottom": "codefund_below_post_enabled",
      "topic-above-post-stream": "codefund_above_post_stream_enabled",
      "topic-above-suggested": "codefund_above_suggested_enabled"
    }
  },
  "carbonads-ad": {
    settingPrefix: "carbonads",
    enabledSetting: "carbonads_serve_id",
    desktop: {
      "topic-list-top": "carbonads_topic_list_top_enabled",
      "post-bottom": false,
      "topic-above-post-stream": "carbonads_above_post_stream_enabled",
      "topic-above-suggested": false
    }
  },
  "community-ad": {
    settingPrefix: "community", // settings follow naming convention
    enabledSetting: 'community_trust',
    //nthPost: "",
    desktop: {
      "topic-list-top": "community_topic_list_top_code",
      "post-bottom": "community_post_bottom_code",
      "topic-above-post-stream": "community_topic_above_post_stream_code",
      "topic-above-suggested": "community_topic_above_suggested_code"
    },
    mobile: {
      "topic-list-top": "community_mobile_topic_list_top_code",
      "post-bottom":  "community_mobile_post_bottom_code",
      "topic-above-post-stream": "community_mobile_topic_above_post_stream_code",
      "topic-above-suggested": "community_mobile_topic_above_suggested_code"
    }
  },
});

const displayCounts = {
  houseAds: 0,
  allAds: 0
};

export default AdComponent.extend({
  needsUpdate: false,

  /**
   * For a given ad placement and optionally a post number if in between posts,
   * list all ad network names that are configured to show there.
   */
  @computed("placement", "postNumber")
  availableAdTypes(placement, postNumber) {
    let types = [];
    const houseAds = this.site.get("house_creatives"),
      placeUnderscored = placement.replace(/-/g, "_");

    if (houseAds && houseAds.settings) {
      const adsForSlot = houseAds.settings[placeUnderscored];

      if (
        Object.keys(houseAds.creatives).length > 0 &&
        !Ember.isBlank(adsForSlot) &&
        (!postNumber ||
          this.isNthPost(parseInt(houseAds.settings.after_nth_post, 10)))
      ) {
        types.push("house-ad");
      }
    }

    Object.keys(adConfig).forEach(adNetwork => {
      const config = adConfig[adNetwork];
      let settingNames = null,
        name;

      if (
        config.enabledSetting &&
        !Ember.isBlank(this.siteSettings[config.enabledSetting]) &&
        (!postNumber ||
          !config.nthPost ||
          this.isNthPost(parseInt(this.siteSettings[config.nthPost], 10)))
      ) {
        if (this.site.mobileView) {
          settingNames = config.mobile || config.desktop;
        } else {
          settingNames = config.desktop;
        }

        if (settingNames) {
          name = settingNames[placement];
        }

        if (name === undefined) {
          // follows naming convention: prefix_(mobile_)_{placement}_code
          name = `${config.settingPrefix}_${
            this.site.mobileView ? "mobile_" : ""
          }${placeUnderscored}_code`;
        }

        if (name !== false && !Ember.isBlank(this.siteSettings[name])) {
          types.push(adNetwork);
        }
      }
    });

    return types;
  },

  /**
   * When house ads are configured to alternate with other ad networks, we
   * need to trigger an update of which ad component is shown after
   * navigating between topic lists or topics.
   */
  @observes("refreshOnChange")
  changed() {
    if (this.get("listLoading")) {
      return;
    }

    // force adComponents to be recomputed
    this.notifyPropertyChange("needsUpdate");
  },

  /**
   * Returns a list of the names of ad components that should be rendered
   * in the given ad placement. It handles alternating between house ads
   * and other ad networks.
   */
  @computed("placement", "availableAdTypes", "needsUpdate")
  adComponents(placement, availableAdTypes) {
    if (
      !availableAdTypes.includes("house-ad") ||
      availableAdTypes.length === 1
    ) {
      // Current behaviour is to allow multiple ads from different networks
      // to show in the same place. We could change this to choose one somehow.
      return availableAdTypes;
    }

    const houseAds = this.site.get("house_creatives");
    let houseAdsSkipped = false;

    if (houseAds.settings.house_ads_frequency === 100) {
      // house always wins
      return ["house-ad"];
    } else if (houseAds.settings.house_ads_frequency > 0) {
      // show house ads the given percent of the time
      if (
        displayCounts.allAds === 0 ||
        (100 * displayCounts.houseAds) / displayCounts.allAds <
          houseAds.settings.house_ads_frequency
      ) {
        displayCounts.houseAds += 1;
        displayCounts.allAds += 1;
        return ["house-ad"];
      } else {
        houseAdsSkipped = true;
      }
    }

    const networkNames = availableAdTypes.filter(x => x !== "house-ad");

    if (houseAdsSkipped) {
      displayCounts.allAds += networkNames.length;
    }

    return networkNames;
  }
});
