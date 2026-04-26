# FROM python:3.11-slim

# WORKDIR /app

# COPY requirements.txt .

# RUN pip install --no-cache-dir -r requirements.txt

# COPY . .

# CMD ["sleep", "infinity"]  


FROM python:3.12-alpine

RUN apk add --no-cache \
    gcc \
    libc-dev \
    net-snmp-dev \
    net-snmp \
    musl-dev \
    linux-headers

WORKDIR /app


COPY requirements.txt .

RUN CFLAGS="-Wno-error=incompatible-pointer-types" pip install --no-cache-dir easysnmp \
    && pip install --no-cache-dir -r requirements.txt \
    && apk del gcc libc-dev musl-dev linux-headers

COPY . .

RUN mkdir -p /root/.snmp/mibs

CMD ["sleep", "infinity"]
