import { Schema, model } from 'mongoose';

const fileSchema = new Schema({
    fileName: {
        type: Schema.Types.String,
        required: true
    },
    location: {
        type: Schema.Types.String,
        required: true
    },
    created: {
        type: Schema.Types.Date,
        default: Date.now
    },
    ownerId: {
        type: Schema.Types.String,
        required: true
    }
});

export const FileModel = model('FileModel', fileSchema);