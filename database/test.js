
a={ _id: '5e471e817a27db0f94d609b7',
  word: 'australia',
  articleId:
   { _id: '5e471e817a27db0f94d609b4',
     url: 'www.npr.com',
     name: 'You\'re only saying that because no one ever has',
     sourceId: '5e471e817a27db0f94d609b2',
     __v: 0 },
  sourceId: '5e471e817a27db0f94d609b2',
  num: 5,
  __v: 0 }

  console.log(`a=${a.articleId.url}`);

  let australia = {
    '5e471e817a27db0f94d609b4': {
      url: 'www.npr.com',
      name: 'Why do you cry?'
    }
  }