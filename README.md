Gitoscop
=========

This is a pet project which aimed to promote http://angularjs.org. Feel free to fork, make some changes and learn AngularJS in this way. Endless list of TODOs is always present at index.html :-)

* Live demo (via github pages): http://mkotsur.github.com/gitoscop
* My blog: http://sotomajor.org.ua
* AngularJS: http://angularjs.org

Compiling
---------
    rake compile

Running Tests
-------------
    Unit tests: http://127.0.0.1/js/SpecRunner.html
    E2E tests: http://127.0.0.1/js/e2eRunner.html

Aye, you need to set up something like Apache httpd to run tests. Example:

```
<VirtualHost *:80>
    DocumentRoot "/Users/mkotsur/Projects/gitoscop/"
    ServerName 127.0.0.1
    ServerAlias gitoscop.com
    <Directory /Users/mkotsur/Projects/gitoscop/>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Order allow,deny
        allow from all
    </Directory>
</VirtualHost>
```