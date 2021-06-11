import { Schema, model } from 'mongoose';
import { CloudObjectType } from '../enums/cloud-object-type';
import { userSchema } from './user.model';

const fileSchema = new Schema({
    id: Schema.Types.ObjectId,
    fileName: {
        type: Schema.Types.String,
        required: true
    },
    directory: { 
        type: Schema.Types.ObjectId, 
        ref: 'Directory'
    },
    type: {
        type: Schema.Types.String,
        required: true,
        default: CloudObjectType.File
    },
    created: {
        type: Schema.Types.Date,
        default: Date.now
    },
    ownerId: {
        type: Schema.Types.String,
        required: true
    },
    sharedToIds: [userSchema]
});

export const FileModel = model('File', fileSchema);