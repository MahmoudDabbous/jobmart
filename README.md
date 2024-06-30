<p align="center">
  <img src="https://i.postimg.cc/VkMXnc7V/JobMart.png" width="200" alt="Nest Logo" />
</p>

## Description

[JobMart](https://github.com/MahmoudDabbous/jobmart) is a job board application that allows admin to post job listings and users apply for jobs. It is built using [Nest](https://github.com/nestjs/nest) framework for backend.

## Installation

```bash
$ pnpm install
```

## Environment Variables

```bash
cp .env.example .env  # you can change the values in the .env file as needed
```

## Database

```bash
docker compose up
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Other repositories in the project

- [JobMart Frontend](https://github.com/mahmudhmh/jobmart-client)
- [JobMart Admin](https://github.com/ahmedgalal2001/job-mart-admin-dashboard)
