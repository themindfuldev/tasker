# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table card (
  id                        bigint not null,
  type                      integer not null,
  status                    integer not null,
  title                     varchar(255) not null,
  description               varchar(255) not null,
  assignee                  varchar(255) not null,
  created_date              timestamp not null,
  modified_date             timestamp not null,
  parent_id                 bigint,
  constraint ck_card_type check (type in (0,1,2,3,4)),
  constraint ck_card_status check (status in (0,1,2,3)),
  constraint pk_card primary key (id))
;

create sequence card_seq;

alter table card add constraint fk_card_parent_1 foreign key (parent_id) references card (id) on delete restrict on update restrict;
create index ix_card_parent_1 on card (parent_id);



# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists card;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists card_seq;

