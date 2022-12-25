FROM node:gallium-alpine as builder
WORKDIR /build/
COPY ./ ./
RUN yarn --frozen-lockfile
RUN yarn build

# ---------------------

FROM node:gallium-alpine
EXPOSE 3000
WORKDIR /app/
COPY --from=builder /build/.output ./
CMD ["server/index.mjs"]
