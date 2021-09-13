<h1 align="center">
  <a href="#"><img src="https://res.cloudinary.com/shaun-storage/image/upload/v1630294835/barcamp-logo_3_p7gvhg.png" alt="Barcamp Cyberjaya" width="100%"></a>
</h1>

<p align="center">
  <!-- <a href="https://discord.gg/ZegqCBr"><img src="https://img.shields.io/discord/612704110008991783" alt="discord"></a> -->
  <a href="https://github.com/standard/standard/actions/workflows/test-internal.yml"><img src="https://github.com/standard/standard/actions/workflows/test-internal.yml/badge.svg?branch=master" alt="Internal tests"></a>
  <a href="https://www.npmjs.com/package/standard"><img src="https://img.shields.io/npm/v/standard.svg" alt="npm version"></a>
  <!-- <a href="https://www.npmjs.com/package/@inva-ui/react"><img src="https://img.shields.io/npm/dm/eslint-config-standard.svg" alt="npm downloads"></a> -->
</p>

# Barcamp Cyberjaya 2021 API

## How to run
* Clone repo
* `yarn add`
* Add .env
```
DB=mongodb://localhost:27017/api-db
JWT_SECRET=My!@!Se3cr8tH4sh3
```

## JWT decoded body
```js
tokenBody = {
                userId: req.body.userId,
                email: req.body.email,
                picture: req.body.picture,
                permissionFlags: req.body.permissionFlags,
            }
```

* `sudo docker-compose up -d` or add your own mongodb connection string in the .env
* `yarn start` or `yarn debug`