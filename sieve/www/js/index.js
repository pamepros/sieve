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
            //checks what's being watched on the tv right now
            var url = "http://172.16.8.17:8080/tv/getTunedPrivate";
            //var url = "./getTunedPrivate_3.json";
            $.get(url, {}, function(result){
                console.log("contentId"+result.contentId);
                app.getTMSId(result.contentId);
            },'json');
        }catch(e){console.log(e)}
    },
    getTMSId: function(contentId){

        contentId = "1%201%20DDE8D%20ED";
        //gets tms id from the tv show
        var url = "https://api.directvdev.com/cgi-bin/tms.php?contentId="+contentId;
        
            $.get(url, {}, function(result){
                console.log(result);
                var tms = 0;
                if(!result.tms){
                    console.log("wrong result");
                    tms = result[0];
                }else{
                    tms = result.tms;
                    alert(result.tms);
                    console.log("tms----"+result.tms);
                }
                app.getShowData(tms);
            });
        
    },
    getShowData: function(tmsId){
        //get metadata from tms id
        tmsId = "EP002704300057"
        //tmsId = "EP000170730077"
        var url = "http://data.tmsapi.com/v1/programs/"+tmsId+"?api_key=xq345z55txpua6rdjp76vfbe"
        console.log(url);
        $.get(url, {}, function(result){
            alert("Title -> "+result.title);
            app.saveTvShow(result);
        },'json');
    },
    saveTvShow: function(showData){
        //store tv show details on firebase
        
        // TODO: only send title to fireBase if watch time => 10 minutes.
        logShow(showData.title, "http://demo.tmsimg.com/"+showData.preferredImage.uri,showData.tmsId, showData.seriesId);
        getShows();
        
    },
    showList: function(data){
        console.log(data);
        var itemListHtml = "";
        // we fill the list with the movies
        for(var i=0;i<data.length;i++){
            show = data[i];
            itemListHtml += '<div class="square"';
            itemListHtml += 'style="background-image: url(\''+show.imageUrl+'\');"'; 
            itemListHtml += 'onclick="app.openShow("'+show.imageUrl+'");"></div>';
        }
        console.log(itemListHtml);
        $("#showsList").html(itemListHtml);
    },
    openShow: function(imageUrl){
        
        $("#imageShowPopup").css("background","url(\""+imageUrl+"\") no-repeat");
        $("#blurredcurtain").show();
    },
    closeCurtain: function(){
        $("#blurredcurtain").hide();
    }
}