export interface CreateTopicDto {
    name: String,
    user: String,
    theme: String,
    description: String,
    contact: String,
    institute?: String,
    company?: String,
    self_description: String
}