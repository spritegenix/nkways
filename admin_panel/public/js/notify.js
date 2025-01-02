 $(document).ready(function () {

    // display_notifications();
    displayindic();

    notification_count=0;


    var current_branch=$('#current_branch').val();

    var old_count = 0;
    // setInterval(function(){ 
    //     var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    //     var csrfHash = $('#csrf_token').val(); // CSRF hash

         

    //      // Branch branch_listener
    //      $.ajax({ 
    //         url : base_url()+"branch_manager/current_branch", 
    //         success : function(data){
    //             checked_branch=$.trim(data);
    //             if (checked_branch!=current_branch) {

    //                 current_branch=checked_branch;
                    
    //                 Swal.fire({
    //                   title: 'Need refresh',
    //                   text: "Branch change detected! please refresh",
    //                   icon: 'warning',
    //                   showCancelButton: false,
    //                   confirmButtonColor: '#3085d6',
    //                   cancelButtonColor: '#d33',
    //                   confirmButtonText: 'Refresh!',
    //                   allowOutsideClick: false
    //                 }).then((result) => {
    //                   if (result.isConfirmed) {
    //                     location.reload();
    //                   }
    //                 }) 


    //             }
    //         }
    //     });  
    //     // Branch branch_listener

        
    //     // alert(csrf_token+' dsf '+csrf_hash);
    //     $.ajax({
    //         type : "POST",
    //         url : base_url()+"notifications/notification_count",
    //         data:{
    //             [csrfName]: csrfHash
    //         },
    //         dataType: "json",
    //         success : function(data){
    //             if (data.rows > old_count || data.rows < old_count) {
    //                  display_notifications();
    //                  displayindic();
    //                  var ss=data.notdata;
    //                   for(var k in ss) {
    //                       if(ss[k] instanceof Object) {
    //                         if (ss[k].notified != 1) {
    //                             var stttr=strippeds(ss[k].title);
                              
    //                             var seconds = 0.5; //seconds from now on
 
                            
    //                             if (notification_count<11) {
    //                                 notified(ss[k].id); //Perfect
    //                                 notifyMe(ss[k].id,stttr,'',ss[k].icon,ss[k].url);
    //                                 android_notification(ss[k].id,stttr,ss[k].icon,ss[k].url);
    //                             } 

    //                             notification_count=parseInt(notification_count)+1; 

    //                         }
    //                       } else {
    //                           document.write(ss[k] + "<br>");
    //                       };
    //                   }

    //                 $('.badge_not').text(data.rows);
    //                  // $("#notify_area").animate({scrollTop: $('#notify_area').get(0).scrollHeight}, 1);
    //                 old_count = data.rows;
    //             }
    //         }
    //     });
    // },1000);


    function android_notification(a,b,c,d){
        Android.showToast(a,b,c,d);
        return true;
    }

    function strippeds(originalString){
        const strippedString = originalString.replace(/(<([^>]+)>)/gi, "");
        return strippedString;
    }

    function branch_listener(current_branch){ 

    }



    function notifyMe(myid,mytitle,mybody,myicon,myurl) {
  // Let's check if the browser supports notifications
  navigator.serviceWorker.register(base_url()+'public/js/sw.js');

  if (!("Notification" in window)) {
  }



  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
   
   
  var notification = new Notification(mytitle,{
      body:mybody,
      icon:myicon,
    });
    
    notification.onclick=(e) =>{
      window.location.href=base_url()+'redirect_notify?nurl='+myurl+'&nid='+myid+'';
    }
    
  }
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}


if (!("Notification" in window)) {
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
   
    
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
      }
    });
  }


   function notified(noid){
        var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
        var csrfHash = $('#csrf_token').val(); // CSRF hash
        $.ajax({
          url: base_url()+"notifications/notified",
          type: 'POST',
          data:{
            fetch:1,
            noid:noid,
            [csrfName]: csrfHash
          },
          success: function(dt){
            // console.log(dt);
          }
        });
    }
    
    function display_notifications(){
        var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
        var csrfHash = $('#csrf_token').val(); // CSRF hash
        $.ajax({
            url: base_url()+'notifications/display_notifications',
            data:{
                [csrfName]: csrfHash
            },
            beforeSend: function() {
            },
            success: function(result) {
                $('#notifications_details').html(result);
            }
        });
    }

    function displayindic(){
        var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
        var csrfHash = $('#csrf_token').val(); // CSRF hash
        $.ajax({
                url: base_url()+'notifications/not_indic',
            data:{
                [csrfName]: csrfHash
            },
                beforeSend: function() {
                },
                success: function(result) {
                    $('#bell').html(result);
                }
            });
    }

    function base_url(){
        var baseurl=$('#base_url').val();
        return baseurl+'/';
    }

});