CREATE DATABASE prod;

\c prod;

CREATE TABLE register (
    guild_id VARCHAR(32) NOT NULL,
    channel_id VARCHAR(32) NOT NULL,
    message_id VARCHAR(32) NOT NULL,
    registry_name TEXT NOT NULL,
    embed_data TEXT,
    PRIMARY KEY(guild_id, registry_name)
);

COMMENT ON COLUMN register.guild_id IS 'The id of the guild';
COMMENT ON COLUMN register.message_id IS 'The id of the message that the register is stored in';
COMMENT ON COLUMN register.channel_id IS 'The id of the message that the channel is stored in';
COMMENT ON COLUMN register.registry_name IS 'The registry name';
COMMENT ON COLUMN register.embed_data IS 'Extra data that may be needed to be displayed';

CREATE TABLE sign_ups (
    guild_id VARCHAR(32) NOT NULL,
    registry_name VARCHAR(32) NOT NULL,
    uuid VARCHAR(32) NOT NULL,
    role_text TEXT NOT NULL,
    PRIMARY KEY(guild_id, registry_name, uuid)
);

COMMENT ON COLUMN sign_ups.guild_id IS 'The id of the guild';
COMMENT ON COLUMN sign_ups.registry_name IS 'The name of the registry the sign up is stored under';
COMMENT ON COLUMN sign_ups.uuid IS 'The uuid of the user';
COMMENT ON COLUMN sign_ups.role_text IS 'The role they registered for';

CREATE TABLE schedule (
    guild_id VARCHAR(32) NOT NULL,
    channel_id VARCHAR(32) NOT NULL,
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    role_id VARCHAR(32) NOT NULL
);

COMMENT ON COLUMN schedule.guild_id IS 'The id of the guild';
COMMENT ON COLUMN schedule.channel_id IS 'The id of the channel that the announcement is meant to be post in';
COMMENT ON COLUMN schedule.scheduled_time IS 'Timestamp of date and time of the due date to post the announcement';
COMMENT ON COLUMN schedule.role_id IS 'The id of the role that is used for announcements';

CREATE TABLE commands (
    guild_id VARCHAR(32) NOT NULL,
    command_name VARCHAR(32) NOT NULL,
    role_ids TEXT NOT NULL, /* This is JSON stored a text cause I CBA, also works nicer with redis*/
    PRIMARY KEY (guild_id, command_name)
);

COMMENT ON COLUMN commands.guild_id IS 'The id of the guild';
COMMENT ON COLUMN commands.command_name IS 'The name of the command';
COMMENT ON COLUMN commands.role_ids IS 'The id of the role that is allowed to use the command';