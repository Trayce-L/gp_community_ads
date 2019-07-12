import AdComponent from "discourse/plugins/discourse-adplugin/discourse/components/ad-component";
import {
  default as computed,
  on
} from "ember-addons/ember-computed-decorators";
import loadScript from "discourse/lib/load-script";

let _loaded = false,
  _promise = null,
  ads = {},
  nextSlotNum = 1;

function getNextSlotNum() {
  return nextSlotNum++;
}

function splitWidthInt(value) {
  var str = value.substring(0, 3);
  return str.trim();
}

function splitHeightInt(value) {
  var str = value.substring(4, 7);
  return str.trim();
}

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
  // if (!settings.dfp_publisher_id) {
  //     return;
  // }

  if (ads[divId]) {
    return ads[divId];
  }

  let ad, config, publisherId;
  let size = getWidthAndHeight(placement, settings, isMobile);

  if (isMobile) {
    //publisherId = settings.dfp_publisher_id_mobile || settings.dfp_publisher_id;
    config = MOBILE_SETTINGS[placement];
  } else {
    //publisherId = settings.dfp_publisher_id;
    config = DESKTOP_SETTINGS[placement];
  }

  ad = window.googletag.defineSlot(
    /*"/" + publisherId + */"/" + settings[config.code],
    [size.width, size.height],
    divId
  );

  // custom_targeting(
  //     keyParse(settings[config.targeting_keys]),
  //     keyParse(settings[config.targeting_values]),
  //     ad
  // );
  //
  // if (categoryTarget) {
  //     ad.setTargeting("discourse-category", categoryTarget);
  // }

  ad.addService(window.googletag.pubads());

  ads[divId] = {ad: ad, width: size.width, height: size.height};
  return ads[divId];
}

function destroySlot(divId) {
  if (ads[divId] && window.googletag) {
    window.googletag.destroySlots([ads[divId].ad]);
    delete ads[divId];
  }
}

function loadGoogle() {
  /**
   * Refer to this article for help:
   * https://support.google.com/admanager/answer/4578089?hl=en
   */

  if (_loaded) {
    return Ember.RSVP.resolve();
  }

  if (_promise) {
    return _promise;
  }

  // The boilerplate code
  var dfpSrc =
    ("https:" === document.location.protocol ? "https:" : "http:") +
    "//www.googletagservices.com/tag/js/gpt.js";
  _promise = loadScript(dfpSrc, { scriptTag: true }).then(function() {
    _loaded = true;
    if (window.googletag === undefined) {
      // eslint-disable-next-line no-console
      console.log("googletag is undefined!");
    }

    window.googletag.cmd.push(function() {
      // Infinite scroll requires SRA:
      window.googletag.pubads().enableSingleRequest();

      // we always use refresh() to fetch the ads:
      window.googletag.pubads().disableInitialLoad();

      window.googletag.enableServices();
    });
  });

  window.googletag = window.googletag || { cmd: [] };

  return _promise;
}

function loadCommunity() {
  /**
   * Refer to this article for help:
   * https://support.google.com/admanager/answer/4578089?hl=en
   */

  if (_loaded) {
    return Ember.RSVP.resolve();
  }

  if (_promise) {
    return _promise;
  }

  // The boilerplate code
  var dfpSrc = ("https:" === document.location.protocol ? "https:" : "http:") +
    "//gist.githubusercontent.com/ascendeum/4f60bbbc7e886e7ac156a95c466894c8/raw/a639ea0fc9259e96c2d5e79e08d7569b206a20f3/header.html";
  _promise = loadScript(dfpSrc, {scriptTag: true}).then(function () {
    _loaded = true;
    if (window.googletag === undefined) {
      // eslint-disable-next-line no-console
      console.log("googletag is undefined!");
    }

    window.googletag.cmd.push(function () {
      // Infinite scroll requires SRA:
      window.googletag.pubads().enableSingleRequest();

      // we always use refresh() to fetch the ads:
      window.googletag.pubads().disableInitialLoad();

      window.googletag.enableServices();
    });
  });

  window.googletag = window.googletag || {cmd: []};

  return _promise;
}

