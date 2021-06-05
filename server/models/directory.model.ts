import { Schema, model } from 'mongoose';

const directorySchema = new Schema({
    directoryName: {
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
    },
    description: {
        type: Schema.Types.String,
        required: false
    }
});

export const directoryModel = model('directoryModel', directorySchema);