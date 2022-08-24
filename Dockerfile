FROM public.ecr.aws/u8o7o9c4/node-10 AS builder
ADD package*.json /tmp/
WORKDIR /tmp
RUN npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app
FROM public.ecr.aws/u8o7o9c4/node-10-slim
COPY . /usr/src/app
COPY --from=builder /usr/src/app /usr/src/app
WORKDIR /usr/src/app
RUN npm run build
EXPOSE 3000
CMD [ "node", "server.js" ]

