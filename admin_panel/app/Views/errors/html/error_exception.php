<?php

use Config\Services;
use CodeIgniter\CodeIgniter;

$errorId = uniqid('error', true);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>SpriteGenix ERP - Request error</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--favicon-->
    <link rel="icon" href="<?= base_url('public'); ?>/images/app_icon.ico" type="image/png" />
    <link href="<?= base_url('public'); ?>/css/icons.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<?= base_url('public/css/custom_erp.css') ?>">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <style>
        <?= preg_replace('#[\r\n\t ]+#', ' ', file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'debug.css')) ?>
    </style>

    <script>
        <?= file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'debug.js') ?>
    </script>

    <style>
        .main-head {
            width: 100%;
            height: 100vh;
        }

        .head-text {
            font-weight: 600;
            letter-spacing: normal;
            font-size: 3rem;
            margin-top: 0;
            margin-bottom: 0;
            color: #2c3e65;
        }

        .semi-text {
            margin-top: 1.5rem;
        }

        body {
            height: 100%;
            background: #fafafa;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            color: #777;
            font-weight: 300;
            margin: 0;
        }

        .wait-img {
            width: 30%;
        }

        .btn-soon {
            background: #2c3e65;
            padding: 10px;
            border-radius: 25px;
            text-decoration: none;
            color: whitesmoke;
            font-weight: 500;

        }

        .btn-place {
            text-align: center;
        }

        @media(max-width: 767.98px) {
            .wait-img {
                width: 100%;
            }
        }

        .error_box {
            margin: auto;
            text-align: center;
        }

        .m-auto {
            margin: auto !important;
        }

        .d-flex {
            display: flex !important;
        }

        .my-auto {
            margin-top: auto !important;
            margin-bottom: auto !important;
        }

        .justify-content-center {
            justify-content: center !important;
        }

        .explore_error {
            position: fixed;
            bottom: 10px;
            right: 15px;
            color: #0000004d;
            font-size: 13px;
        }

        .error_tab_container {
            padding: 0 50px;
            margin-top: 40px;
            display: none;
        }

        .error_tab {
            text-align: left;
            border: 1px solid;
            border-radius: 10px;
            padding: 10px;
        }

        .error_box::-webkit-scrollbar {
            display: none;
        }

        body::-webkit-scrollbar {
            display: none;
        }
    </style>

</head>

