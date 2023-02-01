###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM public.ecr.aws/docker/library/node:18.12-bullseye-slim As development

WORKDIR /usr/src/app

ARG UID=1000
ARG GID=1000
RUN groupmod -g "${GID}" node && usermod -u "${UID}" -g "${GID}" node

COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node

###################
# BUILD FOR PRODUCTION
###################
FROM public.ecr.aws/docker/library/node:18.12-bullseye-slim As build

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node

###################
# PRODUCTION
###################
FROM public.ecr.aws/docker/library/node:18.12-bullseye-slim As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
CMD [ "node", "dist/src/main.js" ]