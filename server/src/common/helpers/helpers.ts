import { randomUUID } from "crypto";
import { FileUpload } from "graphql-upload";
import { FieldError } from "src/resolvers/auth/DTO/responseDto";
import { streamToBuffer } from "./streamToBuffer";
import * as fs from 'fs';

export function mapFieldErrors(e: any) {
    let errors: FieldError[] = [];
    e.meta.target.forEach((element: any) => {
        errors.push({
            field: element,
            message: element + " is already taken.",
        });
    });
    return errors;
}

export async function saveToLocal(files: FileUpload) {
    const uuid = randomUUID();
    const ext = files.filename.split('.').pop();
    const stream = files.createReadStream();
    const fileName = uuid + '.' + ext;
    const buffer = await streamToBuffer(stream);
    await fs.writeFile(`public/images/${fileName}`, buffer, (err: any) => {
        if (err) {
            console.log(err);
        }
    });
    return fileName;
}