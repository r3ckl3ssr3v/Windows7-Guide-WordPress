(function() {
    var WPGroHo = window.WPGroHo || {};
    WPGroHo.my_hash = "";
    WPGroHo.data = {};
    WPGroHo.renderers = {};

    WPGroHo.syncProfileData = function(userId, profileId) {
        if (!WPGroHo.data[userId]) {
            WPGroHo.data[userId] = {};
            var elements = document.querySelectorAll("div.grofile-hash-map-" + userId + " span");
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                WPGroHo.data[userId][element.className] = element.textContent;
            }
        }
        WPGroHo.appendProfileData(WPGroHo.data[userId], userId, profileId);
    };

    WPGroHo.appendProfileData = function(data, userId, profileId) {
        for (var key in data) {
            if (typeof WPGroHo.renderers[key] === "function") {
                return WPGroHo.renderers[key](data[key], userId, profileId, key);
            }
            var targetElement = document.getElementById(profileId);
            if (targetElement) {
                var headingElement = targetElement.querySelector("h4");
                if (headingElement) {
                    var paragraphElement = document.createElement("p");
                    paragraphElement.className = "grav-extra " + key;
                    paragraphElement.innerHTML = data[key];
                    headingElement.insertAdjacentElement("afterend", paragraphElement);
                }
            }
        }
    };

    window.WPGroHo = WPGroHo;
})();
