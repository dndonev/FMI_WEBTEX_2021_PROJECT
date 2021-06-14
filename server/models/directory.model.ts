import { Schema, model } from 'mongoose';
import { CloudObjectType } from '../enums/cloud-object-type';
import { fileSchema } from './file.model';

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
    files: [{
        type: fileSchema,
        ref: 'File'
    }],
    isRoot: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    },
    isShared: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
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
    }
});

directorySchema.add({
    children: [{
        type: directorySchema,
        ref: 'Directory'
    }]
});

export const DirectoryModel = model('Directory', directorySchema);