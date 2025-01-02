<!-- ////////////////////////// TOP BAR START ///////////////////////// -->
<div class="sub_topbar d-flex">
	<div class="right_bar d-flex justify-content-between w-100">

		<a class="my-auto ait-ms-2 href_loader cursor-pointer font-size-topbar go_back_or_close text-SpriteGenix-red " title="Back">
			<i class="bx bx-arrow-back"></i>
		</a>

		<nav aria-label="breadcrumb">
			<ol class="breadcrumb SpriteGenix-breadcrumb mb-0 p-0">
				<li class="breadcrumb-item">
					<a href="<?= base_url(); ?>" class="href_loader"><i class="bx bx-home-alt text-SpriteGenix-red"></i></a>
				</li>

				<li class="breadcrumb-item active" aria-current="page">
					<b class="page_heading text-dark">Account setting</b>
				</li>
			</ol>
		</nav>



		<div class="d-flex">

			<a class="my-auto ms-2 text-dark cursor-pointer font-size-topbar href_loader" title="Refresh" onclick="location.reload();">
				<i class="bx bx-refresh"></i>
			</a>
			<a class="my-auto ms-2 text-SpriteGenix-red href_loader cursor-pointer font-size-topbar" href="<?= base_url() ?>" title="Back">
				<i class="bx bxs-category"></i>
			</a>
		</div>

	</div>
</div>
<!-- ////////////////////////// TOP BAR END ///////////////////////// -->


