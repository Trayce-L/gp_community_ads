import AdComponent from "discourse/plugins/discourse-adplugin/discourse/components/ad-component";
import {
  default as computed,
  on
} from "ember-addons/ember-computed-decorators";
import loadScript from "discourse/lib/load-script";
const headercode = ("<script type=\"text/javascript\">\n" +
  "/* A9 Load Lib */\n" +
  "!function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push([c,r])}a[a9]={init:function(){q(\"i\",arguments)},fetchBids:function()\n" +
  "{q(\"f\",arguments)},setDisplayBids:function(){},_Q:[]};A=p.createElement(s);A.async=!0;A.src=t;g=p.getElementsByTagName(s)[0];g.parentNode.insertBefore(\n" +
  "A,g)}(\"apstag\",window,document,\"script\",\"//c.amazon-adsystem.com/aax2/apstag.js\");\n" +
  "</script>\n" +
  "<!-- BEGIN: Header Bidding -->\n" +
  "<script type=\"text/javascript\">\n" +
  "    var adsStart = (new Date()).getTime();\n" +
  "    function detectWidth() {\n" +
  "        return window.screen.width || window.innerWidth || window.document.documentElement.clientWidth || Math.min(window.innerWidth, window.document.documentElement.clientWidth) || window.innerWidth || window.document.documentElement.clientWidth || window.document.getElementsByTagName('body')[0].clientWidth;\n" +
  "    }\n" +
  "\n" +
  "    var TIMEOUT = 2000;\n" +
  "\n" +
  "    /* A9 Init */  \n" +
  "    apstag.init({\n" +
  "        pubID: 'edf9e12e-6c41-40a2-bcc3-2f7942aec18a',\n" +
  "        adServer: 'googletag'\n" +
  "    });\n" +
  "\n" +
  "    var googletag = googletag || {};\n" +
  "    googletag.cmd = googletag.cmd || [];\n" +
  "    var pbjs = pbjs || {};\n" +
  "    pbjs.que = pbjs.que || [];\n" +
  "    var adUnits = adUnits || [];\n" +
  "    /* A9 Vars */\n" +
  "    var a9Slots = [];\n" +
  "    var a9BidsBack = false; \n" +
  "\n" +
  "    function initAdServer() {\n" +
  "        if (pbjs.initAdserverSet) return;\n" +
  "        (function() {\n" +
  "            var gads = document.createElement('script');\n" +
  "            gads.async = true;\n" +
  "            gads.type = 'text/javascript';\n" +
  "            var useSSL = 'https:' == document.location.protocol;\n" +
  "            gads.src = (useSSL ? 'https:' : 'http:') +\n" +
  "                '//www.googletagservices.com/tag/js/gpt.js';\n" +
  "            var node = document.getElementsByTagName('script')[0];\n" +
  "            node.parentNode.insertBefore(gads, node);\n" +
  "        })();\n" +
  "        pbjs.initAdserverSet = true;\n" +
  "    };\n" +
  "    pbjs.timeout = setTimeout(initAdServer, TIMEOUT);\n" +
  "    pbjs.timeStart = adsStart;\n" +
  "\n" +
  "    var dfpNetwork = '31904509';\n" +
  "\n" +
  "    // START: Defining Adunits\n" +
  "    if(detectWidth() > 980)\n" +
  "    {\n" +
  "        // Desktop Adunits\n" +
  "        adUnits.push({\n" +
  "                network: dfpNetwork,\n" +
  "                adunit: 'Community_Desktop_Leaderboard_A',\n" +
  "                size: [[728, 90]],\n" +
  "                code: 'div-ad-Community_Desktop_Leaderboard_A',\n" +
  "                assignToVariableName: false // false if not in use\n" +
  "            });    \n" +
  "        adUnits.push({\n" +
  "                network: dfpNetwork,\n" +
  "                adunit: 'Community_Desktop_Leaderboard_B',\n" +
  "                size: [[728, 90]],\n" +
  "                code: 'div-ad-Community_Desktop_Leaderboard_B',\n" +
  "                assignToVariableName: false // false if not in use\n" +
  "            }); \n" +
  "        adUnits.push({\n" +
  "                network: dfpNetwork,\n" +
  "                adunit: 'Community_Desktop_Leaderboard_C',\n" +
  "                size: [[728, 90]],\n" +
  "                code: 'div-ad-Community_Desktop_Leaderboard_C',\n" +
  "                assignToVariableName: false // false if not in use\n" +
  "            }); \n" +
  "        adUnits.push({\n" +
  "                network: dfpNetwork,\n" +
  "                adunit: 'Community_Desktop_Leaderboard_D',\n" +
  "                size: [[728, 90]],\n" +
  "                code: 'div-ad-Community_Desktop_Leaderboard_D',\n" +
  "                assignToVariableName: false // false if not in use\n" +
  "            });                                                     \n" +
  "\n" +
  "    } else {\n" +
  "        // Mobile Adunits\n" +
  "        adUnits.push({\n" +
  "                network: dfpNetwork,\n" +
  "                adunit: 'Community_Mobile_300x250_A',\n" +
  "                size: [[300, 250]],\n" +
  "                code: 'div-ad-Community_Mobile_300x250_A',\n" +
  "                assignToVariableName: false // false if not in use\n" +
  "            });  \n" +
  "        adUnits.push({\n" +
  "                network: dfpNetwork,\n" +
  "                adunit: 'Community_Mobile_300x250_B',\n" +
  "                size: [[300, 250]],\n" +
  "                code: 'div-ad-Community_Mobile_300x250_B',\n" +
  "                assignToVariableName: false // false if not in use\n" +
  "            }); \n" +
  "        adUnits.push({\n" +
  "                network: dfpNetwork,\n" +
  "                adunit: 'Community_Mobile_300x250_C',\n" +
  "                size: [[300, 250]],\n" +
  "                code: 'div-ad-Community_Mobile_300x250_C',\n" +
  "                assignToVariableName: false // false if not in use\n" +
  "            }); \n" +
  "        adUnits.push({\n" +
  "                network: dfpNetwork,\n" +
  "                adunit: 'Community_Mobile_300x250_D',\n" +
  "                size: [[300, 250]],\n" +
  "                code: 'div-ad-Community_Mobile_300x250_D',\n" +
  "                assignToVariableName: false // false if not in use\n" +
  "            });  \n" +
  "        adUnits.push({\n" +
  "                network: dfpNetwork,\n" +
  "                adunit: 'Community_Mobile_320x50_A',\n" +
  "                size: [[320, 50]],\n" +
  "                code: 'div-ad-Community_Mobile_320x50_A',\n" +
  "                assignToVariableName: false // false if not in use\n" +
  "            });  \n" +
  "        adUnits.push({\n" +
  "                network: dfpNetwork,\n" +
  "                adunit: 'Community_Mobile_320x50_B',\n" +
  "                size: [[320, 50]],\n" +
  "                code: 'div-ad-Community_Mobile_320x50_B',\n" +
  "                assignToVariableName: false // false if not in use\n" +
  "            });                                                                \n" +
  "    }\n" +
  "    // END: Defining Adunits\n" +
  "\n" +
  "    googletag.cmd.push(function() {\n" +
  "      if(adUnits){\n" +
  "        var dfpSlots = [];\n" +
  "        for (var i = 0, len = adUnits.length; i < len; i++) {\n" +
  "          dfpSlots[i] = googletag.defineSlot('/'+adUnits[i].network+'/'+adUnits[i].adunit, adUnits[i].size, adUnits[i].code).addService(googletag.pubads());\n" +
  "          if(adUnits[i].assignToVariableName && (adUnits[i].assignToVariableName !== null)) window[adUnits[i].assignToVariableName] = dfpSlots[i];\n" +
  "        }\n" +
  "      }\n" +
  "    });\n" +
  "\n" +
  "    /* A9 Slots */\n" +
  "    if(adUnits){\n" +
  "        if(apstag){\n" +
  "          for (var i = 0, len = adUnits.length; i < len; i++) {\n" +
  "                  a9Slots.push({slotID: adUnits[i].code,slotName: adUnits[i].network+'/'+adUnits[i].adunit,sizes: adUnits[i].size});\n" +
  "              }\n" +
  "        }\n" +
  "    }    \n" +
  "    /* A9 Request Bids */\n" +
  "    apstag.fetchBids({\n" +
  "                        slots: a9Slots,\n" +
  "                        timeout: TIMEOUT\n" +
  "                    }, \n" +
  "                    function(bids) {\n" +
  "                        console.log('BDS back',(new Date()).getTime()-adsStart,bids);\n" +
  "                        a9BidsBack = true;\n" +
  "                    }); \n" +
  "\n" +
  "    googletag.cmd.push(function() {\n" +
  "        /* A9 Set Bids */\n" +
  "        if(a9BidsBack) apstag.setDisplayBids();\n" +
  "        // Header Bidding Targeting\n" +
  "        pbjs.que.push(function() {pbjs.setTargetingForGPTAsync();});\n" +
  "\n" +
  "        // Init DFP\n" +
  "        googletag.pubads().enableSingleRequest();\n" +
  "        googletag.pubads().collapseEmptyDivs();\n" +
  "        googletag.enableServices();\n" +
  "    });\n" +
  "</script>\n" +
  "<script type=\"text/javascript\" async=\"true\" src=\"LOCATION OF PREBID FILE\"></script>\n" +
  "<!-- END: Header Bidding -->");
