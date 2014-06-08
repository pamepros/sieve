var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        this.getUserWatchList();
        
    }, 
    getUserWatchList: function(){
        try{
            var url = "http://172.16.8.17:8080/tv/getTunedPrivate";
            $.get(url, {}, function(result){
                app.getTMSId(result.contentId);
            },'json');
        }catch(e){console.log(e)}
    },
    getTMSId: function(contentId){
        try{
            var url = "https://api.directvdev.com/cgi-bin/tms.php?contentId="+contentId;
            $.get(url, {}, function(result){
                alert(result.tms);
                app.getShowData(result.tms);
            },'json');
        }catch(e){console.log(e)}
    },
    getShowData: function(tmsId){
        var url = "http://data.tmsapi.com/v1/programs/"+tmsId+"?api_key=xq345z55txpua6rdjp76vfbe"
        $.get(url, {}, function(result){
            alert("Title->"+result.title)
            console.log(result);
        },'json');
    },
    showList: function(data){
        var itemListHtml = "";
        // we fill the list with the movies
        for(var i=0;i<data.length;i++){
            itemListHtml += '<li class="widget uib_w_3" data-uib="app_framework/listitem" data-ver="1">';
            itemListHtml +=     '<a>List Item</a>';
            itemListHtml += '</li>';
        }
        $("#showsList").html = itemListHtml;
    }
};try{
            var url = "http://172.16.8.17:8080/tv/getTunedPrivate";
            $.get(url, {}, function(result){
                //alert(result.contentId);
                app.getTMSId(result.contentId);
            },'json');
        }catch(e){console.log(e)}