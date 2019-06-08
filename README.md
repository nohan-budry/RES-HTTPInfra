# RES 2019 - Lab HTTP Infra
> Authors: Nohan Budry, Andrés Moreno

This rapport contains the different stages of the lab HTTP infra executed during the webcast ([Labo-HTTP](https://www.youtube.com/watch?v=XFO4OmcfI3U&list=PLfKkysTy70Qa1IYbV9Xndojc7L-T4keF-&index=23 )). 

## Stage 1

 During this first stage,  we've created  a new folder named docker-images that contains the whole structure of the lab. Inside this folder we've created another folder named apache-php-images.  Inside this folder we can find everything that we need in order to build a docker image of an httpd server (created from a docker image php:7.2-apache) with static http content (the content is located at the "content" folder). 

Inside *docker-images/apache-php-images/content* we've added a framework bootstrap, in order to add a template. The template added comes from [START-BOOTSTRAP](https://startbootstrap.com/themes/grayscale/) and goes by the name of "*Greyscale*". (This template is not the same as the webcast). 

## Stage 2

The objective of this stage was to write an http application in Node.js that returns a JSON payload on GET requests. We've added a new folder named *express-dynamic* inside docker-images that contains all the elements related to this stage (a Dockerfile in order to build our image and a src folder that contains the script). There were two modules npm added the first one is *chance* in order to genereate aleatory names, numbers, etc. and the second one is *express* which is a minimalist web framework for node. The code found at index.js is not the same as the webcast, instead of generating students we've decided to generate adventurers and send as payload their id, name, level, health, strength and his pet. 



## Stage 3

The objective of this stage was to create an reverse proxy in order to make Ajax requests. We've created a new folder named *apache-reverse-proxy* inside *docker-images* that contains a Dockerfile (in order to build an image ) and *config* folder containing the reverse proxy configuration (contains the path to the different containers, need to take into account that the ip adress needs to be the same as the docker containers from apache static and dynamic servers). 

In order to enable the navigator to send the request we need to modify our DNS configuration by adding to the file "hosts" the ip adress and the host name (demo.res.ch).



## Stage 4

The objective of this stage was to use JQuery in order to make an AJAX request. We've added a custom script to  index.js named adventurers.js located at *docker-images/apache-php-images/content/js* that loads the adventurer's name and lvl's into an element from the html page, this function is executed periodically each two seconds  (we've modify the index.js file by adding an *id* in order to target the right header).






















