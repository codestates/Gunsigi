/* eslint-disable */
const { Kakao } = window;

export const kakaoLinkDelivery = (name, id, image) => {
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: `${name}`,
      description: '나에게 맞는 건강기능식품',
      imageUrl: `${image}`,
      link: {
        webUrl: `${window.location.origin}/product-detail/${id}`,
        mobileWebUrl: `${window.location.origin}/product-detail/${id}`,
      },
    },
    buttons: [
      {
        title: '건강기능식품 보기',
        link: {
          webUrl: `${window.location.origin}/product-detail/${id}`,
          mobileWebUrl: `${window.location.origin}/product-detail/${id}`,
        },
      },
    ],
  });
};
