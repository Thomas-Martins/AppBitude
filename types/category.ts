import Tag from '#models/tag'

export interface Category {
  id: string
  name: string
  color: string
  icon: string
  tag: Tag
}
