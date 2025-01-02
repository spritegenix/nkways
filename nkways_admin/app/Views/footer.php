</main>
		<input type="hidden" id="csrf_token" name="<?= csrf_token() ?>" value="<?= csrf_hash() ?>"/>
		<input type="hidden" id="app_state" value="<?= APP_STATE ?>"/>

		<div class="nointernetbody d-none" id="nointernetbody">
		    <div class="nointernetmiddle">
		        <img  class="nointimg" src="<?= base_url('public/images/logo_full.png'); ?>" alt="asms" draggable="false">
		        <h4>No Internet Connection</h4>
		        <p>You are not connected to the internet. Make sure Wi-Fi is on, Airplane Mode is off and try again.</p>
		    </div>
		</div>

		<!-- ////////////////////////////HIDDEN DATAS//////////////////////////// -->
		<input type="hidden" id="base_url" value="<?= base_url(); ?>">
       
 

  

    
        <?php 
            $quick_show=true;
           

            $uri = new \CodeIgniter\HTTP\URI(str_replace('index.php','',current_url()));
      

            if ($uri->getTotalSegments()>sn2()) {
               if ($uri->getSegment(sn4())== 'view_challan' || $uri->getSegment(sn4())== 'payments' ||  $uri->getSegment(sn4())== 'details' ||  $uri->getSegment(sn3())== 'products' ||  $uri->getSegment(sn3())== 'day_end_summary') {
                     $quick_show=false;
                }
            }
            
        ?>
 

		<?php if ($uri->getTotalSegments()>sn2()) { ?> 
		<?php if ($uri->getSegment(sn3()) == 'crm' || $uri->getSegment(sn4()) == 'tasks' || $uri->getSegment(sn3()) == 'purchase_confirmation') { ?>
		<script src="<?= base_url('public'); ?>/js/crm.js?v=<?= script_version(); ?>"></script>
		<?php }; ?>
		<?php } ?>


		<script src="<?= base_url('public'); ?>/js/notify.js"></script>
		<script src="<?= base_url('public/js/bootstrap.bundle.min.js') ?>"></script>
		<script src="<?= base_url('public'); ?>/js/sweetalert2.min.js"></script>
    
		 
		<?php if ($uri->getTotalSegments()>sn2()) { ?> 
			<?php if ($uri->getSegment(sn4()) == 'add_new' || $uri->getSegment(sn4()) == 'long_edit' || $uri->getSegment(sn3()) == 'notice') { ?>

				<script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs4.min.js" integrity="sha512-ZESy0bnJYbtgTNGlAD+C2hIZCt4jKGF41T5jZnIXy4oP8CQqcrBGWyxNP16z70z/5Xy6TS/nUZ026WmvOcjNIQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

				<script src="<?= base_url('public'); ?>/js/bootstrap.min.js"></script>

			    <script>
				    $(document).on('click','.dropdown-toggle',function(){
				         
				      $(this).siblings('.dropdown-menu').toggle();
				    });

				    $('.summernote').summernote({
				    
				    });
			    </script>

			<?php }; ?>
		<?php } ?>

		<script type="text/javascript">
		    if ('serviceWorker' in navigator) {
		        navigator.serviceWorker.register('<?= base_url('service-worker.js'); ?>', {
		            scope: '.' // <--- THIS BIT IS REQUIRED
		        }).then(function(registration) {
		            // Registration was successful
		            console.log('ServiceWorker registration successful with scope: ', registration.scope);
		        }, function(err) {
		            // registration failed :(
		            console.log('ServiceWorker registration failed: ', err);
		        });
		    }
 
		</script>
 


<script src="<?= base_url('public'); ?>/js/sortable.js"></script>
<script src="<?= base_url('public'); ?>/js/tableexport.js"></script>
<script src="<?= base_url('public'); ?>/js/tableexport.min.js"></script>  
 <script src="<?= base_url('public'); ?>/js/custom.js?v=<?= script_version(); ?>"></script>
     <script src="<?= base_url('public'); ?>/js/common.js?v=<?= script_version(); ?>"></script>
     <script src="<?= base_url('public'); ?>/js/pdf.js?v=<?= script_version(); ?>"></script>
