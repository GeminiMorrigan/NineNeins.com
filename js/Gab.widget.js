

/*
    Creator : GreyingError
    Site : https://www.NineNeins.com / 9Neins.Ga
    Email : GreyingError@ProtonMail.com
    GitHub : 9neinG
    Discord : GreyingError

    Project : NineNeins.Com 9Neins.GA Gab Timeline
    Language : CSS
-->
<!-- 
    Tech & Socials
    Link Chain : Home, NNOnline, Blog, Contact 

 * @param object params_
 *    instance_uri    : the instance to fetch messages from
 *    access_token    : widget's application access token (can be generated from http://www.azet.jp/Gab.wizard/wizard_en.html)
 *    account_id      : user account id to fetch messages of
 *    target_selector : HTML node selector (jquery/css style)
 *    gabs_limit     : max gabs display count (default 20 like API)
 */

/* constructor >>> */
var GabApi = function(params_) {
	
	// endpoint access settings
	this.INSTANCE_URI        = params_.instance_uri;
	this.ACCESS_TOKEN        = params_.access_token;
	this.ACCOUNT_ID          = params_.account_id;
	// optional parameters
	this.gabs_limit         = params_.gabs_limit || 20;
	this.picIcon             = params_.pic_icon || '[PICTURE]';
	this.boostsCountIcon     = params_.boosts_count_icon || '[Repost]';
	this.favouritesCountIcon = params_.favourites_count_icon || '[Liked]';

	// display target element
	this.widget = $(params_.target_selector);

	// build the basic widget
	this.makeWidget();
	this.listStatuses();

	// spoiler toggle
	// jQuery event handler
	var toggleSpoiler = function(e_) {
		e_.preventDefault();

		// btn text
		if( $(this).hasClass('spoiler-opened') ) {
			$(this).text(GabApi.text.spoilerBtnClosed);
		}
		else {
			$(this).text(GabApi.text.spoilerBtnOpened);
		}
		$(this).toggleClass('spoiler-opened');

		// open body
		$(this).parent().next('.spoiler-body').toggle();

	};


	// nsfw toggle
	// jQuery event handler
	var toggleNsfwMedia = function(e_) {
		e_.preventDefault();

		if($(this).hasClass('nsfw-opened')) {
			// hide image ===
			$(this).css({
				'background' : 'black'
			})
			.text(GabApi.text.nsfwViewMsg)
			.removeClass('nsfw-opened');
		}
		else {
			// display image ===
			var img = $(this).attr('data-picpreview-url');
			$(this).css({
				'background'       : 'url('+img+') center center no-repeat'
				,'background-size' : 'cover'
			})
			.text('')
			.addClass('nsfw-opened');
		}

	}


	/**
	 * toggle the display of pictures in a modal-ish fashion
	 * @param jquery_event e_
	 */
	var toggleMedia = function(e_) {
		e_.preventDefault();

		var link = $(this).attr('href');
		var filter = makeFilter();
		var pic = $('<div class="gab-media-zoom" style="background: url('+link+') 50% 50% no-repeat; background-size: contain;"></div>');
		filter.append(pic);
	};


	var makeFilter = function() {
		var filter = $('<div class="gab-media-filter"></div>');
		filter.click(function(e_) {
			e_.preventDefault();
			$(this).remove();
		});
		$('body').append(filter);
		return filter;
	}


	// spoiler buttons events
	this.widget.on('click', '.btn-spoiler', toggleSpoiler);

	// hidden media display toggle
	this.widget.on('click', '.gab-media-nsfw', toggleNsfwMedia);

	// clicks on media icon links
	this.widget.on('click', '.gab-media-link', toggleMedia);
}
/* <<< end constructor */


/* widget Attributes >>> */
GabApi.build = 7;        // later for version comparisons if needed
GabApi.version = "1.07"; // display
/* <<< */