import bidcode from "discourse/plugins/discourse-adplugin/misc/prebid";
import { ajax } from "discourse/lib/ajax";
const _loaded = {};
const _loading = {};

let _communityloaded = false,
  _bidloaded = false,
  _communitypromise = null,
  _bidpromise = null,
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

function loadWithTag(path, cb) {
  const head = document.getElementsByTagName("head")[0];

  // let finished = false;
  // let s = document.createElement("html");
  // s.src = path;
  // if (Ember.Test) {
  //   Ember.Test.registerWaiter(() => finished);
  // }
  //
  // s.onload = s.onreadystatechange = function(_, abort) {
  //   finished = true;
  //   if (
  //     abort ||
  //     !s.readyState ||
  //     s.readyState === "loaded" ||
  //     s.readyState === "complete"
  //   ) {
  //     s = s.onload = s.onreadystatechange = null;
  //     if (!abort) {
  //       Ember.run(null, cb);
  //     }
  //   }
  // };

  //head.appendChild(s);

  if(path === 'header')
  {
    head.appendChild(headercode);
  }
  if(path === 'bid')
  {
    head.appendChild(bidcode);
  }

}

function loadScriptCode(url, opts) {
  // TODO: Remove this once plugins have been updated not to use it:
  if (url === "defer/html-sanitizer-bundle") {
    return Ember.RSVP.Promise.resolve();
  }

  opts = opts || {};

  // Scripts should always load from CDN
  // CSS is type text, to accept it from a CDN we would need to handle CORS
  url = opts.css ? Discourse.getURL(url) : Discourse.getURLWithCDN(url);

  $("script").each((i, tag) => {
    const src = tag.getAttribute("src");

    if (src && src !== url && !_loading[src]) {
      _loaded[src] = true;
    }
  });

  return new Ember.RSVP.Promise(function(resolve) {
    // If we already loaded this url
    if (_loaded[url]) {
      return resolve();
    }
    if (_loading[url]) {
      return _loading[url].then(resolve);
    }

    let done;
    _loading[url] = new Ember.RSVP.Promise(function(_done) {
      done = _done;
    });

    _loading[url].then(function() {
      delete _loading[url];
    });

    const cb = function(data) {
      if (opts && opts.css) {
        $("head").append("<style>" + data + "</style>");
      }
      done();
      resolve();
      _loaded[url] = true;
    };

    if (opts.css) {
      ajax({
        url: url,
        dataType: "text",
        cache: true
      }).then(cb);
    } else {
      // Always load JavaScript with script tag to avoid Content Security Policy inline violations
      loadWithTag(url, cb);
    }
  });
}

