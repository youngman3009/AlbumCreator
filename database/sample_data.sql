-- Insert sample data for testing the application

INSERT INTO artist (first_name, last_name) VALUES
('John', 'Lennon'),
('Paul', 'McCartney'),
('George', 'Harrison'),
('Ringo', 'Starr');

INSERT INTO genre (name) VALUES
('Rock'),
('Pop'),
('Blues'),
('Jazz'),
('Hip Hop'),
('Electronic'),
('Country'),
('Folk');

INSERT INTO album (name) VALUES
('Abbey Road'),
('Revolver'),
('The White Album');

INSERT INTO track (name, artist_id, genre_id) VALUES
('Come Together', 1, 1),
('Yesterday', 2, 2),
('While My Guitar Gently Weeps', 3, 3),
('Eleanor Rigby', 2, 2),
('Blackbird', 1, 1),
('Hey Jude', 1, 2);

INSERT INTO album_track (album_id, track_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(2, 4),
(2, 5),
(3, 6);
