# File Tree: StoresAdminPanel

Generated on: 10/8/2025, 11:28:05 PM
Root path: `d:\Hanzalah\StoresAdminPanel`

```
├── 📁 .git/ 🚫 (auto-hidden)
├── 📁 .next/ 🚫 (auto-hidden)
├── 📁 .vscode/ 🚫 (auto-hidden)
├── 📁 node_modules/ 🚫 (auto-hidden)
├── 📁 public/
│   ├── 🖼️ 404.png
│   ├── 🖼️ favicon.ico
│   ├── 📄 robots.txt
│   └── 📄 sitemap.xml
├── 📁 src/
│   ├── 📁 APIs/
│   │   ├── 📁 Analytics/
│   │   │   └── 📄 FetchAnalytics.js
│   │   ├── 📁 Auth/
│   │   │   ├── 📄 authWithGoogle.js
│   │   │   ├── 📄 getUserFromToken.jsx
│   │   │   ├── 📄 loginUser.jsx
│   │   │   ├── 📄 registerUser.jsx
│   │   │   ├── 📄 sendOTP.js
│   │   │   ├── 📄 validateEmailAndPassword.js
│   │   │   └── 📄 verifyOTP.jsx
│   │   ├── 📁 Cart/
│   │   │   └── 📄 CartRefrenceApis.js
│   │   ├── 📁 Checkout/
│   │   │   └── 📄 Checkout.js
│   │   ├── 📁 Collection/
│   │   │   ├── 📄 addCollection.js
│   │   │   ├── 📄 deleteCollection.js
│   │   │   ├── 📄 editCollection.js
│   │   │   ├── 📄 getCollections.js
│   │   │   └── 📄 getSingleCollection.js
│   │   ├── 📁 Contact/
│   │   │   └── 📄 postContact.js
│   │   ├── 📁 Content/
│   │   │   ├── 📄 editContentData.js
│   │   │   └── 📄 getContents.js
│   │   ├── 📁 CustomDomain/
│   │   │   ├── 📄 addCustomDomain.js
│   │   │   ├── 📄 deleteCustomDomain.js
│   │   │   └── 📄 verifyDomain.js
│   │   ├── 📁 Customer/
│   │   │   ├── 📄 Review.js
│   │   │   └── 📄 Subscriber.js
│   │   ├── 📁 Domain/
│   │   │   ├── 📄 deleteDomain.js
│   │   │   ├── 📄 domainVerify.jsx
│   │   │   ├── 📄 fetchSiteByDomain.js
│   │   │   └── 📄 readSiteById.js
│   │   ├── 📁 Gallery/
│   │   │   └── 📄 gallery.js
│   │   ├── 📁 Invoices/
│   │   │   └── 📄 getInvoices.js
│   │   ├── 📁 Migration/
│   │   │   ├── 📄 ExportSite.js
│   │   │   └── 📄 ImportSite.js
│   │   ├── 📁 Order/
│   │   │   ├── 📄 PlaceOrder.js
│   │   │   ├── 📄 editOrderStatus.jsx
│   │   │   └── 📄 getOrderData.js
│   │   ├── 📁 Pages/
│   │   │   └── 📄 Page.js
│   │   ├── 📁 Product/
│   │   │   ├── 📄 addProduct.js
│   │   │   ├── 📄 deleteProduct.js
│   │   │   ├── 📄 editProduct.js
│   │   │   ├── 📄 getProducts.js
│   │   │   └── 📄 getSingleProduct.js
│   │   ├── 📁 ReferralModal/
│   │   │   └── 📄 updateReferralModalShown.js
│   │   ├── 📁 SearchSuggestions/
│   │   │   └── 📄 menuLinks.js
│   │   ├── 📁 SectionsData/
│   │   │   ├── 📄 addSection.js
│   │   │   ├── 📄 changeSectionOrder.js
│   │   │   ├── 📄 deleteSection.js
│   │   │   ├── 📄 editSection.js
│   │   │   └── 📄 getSections.js
│   │   ├── 📁 StoreConfigurations/
│   │   │   ├── 📄 configuration.js
│   │   │   └── 📄 paymentMethodApi.js
│   │   ├── 📁 StoreDetails/
│   │   │   ├── 📄 announcement.js
│   │   │   ├── 📄 deleteStore.js
│   │   │   ├── 📄 discount.js
│   │   │   ├── 📄 editStoreAppearance.js
│   │   │   ├── 📄 generateStore.js
│   │   │   ├── 📄 getAllStores.js
│   │   │   ├── 📄 getStore.js
│   │   │   ├── 📄 theme.js
│   │   │   └── 📄 variation.js
│   │   ├── 📁 Subscription/
│   │   │   └── 📄 updateSubscription.js
│   │   ├── 📄 fetchFlags.js
│   │   └── 📄 uploadImageS3.js
│   ├── 📁 Assets/
│   │   ├── 📁 Images/
│   │   │   ├── 🖼️ 404.png
│   │   │   ├── 🖼️ desktopFrameLive.png
│   │   │   ├── 🖼️ desktopFrameLive2.png
│   │   │   ├── 🖼️ distinguish-selected-items.jpg
│   │   │   ├── 🖼️ laptopFrame.png
│   │   │   ├── 🖼️ laptopFrame1.png
│   │   │   ├── 🖼️ laptopFrameLive.png
│   │   │   ├── 🖼️ logo.png
│   │   │   ├── 🖼️ mobileFrame1.png
│   │   │   ├── 🖼️ mobileFrameLive.png
│   │   │   ├── 🖼️ mobileFrameLive2.png
│   │   │   ├── 🖼️ no-internet.png
│   │   │   ├── 🖼️ placeholder-image.webp
│   │   │   ├── 🖼️ productDummy.jpg
│   │   │   ├── 🖼️ productDummy.png
│   │   │   ├── 🖼️ server-crash.png
│   │   │   ├── 🖼️ site-not-found.png
│   │   │   └── 🖼️ —Pngtree—apple laptop and computer frame_9006205.png
│   │   └── 📁 fonts/
│   │       ├── 📄 GeistMonoVF.woff
│   │       └── 📄 GeistVF.woff
│   ├── 📁 AuthenticRouting/
│   │   ├── 📄 ProtectedRoutes.jsx
│   │   └── 📄 UnProtectedRoutes.jsx
│   ├── 📁 Constants/
│   │   └── 📄 Constant.js
│   ├── 📁 Helpers/
│   │   ├── 📄 CheckoutHelpers.js
│   │   └── 📄 ImageUploadInQueue.js
│   ├── 📁 Hooks/
│   │   ├── 📄 useConfirm.js
│   │   ├── 📄 useDragAndDrop.js
│   │   ├── 📄 useInfiniteScroll.js
│   │   ├── 📄 useScrollShadow.js
│   │   └── 📄 useSwrFetch.js
│   ├── 📁 Redux/
│   │   ├── 📁 AllStores/
│   │   │   └── 📄 AllStoreSlice.js
│   │   ├── 📁 Analytics/
│   │   │   └── 📄 analytic.slice.js
│   │   ├── 📁 Authentication/
│   │   │   └── 📄 AuthSlice.js
│   │   ├── 📁 CartData/
│   │   │   └── 📄 cartDataSlice.js
│   │   ├── 📁 Collection/
│   │   │   └── 📄 CollectionSlice.js
│   │   ├── 📁 ContentData/
│   │   │   └── 📄 ContentDataSlice.js
│   │   ├── 📁 Gallery/
│   │   │   └── 📄 GallerySlice.js
│   │   ├── 📁 Invoices/
│   │   │   └── 📄 invoicesSlice.js
│   │   ├── 📁 LivePreview/
│   │   │   └── 📄 livePreviewSlice.js
│   │   ├── 📁 Network/
│   │   │   └── 📄 networkSlice.js
│   │   ├── 📁 Order/
│   │   │   └── 📄 OrderSlice.js
│   │   ├── 📁 Pages/
│   │   │   └── 📄 PagesSlice.js
│   │   ├── 📁 Product/
│   │   │   └── 📄 ProductSlice.js
│   │   ├── 📁 SectionsData/
│   │   │   └── 📄 SectionsDataSlice.js
│   │   ├── 📁 SiteName/
│   │   │   └── 📄 SiteNameSlice.js
│   │   ├── 📁 Store/
│   │   │   └── 📄 StoreDetail.slice.js
│   │   ├── 📁 StoreConfiguration/
│   │   │   └── 📄 StoreConfigurationSlice.js
│   │   ├── 📄 Reducers.js
│   │   └── 📄 Store.js
│   ├── 📁 Structure/
│   │   ├── 📄 AnnouncementsStructure.js
│   │   ├── 📄 DefaultStructures.js
│   │   ├── 📄 PaymentMethodStructure.js
│   │   └── 📄 SectionStructure.js
│   ├── 📁 Styles/
│   │   ├── 🎨 Font.css
│   │   └── 🎨 Globals.css
│   ├── 📁 Utils/
│   │   ├── 📁 BuilderUtils/ 🚫 (auto-hidden)
│   │   ├── 📁 PaymentMethodUtils/
│   │   │   ├── 📄 AlfalahPayment.js
│   │   │   └── 📄 JazzcashPayment.js
│   │   ├── 📄 ApplyTheme.js
│   │   ├── 📄 Calculators.js
│   │   ├── 📄 Formaters.js
│   │   ├── 📄 FormsValidator.js
│   │   ├── 📄 GenerateJSONFile.js
│   │   ├── 📄 GenerateSlug.js
│   │   ├── 📄 GetBasePath.js
│   │   ├── 📄 MiniUtils.js
│   │   ├── 📄 RenderBuilderInputs.js
│   │   ├── 📄 TemplateHeadUpdate.js
│   │   ├── 📄 getValidVariant.js
│   │   └── 📄 payment.js
│   ├── 📁 app/
│   │   ├── 📁 admin/
│   │   │   ├── 📁 [store_id]/
│   │   │   │   ├── 📁 Dashboard/
│   │   │   │   │   └── 📄 Dashboard.jsx
│   │   │   │   ├── 📁 analytics/
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 branding/
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 collections/
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 configurations/
│   │   │   │   │   ├── 📁 invoices/
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   └── 📁 subscription/
│   │   │   │   │       └── 📄 page.jsx
│   │   │   │   ├── 📁 content/
│   │   │   │   │   ├── 📁 [contentid]/
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 design/
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 discounts/
│   │   │   │   │   ├── 📁 popups/
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 domain/
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 gallery/
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 live-previeww/
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 migration/
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 ordersDetails/
│   │   │   │   │   └── 📁 [id]/
│   │   │   │   │       └── 📄 page.jsx
│   │   │   │   ├── 📁 ordersList/
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 pages/
│   │   │   │   │   ├── 📁 customize/
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   ├── 📁 preview/
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 payment-methods/
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 products/
│   │   │   │   │   ├── 📁 add/
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   ├── 📁 edit/
│   │   │   │   │   │   └── 📁 [productid]/
│   │   │   │   │   │       └── 📄 page.jsx
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 profile/
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📄 layout.js
│   │   │   │   └── 📄 page.js
│   │   │   ├── 📁 account/
│   │   │   │   └── 📄 page.jsx
│   │   │   ├── 📁 stores/
│   │   │   │   └── 📄 page.jsx
│   │   │   └── 📄 layout.js
│   │   ├── 📁 authentication/
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.jsx
│   │   │   ├── 📁 register/
│   │   │   │   └── 📄 page.jsx
│   │   │   └── 📁 verifyotp/
│   │   │       └── 📄 page.jsx
│   │   ├── 📁 error/
│   │   │   ├── 📁 network-error/
│   │   │   │   └── 📄 page.jsx
│   │   │   ├── 📁 server-crash/
│   │   │   │   └── 📄 page.jsx
│   │   │   └── 📁 site-not-found/
│   │   │       └── 📄 page.jsx
│   │   ├── 📁 store/
│   │   │   └── 📁 [site_id]/
│   │   │       ├── 📁 cart/
│   │   │       │   └── 📄 page.jsx
│   │   │       ├── 📁 checkout/
│   │   │       │   └── 📄 page.jsx
│   │   │       ├── 📁 collection/
│   │   │       │   ├── 📁 [collection]/
│   │   │       │   │   └── 📄 page.jsx
│   │   │       │   └── 📄 page.jsx
│   │   │       ├── 📁 contact/
│   │   │       │   └── 📄 page.jsx
│   │   │       ├── 📁 pages/
│   │   │       │   ├── 📁 [page_slug]/
│   │   │       │   │   └── 📄 page.jsx
│   │   │       │   ├── 📁 faqs/
│   │   │       │   │   └── 📄 page.jsx
│   │   │       │   ├── 📁 privacy-policy/
│   │   │       │   │   └── 📄 page.jsx
│   │   │       │   ├── 📁 return-policy/
│   │   │       │   │   └── 📄 page.jsx
│   │   │       │   ├── 📁 shipping-policy/
│   │   │       │   │   └── 📄 page.jsx
│   │   │       │   └── 📁 terms-of-service/
│   │   │       │       └── 📄 page.jsx
│   │   │       ├── 📁 payment/
│   │   │       │   ├── 📁 failed/
│   │   │       │   │   └── 📄 page.jsx
│   │   │       │   └── 📁 responce/
│   │   │       │       └── 📄 page.jsx
│   │   │       ├── 📁 products/
│   │   │       │   ├── 📁 [id]/
│   │   │       │   │   └── 📄 page.jsx
│   │   │       │   └── 📄 page.jsx
│   │   │       ├── 📁 sitemap.xml/
│   │   │       │   └── 📄 route.js
│   │   │       ├── 📁 track/
│   │   │       │   └── 📁 [orderid]/
│   │   │       │       └── 📄 page.jsx
│   │   │       ├── 📄 layout.js
│   │   │       └── 📄 page.js
│   │   ├── 📄 layout.js
│   │   ├── 📄 not-found.js
│   │   └── 📄 page.js
│   ├── 📁 components/
│   │   ├── 📁 404Pages/
│   │   │   ├── 📄 NetworkError.jsx
│   │   │   ├── 📄 NoInternetBar.jsx
│   │   │   ├── 📄 NotFound.jsx
│   │   │   ├── 📄 ServerCrash.jsx
│   │   │   └── 📄 SiteNotFound.jsx
│   │   ├── 📁 Actions/
│   │   │   ├── 📄 BackButton.jsx
│   │   │   ├── 📄 Button.jsx
│   │   │   ├── 📄 CheckBox.jsx
│   │   │   ├── 📄 CustomLink.jsx
│   │   │   ├── 📄 DataSelectionList.jsx
│   │   │   ├── 📄 DropDown.jsx
│   │   │   ├── 📄 IconButton.jsx
│   │   │   ├── 📄 ImgToIcon.jsx
│   │   │   ├── 📄 InfoTooltip.jsx
│   │   │   ├── 📄 MultiSelectCheckbox.jsx
│   │   │   ├── 📄 MultiSelectDropdown.jsx
│   │   │   ├── 📄 PillSelector.jsx
│   │   │   ├── 📄 PriceRangeSlider.jsx
│   │   │   ├── 📄 RadioButton.jsx
│   │   │   ├── 📄 SizeController.jsx
│   │   │   ├── 📄 ToggleSwitch.jsx
│   │   │   ├── 📄 Tooltip.jsx
│   │   │   └── 📄 quantityControl.jsx
│   │   ├── 📁 Auth/
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 LoginClient.jsx
│   │   │   └── 📄 RegisterClient.jsx
│   │   ├── 📁 Blocks/
│   │   │   ├── 📄 FilterBar.jsx
│   │   │   └── 📄 Pagination.jsx
│   │   ├── 📁 Cards/
│   │   │   ├── 📄 ActionCard.jsx
│   │   │   ├── 📄 BuilderCustomizer.jsx 🚫 (auto-hidden)
│   │   │   ├── 📄 CustomCard.jsx
│   │   │   ├── 📄 GalleryImageCard.jsx
│   │   │   ├── 📄 OrderRecieptCard.jsx
│   │   │   ├── 📄 StatusCard.jsx
│   │   │   ├── 📄 cartProductCard.jsx
│   │   │   ├── 📄 cartTotalCard.jsx
│   │   │   ├── 📄 collectionCard.jsx
│   │   │   ├── 📄 productCard.jsx
│   │   │   ├── 📄 productDetailCard.jsx
│   │   │   └── 📄 productRecieptCard.jsx
│   │   ├── 📁 Forms/
│   │   │   ├── 📄 ApplyCoupon.jsx
│   │   │   ├── 📄 Form.jsx
│   │   │   ├── 📄 FormInput.jsx
│   │   │   ├── 📄 FormStepper.jsx
│   │   │   ├── 📄 GoogleSignInUp.jsx
│   │   │   ├── 📄 PaymentForm.jsx
│   │   │   ├── 📄 RangeInput.jsx
│   │   │   ├── 📄 SubscribeForm.jsx
│   │   │   ├── 📄 TemplateFormInput.jsx
│   │   │   ├── 📄 VariantsAddManager.jsx
│   │   │   ├── 📄 VariationAddManager.jsx
│   │   │   └── 📄 easypaisaCheckout.jsx
│   │   ├── 📁 Graphs/
│   │   │   ├── 📄 AreaGraph.jsx
│   │   │   ├── 📄 BarGraph.jsx
│   │   │   ├── 📄 ComaprisnChart.jsx
│   │   │   ├── 📄 MapChart.jsx
│   │   │   ├── 📄 MetricsGrid.jsx
│   │   │   ├── 📄 Piechart.jsx
│   │   │   └── 📄 TimeGraph.jsx
│   │   ├── 📁 Layout/
│   │   │   ├── 📄 BackgroundFrame.jsx
│   │   │   ├── 📄 BuilderHeader.jsx 🚫 (auto-hidden)
│   │   │   ├── 📄 CheckoutHeader.jsx
│   │   │   ├── 📄 Favicon.jsx
│   │   │   ├── 📄 Header.jsx
│   │   │   ├── 📄 HomeLayout.jsx
│   │   │   ├── 📄 LayoutWithReduxState.jsx
│   │   │   ├── 📄 PageStructureGenrator.jsx
│   │   │   ├── 📄 PreviewSectionWrappers.jsx
│   │   │   ├── 📄 ProviderWrap.jsx
│   │   │   ├── 📄 Sidebar.jsx
│   │   │   ├── 📄 StoreLayoutWrap.jsx
│   │   │   ├── 📄 TemplateFooter.jsx
│   │   │   ├── 📄 TemplateHeader.jsx
│   │   │   └── 📄 WebPrevFrame.jsx
│   │   ├── 📁 Loader/
│   │   │   ├── 📄 BarLoader.jsx
│   │   │   ├── 📄 BlurLoader.jsx
│   │   │   ├── 📄 BuilderLoader.jsx 🚫 (auto-hidden)
│   │   │   ├── 📄 ButtonLoader.jsx
│   │   │   ├── 📄 CardLoader.jsx
│   │   │   ├── 📄 ImageCardLoader.jsx
│   │   │   ├── 📄 ProductCardLoader.jsx
│   │   │   ├── 📄 TableSkeletonLoader.jsx
│   │   │   ├── 📄 TemplateLoader.jsx
│   │   │   ├── 📄 TextLoader.jsx
│   │   │   └── 📄 loader.jsx
│   │   ├── 📁 Modals/
│   │   │   ├── 📄 AccountEditModal.jsx
│   │   │   ├── 📄 AddEditDiscountModal.jsx
│   │   │   ├── 📄 AddEditProductModal.jsx
│   │   │   ├── 📄 AddPageModal.jsx
│   │   │   ├── 📄 CollectionAddModal.jsx
│   │   │   ├── 📄 DynamicDataSelectorModal.jsx
│   │   │   ├── 📄 ImageSelectorModal.jsx
│   │   │   ├── 📄 Modal.jsx
│   │   │   ├── 📄 OrderTrackModal.jsx
│   │   │   ├── 📄 PopupMenu2.jsx
│   │   │   ├── 📄 ThemeEditBlock.jsx
│   │   │   ├── 📄 WidgetsModal.jsx
│   │   │   └── 📄 refferalModal.jsx
│   │   ├── 📁 SEO/
│   │   │   └── 📄 SEO.js
│   │   ├── 📁 Sections/
│   │   │   ├── 📄 OrderTracking.jsx
│   │   │   └── 📄 ProductDescription.jsx
│   │   ├── 📁 Tables/
│   │   │   ├── 📄 CustomerInfoTable.jsx
│   │   │   ├── 📄 OrderListTable.jsx
│   │   │   └── 📄 Table.jsx
│   │   ├── 📁 UI/
│   │   │   ├── 📄 DNSInstruction.jsx
│   │   │   ├── 📄 DiscountCountdownBar.jsx
│   │   │   ├── 📄 DiscountPopup.jsx
│   │   │   ├── 📄 ExportSite.jsx
│   │   │   ├── 📄 ImportSite.jsx
│   │   │   ├── 📄 LandingPage.jsx
│   │   │   ├── 📄 LineDevider.jsx
│   │   │   ├── 📄 LivePreview.jsx
│   │   │   ├── 📄 LivePreviewIframe.jsx
│   │   │   ├── 📄 OrderRecipt.jsx
│   │   │   ├── 📄 PaymentSummary.jsx
│   │   │   ├── 📄 RatingBreakdown.jsx
│   │   │   ├── 📄 ReviewList.jsx
│   │   │   ├── 📄 emptyCart.jsx
│   │   │   ├── 📄 productsRecipt.jsx
│   │   │   ├── 📄 starRating.jsx
│   │   │   ├── 🎨 style.css
│   │   │   └── 🎨 style.module.css
│   │   ├── 📁 Uploaders/
│   │   │   ├── 📄 FaqUploader.jsx
│   │   │   ├── 📄 FileUploader.jsx
│   │   │   ├── 📄 ImageSlector.jsx
│   │   │   ├── 📄 LocationPicker.jsx
│   │   │   ├── 📄 SocialLinkSelector.jsx
│   │   │   ├── 📄 TextEditor.jsx
│   │   │   ├── 📄 ThemeSeletctor.jsx
│   │   │   └── 📄 VariantsSelector.jsx
│   │   └── 📁 Widgets/
│   │       ├── 📄 AddReviews.jsx
│   │       ├── 📄 BannerSlider.jsx
│   │       ├── 📄 Catalog.jsx
│   │       ├── 📄 CheckoutWidget.jsx
│   │       ├── 📄 CollectionSection.jsx
│   │       ├── 📄 ContactForm.jsx
│   │       ├── 📄 Faqs.jsx
│   │       ├── 📄 Hero.jsx
│   │       ├── 📄 ProductsSection.jsx
│   │       ├── 📄 PromoWidget.jsx
│   │       ├── 📄 RichText.jsx
│   │       ├── 📄 TabNavigation.jsx
│   │       └── 🎨 style.css
│   └── 📄 middleware.js
├── 🔒 .env 🚫 (auto-hidden)
├── 🚫 .gitignore
├── 📄 .prettierrc
├── 📖 README.md
├── 📄 config.js
├── 📄 css.d.ts
├── 📄 jsconfig.json
├── 📄 next-env.d.ts 🚫 (auto-hidden)
├── 📄 next.config.mjs
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 postcss.config.mjs
└── 📄 tailwind.config.js
```

---
*Generated by FileTree Pro Extension*