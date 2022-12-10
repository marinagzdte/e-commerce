export class MessageDto {
    constructor({ email, type, timestamp, text }) {
        this.email = email;
        this.type = type;
        this.timestamp = timestamp;
        this.text = text;
    }
}

export const asDto = (msg) => {
    if (!msg) return
    if (Array.isArray(msg))
        return msg.map(m => new MessageDto(m))
    else
        return new MessageDto(msg)
}