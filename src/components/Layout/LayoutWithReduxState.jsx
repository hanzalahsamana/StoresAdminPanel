// "use client";

// import React, { useEffect } from 'react'
// import { Assistant } from "next/font/google";

// import Loader from '@/components/Loader/loader';
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchPagesData } from '@/APIs/PagesData/getContents';
// import { fetchProducts } from '@/APIs/Product/getProducts';
// import { fetchCategory } from '@/APIs/Category/getCollections';
// import { setCartData } from '@/Redux/CartData/cartDataSlice';
// import { fetchOrderData } from '@/APIs/Order/getOrderData';
// import TemplateHeader from './TemplateHeader';
// import TemplateFooter from './TemplateFooter';
// import { fetchSectionsData } from '@/APIs/SectionsData/getSections';
// import BASE_URL from '../../../config';
// import { useRouter } from 'next/navigation';
// import { applyTheme } from '@/Utils/ApplyTheme';
// import { fetchStoreDetails } from '@/APIs/StoreDetails/getAllStores';
// import DiscountCountdownBar from '../UI/DiscountCountdownBar';
// const assistant = Assistant({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"], // Add the font weights you need
// });
// const LayoutWithReduxState = ({ children }) => {

//   const dispatch = useDispatch();

//   const { siteName } = useSelector((state) => state.siteName);
//   const { productLoading } = useSelector((state) => state.productData);
//   const { pagesDataLoading } = useSelector((state) => state.pagesData);
//   const { sectionsDataLoading } = useSelector((state) => state.sectionsData);
//   const { categoryLoading } = useSelector((state) => state.categories);
//   // const { loading } = useSelector((state) => state.orderData);
//   // const { storeDetail, storeDetailLoading } = useSelector((state) => state?.storeDetail);
//   // const { theme } = storeDetail;

//   const router = useRouter()


//   // useEffect(() => {
//   //   if (!theme) return;
//   //   applyTheme(theme);
//   // }, [dispatch, theme]);
//   useEffect(() => {
//     const fetchData = async (siteName) => {
//       const response = await fetch(
//         `${BASE_URL}/fetchSiteByDomain?subDomain=${siteName}`
//       );
//       const data = await response.json();

//       if (data?.siteName) {

//         await Promise.all([
//           // fetchProducts(dispatch, siteName),
//           // fetchPagesData(dispatch, siteName),
//           // fetchCategory(dispatch, siteName),
//           // fetchOrderData(dispatch, siteName),
//           // fetchSectionsData(dispatch, siteName),
//           // fetchStoreDetails(dispatch, siteName),
//         ]);

//         // if (typeof window !== "undefined" && siteName) {
//         //   const cartId = localStorage.getItem(`${siteName}_cartId`);
//         //   dispatch(setCartData({ cartId, siteName }));
//         // }
//       }
//       else {
//         router.push('/error/site-not-found')
//       }
//     };



//     if (siteName) {
//       fetchData(siteName);
//     }

//   }, [dispatch, siteName]);

//   console.log(sectionsDataLoading, "sectionDataLoading");


//   if (productLoading || pagesDataLoading || categoryLoading || sectionsDataLoading ) {
//     return <Loader />
//   }

//   return (
//     <div className={`flex flex-col items-center ${assistant.className} antialiased`}>
//       <DiscountCountdownBar discount={{
//         name: "NEWYEAR2025",
//         discountType: "global",
//         access: "all",
//         amountType: "percent",
//         amount: 25,
//         isActive: true,
//         expiryDate: '2027-10-09T09:49:00.000+00:00', // 3 hours from now
//       }} />
//       <TemplateHeader />

//       {/* 
//       <DiscountPopup
//       isOpen={true}
//       discount={{
//         name: "NEWYEAR2025",
//         discountType: "global",
//         access: "all",
//         amountType: "percent",
//         amount: 25,
//         isActive: true,
//         expiryDate: '2027-10-09T09:49:00.000+00:00', // 3 hours from now
//       }} />

//       <SubscribeForm /> */}
//       {children}
//       <TemplateFooter />
//     </div>
//   );
// }

// export default LayoutWithReduxState


