export interface ImageLocationPath {
    path: string
}

export interface ImageLocationURL {
    url: string
}

interface ImageLocationData {
    data: string
}

export type ImageLocation =
    | ImageLocationPath
    | ImageLocationURL
    | ImageLocationPath & ImageLocationURL
    | ImageLocationData

export interface ImageData {
    location: ImageLocation
    width: number
    height: number
}

