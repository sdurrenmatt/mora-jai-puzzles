export const Colors = {
  Orange: "#C47D2F",
} as const

export type Color = typeof Colors[keyof typeof Colors]