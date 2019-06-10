<?php
	$static_app = getenv('STATIC_APP');
	$dynamic_app = getenv('DYNAMIC_APP');
?>
<VirtualHost *:80>
    ServerName demo.res.ch
    
    ProxyPass '/api/adventurers/' 'http://<?= $dynamic_app ?>:3000/adventurers/'
    ProxyPassReverse '/api/adventurers/' 'http://<?= $dynamic_app ?>:3000/adventurers/'

    ProxyPass '/' 'http://<?= $static_app ?>/'
    ProxyPassReverse '/' 'http://<?= $static_app ?>/'
</VirtualHost>
