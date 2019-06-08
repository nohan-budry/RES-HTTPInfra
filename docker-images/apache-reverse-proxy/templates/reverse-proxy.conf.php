<?php
	$static_app = getenv('STATIC_APP');
	$dynamic_app = getenv('DYNAMIC_APP');
?>
<VirtualHost *:80>
    ServerName demo.res.ch
    
    ProxyPass '/api/adventurers/' 'http://<?= $dynamic_app ?>/adventurers/'
    ProxyPassReverse '/api/adventurers/' 'http://<?= $dynamic_app ?>/adventurers/'

    ProxyPass '/' 'http://<?= $static_app ?>/'
    ProxyPassReverse '/' 'http://<?= $static_app ?>/'
</VirtualHost>
