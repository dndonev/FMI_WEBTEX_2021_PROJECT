import { Schema, model } from 'mongoose';

const fileSchema = new Schema({
    id: Schema.Types.ObjectId,
    fileName: {
        type: Schema.Types.String,
        required: true
    },
    directory: { 
        type: Schema.Types.ObjectId, 
        ref: 'DirectoryModel'
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
    }
});

export const FileModel = model('File', fileSchema);