import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from "typeorm";
import { Album } from "./album";
import { Artist } from "./artist";
import { Genre } from "./genre";

@Entity('track')
export class Track extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Artist, artist => artist.tracks)
    artist: Artist;

    @ManyToOne(type => Genre, genre => genre.tracks)
    genre: Genre;

    @ManyToMany(type => Album, album => album.tracks)
    album: Album;
}