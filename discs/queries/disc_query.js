'use strict';

module.exports = {
    INSERT: "INSERT INTO disc (name, artist, release_date, studio, genre, label, producer) " +
            "VALUES(?, ?, ?, ?, ?, ?, ?)",

    SELECT: "SELECT * FROM disc LIMIT ? OFFSET ?",

    SELECT_ONE_BY_ID: "SELECT * FROM disc WHERE id = ?",

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