/* texts >>> */
GabApi.text = {
	spoilerBtnClosed  : "Show more"
	,spoilerBtnOpened : "Show less"
	,nsfwLabel        : "NSFW"
	,nsfwViewMsg      : "Click to view"
};
/* <<< */


/**
 * build timeline widget
 */
GabApi.prototype.makeWidget = function() {
	this.widget.addClass('Gab-timeline');
	//this.widget.append($('<div class="mt-header"><span class="user-link"></span> <h4> on </h4> Gab</div>'));
	this.widget.append($('<div class="mt-body"><div class="mt-loading">loading...</div></div>'));
	this.widget.append($('<div class="mt-footer"><span class="user-link"></span></div>'));
};


/**
 * listing function
 */
GabApi.prototype.listStatuses = function() {
	var mapi = this;

	// get request
	$.ajax({
		url: this.INSTANCE_URI+'/api/v1/accounts/'+this.ACCOUNT_ID+'/statuses'
		,headers: {
			Authorization : 'Bearer '+this.ACCESS_TOKEN
		}
		,method : 'GET'
		,dataType: 'json'
		,data : {
			limit : this.gabs_limit
		}
		,success: function(data_) {
			// clear the loading message
			$('.mt-body', mapi.widget).html("");
			//console.log( data_ );

			// add posts
			for(var i in data_) {
				if(i==0) {
					// update user link only at first post
					var account = data_[i].account;
					setHeaderUserLink.call(mapi, account);
					setFooterLink.call(mapi, account);
				}
				if(data_[i].visibility=='public') {
					// list only public gabs
					appendStatus.call(mapi, data_[i]);
				}
			}

			// fix content link target
			$('a', mapi.widget).attr('target', '_blank');
		}
		,error: function(d_) {
			//console.log( d_ );
			if(d_.responseJSON) {
				$('.mt-header', mapi.widget).html('ERROR');
				$('.mt-body', mapi.widget).html( '<div class="mt-error">' + d_.responseJSON.error + '</div>');
			}
		}
	});


	/**
	 * add user link
	 * @param object account_
	 */
	var setHeaderUserLink = function(account_) {
		// set user name and link
		$('.user-link', this.widget).append("<a href='"+account_.url+"'>@"+account_.username+"</a>");
	};


	/**
	 * add user link
	 * @param object account_
	 */
	var setFooterLink = function(account_) {
		var domain = this.INSTANCE_URI.replace(/https?:\/\//, '');
		$('.mt-footer', this.widget).append("ON<a href='"+account_.url+"'>"+domain+"</a>");
	};


	/**
	 * inner function to add each message in container
	 * @param object status_
	 */
	var appendStatus = function(status_) {
		//console.log( status_ );
		var content;
		var date, url, avatar, user;

		// dealing with spoiler content
		if(status_.spoiler_text != "") {
			// handle spoilers
			//content.wrap('<div class="spoiler"></div>');
			content = $(
				'<div class="spoiler-header">'+status_.spoiler_text+'<a class="btn-spoiler" href="#open-spoiler">'+GabApi.text.spoilerBtnClosed+'</a></div>'+
				'<div class="spoiler-body gab-text">'+status_.content+'</div>' +
				'<div class="gab-medias"></div>'
			);
		}
		else {
			content = $("<div class='gab-text'>" + status_.content + "</div>" + "<div class='gab-medias'></div>");
		}

		if(status_.reblog) {
			// data from BOOSTED status

			// gab date
			date = prepareDateDisplay(status_.reblog.created_at);

			// gab url
			url = status_.reblog.url;

			// boosted avatar
			avatar = $("<div class='mt-avatar mt-avatar-boosted'></div>");
			avatar.css(makeAvatarCss(status_.reblog.account.avatar));

			// booster avatar
			var boosterAvatar = $("<div class='mt-avatar mt-avatar-booster'></div>");
			boosterAvatar.css(makeAvatarCss(status_.account.avatar));
			avatar.append(boosterAvatar);

			// user name and url
			user = $("<div class='mt-user'><a href='"+status_.reblog.account.url+"'>"+status_.reblog.account.username+"</a></div>");
		}
		else {
			// data from status

			// gab date
			date = prepareDateDisplay(status_.created_at);

			// gab url
			url = status_.url;

			// avatar
			avatar = $("<div class='mt-avatar'></div>");
			avatar.css(makeAvatarCss(status_.account.avatar));

			// user name and url
			user = $("<div class='mt-user'><a href='"+status_.account.url+"'>"+status_.account.username+"</a></div>");
		}

		// format date
		var timestamp = $("<div class='mt-date'><a href='"+url+"'>" + date + "</a></div>");

		// sensitive content
		if(status_.sensitive) {
			timestamp.prepend('<span class="nsfw">' + GabApi.text.nsfwLabel + '</span>');
		}

		// status container
		var gab = $("<div class='mt-gab'></div>");

		// add to HTML
		if(status_.reblog) {
			gab.append("<div class='gab-regab'>"+ this.boostsCountIcon +"</div>");
		}

		gab.append( avatar );
		gab.append( user );
		gab.append( timestamp );
		gab.append( content );
		$('.mt-body', this.widget).append(gab);

		// media attachments? >>>
		if(status_.media_attachments.length>0) {
			var pic;
			for(var picid in status_.media_attachments) {
				pic = this.replaceMedias(content, status_.media_attachments[picid], status_.sensitive);
				gab.append( pic );
			}
		}
		// <<<

		// stats (boosts + favourites counts) >>>
		// data
		var boostsCountIcon     = '<span class="gab-status-boosts">'     + this.boostsCountIcon     +":"+ status_.reblogs_count    + '</span>';
		var favouritesCountIcon = '<span class="gab-status-favourites">' + this.favouritesCountIcon +":"+ status_.favourites_count + '</span>';

		// html nodes
		var statusBar = $('<div class="gab-status">' +
			boostsCountIcon +
			favouritesCountIcon +
			'</div>');

		gab.append( statusBar );
		// <<<
	};


	/**
	 * display gab time
	 * @param StringDate date_ (standard time format)
	 * @return String
	 */
	var prepareDateDisplay = function(date_) {
		var displayTime = "";

		//var now  = new Date();
		var date = new Date( date_ );

		displayTime = date.getFullYear()
			+"/"+(date.getMonth()+1)
			+"/"+date.getDate()
			+" "+date.getHours()
			+":"+("0"+date.getMinutes()).replace(/0(\d{2})/, "$1")
		;

		return displayTime;
	};


	/**
	 * simple method that sets CSS attributes for the avatar
	 * @param string avatar_ url of the avatar picture to apply
	 * @return object css properties to apply with jQuery.css method
	 */
	var makeAvatarCss = function(avatar_) {
		return {
			'background' : "white url('"+avatar_+"') 50% 50% no-repeat"
			,'background-size' : 'contain'
		};
	};

};


/**
 * replace media (pictures) in text with an icon and appends a preview
 * @param jquery_object content
 * @param object media_ (received with gab's JSON data)
 * @param bool nsfw_ indicates the media is not to be displayed
 * @return object modifier content object
 */
GabApi.prototype.replaceMedias = function(content, media_, nsfw_) {
	var nsfw = nsfw_ || false;

	// icon in place of link in content
	var icon = '<a href="'+media_.url+'" class="gab-media-link" target="_blank">'+this.picIcon+'</a>';
	$('a[href="'+media_.text_url+'"]', content).replaceWith(icon);

	if(nsfw) {
		// pics hidden
		var pic = '<div class="gab-media-preview gab-media-nsfw" style="background:black;" data-picpreview-url="'+media_.preview_url+'">' +
			GabApi.text.nsfwViewMsg +
			'</div>';
	}
	else {
		// pics visible
		var pic = '<div class="gab-media-preview" style="background-image:url('+media_.preview_url+');"></div>';
	}

	return pic;
};

