# RES 2019 - Lab HTTP Infra

> Authors: Nohan Budry, Andrés Moreno

This rapport contains the different stages of the lab HTTP infra executed during the webcast ([Labo-HTTP](https://www.youtube.com/watch?v=XFO4OmcfI3U&list=PLfKkysTy70Qa1IYbV9Xndojc7L-T4keF-&index=23)).

## Stage 1

During this first stage, we've created a new folder named docker-images that contains the whole structure of the lab. Inside this folder we've created another folder named apache-php-image. Inside this folder we can find everything that we need in order to build a docker image of an httpd server (created from a docker image php:7.2-apache) with static http content (the content is located at the "content" folder).

Inside _docker-images/apache-php-image/content_ we've added a framework bootstrap, in order to add a template. The template added comes from [START-BOOTSTRAP](https://startbootstrap.com/themes/grayscale/) and goes by the name of "_Greyscale_". (This template is not the same as the webcast).

## Stage 2

The objective of this stage was to write an http application in Node.js that returns a JSON payload on GET requests. We've added a new folder named _express-dynamic_ inside docker-images that contains all the elements related to this stage (a Dockerfile in order to build our image and a src folder that contains the script). We added two modules with node packet manager (npm). The first one is _chance_. Chance is used to genereate aleatory names, numbers, etc. The second one is _express_ which is a minimalist web framework for node. The code found at index.js is not the same as the webcast, instead of generating students we've decided to generate adventurers and send as payload their id, name, level, health, strength and their pet.

We created two endpoints to get data from:

-   /adventurers : returns a list of 10 random adventurers
-   /adventurers/{id} : returns the information of the adventurer with the given id (a positive integer).

## Stage 3

The objective of this stage was to create a reverse proxy in order to have a unique entry point for the infrastucture. We've created a new folder named _apache-reverse-proxy_ inside _docker-images_ that contains a Dockerfile (in order to build an image) and _config_ folder containing the reverse proxy configuration (contains the path to the different containers, need to take into account that the ip adress needs to be the same as the docker containers from apache static and dynamic servers).

In order to enable the navigator to send the request we need to modify our DNS configuration by adding to the file "hosts" the ip adress and the host name (demo.res.ch).

## Stage 4

The objective of this stage was to use JQuery in order to make an AJAX request. We've added a custom script to *index.html* named *adventurers.js* located at _docker-images/apache-php-images/content/js_ that loads the adventurer's name and lvl's into an element from the html page, this function is executed periodically each two seconds (we've modify the index.html file by adding an _id_ to an h2 to easily edit its content).

## Stage 5

The objective of this stage was to remove the hard-coded IP adresses inside the reverse proxy configuration. In order to achive this, we've modified the Dockerfile form _apache-reverse-proxy_ making it possible to run a php script that will wirte the configuration file of the server using a template. The script uses environement variables (*STATIC\_APP* and *DYNAMIC_APP*) to configure the reverse-proxy.

## Usage

At this point, it is possible to manually run one reverse proxy, one apache static app and one adventurers API.

> **Notes**: The commands are executed at the root of the project folder. The names given to the images and containers are important and if you change them at one point you need to change them everywhere else.

First, let's create the images:

```sh
# Apache static image
docker build -t res/apache-static docker-images/apache-php-image/
# Express dynamic image
docker build -t res/adventurers-api docker-images/express-dynamic/
# Reverse proy image
docker build -t res/reverse-proxy docker-images/apache-reverse-proxy/
```

Then run one apache static and one adventurer API.

```sh
# Run apache static container (in background)
docker run -d --name apache-static res/apache-static
# Run adventurers api container (in background)
docker run -d --name adventurers-api res/adventurers-api
```

In order to run the reverse proxy, we need the know IP adresses assigned to the two container we just started. We can find them with the docker inspect command.

```sh
# Apache static IP adress
docker inspect apache-static | grep -i ipaddress
# Advenurers API IP adress
docker inspect adventurers-api | grep -i ipaddress
```

The output should look like that.

![Docker Inspect Result](./images/docker-inspect-result.png)

In this case, the IP address of the *apache-static* container is "172.17.0.2". To run the reverse proxy we need to expose a port (the example use 8080 but you can chose whatever) and tell docker to set two environment variables.

- STATIC_APP: Contains the IP pf the *apache-static* container.
- DYNAMIC_APP: Contains the IP pf the *adventurers-api* container.

Here is the command:

```sh
docker run -d -p 8080:80 \
	-e STATIC_APP=172.17.0.2 -e DYNAMIC_APP=172.17.0.3 \
	--name reverse-proxy res/reverse-proxy
```

You need to change the two IP adresses to what you had with docker inspect.

In the default config of the proxy, only request with the host demo.res.ch are accepted. So we need to register it in our hosts list for our browsers to recognise them. For UNIX systems, modify the file "/etc/hosts" and add a line with "127.0.0.1 demo.res.ch" The IP adress corresponds to the one your docker daemon uses and you may to change it depending of your docker configuration (for example to "192.168.99.100" for a default docker-machine setup).

In your browser, you may now go to "http://demo.res.ch:8080" to see the apache static app or to "http://demo.res.ch:8080/api/adventurers" for the adventurers api.