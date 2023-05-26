import { DataSource } from "typeorm";
import "dotenv/config";
import MoviesEntity from "../../modules/movies/infra/typeorm/entities/MoviesEntity";
import UserEntity from "../../modules/users/infra/typeorm/entities/UserEntity";
import { CreateUsers1638557053010 } from "./migrations/1638557053010-CreateUsers";

import { AddUserIdToMovies1639118468967 } from "./migrations/1639118468967-AddUserIdToMovies";
import { CreateMoviesMigration1639065066131 } from "./migrations/1639065066131-CreateMoviesMigration";

export const dataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DATABASE}`,
    entities: [MoviesEntity, UserEntity],
    // extra: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false,
    //     },
    // },
    migrations: [
        CreateUsers1638557053010,
        CreateMoviesMigration1639065066131,
        AddUserIdToMovies1639118468967,
    ],
});

/*to run this database on heroku i had to put that EXTRA
 parameter on Datasource, but this extra doesn't work if
you try to run it on your own machine */
