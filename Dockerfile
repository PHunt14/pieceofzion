FROM httpd:2.4

RUN adduser -D web

USER web

COPY public-html /usr/local/apache2/htdocs/