document.addEventListener("DOMContentLoaded",
    function() {
        var chanset = "chanIA-id";
        var div, n,
            v = document.getElementsByClassName("iarchive-player");
        for (n = 0; n < v.length; n++) {
            div = document.createElement("div");
            div.setAttribute("data-id", v[n].dataset.id);
            div.innerHTML = nineiaThumb(v[n].dataset.id);
            div.onclick = NineIframe;
            v[n].appendChild(div);
        }

    function nineiaThumb(id) {
        var thumb = '<img src="https://i.ibb.co/XXJP0tv/IA-Music.jpg">',
            play = '<div class="play"></div>';
        return thumb.replace("ID", id) + play;
    }
    https://static-1.bitchute.com/live/cover_images/chanIA-id/ID_640x360.jpg
    function NineIframe() {
        var iframe = document.createElement("iframe");
        var embed = "https://archive.org/embed/ID&playlist=1&list_width=300";
        iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "1");
        this.parentNode.replaceChild(iframe, this);
    }
});


document.addEventListener("DOMContentLoaded",
    function() {
        var chanset = "chanBC-id";
        var div, n,
            v = document.getElementsByClassName("bitchute-player");
        for (n = 0; n < v.length; n++) {
            div = document.createElement("div");
            div.setAttribute("data-id", v[n].dataset.id);
            div.innerHTML = ninebcThumb(v[n].dataset.id);
            div.onclick = NineIframe;
            v[n].appendChild(div);
        }

    function ninebcThumb(id) {
        var thumb = '<img src="https://static-1.bitchute.com/live/cover_images/chanBC-id/ID_640x360.jpg">',
            play = '<div class="play"></div>';
        return thumb.replace("ID", id) + play;
    }

    function NineIframe() {
        var iframe = document.createElement("iframe");
        var embed = "https://www.bitchute.com/embed/ID?autoplay=1";
        iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "1");
        this.parentNode.replaceChild(iframe, this);
    }
});

document.addEventListener("DOMContentLoaded",
    function() {
        var chanset = "chanYT-id"
        var div, n,
            v = document.getElementsByClassName("youtube-player");
        for (n = 0; n < v.length; n++) {
            div = document.createElement("div");
            div.setAttribute("data-id", v[n].dataset.id);
            div.innerHTML = nineytThumb(v[n].dataset.id);
            div.onclick = NineIframe;
            v[n].appendChild(div);
        }

    function nineytThumb(id) {
        var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
            play = '<div class="play"></div>';
        return thumb.replace("ID", id) + play;
    }

    function NineIframe() {
        var iframe = document.createElement("iframe");
        var embed = "https://www.youtube.com/embed/ID?autoplay=1";
        iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "1");
        this.parentNode.replaceChild(iframe, this);
    }
});
