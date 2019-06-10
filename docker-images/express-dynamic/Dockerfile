FROM node:10.15

# Uncomment the next line to automatically install vim in the image.
# RUN apt-get update && apt-get install -y vim

COPY src /opt/app/

WORKDIR /opt/app/
RUN npm install

CMD ["npm", "start"]