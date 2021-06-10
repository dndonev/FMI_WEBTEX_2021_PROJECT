import { Schema, model } from 'mongoose';

const directorySchema = new Schema({
    id: Schema.Types.ObjectId,
    directoryName: {
        type: Schema.Types.String,
        minLength: 3,
        required: true
    },
    path: {
        type: Schema.Types.String,
        required: true
    },
    isRoot: {
        type: Schema.Types.Boolean,
        required: true
    },
    type: {
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
        type: Schema.Types.String
    }
});

export const DirectoryModel = model('Directory', directorySchema);