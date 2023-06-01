export const randomInt = () => Math.floor(Math.random() * 400)

export const navLink = [
  {
    icon: 'fa-solid fa-house-chimney-window',
    text: 'home'
  },
  {
    icon: 'fa-solid fa-hashtag',
    text: 'explore'
  },
  {
    icon: 'fa-solid fa-bell',
    text: 'notifications'
  },
  {
    icon: 'fa-solid fa-envelope',
    text: 'messages'
  },
  {
    icon: 'fa-solid fa-clipboard-list',
    text: 'list'
  },
  {
    icon: 'fa-solid fa-bookmark',
    text: 'bookmarks'
  },
  {
    icon: 'fa-brands fa-square-twitter',
    text: 'twitter blue'
  },
  {
    icon: 'fa-solid fa-user',
    text: 'profile'
  },
  {
    icon: 'fa-solid fa-braille',
    text: 'more'
  },
]

export const socialList = [
  {
    icon: 'fa-regular fa-comments',
    numb: randomInt()
  },
  {
    icon: 'fa-solid fa-repeat',
    numb: randomInt()
  },
  {
    icon: 'fa-regular fa-heart',
    numb: `${randomInt()}K`
  },
  {
    icon: 'fa-solid fa-chart-simple',
    numb: `${randomInt()}K`
  },
]