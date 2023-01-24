create table users (
    user_id uuid primary key,
    email text not null,
    password text not null
);

create table files (
    file_id uuid primary key,
    user_id uuid not null ,
    filename text not null,
    dat_i timestamptz not null,
    data bytea not null,
    size numeric (10,0) not null,
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
);