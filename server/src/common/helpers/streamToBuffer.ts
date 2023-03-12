import { ReadStream } from "fs";

export const streamToBuffer = (stream: ReadStream) => {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: any= []
        stream
          .on('data', chunk => chunks.push(chunk))
          .once('end', () => {
            resolve(Buffer.concat(chunks))
          })
          .once('error', reject)
      })
} 