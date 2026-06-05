-- 유저
create table users (
    id varchar(30) not null primary key,
    name       varchar(20) not null,
    password   varchar(255) not null,
    create_at  timestamp default current_timestamp not null
);

-- 질문방
create table chatroom (
    id              int         auto_increment primary key not null,
    user_id varchar(30) not null,
    create_at       timestamp   default current_timestamp not null,

    foreign key (user_id) references users(id) on delete cascade
);

-- 질문목록
create table question (
    chatroom_id     int         not null,
    user_id varchar(30) not null,
    question        text        not null,
    answer          text        not null,
    create_at       timestamp   default current_timestamp not null,

    foreign key (user_id) references users(id) on delete cascade,
    foreign key (chatroom_id)     references chatroom(id)      on delete cascade
);