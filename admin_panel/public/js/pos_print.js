jQuery.fn.printIt = function(options){

    defaults = {
        cssURI: "css/print.css"
    };

    this.options = $.extend( {}, defaults, options) ;

    // Create an iframe
    _frameName = "printIt-" + (new Date()).getTime();
    var _frame = $( "<iframe name='" + _frameName + "'>" );

    // Hide frame
    _frame
    .css( "width", "1px" )
    .css( "height", "1px" )
    .css( "position", "absolute" )
    .css( "left", "-9999px" )
    .appendTo($("body"));

    var oFrame = window.frames[ _frameName ];
    var oDocument = oFrame.document;

    oDocument
    .open()
    .write("<html><head>"
        +'<style type="text/css">#thermal_design p, #thermal_design b, #thermal_design strong, #thermal_design th, #thermal_design td, #thermal_design h1, #thermal_design h2, #thermal_design h3, #thermal_design h4, #thermal_design h5, #thermal_design h6{color: black!important;font-weight: bold!important;}#thermal_design{max-width: 70mm;}#thermal_design p{margin: 0;font-size: 12px;}#thermal_design th,#thermal_design td{margin: 0;font-size: 12px;}.text-center{text-align: center;}.text-right{text-align: right;}.text-left{text-align: left;}.w-100{width: 100%;}</style>'
        +'<link href="'+base_url()+'public/css/bootstrap.min.css" rel="stylesheet" type="text/css" />'
        +"</head><body>"
        +this.html()
        +"</body></html>");
    oDocument.close();

    // Print
    oFrame.print();
}




  function download_pdf(tbl,title){
      var sTable = document.getElementById(tbl).innerHTML;

            var style = '';
            style = style + "<style>body{font-family: 'Roboto', sans-serif;}table{border:none;}.dataTables_length,.dataTables_filter,.dataTables_info,.dataTables_paginate{display:none;}.receipt_debit_cont{background: white;border: 1px solid #0000008f;border-radius: 10px;}.border_all{border: 1px solid;}.w-100 {width: 100%;}.mt-0{margin-top: 0;}.pl-5{padding: 3rem;}.p-3{padding: 1rem;}.my-auto{margin-top: auto;margin-bottom: auto;}.text-right{text-align: right;}.mb-0{margin-bottom: 0;}.text-dark{color: #3e445e;}.text-uppercase{text-transform: uppercase;}.px-3{margin-left: 1rem;margin-right: 1rem;}.text-center{text-align: center;}.m-0{margin:0!important}.mt-0,.my-0{margin-top:0!important}.mr-0,.mx-0{margin-right:0!important}.mb-0,.my-0{margin-bottom:0!important}.ml-0,.mx-0{margin-left:0!important}.m-1{margin:.25rem!important}.mt-1,.my-1{margin-top:.25rem!important}.mr-1,.mx-1{margin-right:.25rem!important}.mb-1,.my-1{margin-bottom:.25rem!important}.ml-1,.mx-1{margin-left:.25rem!important}.m-2{margin:.5rem!important}.mt-2,.my-2{margin-top:.5rem!important}.mr-2,.mx-2{margin-right:.5rem!important}.mb-2,.my-2{margin-bottom:.5rem!important}.ml-2,.mx-2{margin-left:.5rem!important}.m-3{margin:1rem!important}.mt-3,.my-3{margin-top:1rem!important}.mr-3,.mx-3{margin-right:1rem!important}.mb-3,.my-3{margin-bottom:1rem!important}.ml-3,.mx-3{margin-left:1rem!important}.m-4{margin:1.5rem!important}.mt-4,.my-4{margin-top:1.5rem!important}.mr-4,.mx-4{margin-right:1.5rem!important}.mb-4,.my-4{margin-bottom:1.5rem!important}.ml-4,.mx-4{margin-left:1.5rem!important}.m-5{margin:3rem!important}.mt-5,.my-5{margin-top:3rem!important}.mr-5,.mx-5{margin-right:3rem!important}.mb-5,.my-5{margin-bottom:3rem!important}.ml-5,.mx-5{margin-left:3rem!important}.p-0{padding:0!important}.pt-0,.py-0{padding-top:0!important}.pr-0,.px-0{padding-right:0!important}.pb-0,.py-0{padding-bottom:0!important}.pl-0,.px-0{padding-left:0!important}.p-1{padding:.25rem!important}.pt-1,.py-1{padding-top:.25rem!important}.pr-1,.px-1{padding-right:.25rem!important}.pb-1,.py-1{padding-bottom:.25rem!important}.pl-1,.px-1{padding-left:.25rem!important}.p-2{padding:.5rem!important}.pt-2,.py-2{padding-top:.5rem!important}.pr-2,.px-2{padding-right:.5rem!important}.pb-2,.py-2{padding-bottom:.5rem!important}.pl-2,.px-2{padding-left:.5rem!important}.p-3{padding:1rem!important}.pt-3,.py-3{padding-top:1rem!important}.pr-3,.px-3{padding-right:1rem!important}.pb-3,.py-3{padding-bottom:1rem!important}.pl-3,.px-3{padding-left:1rem!important}.p-4{padding:1.5rem!important}.pt-4,.py-4{padding-top:0.5rem!important}.pr-4,.px-4{padding-right:1.5rem!important}.pb-4,.py-4{padding-bottom:1.5rem!important}.pl-4,.px-4{padding-left:1.5rem!important}.p-5{padding:3rem!important}.pt-5,.py-5{padding-top:3rem!important}.pr-5,.px-5{padding-right:3rem!important}.pb-5,.py-5{padding-bottom:3rem!important}.pl-5,.px-5{padding-left:3rem!important}.m-n1{margin:-.25rem!important}.mt-n1,.my-n1{margin-top:-.25rem!important}.mr-n1,.mx-n1{margin-right:-.25rem!important}.mb-n1,.my-n1{margin-bottom:-.25rem!important}.ml-n1,.mx-n1{margin-left:-.25rem!important}table {border-collapse: collapse;}tbody {color: #797979;}.d-flex{display: flex!important;}.justify-content-between {-ms-flex-pack: justify!important;justify-content: space-between!important;}tr{border: 1px solid;} td{padding:15px;}.d-flex{display:flex;}.justify-content-between {-ms-flex-pack: justify!important;justify-content: space-between!important;}h1, h2, h3, h4, h5, h6 {color: #3e445e;font-weight: bold;margin: 10px 0;}.invoice_page{background: white;color: black; padding:15px; border-radius: 5px;overflow: auto;}.invoice_page::-webkit-scrollbar {display: none;}.company_logo{width: 60px;height: 60px;object-fit: cover;object-position: center;border-radius: 50%;}.border_one{border: 1px solid;}.bg_1{background: #dbe5f7;}.bg_2{background: #21869d;}.product_table td{padding-left: .5rem;padding-right: .5rem;}.invoice_hr{border-top: 1px solid rgb(0 0 0 / 32%);}td{padding:0px 10px;}tr{border:none;}h5,h6{padding: 5px 0; padding-left: .5rem!important;}p{margin: 5px 0;}</style>";

            // CREATE A WINDOW OBJECT.
            var win = window.open('', '', 'height=700,width=700');

            win.document.write('<html><head>');
            win.document.write('<title>'+title+'</title>');   // <title> FOR PDF HEADER.
            win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
            win.document.write('</head>');
            win.document.write('<body>');
            win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
            win.document.write('</body></html>');

            win.document.close();   // CLOSE THE CURRENT WINDOW.
            win.print(false);   // CLOSE THE CURRENT WINDOW.

          };
  
    //EXPORT TO ECXELL
    function exportTableToExcel(tableID, filename = ''){
          var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
          var textRange; var j=0;
          tab = document.getElementById(tableID); // id of table

          for(j = 0 ; j < tab.rows.length ; j++) 
          {     
              tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
              //tab_text=tab_text+"</tr>";
          }

          tab_text=tab_text+"</table>";
          tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
          tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
          tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

          var ua = window.navigator.userAgent;
          var msie = ua.indexOf("MSIE "); 

          if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
          {
              txtArea1.document.open("txt/html","replace");
              txtArea1.document.write(tab_text);
              txtArea1.document.close();
              txtArea1.focus(); 
              sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
          }  
          else                 //other browser not tested on IE 11
              sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

          return (sa);

    }
    //EXPORT TO ECXELL


    //CREATE PRINT AND PDF
 

    function createPDF(tbl,title) {
        $('#'+tbl).printThis({
            debug: false,                   // show the iframe for debugging
            importCSS: true,                // import parent page css
            importStyle: false,             // import style tags
            printContainer: false,          // grab outer container as well as the contents of the selector
            removeInline: false,            // remove all inline styles from print elements
            removeInlineSelector: "body *", // custom selectors to filter inline styles. removeInline must be true
            printDelay: 333,                // variable print delay
            footer: null,                   // postfix to html
            base: false,                    // preserve the BASE tag, or accept a string for the URL
            formValues: true,               // preserve input/form values
            canvas: false,                  // copy canvas elements
            doctypeString: '',              // enter a different doctype for older markup
            removeScripts: false,           // remove script tags from print content
            copyTagClasses: false           // copy classes from the html & body tag
        });


    }
    //CREATE PRINT AND PDF

    

    //  $(document).on('click','#btnPrint',function () {
    //     var template=$(this).data('template');
    //     var css_ver=$(this).data('css_ver');
    //      var div_content=$(this).data('div_content');
    //     var contents = $("#"+div_content).html();

 


    //     myWindow=window.open('','','width=200,height=100');
    //     myWindow.document.write('<html><head><title>DIV Contents</title><style media="print"> @page { size: auto;  margin: 20px; } </style></head><body><link href="'+base_url()+'/public/css/invoice/after_print/invoice_show'+template+'.css?ver='+css_ver+'" rel="stylesheet" type="text/css" />'+contents+'</body></html>');


    //     // myWindow.document.close(); //missing code


       
    //      setTimeout(function () {
    //         myWindow.focus();
    //         myWindow.print(); 
    //     }, 1000);
    // });


     $(document).on('click','#btnPrint',function () {
        var template=$(this).data('template');
        var css_ver=$(this).data('css_ver');
         var div_content=$(this).data('div_content');
        var contents = $("#"+div_content).html();

        $('body').append('<div id="print_loader" class="d-flex"><div class="print_box m-auto d-flex justify-content-center"><div class="d-flex my-auto"><i class="bx bx-loader bx-spin me-1"></i> Readying to print</div></div></div>');

        var frame1 = $('<iframe id="iframeprint" style="opacity:0;"/>');
        frame1[0].name = "frame1";
        frame1.css({ "position": "fixed", "top": "-1000000", "left": "-1000000" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open(); 
        frameDoc.document.write('<html><head><title>DIV Contents</title>');
        frameDoc.document.write('<style media="print"> @page { size: auto;  margin: 20px; } </style></head><body>');
        
      

        frameDoc.document.write('<link href="'+base_url()+'/public/css/invoice/after_print/invoice_show'+template+'.css?ver='+css_ver+'" rel="stylesheet" type="text/css" />');
 
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();

       
        $('#iframeprint').on('load', function(){

             setTimeout(function () {
                $('#print_loader').remove();
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                frame1.remove();
            }, 1000);
        });
    });


    // $(document).on('click','#btnPrint,#invoice_print',function () {
    //     var template=$(this).data('template');
    //     var css_ver=$(this).data('css_ver');
    //     var div_content=$(this).data('div_content');
        
    //     // alert(template)
    //     // var contents = $("#pdfthis").html();

    //      var printContents = document.getElementById(div_content).innerHTML;
    //  var originalContents = document.body.innerHTML;

    //   var fddddd='<style media="print"> @page { size: auto;  margin: 20px; } </style><link href="'+base_url()+'/public/css/invoice/after_print/invoice_show'+template+'.css?ver='+css_ver+'" rel="stylesheet" type="text/css" />';
 
        
         
    //  document.body.innerHTML = fddddd+printContents;

    //  window.print();

    //  document.body.innerHTML = originalContents;
    // });








    $(document).on('click','#btnreceiptPrint',function () {
        var contents = $("#pdfthis").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>Receipt</title>');
        frameDoc.document.write('<style media="print"> @page { size: auto;  margin: 20px; } </style></head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="'+base_url()+'/public/css/invoice_bootstrap.min.css" rel="stylesheet" type="text/css" />');
        frameDoc.document.write('<link href="'+base_url()+'/public/css/custom.css" rel="stylesheet" type="text/css" />'); 
        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 500);
    });
    


    
    
     // if ($('#thermalcheck').val()==1) {
     //         //WebSocket settings 
     //        JSPM.JSPrintManager.auto_reconnect = true;
     //        JSPM.JSPrintManager.start();
     //        JSPM.JSPrintManager.WS.onStatusChanged = function () {
     //            if (jspmWSStatus()) {
     //                //get client installed printers
     //                JSPM.JSPrintManager.getPrinters().then(function (myPrinters) {
     //                    var options = '';
     //                    for (var i = 0; i < myPrinters.length; i++) {
     //                        options += '<option>' + myPrinters[i] + '</option>';
     //                    }
     //                    $('#installedPrinterName').html(options);
     //                });
     //            }
     //        };

     //        //Check JSPM WebSocket status
     //        function jspmWSStatus() {
     //            if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open)
     //                return true;
     //            else if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Closed) {
     //                alert('JSPrintManager (JSPM) is not installed or not running! Download JSPM Client App from https://neodynamic.com/downloads/jspm');
     //                return false;
     //            }
     //            else if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Blocked) {
     //                alert('JSPM has blocked this website!');
     //                return false;
     //            }
     //        }

     //       //Do printing...
     //        function QuickPrint(tbl,title) {
     //            if (jspmWSStatus()) {
     //                //generate an image of HTML content through html2canvas utility
     //                html2canvas(document.getElementById('thermal_design'), { scale: 10 }).then(function (canvas) {

     //                    //Create a ClientPrintJob
     //                    var cpj = new JSPM.ClientPrintJob();
     //                    //Set Printer type (Refer to the help, there many of them!)
     //                    if ($('#useDefaultPrinter').prop('checked')) {
     //                        cpj.clientPrinter = new JSPM.DefaultPrinter();
     //                    } else {
     //                        cpj.clientPrinter = new JSPM.InstalledPrinter($('#installedPrinterName').val());
     //                    }
     //                    //Set content to print... 
     //                    var b64Prefix = "data:image/png;base64,";
     //                    var imgBase64DataUri = canvas.toDataURL("image/png");
     //                    var imgBase64Content = imgBase64DataUri.substring(b64Prefix.length, imgBase64DataUri.length);

     //                    var myImageFile = new JSPM.PrintFile(imgBase64Content, JSPM.FileSourceType.Base64, 'myFileToPrint.png', 1);
     //                    //add file to print job
     //                    cpj.files.push(myImageFile);

     //                    //Send print job to printer!
     //                    cpj.sendToClient();


     //                });
     //            }
     //        }
     //    }


        //Do printing...
        
        $(document).on('click','.printtest',function(){

            if (jspmWSStatus()) {

                
                
                //generate an image of HTML content through html2canvas utility
                html2canvas(document.getElementById('print_view'), { scale: 10 }).then(function (canvas) {
                    
                    //Create a ClientPrintJob
                    var cpj = new JSPM.ClientPrintJob();
                    //Set Printer type (Refer to the help, there many of them!)
                    if ($('#useDefaultPrinter').prop('checked')) {
                        cpj.clientPrinter = new JSPM.DefaultPrinter();
                    } else {
                        cpj.clientPrinter = new JSPM.InstalledPrinter($('#installedPrinterName').val());
                    }
                    //Set content to print... 
                    var b64Prefix = "data:image/png;base64,";
                    var imgBase64DataUri = canvas.toDataURL("image/png");
                    var imgBase64Content = imgBase64DataUri.substring(b64Prefix.length, imgBase64DataUri.length);

                    var myImageFile = new JSPM.PrintFile(imgBase64Content, JSPM.FileSourceType.Base64, 'myFileToPrint.png', 1);
                    //add file to print job
                    cpj.files.push(myImageFile);

                    //Send print job to printer!
                    cpj.sendToClient();


                });
            }
        });
        





    //CREATE PRINT AND PDF
     function createPDF_only_table(tbl,title) {
            var sTable = document.getElementById(tbl).innerHTML;

            var style="<style>.receipt_debit_cont{background: white;border: 1px solid #0000008f;border-radius: 10px;}.border_all{border: 1px solid;}.w-100 {width: 100%;}.mt-0{margin-top: 0;}.pl-5{padding: 3rem;}.p-3{padding: 1rem;}.my-auto{margin-top: auto;margin-bottom: auto;}.text-right{text-align: right;}.mb-0{margin-bottom: 0;}.text-dark{color: #3e445e;}.text-uppercase{text-transform: uppercase;}.px-3{margin-left: 1rem;margin-right: 1rem;}.text-center{text-align: center;}.m-0{margin:0!important}.mt-0,.my-0{margin-top:0!important}.mr-0,.mx-0{margin-right:0!important}.mb-0,.my-0{margin-bottom:0!important}.ml-0,.mx-0{margin-left:0!important}.m-1{margin:.25rem!important}.mt-1,.my-1{margin-top:.25rem!important}.mr-1,.mx-1{margin-right:.25rem!important}.mb-1,.my-1{margin-bottom:.25rem!important}.ml-1,.mx-1{margin-left:.25rem!important}.m-2{margin:.5rem!important}.mt-2,.my-2{margin-top:.5rem!important}.mr-2,.mx-2{margin-right:.5rem!important}.mb-2,.my-2{margin-bottom:.5rem!important}.ml-2,.mx-2{margin-left:.5rem!important}.m-3{margin:1rem!important}.mt-3,.my-3{margin-top:1rem!important}.mr-3,.mx-3{margin-right:1rem!important}.mb-3,.my-3{margin-bottom:1rem!important}.ml-3,.mx-3{margin-left:1rem!important}.m-4{margin:1.5rem!important}.mt-4,.my-4{margin-top:1.5rem!important}.mr-4,.mx-4{margin-right:1.5rem!important}.mb-4,.my-4{margin-bottom:1.5rem!important}.ml-4,.mx-4{margin-left:1.5rem!important}.m-5{margin:3rem!important}.mt-5,.my-5{margin-top:3rem!important}.mr-5,.mx-5{margin-right:3rem!important}.mb-5,.my-5{margin-bottom:3rem!important}.ml-5,.mx-5{margin-left:3rem!important}.p-0{padding:0!important}.pt-0,.py-0{padding-top:0!important}.pr-0,.px-0{padding-right:0!important}.pb-0,.py-0{padding-bottom:0!important}.pl-0,.px-0{padding-left:0!important}.p-1{padding:.25rem!important}.pt-1,.py-1{padding-top:.25rem!important}.pr-1,.px-1{padding-right:.25rem!important}.pb-1,.py-1{padding-bottom:.25rem!important}.pl-1,.px-1{padding-left:.25rem!important}.p-2{padding:.5rem!important}.pt-2,.py-2{padding-top:.5rem!important}.pr-2,.px-2{padding-right:.5rem!important}.pb-2,.py-2{padding-bottom:.5rem!important}.pl-2,.px-2{padding-left:.5rem!important}.p-3{padding:1rem!important}.pt-3,.py-3{padding-top:1rem!important}.pr-3,.px-3{padding-right:1rem!important}.pb-3,.py-3{padding-bottom:1rem!important}.pl-3,.px-3{padding-left:1rem!important}.p-4{padding:1.5rem!important}.pt-4,.py-4{0.5rem!important}.pr-4,.px-4{padding-right:1.5rem!important}.pb-4,.py-4{padding-bottom:1.5rem!important}.pl-4,.px-4{padding-left:1.5rem!important}.p-5{padding:3rem!important}.pt-5,.py-5{padding-top:3rem!important}.pr-5,.px-5{padding-right:3rem!important}.pb-5,.py-5{padding-bottom:3rem!important}.pl-5,.px-5{padding-left:3rem!important}.m-n1{margin:-.25rem!important}.mt-n1,.my-n1{margin-top:-.25rem!important}.mr-n1,.mx-n1{margin-right:-.25rem!important}.mb-n1,.my-n1{margin-bottom:-.25rem!important}.ml-n1,.mx-n1{margin-left:-.25rem!important}table {border-collapse: collapse;}tbody {color: #797979;}.d-flex{display: flex!important;}.justify-content-between {-ms-flex-pack: justify!important;justify-content: space-between!important;}tr{border: 1px solid;} td{padding:15px;}.d-flex{display:flex;}.justify-content-between {-ms-flex-pack: justify!important;justify-content: space-between!important;}h1, h2, h3, h4, h5, h6 {color: #3e445e;font-weight: bold;margin: 10px 0;}.invoice_page{background: white;color: black;padding: 30px;border-radius: 5px;overflow: auto;}.invoice_page::-webkit-scrollbar {display: none;}.company_logo{width: 60px;height: 60px;object-fit: cover;object-position: center;border-radius: 50%;}.border_one{border: 1px solid;}.bg_1{background: #dbe5f7;}.bg_2{background: #21869d;}.product_table td{padding-left: .5rem;padding-right: .5rem;}.invoice_hr{border-top: 1px solid rgb(0 0 0 / 32%);}</style>";

            // CREATE A WINDOW OBJECT.
            var win = window.open('', '', 'height=700,width=700');

            win.document.write('<html><head>');
            win.document.write('<title>'+title+'</title>');   // <title> FOR PDF HEADER.
            win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
            win.document.write('</head>');
            win.document.write('<body>');
            win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
            win.document.write('</body></html>');

            win.document.close();   // CLOSE THE CURRENT WINDOW.

            win.print(false);    // PRINT THE CONTENTS.
        }
    //CREATE PRINT AND PDF
    function base_url(){
        var baseurl=$('#base_url').val();
        return baseurl;
    }