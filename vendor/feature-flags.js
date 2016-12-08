
        var featureFlags = {"DEVELOPMENT":true,"PRODUCTION":false,"TEST":false,"RADICAL":true};
        if(window) {
          for (var feature in featureFlags) {
            if (featureFlags.hasOwnProperty(feature)) {
              window[feature] = featureFlags[feature];
            }
          }
        }