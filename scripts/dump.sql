use mediacollection;

CREATE TABLE disc (
     id INTEGER NOT NULL AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     artist VARCHAR(255) NOT NULL,
     release_date VARCHAR(255),
     studio VARCHAR(255),
     genre VARCHAR(255),
     label VARCHAR(255),
     producer VARCHAR(255),
     PRIMARY KEY (id)
);