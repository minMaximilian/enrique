FROM golang:1.16-alpine AS dev

WORKDIR /bot

RUN apk add git

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go install github.com/minMaximilian/enrique

CMD [ "go", "run", "*.go" ]

FROM alpine

WORKDIR /bin

COPY --from=dev /go/bin/enrique ./enrique

CMD ["sh", "-c", "enrique -p"]