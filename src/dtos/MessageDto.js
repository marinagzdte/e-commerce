export class MessageDto {
    constructor({ to, from, type, timestamp, text }) {
        this.to = to;
        this.from = from,
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