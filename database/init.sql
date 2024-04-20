CREATE TABLE album (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE artist (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
);

CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE track (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    artist_id INTEGER REFERENCES artist(id),
    genre_id INTEGER REFERENCES genre(id)
);

CREATE TABLE album_track (
    album_id INTEGER REFERENCES album(id),
    track_id INTEGER REFERENCES track(id),
    PRIMARY KEY (album_id, track_id)
);
