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
        getUserWatchList();
        
    }, 
    getUserWatchList: function(){
        try{
            var url = "http://172.16.8.17:8080/tv/getTunedPrivate";
            $.post(url, {}, function(result){
                alert(result.audioTrack);
            },'json');
        }catch(e){console.log(e)}
    },
    showList: function(){
        
    }
};