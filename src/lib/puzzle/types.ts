export const Colors = {
    Black: "#1E252E",
    Blue: "#1C71C2",
    Gray: "#687278",
    Green: "#1A9729",
    Orange: "#C47D2F",
    Pink: "#D486D8",
    Red: "#9B252D",
    Violet: "#892597",
    White: "#FFFFFF",
    Yellow: "#B3B02F",
} as const

export type Color = typeof Colors[keyof typeof Colors]

export type Corner = {
    color: Color,
    matched?: boolean,
}

export const CornerPositions = {
    TL: "tl",
    TR: "tr",
    BL: "bl",
    BR: "br",
} as const

export type CornerPosition = typeof CornerPositions[keyof typeof CornerPositions]

export type Corners = {
    [key in CornerPosition]: Corner
}

export type Tile = {
    color: Color,
}

export type Puzzle = {
    corners: Corners
    tiles: Tile[][]
    solved?: boolean
}