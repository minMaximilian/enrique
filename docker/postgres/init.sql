CREATE TABLE IF NOT EXISTS register (
    guild_id INT NOT NULL,
    message_id INT NOT NULL,
    registry_name VARCHAR(64) NOT NULL,
    embed_data JSONB,
);

COMMENT ON COLUMN register.guild_id IS 'The id of the guild';
COMMENT ON COLUMN register.message_id IS 'The id of the message that the register is stored in';
COMMENT ON COLUMN register.registry_name IS 'The registry name';
COMMENT ON COLUMN register.embed_data IS 'Embed of all the registered users';

CREATE TABLE IF NOT EXISTS schedule (
    guild_id INT NOT NULL,
    channel_id INT NOT NULL,
    registry_name VARCHAR(64) NOT NULL,
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    role_id INT NOT NULL
);

COMMENT ON COLUMN schedule.guild_id IS 'The id of the guild';
COMMENT ON COLUMN schedule.channel_id IS 'The id of the channel that the announcement is meant to be post in';
COMMENT ON COLUMN schedule.registry_name IS 'The registry name';
COMMENT ON COLUMN schedule.scheduled_time IS 'Timestamp of date and time of the due date to post the announcement';
COMMENT ON COLUMN schedule.role_id IS 'The id of the role that is used for announcements';
