// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import { PRODUCTDETAIL_INFO, PRODUCTDETAIL_BOOKMARK } from '../actions/types';

// const history = useHistory();

// const productInformation = {
//   id: 1,
//   name: '정관장',
//   company: '고려인삼공사',
//   image: 'https://cdn.gunsigi.com/images/1.jpg',
//   validNumber: '123123',
//   functional:
//     '가르시니아캄보지아 추출물 : 탄수화물이 지방으로 합성되는 것을 억제하여 체지방 감소에 도움을 줄 수 있음\n\n비타민C : ① 결합조직 형성과 기능유지에 필요 ② 철의 흡수에 필요 ③ 항산화 작용을 하여 유해산소로부터 세포를 보호하는데 필요',
//   expiration: '제조일로부터 24개월까지',
//   hotToEat: '1일 2회, 1회 1포를 물 250mL에 타서 잘 흔들어 섭취한다.',
//   shape: '분말',
//   standard:
//     '(1) 성상 : 이미, 이취가 없고 고유의 향미가 있는 노랑하양색의 분말 \n(2) 납 : 1.0 mg/kg\n(3) 카드뮴 : 0.5 mg/kg',
//   warning:
//     '(1) 어린이, 임산부 및 수유부는 섭취를 피하시기 바랍니다.\n(2) 간∙신장∙심장질환, 알레르기 및 천식이 있거나 의약품 복용 시 전문가와 상담하십시오.',
//   bookmarksCount: 12,
//   reviewsCount: 10,
//   score: 4, // 반올림해서 소수점 x
//   isBookmarked: true, // 유저가 북마크 했는지 여부
//   chemistry: {
//     good: ['비타민', '비타민C', '아미노산'],
//     bad: ['칼슘', '항생제', '혈액응고억제제'],
//   },
// };

// const productDetailReducer = async (state = productInformation, action) => {
//   switch (action.type) {
//     case PRODUCTDETAIL_INFO:
//       axios({
//         url: `${process.env.REACT_APP_API_URL}/products/${action.payload.id}`,
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       })
//         .then((res) => {
//           const info = res.data.itemInfo;
//           Object.assign(state, info);
//           console.log('state', state);
//           history.push('/product-detal');
//         })
//         .catch((err) => console.log(err));

// case PRODUCTDETAIL_BOOKMARK:
//   if (action.likeOrUnlike) {
//     axios({
//       method: 'POST',
//       url: `${process.env.REACT_APP_API_URL}/products`,
//       withCredentials: true,
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then(() => Object.assign(state, { isBookmarked: false }))
//       .catch((err) => console.log(err));
//   } else {
//     axios({
//       method: 'POST',
//       url: `${process.env.REACT_APP_API_URL}/products`,
//       withCredentials: true,
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then(() => Object.assign(state, { isBookmarked: true }))
//       .catch((err) => console.log(err));
//   }

//     default:
//       return state;
//   }
// };

// export default productDetailReducer;
