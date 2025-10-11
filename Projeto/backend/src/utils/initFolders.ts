import fs from "fs"
import path from "path"

export function initFolders() {
    const basePath = path.resolve(__dirname,"../..")
    const folders = ["uploads", "data"]
    folders.forEach(folder =>{
        const folderPath = path.join(basePath, folder)
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath, {recursive: true})
        }
    })
}