<div class="main_page_content">

	<div class="container-fluid p-0">
		<div class="row">

			<div class="col-md-4">
				<div class="card">
					<div class="card-body">

						<div class="col-md-12 text-center mb-2 border-bottom pb-2">
							<img src="<?= base_url(); ?>/public/images/avatars/<?php if ($user['profile_pic'] != '') {
																					echo $user['profile_pic'];
																				} else {
																					echo 'avatar-icon.png';
																				} ?>" style="height: 110px;width: 110px; object-fit: contain;" alt="" id="ac_profile" class="rounded-circle p-1 bg-danger">
							<div class="mt-2">
								<h5 id="ac_username"><?= user_name($user['id']); ?></h5>
								<p class="text-secondary mb-1">
									<?php if ($user['u_type'] == 'admin'): ?>
										Administrator
									<?php else: ?>
										<?= $user['u_type']; ?>
									<?php endif; ?>
								</p>
							</div>
						</div>

						<h5 class=" pb-2 pt-3">Password</h5>
						<form action="<?= base_url('settings/changepassword'); ?>/<?= $user['id'] ?>" id="pass_form">
							<?= csrf_field() ?>
							<div class="row">
								<div class="col-md-12">
									<div class="form-group mb-2">
										<label>Old Password</label>
										<input type="password" class="form-control" name="password" id="password">
									</div>
								</div>
								<input type="hidden" name="email" value="<?= $user['email']; ?>">
								<div class="col-md-12">
									<div class="form-group mb-2">
										<label>New Password</label>
										<input type="password" class="form-control" name="newpassword">
									</div>
								</div>
								<div class="col-md-12 mt-2">
									<button class="SpriteGenix-primary-btn w-35" id="change_pass" type="button">Save</button>
								</div>
							</div>
						</form>

					</div>
				</div>
			</div>

			<div class="col-md-8">
				<div class="card">
					<div class="card-body">

						<h5 class="border-bottom pb-2">Basic information</h5>


						<form action="<?= base_url('settings/save_profile'); ?>/<?= $user['id']; ?>" id="pro_form" enctype="multipart/form-data">
							<?= csrf_field() ?>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group mb-2">
										<label>Profile</label>
										<input type="file" class="form-control" accept="image/*" id="select_profile_img" name="user_profile" placeholder="Choose Profile">
										<input type="hidden" name="old_profile_pic" value="<?= $user['profile_pic']; ?>">
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group mb-2">
										<label>Full Name</label>
										<input type="text" class="form-control" name="user_name" id="user_name" value="<?= $user['display_name']; ?>">
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group mb-2">
										<label>Email</label>
										<input type="email" class="form-control" name="user_email" value="<?= $user['email']; ?>">
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group mb-2">
										<label>Mobile Number</label>
										<input type="text" oninput="this.value = this.value.replace(/[^0-9\d ]/g, '')" class="form-control" name="user_phone" value="<?= $user['phone']; ?>">
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group mb-2">
										<label>Date Of Birth</label>
										<input type="date" class="form-control" name="date_of_birth" value="<?= $user['date_of_birth']; ?>">
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group mb-1">
										<label>Gender</label>
										<div class="d-flex py-2">
											<div class="d-flex me-3">
												<input type="radio" class="form-check" name="gender" id="male" value="male" <?php if ($user['gender'] == "male") {
																																echo "checked";
																															} elseif ($user['gender'] == '') {
																																echo "checked";
																															} ?>>
												<label class="ms-1 my-auto" for="male">Male</label>
											</div>
											<div class="d-flex me-3">
												<input type="radio" class="form-check" name="gender" id="female" value="female" <?php if ($user['gender'] == "female") {
																																	echo "checked";
																																} ?>>
												<label class="ms-1 my-auto" for="female">Female</label>
											</div>
											<div class="d-flex me-3">
												<input type="radio" class="form-check" name="gender" id="others" value="others" <?php if ($user['gender'] == "others") {
																																	echo "checked";
																																} ?>>
												<label class="ms-1 my-auto" for="others">Others</label>
											</div>
										</div>
									</div>
								</div>

								<?php if ($user['author'] == 1): ?>

									<div class="form-group col-md-4 mb-2">
										<label class="font-weight-semibold" for="date_of_join">Joined on:</label>
										<input type="date" class="form-control" name="date_of_join" value="<?= get_date_format($user['date_of_join'], 'Y-m-d') ?>">
									</div>

									<div class="form-group col-md-4 mb-2">
										<label class="font-weight-semibold" for="designation">Designation</label>
										<input type="text" class="form-control" name="designation" value="<?= $user['designation'] ?>">
									</div>
									<div class="form-group col-md-4 mb-2">
										<label class="font-weight-semibold" for="qualification">Qualification</label>
										<input type="text" class="form-control" name="qualification" value="<?= $user['qualification'] ?>">
									</div>

								<?php endif ?>

								<div class="col-md-12">
									<div class="form-group mb-2">
										<label>Address</label>
										<textarea class="form-control" name="address" rows="4"><?= $user['billing_address']; ?></textarea>
									</div>
								</div>

								<div class="col-md-12 mt-2">
									<button type="button" id="save_pro" class="SpriteGenix-primary-btn w-25">Save</button>
								</div>
							</div>
						</form>
					</div>

				</div>

			</div>

		</div>
	</div>
</div>

<!-- ////////////////////////// PAGE FOOTER END ///////////////////////// -->
<div class="sub_footer_bar d-flex justify-content-between">
	<div>
		<a href="<?= base_url('app_info') ?>" class="href_loader text-dark font-size-footer"><i class="bx bx-info-circle"></i> <span class="my-auto">App info</span></a>
		<a href="<?= base_url('tutorial_coming_soon') ?>" class="href_loader text-dark font-size-footer"><i class="bx bx-right-arrow ms-2"></i> <span class="my-auto">Tutorial</span></a>
	</div>
	<div>
		<a href="javascript:void(0);" class="text-dark font-size-footer"><i class="bx bx-calendar"></i> <span class="my-auto"><?= get_date_format(now_time($user['id']), 'd M Y') ?></span></a>

		<a href="<?= base_url('settings/preferences'); ?>" class="text-dark href_loader font-size-footer"><i class="bx bx-cog ms-2"></i> <span class="my-auto">App settings</span></a>
	</div>
</div>
<!-- ////////////////////////// PAGE FOOTER END ///////////////////////// -->