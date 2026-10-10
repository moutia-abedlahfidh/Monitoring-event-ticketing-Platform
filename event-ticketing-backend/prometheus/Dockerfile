FROM prom/prometheus:v3.5.0

COPY prometheus.yml /etc/prometheus/prometheus.yml

ENTRYPOINT ["/bin/prometheus"]
CMD ["--config.file=/etc/prometheus/prometheus.yml"]