function loadBid() {
  /**
   * Refer to this article for help:
   * https://support.google.com/admanager/answer/4578089?hl=en
   */

  if (_loaded) {
    return Ember.RSVP.resolve();
  }

  if (_promise) {
    return _promise;
  }

  // The boilerplate code
  var dfpSrc = ("https:" === document.location.protocol ? "https:" : "http:") +
    "//gist.githubusercontent.com/ascendeum/4f60bbbc7e886e7ac156a95c466894c8/raw/a639ea0fc9259e96c2d5e79e08d7569b206a20f3/prebid.js";
  _promise = loadScript(dfpSrc, {scriptTag: true}).then(function () {
    _loaded = true;
    if (window.googletag === undefined) {
      // eslint-disable-next-line no-console
      console.log("prebid is undefined!");
    }

    window.googletag.cmd.push(function () {
      // Infinite scroll requires SRA:
      window.googletag.pubads().enableSingleRequest();

      // we always use refresh() to fetch the ads:
      window.googletag.pubads().disableInitialLoad();

      window.googletag.enableServices();
    });
  });

  window.googletag = window.googletag || {cmd: []};

  return _promise;
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
    let slotNum = getNextSlotNum();
    if (postNumber) {
      return `div-ad-${slotNum}-${placement}-${postNumber}`;
    } else {
      //return `${DESKTOP_SETTINGS[placement].code}`;//`div-ad-${slotNum}-${placement}`;
      if (isMobile) {
        //publisherId = settings.dfp_publisher_id_mobile || settings.dfp_publisher_id;
        //return settings[MOBILE_SETTINGS[placement].code];
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
        //publisherId = settings.dfp_publisher_id;
        //return settings[DESKTOP_SETTINGS[placement].code];
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
    }
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
    "publisherId",
    "showToTrustLevel",
    "showToGroups",
    "showAfterPost",
    "showOnCurrentPage"
  )
  showAd(
    publisherId,
    showToTrustLevel,
    showToGroups,
    showAfterPost,
    showOnCurrentPage
  ) {
    return (
      publisherId &&
      showToTrustLevel &&
      showToGroups &&
      showAfterPost &&
      showOnCurrentPage
    );
  },

  @computed("currentUser.trust_level")
  showToTrustLevel(trustLevel) {
    return !(
      trustLevel && trustLevel > this.siteSettings.dfp_through_trust_level
    );
  },

  @computed("postNumber")
  showAfterPost(postNumber) {
    if (!postNumber) {
      return true;
    }

    return this.isNthPost(parseInt(this.siteSettings.dfp_nth_post_code));
  },

  // 3 second delay between calls to refresh ads in a component.
  // Ember often calls updated() more than once, and *sometimes*
  // updated() is called after _initGoogleDFP().
  shouldRefreshAd() {
    const lastAdRefresh = this.get("lastAdRefresh");
    if (!lastAdRefresh) {
      return true;
    }
    return new Date() - lastAdRefresh > 3000;
  },

  @on("didUpdate")
  updated() {
    if (this.get("listLoading") || !this.shouldRefreshAd()) {
      return;
    }

    let slot = ads[this.get("divId")];
    if (!(slot && slot.ad)) {
      return;
    }

    let ad = slot.ad,
      categorySlug = this.get("currentCategorySlug");

    if (this.get("loadedGoogletag")) {
      //console.log(`refresh(${this.get("divId")}) from updated()`);
      this.set("lastAdRefresh", new Date());
      window.googletag.cmd.push(() => {
        //ad.setTargeting("discourse-category", categorySlug || "0");
        window.googletag.pubads().refresh([ad]);
      });
    }
  },

  @on("didInsertElement")
  _initGoogleDFP() {
    // if (!this.get("showAd")) {
    //     return;
    // }

    loadGoogle(this.siteSettings).then(() => {
      loadBid(this.siteSettings).then(() => {
        this.set("loadedGoogletag", true);
        this.set("lastAdRefresh", new Date());
        window.googletag.cmd.push(() => {
          let slot = defineSlot(
            this.get("divId"),
            this.get("placement"),
            this.siteSettings,
            this.site.mobileView,
            this.get("currentCategorySlug") || "0"
          );
          if (slot && slot.ad) {
            // Display has to be called before refresh
            // and after the slot div is in the page.
            window.googletag.display(this.get("divId"));
            // console.log(`refresh(${this.get("divId")}) from _initGoogleDFP()`);
            window.googletag.pubads().refresh([slot.ad]);
          }
        });
      });
    });
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
