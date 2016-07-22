/*-----------------------------
* Render results
-------------------------------*/
var renderResult = function(data){
  var pageTokens = data.pageTokens,
      numOfAcc = pageTokens.length,
      pageStr = '';
  $('.long-term-token').html(data.longTerm);
  $('.long-term-token-copy').attr('data-clipboard-text', data.longTerm);

  for (var i = 0; i < numOfAcc; i++) {
    pageStr += '<tr>' + 
                  '<td class="mdl-data-table__cell--non-numeric">' + pageTokens[i].name +'</td>' + 
                  '<td>' + pageTokens[i].id + '</td>' + 
                  '<td><div class="break-word" data-token="' + pageTokens[i].access_token + '">' + 
                    '<button id="long-term-clipboard" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" title="show"' + 
                      'onclick="javascript:alert(\'' + pageTokens[i].access_token +'\')" ' +
                    '>' +
                      '<i class="material-icons">pageview</i>' +
                    '</button>'+
                    '<button class="acc-token-' + i + ' mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" title="show"' + 
                      'onclick="javascript:copyToClipboard(\'.acc-token-' + i + '\')" data-clipboard-text="' + pageTokens[i].access_token + '"' + 
                    '>' +
                      '<i class="material-icons">input</i>' +
                    '</button>'+ 
                  '</div></td>' + 
                '</tr>';
  }
  $('.acc-access-token-summary').html(numOfAcc + ' accounts in total');
  $('.acc-access-token').html(pageStr);
};

var setLoading = function(){
  $('[data-token-load]').html('<img class="token-loading" src="/images/token-loading.svg" alt="loading" />');
}

var getShortTermAT = function(cb) {
  FB.getLoginStatus(function(response){
    var shortTermToken = '';
    if (response.status === 'connected') {
      shortTermToken = response.authResponse.accessToken;
      $('.short-term-token').html(shortTermToken);
      $('.short-term-token-copy').attr('data-clipboard-text', shortTermToken);
      cb(shortTermToken);
    }
  });
};

var getLongTermAT = function(accessToken) {
  jQuery.ajax({
    url: '/at',
    data: { token: accessToken },
    type: 'post',
    success: function(data) {
      renderResult(data);
    }
  });
};

var setPermission = function(){
  var perms = [],
      addPerms = $('#add-perm').val().trim();
  $('.perm-check').each(function(){
    if ($(this).is(':checked')) perms.push($(this).val());
  });
  perms.push(addPerms);
  return perms.join(',');
}

var loginFB = function() {
  var perms = setPermission();
  FB.login(function(){}, {scope: perms});
};

window.copyToClipboard = function(selector){
  var clipboard = new Clipboard(selector);
  clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    document.querySelector('#toast-holder').MaterialSnackbar.showSnackbar({ message: 'Token copied'});

    e.clearSelection();
  });

  clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);

    document.querySelector('#toast-holder').MaterialSnackbar.showSnackbar({ message: 'Cannot copy!'});
  });
}

/*----------------------------
* Init the Facebook SDK when it's ready
------------------------------*/
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1189014107789724',
    xfbml      : true,
    version    : 'v2.7'
  });
};

/*----------------------------
* Get access token
-----------------------------*/
window.getAccessToken = function() {
  if (FB) {
    loginFB();
    setLoading();
    getShortTermAT(getLongTermAT);
  } else {
    alert('FB is not defined! Please try again!');
  }
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));