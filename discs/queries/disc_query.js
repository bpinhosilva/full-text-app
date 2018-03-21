'use strict';

module.exports = {
    INSERT: "INSERT INTO disc (name, artist, release_date, studio, genre, label, producer) " +
            "VALUES(?, ?, ?, ?, ?, ?, ?)",

    SELECT: "SELECT * FROM disc LIMIT ? OFFSET ?",

    UPDATE: "UPDATE disc SET name = ?, " +
            "artist = ?, " +
            "release_date = ?, " +
            "studio = ?, " +
            "genre = ?, " +
            "label = ?, " +
            "producer = ? " +
            "WHERE id = ?",

    DELETE: "DELETE FROM disc WHERE id = ?"
};
