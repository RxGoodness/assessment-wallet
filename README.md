# Sample .env

Create a `.env` file in your project root with the following content:

```env
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"
SHADOW_DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<shadow_database>?schema=public"
PORT=8000
JWT_SECRET="your_jwt_secret"
```

Replace the placeholders with your actual database credentials and secret values.

# Wallet API Backend

This project is a backend API for a wallet system, built with NestJS, Prisma, and PostgreSQL. It supports user registration, authentication, and wallet operations (credit, debit). The API is deployed on Render and is fully testable via a provided Postman collection.

---

## Features

- User registration and login (JWT authentication)
- Credit and debit wallet endpoints
- Error handling and logging
- Automated tests (unit test)
- Postman collection for API testing
- Deployed and accessible via: [https://assessment-wallet.onrender.com](https://assessment-wallet.onrender.com)

---

## Project Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/RxGoodness/assessment-wallet.git
cd assessment-wallet
yarn install
```

---

## Environment Variables

Configure your `.env` file:

```env
DATABASE_URL=your_postgres_url
SHADOW_DATABASE_URL=your_shadow_db_url
PORT=8000
```

---

## Database Setup

Run Prisma migrations to set up the database:

```bash
npx prisma migrate dev --name init
```

---

## Running the Project

```bash
# development
yarn start

# watch mode
yarn start:dev

# production
yarn start:prod
```

---

## Testing

Run unit and e2e tests:

```bash
yarn test
yarn test:e2e
yarn test:cov
```

---

## API Documentation & Postman

Import `POSTMAN_COLLECTION.json` into Postman for ready-to-use API requests.
- The collection uses an environment variable `baseUrl` set to your hosted API.
- Login requests automatically save the token for authenticated endpoints.

---

## Deployment

The API is deployed on Render:
- Hosted URL: [https://assessment-wallet.onrender.com](https://assessment-wallet.onrender.com)
- Update your Postman collection to use this URL for live testing.

---

## Project Structure

- `src/auth` — Authentication logic (register, login, JWT)
- `src/user` — User module
- `src/wallet` — Wallet operations (credit, debit)
- `prisma` — Prisma schema and migrations
- `test` — Test files

---

## Error Handling

All endpoints return structured error responses for better client experience and debugging.

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

---

## License

MIT

---

## Author

RxGoodness

---

## For Full Project Details

See `PROJECT_EXPLANATION.md` for a complete step-by-step breakdown and reasoning for every decision made in this project.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