function loadCommunity() {
  /**
   * Refer to this article for help:
   * https://support.google.com/admanager/answer/4578089?hl=en
   */

  const head = document.getElementsByTagName("head")[0];
  //
  // head.appendChild(s);
  // head.appendChild(s);
  return new Ember.RSVP.Promise(function(resolve) {
    // let s = document.createElement("script");
    //
   //  let headText = document.createTextNode(headercode);
   //  let bidText = document.createTextNode(bidcode);
   // // head.appendChild(headercode);
   // // head.appendChild(bidcode);
   //
   //  head.appendChild(headText);
   //  head.appendChild(bidText);
   //
    _communityloaded = false;
    _bidloaded = false;

    if(_bidloaded && _communityloaded)
    {
      return resolve();
    }

    var communitySrc = "header";
    var bidSrc = "bid";

    // If we already loaded this url
    // var communitySrc = ("https:" === document.location.protocol ? "https:" : "https:") +
    //   "//gist.githubusercontent.com/ascendeum/4f60bbbc7e886e7ac156a95c466894c8/raw/a639ea0fc9259e96c2d5e79e08d7569b206a20f3/header.html";
    // var bidSrc = ("https:" === document.location.protocol ? "https:" : "https:") +
    //   "//gist.githubusercontent.com/ascendeum/4f60bbbc7e886e7ac156a95c466894c8/raw/a639ea0fc9259e96c2d5e79e08d7569b206a20f3/prebid.js";
    //
    // var communitySrc = "\\discourse/plugins/discourse-adplugin/misc/header.html";
    // var bidSrc = "\\discourse/plugins/discourse-adplugin/misc/prebid.js";


    loadScriptCode(communitySrc, {scriptTag: true}).then(function () {
      _communityloaded = true;
    });

    loadScriptCode(bidSrc, {scriptTag: true}).then(function () {
      _bidloaded = true;
    });
  });

  // if (_communityloaded) {
  //   return Ember.RSVP.resolve();
  // }
  //
  // if (_communitypromise) {
  //   return _communitypromise;
  // }
  //
  // // The boilerplate code
  // var communitySrc = ("https:" === document.location.protocol ? "https:" : "http:") +
  //   "//gist.githubusercontent.com/ascendeum/4f60bbbc7e886e7ac156a95c466894c8/raw/a639ea0fc9259e96c2d5e79e08d7569b206a20f3/header.html";
  // _communitypromise = loadScript(communitySrc, {scriptTag: true}).then(function () {
  //   _communityloaded = true;
  //   // if (window.googletag === undefined) {
  //   //   // eslint-disable-next-line no-console
  //   //   console.log("googletag is undefined!");
  //   // }
  //   //
  //   // window.googletag.cmd.push(function () {
  //   //   // Infinite scroll requires SRA:
  //   //   window.googletag.pubads().enableSingleRequest();
  //   //
  //   //   // we always use refresh() to fetch the ads:
  //   //   window.googletag.pubads().disableInitialLoad();
  //   //
  //   //   window.googletag.enableServices();
  //   //});
  // });
  //
  // //window.googletag = window.googletag || {cmd: []};
  //
  // return _communitypromise;
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
      return null;//`div-ad-${slotNum}-${placement}-${postNumber}`;
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
          if (fs.existsSync(path)) {
            //file exists
          }
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
    //"showAfterPost",
    "showOnCurrentPage"
  )
  showAd(
    publisherId,
    showToTrustLevel,
    showToGroups,
    //showAfterPost,
    showOnCurrentPage
  ) {
    return (
      publisherId &&
      showToTrustLevel &&
      showToGroups &&
      //showAfterPost &&
      showOnCurrentPage
    );
  },

  @computed("currentUser.trust_level")
  showToTrustLevel(trustLevel) {
    return !(
      trustLevel && trustLevel > this.siteSettings.community_trust
    );
  },

  // @computed("postNumber")
  // showAfterPost(postNumber) {
  //   if (!postNumber) {
  //     return true;
  //   }
  //
  //   return this.isNthPost(parseInt(this.siteSettings.dfp_nth_post_code));
  // },

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
        ad.setTargeting("discourse-category", categorySlug || "0");
        window.googletag.pubads().refresh([ad]);
      });
    }
  },

  @on("didInsertElement")
  _initGoogleDFP() {
    // if (!this.get("showAd")) {
    //     return;
    // }
    loadCommunity().then(function () {
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
          //= console.log(`refresh(${this.get("divId")}) from _initGoogleDFP()`);
          window.googletag.pubads().refresh([slot.ad]);
        }
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