<body onload="init()">
    <div style="width: 100%;">
        <div class="main-head" id="mainbox">




            <div class="error_box">
                <div class="d-flex" style="height:100vh;">
                    <div style="margin:auto;">
                        <div>
                            <h1 class="head-text">Oh Sorry...</h1>
                            <h2 class="semi-text" style="margin-bottom:0;">Your request could not be processed!</h2>

                            <div style="font-size: 185px">
                                😔
                            </div>

                            <div class="">
                                <a onclick="location.reload();" class="btn-soon href_loader">Try again</a>
                                <a href="<?= base_url() ?>" class="btn-soon href_loader">Go Back</a>
                            </div>
                        </div>

                    </div>
                </div>


                <!-- ///////////////////////////////////////////// -->
                <div class="error_tab_container" id="ebox">
                    <div class="error_tab">
                        <!-- Header -->
                        <div class="header">
                            <div class="container">
                                <h1><?= esc($title), esc($exception->getCode() ? ' #' . $exception->getCode() : '') ?></h1>
                                <p>
                                    <?= nl2br(esc($exception->getMessage())) ?>
                                    <a href="https://www.duckduckgo.com/?q=<?= urlencode($title . ' ' . preg_replace('#\'.*\'|".*"#Us', '', $exception->getMessage())) ?>"
                                        rel="noreferrer" target="_blank">search &rarr;</a>
                                </p>
                            </div>
                        </div>

                        <!-- Source -->
                        <div class="container">
                            <p><b><?= esc(clean_path($file)) ?></b> at line <b><?= esc($line) ?></b></p>

                            <?php if (is_file($file)) : ?>
                                <div class="source">
                                    <?= static::highlightFile($file, $line, 15); ?>
                                </div>
                            <?php endif; ?>
                        </div>

                        <div class="container">

                            <ul class="tabs" id="tabs">
                                <li><a href="#backtrace">Backtrace</a></li>
                                <li><a href="#server">Server</a></li>
                                <li><a href="#request">Request</a></li>
                                <li><a href="#response">Response</a></li>
                                <li><a href="#files">Files</a></li>
                                <li><a href="#memory">Memory</a></li>
                            </ul>

                            <div class="tab-content">

                                <!-- Backtrace -->
                                <div class="content" id="backtrace">

                                    <ol class="trace">
                                        <?php foreach ($trace as $index => $row) : ?>

                                            <li>
                                                <p>
                                                    <!-- Trace info -->
                                                    <?php if (isset($row['file']) && is_file($row['file'])) : ?>
                                                        <?php
                                                        if (isset($row['function']) && in_array($row['function'], ['include', 'include_once', 'require', 'require_once'], true)) {
                                                            echo esc($row['function'] . ' ' . clean_path($row['file']));
                                                        } else {
                                                            echo esc(clean_path($row['file']) . ' : ' . $row['line']);
                                                        }
                                                        ?>
                                                    <?php else: ?>
                                                        {PHP internal code}
                                                    <?php endif; ?>

                                                    <!-- Class/Method -->
                                                    <?php if (isset($row['class'])) : ?>
                                                        &nbsp;&nbsp;&mdash;&nbsp;&nbsp;<?= esc($row['class'] . $row['type'] . $row['function']) ?>
                                                        <?php if (! empty($row['args'])) : ?>
                                                            <?php $argsId = $errorId . 'args' . $index ?>
                                                            ( <a href="#" onclick="return toggle('<?= esc($argsId, 'attr') ?>');">arguments</a> )
                                                <div class="args" id="<?= esc($argsId, 'attr') ?>">
                                                    <table cellspacing="0">

                                                        <?php
                                                            $params = null;
                                                            // Reflection by name is not available for closure function
                                                            if (substr($row['function'], -1) !== '}') {
                                                                $mirror = isset($row['class']) ? new ReflectionMethod($row['class'], $row['function']) : new ReflectionFunction($row['function']);
                                                                $params = $mirror->getParameters();
                                                            }

                                                            foreach ($row['args'] as $key => $value) : ?>
                                                            <tr>
                                                                <td><code><?= esc(isset($params[$key]) ? '$' . $params[$key]->name : "#{$key}") ?></code></td>
                                                                <td>
                                                                    <pre><?= esc(print_r($value, true)) ?></pre>
                                                                </td>
                                                            </tr>
                                                        <?php endforeach ?>

                                                    </table>
                                                </div>
                                            <?php else : ?>
                                                ()
                                            <?php endif; ?>
                                        <?php endif; ?>

                                        <?php if (! isset($row['class']) && isset($row['function'])) : ?>
                                            &nbsp;&nbsp;&mdash;&nbsp;&nbsp; <?= esc($row['function']) ?>()
                                        <?php endif; ?>
                                        </p>

                                        <!-- Source? -->
                                        <?php if (isset($row['file']) && is_file($row['file']) && isset($row['class'])) : ?>
                                            <div class="source">
                                                <?= static::highlightFile($row['file'], $row['line']) ?>
                                            </div>
                                        <?php endif; ?>
                                            </li>

                                        <?php endforeach; ?>
                                    </ol>

                                </div>

                                <!-- Server -->
                                <div class="content" id="server">
                                    <?php foreach (['_SERVER', '_SESSION'] as $var) : ?>
                                        <?php
                                        if (empty($GLOBALS[$var]) || ! is_array($GLOBALS[$var])) {
                                            continue;
                                        } ?>

                                        <h3>$<?= esc($var) ?></h3>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Key</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php foreach ($GLOBALS[$var] as $key => $value) : ?>
                                                    <tr>
                                                        <td><?= esc($key) ?></td>
                                                        <td>
                                                            <?php if (is_string($value)) : ?>
                                                                <?= esc($value) ?>
                                                            <?php else: ?>
                                                                <pre><?= esc(print_r($value, true)) ?></pre>
                                                            <?php endif; ?>
                                                        </td>
                                                    </tr>
                                                <?php endforeach; ?>
                                            </tbody>
                                        </table>

                                    <?php endforeach ?>

                                    <!-- Constants -->
                                    <?php $constants = get_defined_constants(true); ?>
                                    <?php if (! empty($constants['user'])) : ?>
                                        <h3>Constants</h3>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Key</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php foreach ($constants['user'] as $key => $value) : ?>
                                                    <tr>
                                                        <td><?= esc($key) ?></td>
                                                        <td>
                                                            <?php if (is_string($value)) : ?>
                                                                <?= esc($value) ?>
                                                            <?php else: ?>
                                                                <pre><?= esc(print_r($value, true)) ?></pre>
                                                            <?php endif; ?>
                                                        </td>
                                                    </tr>
                                                <?php endforeach; ?>
                                            </tbody>
                                        </table>
                                    <?php endif; ?>
                                </div>

                                <!-- Request -->
                                <div class="content" id="request">
                                    <?php $request = Services::request(); ?>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style="width: 10em">Path</td>
                                                <td><?= esc($request->getUri()) ?></td>
                                            </tr>
                                            <tr>
                                                <td>HTTP Method</td>
                                                <td><?= esc(strtoupper($request->getMethod())) ?></td>
                                            </tr>
                                            <tr>
                                                <td>IP Address</td>
                                                <td><?= esc($request->getIPAddress()) ?></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 10em">Is AJAX Request?</td>
                                                <td><?= $request->isAJAX() ? 'yes' : 'no' ?></td>
                                            </tr>
                                            <tr>
                                                <td>Is CLI Request?</td>
                                                <td><?= $request->isCLI() ? 'yes' : 'no' ?></td>
                                            </tr>
                                            <tr>
                                                <td>Is Secure Request?</td>
                                                <td><?= $request->isSecure() ? 'yes' : 'no' ?></td>
                                            </tr>
                                            <tr>
                                                <td>User Agent</td>
                                                <td><?= esc($request->getUserAgent()->getAgentString()) ?></td>
                                            </tr>

                                        </tbody>
                                    </table>


                                    <?php $empty = true; ?>
                                    <?php foreach (['_GET', '_POST', '_COOKIE'] as $var) : ?>
                                        <?php
                                        if (empty($GLOBALS[$var]) || ! is_array($GLOBALS[$var])) {
                                            continue;
                                        } ?>

                                        <?php $empty = false; ?>

                                        <h3>$<?= esc($var) ?></h3>

                                        <table style="width: 100%">
                                            <thead>
                                                <tr>
                                                    <th>Key</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php foreach ($GLOBALS[$var] as $key => $value) : ?>
                                                    <tr>
                                                        <td><?= esc($key) ?></td>
                                                        <td>
                                                            <?php if (is_string($value)) : ?>
                                                                <?= esc($value) ?>
                                                            <?php else: ?>
                                                                <pre><?= esc(print_r($value, true)) ?></pre>
                                                            <?php endif; ?>
                                                        </td>
                                                    </tr>
                                                <?php endforeach; ?>
                                            </tbody>
                                        </table>

                                    <?php endforeach ?>

                                    <?php if ($empty) : ?>

                                        <div class="alert">
                                            No $_GET, $_POST, or $_COOKIE Information to show.
                                        </div>

                                    <?php endif; ?>

                                    <?php $headers = $request->headers(); ?>
                                    <?php if (! empty($headers)) : ?>

                                        <h3>Headers</h3>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Header</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php foreach ($headers as $header) : ?>
                                                    <tr>
                                                        <td><?= esc($header->getName(), 'html') ?></td>
                                                        <td><?= esc($header->getValueLine(), 'html') ?></td>
                                                    </tr>
                                                <?php endforeach; ?>
                                            </tbody>
                                        </table>

                                    <?php endif; ?>
                                </div>

                                <!-- Response -->
                                <?php
                                $response = Services::response();
                                $response->setStatusCode(http_response_code());
                                ?>
                                <div class="content" id="response">
                                    <table>
                                        <tr>
                                            <td style="width: 15em">Response Status</td>
                                            <td><?= esc($response->getStatusCode() . ' - ' . $response->getReasonPhrase()) ?></td>
                                        </tr>
                                    </table>

                                    <?php $headers = $response->headers(); ?>
                                    <?php if (! empty($headers)) : ?>
                                        <?php natsort($headers) ?>

                                        <h3>Headers</h3>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Header</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php foreach (array_keys($headers) as $name) : ?>
                                                    <tr>
                                                        <td><?= esc($name, 'html') ?></td>
                                                        <td><?= esc($response->getHeaderLine($name), 'html') ?></td>
                                                    </tr>
                                                <?php endforeach; ?>
                                            </tbody>
                                        </table>

                                    <?php endif; ?>
                                </div>

                                <!-- Files -->
                                <div class="content" id="files">
                                    <?php $files = get_included_files(); ?>

                                    <ol>
                                        <?php foreach ($files as $file) : ?>
                                            <li><?= esc(clean_path($file)) ?></li>
                                        <?php endforeach ?>
                                    </ol>
                                </div>

                                <!-- Memory -->
                                <div class="content" id="memory">

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Memory Usage</td>
                                                <td><?= esc(static::describeMemory(memory_get_usage(true))) ?></td>
                                            </tr>
                                            <tr>
                                                <td style="width: 12em">Peak Memory Usage:</td>
                                                <td><?= esc(static::describeMemory(memory_get_peak_usage(true))) ?></td>
                                            </tr>
                                            <tr>
                                                <td>Memory Limit:</td>
                                                <td><?= esc(ini_get('memory_limit')) ?></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                            </div> <!-- /tab-content -->

                        </div> <!-- /container -->

                        <div class="footer">
                            <div class="container">

                                <p>
                                    Displayed at <?= esc(date('H:i:sa')) ?> &mdash;
                                    SpriteGenix ERP
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- ///////////////////////////////////////////// -->
            </div>

            <a class="explore_error">What is the problem?</a>
        </div>
    </div>
    <script src="<?= base_url('public'); ?>/js/custom.js"></script>
    <script type="text/javascript">
        $(document).on('click', '.explore_error', function() {
            $('.error_tab_container').toggle();

            $('html, body').animate({
                'scrollTop': $("#ebox").position().top
            });
        })
    </script>
</body>


</html>