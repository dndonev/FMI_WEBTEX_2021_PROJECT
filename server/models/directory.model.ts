import { Schema, model } from 'mongoose';
import { CloudObjectType } from '../enums/cloud-object-type';

const directorySchema = new Schema({
    id: Schema.Types.ObjectId,
    directoryName: {
        type: Schema.Types.String,
        minLength: 3,
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Directory'
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Directory'
    }],
    files: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
    isRoot: {
        type: Schema.Types.Boolean,
        required: true,
        default: true
    },
    type: {
        type: Schema.Types.String,
        required: true,
        default: CloudObjectType.Folder
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
    },
    filesCount: {
        type: Schema.Types.Number
    }
});

export const DirectoryModel = model('Directory', directorySchema);