<script src="<?= base_url('public'); ?>/js/custom_erp.js?v=<?= script_version(); ?>"></script>
<script src="<?= base_url('public'); ?>/js/payroll.js?v=<?= script_version(); ?>"></script>
<script src="<?= base_url('public'); ?>/js/tags.js?v=<?= script_version(); ?>"></script>
<script src="<?= base_url('public'); ?>/js/jspdf/jspdf.umd.min.js?v=<?= script_version(); ?>"></script>

<script src="<?= base_url('public'); ?>/js/bundles/knob.bundle.js"></script><!-- Custom Js -->
<script src="<?= base_url('public'); ?>/js/bundles/index2.js"></script>
<script src="<?= base_url('public'); ?>/js/bundles/jvectormap.bundle.js"></script>
<script src="<?= base_url('public'); ?>/js/bundles/morrisscripts.bundle.js"></script>
 

<script src="<?= base_url('public'); ?>/js/jquery-validation/jquery.validate.min.js"></script>


<script src="<?= base_url('public/js/lozad.js') ?>"></script>

<script>
    var editor1cfg = {}
    editor1cfg.toolbar = "basic";
    var editor1 = new RichTextEditor("#rich_editor", editor1cfg);
</script>

  <script type="text/javascript">
    $(".tags_input").tagsinput('items');
    // toastr.options = {
    //     "progressBar": true,
    //     "timeOut": "1500"
    // }
    // Initialize library to lazy load images
    var observer = lozad('.lozad', {
        threshold: 0.1,
        enableAutoReload: true,
        load: function(el) {
            el.src = el.getAttribute("data-src");
            el.onload = function() {
              el.classList.add('imfade')
                // toastr["success"](el.localName.toUpperCase() + " " + el.getAttribute("data-index") + " lazy loaded.")
            }
        }
    })

    // Picture observer
    // with default `load` method
    var pictureObserver = lozad('.lozad-picture', {
        threshold: 0.1
    })

    window.onload = function () {
        setTimeout(function () {
            // document.querySelector('#mutativeImg1').dataset.src = 'images/thumbs/02.jpg'
            // document.querySelector('#mutativeImg2').dataset.src = 'images/thumbs/02.jpg'
            // toastr["success"]("Once data-src change, the element render again.")
        }, 3000)
    }
    // Background observer
    // with default `load` method
    var backgroundObserver = lozad('.lozad-background', {
        threshold: 0.1
    })

    observer.observe()
    pictureObserver.observe()
    backgroundObserver.observe()

    </script>


    <script src="<?= base_url('public'); ?>/js/timepicker.js"></script>
<script>
$(document).ready(function(){
  $('.timepicker').timepicker({
        showInputs: false
    });
  $('body').click(function(event) {
     $('.timepicker').timepicker({
        showInputs: false
    })
  });
  
});
</script>


<script type="text/javascript">

      $(document).on('change','.custom-click',function() {
        filename = this.files[0].name;
        $(this).siblings('.custom-file-label').html(filename);
      });

        $(document).on('change','.date_of_birth',function(){

          var bxid=$(this).data('bxid');

          var today = new Date();
          var birthDate = new Date($('#date_of_birth'+bxid).val());
          var age = today.getFullYear() - birthDate.getFullYear();
          var m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
          }
         return $('#age'+bxid).val(age);
         
      });
   </script>

   <script>
        function preventDoubleSubmit(form) {
            var submitButton = form.querySelector('.prevent-double-submit');
            
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<div class="spinner-grow" role="status"> <span class="visually-hidden">Loading...</span></div>';
            }

            return true; // Continue with form submission
        }
    </script>





	</body>
</html>