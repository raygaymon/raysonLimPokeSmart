export interface Pokemon {
    name: string,
    id: number,
    moves: Moves[],
    type: Type[],
    stats: Stats,
    sprites: Sprites,
}

export interface Abilities {
    name: string,
    url: string,
    isHidden: boolean,
    id: number,
    pokemonWithAbility: string[],
    desc: string,
    detailedDesc: string,

}

export interface damageRelations {
    double_damage_from: string[],
    double_damage_to: string[],
    half_damage_from: string[],
    half_damage_to: string[],
    no_damage_from: string[],
    no_damage_to: string[],
}

export interface Type {
    name: string,
    url: string,
    damage_relations: damageRelations
}

export interface Stats {
    hp: string
    attack : string,
    defense: string,
    specialAttack : string,
    specialDefense: string,
    speed: string
}

export interface Sprites {
    backDefault: string,
    backFemale?: string,
    backShiny: string,
    backShinyFemale?: string,
    frontDefault: string,
    frontFemale?: string,
    frontShiny: string,
    frontShinyFemale?: string,
    officialFront: string,
    officialShiny: string
}

export interface Moves {
    name: string,
    url: string,
    damageType: string,
    moveLearnMethod: string,
    levelLearnedAt: number,
    latestAvailVersion: string
    accuracy: number,
    effectChance: string,
    desc: string,
    power: number,
    pp: number,
    learnedPokemonList: string[],
    id: number,
    type: string,
    priority: number
}

export interface Pokemon {
    id: number,
    name: string,
    abilities: Abilities[],
    moves: Moves[],
    types: Type[],
    stats: Stats,
    sprites: Sprites,
    locationAreaEncounters: string,
}

export interface Item {
    id: number,
    name: string,
    cost: number,
    fling: Fling,
    effect: string,
    flavorText: string,
    sprite: string
}

export interface Fling {
    effect: string,
    power: number
}

export interface EncounteredPokemon {
    name: string,
    minLevel: number,
    maxLevel: number,
    maxChance: number,
    versions: string[],
    encounterMethods: string[],
    conditions?: string[]
}

export interface LocationArea {
    name: string,
    id: number,
    pokemonEncounters: EncounteredPokemon[]
}

export interface Post {
    id: string,
    username: string,
    topic: string,
    post: string,
    imageUrl?: string
    pokeBuild?: PokemonBuild
}

export interface Reply {
    postId: number,
    username: string,
    post: string
}

export interface SignUpRecord {
    username: string,
    email: string,
    id: string,
    password: string
}

export interface LoginRecord {
    username: string,
    password: string
}

export interface PokemonBuild {
    name: string,
    move1: string,
    move2: string,
    move3: string,
    move4: string,
    imageurl: string
}
