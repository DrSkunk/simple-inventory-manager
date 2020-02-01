export const type = {
  generic: 'generic',
  ikea: 'ikea',
  book: 'book',
  group: 'group'
};

export const templates = {
  [type.generic]: {
    type: type.generic,
    title: null,
    description: null,
    price: null,
    picture: null,
    url: null
  },
  [type.ikea]: {
    type: type.ikea,
    title: null,
    description: null,
    price: null,
    picture: null,
    url: null,
    articleNumber: null,
    files: []
  },
  [type.book]: {
    type: type.book,
    title: null,
    description: null,
    price: null,
    picture: null,
    isbn: null
  },
  [type.group]: {
    type: type.group,
    title: null,
    description: null,
    items: []
  }
};
