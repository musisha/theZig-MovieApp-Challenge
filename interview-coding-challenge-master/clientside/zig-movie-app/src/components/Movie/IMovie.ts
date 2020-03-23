export type Props = {
    match: any,
    [u: string]: any
}

export interface IState {
    movie: any,
    actors: any,
    directors: string[],
    loading: boolean
}