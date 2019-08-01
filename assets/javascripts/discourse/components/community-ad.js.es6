import AdComponent from "discourse/plugins/discourse-adplugin/discourse/components/ad-component";
import {
  default as computed,
  on
} from "ember-addons/ember-computed-decorators";

let ads = {};

// This creates an array for the values of the custom targeting key
function valueParse(value) {
  let final = value.replace(/ /g, "");
  final = final.replace(/['"]+/g, "");
  final = final.split(",");
  return final;
}

// This creates an array for the key of the custom targeting key
function keyParse(word) {
  let key = word;
  key = key.replace(/['"]+/g, "");
  key = key.split("\n");
  return key;
}

// This should call adslot.setTargeting(key for that location, value for that location)
function custom_targeting(key_array, value_array, adSlot) {
  for (var i = 0; i < key_array.length; i++) {
    if (key_array[i]) {
      adSlot.setTargeting(key_array[i], valueParse(value_array[i]));
    }
  }
}

const DESKTOP_SETTINGS = {
  "topic-list-top": {
    code: "community_topic_list_top_code",
    width: 728,
    height: 90,
    targeting_keys: "",
    targeting_values: ""
  },
  "topic-above-post-stream": {
    code: "community_topic_above_post_stream_code",
    width: 728,
    height: 90,
    targeting_keys: "",
    targeting_values: ""
  },
  "topic-above-suggested": {
    code: "community_topic_above_suggested_code",
    width: 728,
    height: 90,
    targeting_keys: "",
    targeting_values: ""
  },
  "post-bottom": {
    code: "community_post_bottom_code",
    width: 728,
    height: 90,
    targeting_keys: "",
    targeting_values: ""
  }
};

const MOBILE_SETTINGS = {
  "topic-list-top": {
    code: "community_mobile_topic_list_top_code",
    width: 300,
    height: 250,
    targeting_keys: "",
    targeting_values: ""
  },
  "topic-above-post-stream": {
    code: "community_mobile_topic_above_post_stream_code",
    width: 300,
    height: 250,
    targeting_keys: "",
    targeting_values: ""
  },
  "topic-above-suggested": {
    code: "community_mobile_topic_above_suggested_code",
    width: 300,
    height: 250,
    targeting_keys: "",
    targeting_values: ""
  },
  "post-bottom": {
    code: "community_mobile_post_bottom_code",
    width: 300,
    height: 250,
    targeting_keys: "",
    targeting_values: ""
  }
};

function getWidthAndHeight(placement, settings, isMobile) {
  let config;

  if (isMobile) {
    config = MOBILE_SETTINGS[placement];
  } else {
    config = DESKTOP_SETTINGS[placement];
  }

  return {
    width: config.width,
    height: config.height
  };
}

function defineSlot(divId, placement, settings, isMobile, categoryTarget) {

  if (ads[divId]) {
    return ads[divId];
  }

  let ad;
  let size = getWidthAndHeight(placement, settings, isMobile);

  ad = divId;

  ads[divId] = {ad: ad, width: size.width, height: size.height};
  return ads[divId];
}

function destroySlot(divId) {
  if (ads[divId]) {
    //todo: deleteion code
    delete ads[divId];
  }
}

export default AdComponent.extend({
  classNameBindings: ["adUnitClass"],
  classNames: ["community-ad"],
  loadedGoogletag: false,
  refreshOnChange: null,
  lastAdRefresh: null,

  @computed(
    "siteSettings.community_id",
    "siteSettings.community_id",
    "site.mobileView"
  )
  publisherId(globalId, mobileId, isMobile) {
    if (isMobile) {
      return mobileId || globalId;
    } else {
      return globalId;
    }
  },

  @computed("placement", "postNumber", "site.mobileView")
  divId(placement, postNumber, isMobile) {
    if (isMobile) {
      if (placement === "topic-list-top") {
        return `${this.siteSettings.community_mobile_topic_list_top_code}`;
      }
      if (placement === "topic-above-post-stream") {
        return `${this.siteSettings.community_mobile_topic_above_post_stream_code}`;
      }
      if (placement === "topic-above-suggested") {
        return `${this.siteSettings.community_mobile_topic_above_suggested_code}`;
      }
      if (placement === "post-bottom") {
        return `${this.siteSettings.community_mobile_post_bottom_code}`;
      }

    } else {
      if (placement === "topic-list-top") {
        return `${this.siteSettings.community_topic_list_top_code}`;
      }
      if (placement === "topic-above-post-stream") {
        return `${this.siteSettings.community_topic_above_post_stream_code}`;
      }
      if (placement === "topic-above-suggested") {
        return `${this.siteSettings.community_topic_above_suggested_code}`;
      }
      if (placement === "post-bottom") {
        return `${this.siteSettings.community_post_bottom_code}`;
      }
    }
  },

  @computed("placement")
  divId_da(placement) {
    if (placement === "topic-list-top") {
      return true;
    }

    return false;
  },

  @computed("site.mobileView")
  isMobileDevice(isMobile) {
    if (isMobile) {
      return true;
    }

    return false;
  },

  @computed("placement")
  divId_dc(placement) {
    if (placement === "topic-above-post-stream") {
      return true;
    }

    return false;
  },

  @computed("placement")
  divId_dd(placement) {
    if (placement === "topic-above-suggested") {
      return true;
    }

    return false;
  },

  @computed("placement")
  divId_db(placement) {
    if (placement === "post-bottom") {
      return true;
    }

    return false;
  },

  @computed("placement", "showAd")
  adUnitClass(placement, showAd) {
    return showAd ? `community-ad-${placement}` : "";
  },

  @computed("width", "height")
  adWrapperStyle(w, h) {
    return `width: ${w}px; height: ${h}px;`.htmlSafe();
  },

  @computed("width")
  adTitleStyleMobile(w) {
    return `width: ${w}px;`.htmlSafe();
  },

  @computed(
    //"publisherId",
    "showToTrustLevel",
    //"showToGroups",
    //"showAfterPost",
    //"showOnCurrentPage"
  )
  showAd(
    //publisherId,
    showToTrustLevel,
    //showToGroups,
    //showAfterPost,
    //showOnCurrentPage
  ) {
    return (
      //publisherId &&
      showToTrustLevel
      //showToGroups &&
      //showAfterPost &&
      //showOnCurrentPage
    );
  },

  @computed("currentUser.trust_level")
  showToTrustLevel(trustLevel) {
    return !(
      trustLevel && trustLevel > this.siteSettings.community_trust
    );
  },

  // 3 second delay between calls to refresh ads in a component.
  // Ember often calls updated() more than once, and *sometimes*
  // updated() is called after _initGoogleDFP().
  shouldRefreshAd() {
  },

  @on("didUpdate")
  updated() {
  },

  @on("didInsertElement")
  _initGoogleDFP() {
    // if (!this.get("showAd")) {
    //     return;
    // }

    this.set("loadedGoogletag", true);
    this.set("lastAdRefresh", new Date());
    this.get("divId_da");
    this.get("divId_db");
    this.get("divId_dc");
    this.get("divId_dd");
    this.get('isMobileDevice');

    let slot = defineSlot(
      this.get("divId"),
      this.get("placement"),
      this.siteSettings,
      this.site.mobileView,
      this.get("currentCategorySlug") || "0"
    );
  },

  willRender() {
    this._super(...arguments);

    // if (!this.get("showAd")) {
    //     return;
    // }

    let size = getWidthAndHeight(
      this.get("placement"),
      this.siteSettings,
      this.site.mobileView
    );
    this.set("width", size.width);
    this.set("height", size.height);
  },

  @on("willDestroyElement")
  cleanup() {
    destroySlot(this.get("divId"));
  }
});
