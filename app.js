import { navLink, socialList, randomInt } from './mok.js'

const qS = el => document.querySelector(el);
const cE = el => document.createElement(el);

const createEl = (type, cls = null, textContent = null, parent = null, ...attrs) => {
  const element = cE(type);
  element.className = cls
  element.textContent = textContent;
  attrs.length > 0 ? attrs.forEach(attr => element.setAttribute(attr?.name, attr?.value)) : '';
  element
  parent?.appendChild(element);
  return element;
};

const GET = async (endpoint) => {
  const res = await fetch(`https://dummyjson.com${endpoint}`);
  const data = await res.json();

  return data;
}

const POST = async (endpoint, body) => {
  const res = await fetch(`https://dummyjson.com${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 28,
      userName: 'User',
      nickName: '@User',
      userImg: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png',
      title: body,
      body: body,
      thumbnail: `https://picsum.photos/id/${randomInt()}/400/400`,
    })
  });
  const data = await res.json();
  const wrapperCardEl = qS('.wrapper_card');
  wrapperCardEl.textContent = '';
  tweetList.unshift(data);
  renderingTweets();
  return data;
}

const createTwitterPage = () => {
  const wrapperEl = createEl('div', 'wrapperPage', null, mainEl);
  // navbar
  const navEl = createEl('div', 'nav_asaide', null, wrapperEl);
  const wrapLinkNav = createEl('div', 'wrap_link_nav', null, navEl);
  const icon = createEl('i', 'fa-brands fa-twitter nav_icon', null, wrapLinkNav);
  const ulLinkEl = createEl('ul', 'ul_link', null, wrapLinkNav);
  const tweetButtonEl = createEl('button', 'tweet_button', 'tweet', wrapLinkNav);
  const tweetButtonMobile = createEl('button', 'fa-solid fa-feather tweet_mobile', null, wrapLinkNav);
  const userInfoEl = createEl('div', 'user_info', null, navEl);
  const user_avatarEl = createEl('img', 'user_avatar', null, userInfoEl, { name: 'src', value: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png' })
  const wrapNameUser = createEl('div', 'wrap_name_user', '@User', userInfoEl);
  const optUserInfoEl = createEl('i', 'fa-solid fa-ellipsis', null, userInfoEl);
  //central content
  const contentWrappEl = createEl('div', 'contentTwitter', null, wrapperEl);
  const homeWrapperEl = createEl('div', 'home_wrapper', null, contentWrappEl);
  const homeH2 = createEl('h2', null, 'home', homeWrapperEl);
  const PerTeWrappEl = createEl('div', 'wrapper_for_you', null, homeWrapperEl);
  const PerTeP = createEl('p', 'for_you', 'for you', PerTeWrappEl);
  const followinfP = createEl('p', 'follow', 'following', PerTeWrappEl);
  const tweetWrapperForm = createEl('div', 'tweet_wrapper_form', null, contentWrappEl)
  const userAvatarInput = createEl('img', 'user_avatar', null, tweetWrapperForm, { name: 'src', value: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png' })
  const tweetForm = createEl('form', 'form_wrapp', null, tweetWrapperForm);
  const tweetInputEl = createEl('textarea', 'tweet_input', null, tweetForm, { name: 'row', value: '3' }, { name: 'placeholder', value: 'what is happening?!' });
  const tweetSubmit = createEl('input', 'tweet_submit', 'tweet', tweetForm, { name: 'type', value: 'submit' });
  const wrapperCardEl = createEl('div', 'wrapper_card', null, contentWrappEl);
  // aside content
  const dxWrapperEl = createEl('div', 'dxWrapper', null, wrapperEl);
  // const searchBarEl = createEl('input', 'search_bar', null, dxWrapperEl, { name: 'type', value: 'search' }, { name: 'placeholder', value: 'search twitter' });
  const trendsEl = createEl('div', 'trends', null, dxWrapperEl);
  const whoToFollowEl = createEl('div', 'who_to_follow', null, dxWrapperEl);

  //forEach mok list for nav link elements
  navLink.forEach(el => {
    const liEl = createEl('li', 'li_item', null, ulLinkEl);
    const liIconEl = createEl('i', el.icon, null, liEl);
    const liTextEl = createEl('p', 'li_text', el.text, liEl);
  })

  tweetForm.addEventListener('submit', e => {
    e.preventDefault();
    POST('/posts/add', e.target[0].value)
      .then(data => createTweetEl(data))
    e.target[0].value = '';
  })
}

const renderingTweets = () => {
  tweetList.forEach(post => createTweetEl(post))
};

const remoteData = () => {
  const dataAll = Promise.all([GET('/posts'), GET('/users')]);
  dataAll.then((data) => {
    postList = data[0].posts;
    usersList = data[1].users;
  })
    .then(() =>
      postList.map(post => {
        const currentUser = usersList.find(user => user.id === post.userId);
        post.userName = currentUser?.firstName || 'Pungolo';
        post.nickName = currentUser?.username || 'Pungolo'
        post.userImg = currentUser?.image || `https://robohash.org/${post.userName}`
        post.thumbnail = `https://picsum.photos/id/${post.userId}/400/400`;
        tweetList.push(post);
        // console.log(tweetList, post)
      }),
    )
    .then(() => renderingTweets())
}

const createTweetEl = (obj) => {
  const wrapperCardEl = qS('.wrapper_card');

  const tweetWrapperEl = createEl('div', 'tweet_wrapper', null, wrapperCardEl);
  const userAvatar = createEl('img', 'tweet_avatar', null, tweetWrapperEl, { name: 'src', value: obj?.userImg || 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png' });
  const wrapTweetInfo = createEl('div', 'wrap_tweet_info', null, tweetWrapperEl);
  const userName = createEl('p', 'user_name', obj?.userName || 'User', wrapTweetInfo);
  const nickName = createEl('p', 'user_name', obj?.nickName || '@User', wrapTweetInfo);
  const wrapDescription = createEl('p', 'tweet_description', obj?.body, wrapTweetInfo);
  const thumbnail = createEl('img', 'tweet_thumbnail', null, wrapTweetInfo, { name: 'src', value: obj?.thumbnail || `https://picsum.photos/id/${randomInt()}/400/400` });
  const likeWrap = createEl('ul', 'like_wrap', null, wrapTweetInfo);

  socialList.map(obj => {
    const socialLiEl = createEl('li', 'social_li', null, likeWrap);
    const socialIcon = createEl('i', `${obj.icon} social_icon`, null, socialLiEl);
    const socialNumb = createEl('p', 'social_numb', obj.numb, socialLiEl);

    socialLiEl.addEventListener('click', (e) => {
      if (e.target.attributes.class.value === 'fa-regular fa-heart social_icon'
        || e.target.attributes.class.value === 'fa-regular fa-heart social_icon like') {
        e.target.classList.toggle('like');
      }
    })
  })


}

const mainEl = qS('body');
let postList = [];
let usersList = [];
let tweetList = [];

createTwitterPage();
remoteData();