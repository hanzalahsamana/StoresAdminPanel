export const PaymentMethodsStructure = [
  {
    key: 'cod',
    label: 'Cash On Delivery',
    icon: 'https://img.icons8.com/external-goofy-flat-kerismaker/96/external-Cash-On-Delivery-logistic-goofy-flat-kerismaker.png',
    fields: [{ name: 'isEnabled', input: 'toggle', label: 'Enable Cash on Delivery' }],
  },
  {
    key: 'account',
    label: 'Account',
    icon: 'https://img.icons8.com/color/48/bank-card-back-side.png',
    fields: [
      { name: 'isEnabled', input: 'toggle', label: 'Enable Account' },
      { name: 'Account_No', input: 'text', placeholder: 'Account No' },
      { name: 'Account_Name', input: 'text', placeholder: 'Account Name' },
      { name: 'Bank_Name', input: 'text', placeholder: 'Bank Name' },
      { name: 'IBAN', input: 'text', placeholder: 'IBAN', required: false },
    ],
  },
  // {
  //   key: 'jazzcash',
  //   label: 'Jazzcash',
  //   icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLNu1uDFk3vDbHjtgZ_knC4x2ztbBe9fywjg&s',
  //   fields: [
  //     { name: 'isEnabled', input: 'toggle', label: 'Enable Jazzcash' },
  //     { name: 'displayName', input: 'text', placeholder: 'Display Name' },
  //     { name: 'merchantId', input: 'text', placeholder: 'Merchant ID' },
  //     { name: 'integritySalt', input: 'text', placeholder: 'Integrity Salt' },
  //     { name: 'pp_Password', input: 'text', placeholder: 'Password' },
  //     { name: 'isTest', input: 'toggle', label: 'Test account?' },
  //   ],
  // },
  // {
  //   key: 'easypaisa',
  //   label: 'Easypaisa',
  //   icon: 'https://www.wishhub.pk/theme/image/icons/easypaisa.png',
  //   fields: [
  //     { name: 'isEnabled', input: 'toggle', label: 'Enable Easypaisa' },
  //     { name: 'displayName', input: 'text', placeholder: 'Display Name' },

  //     { name: 'merchantId', input: 'text', placeholder: 'Merchant ID' },
  //     { name: 'apiKey', input: 'text', placeholder: 'API Key' },
  //     { name: 'isTest', input: 'toggle', label: 'Test account?' },
  //   ],
  // },
  // {
  //   key: 'alfalah',
  //   label: 'Alfalah',
  //   icon: 'https://companieslogo.com/img/orig/BAFL.PK-3da15679.png?t=1720244490',
  //   disabled: true,
  //   fields: [
  //     { name: 'isEnabled', input: 'toggle', label: 'Enable Easypaisa' },
  //     { name: 'displayName', input: 'text', placeholder: 'Display Name' },

  //     { name: 'merchantId', input: 'text', placeholder: 'Merchant ID' },
  //     { name: 'storeId', input: 'text', placeholder: 'Store Id' },
  //     { name: 'merchantHash', input: 'text', placeholder: 'Merchant Hash' },
  //     { name: 'merchantUsername', input: 'text', placeholder: 'Merchant Username' },
  //     { name: 'merchantPassword', input: 'text', placeholder: 'Merchant Password' },
  //     { name: 'secretKey', input: 'text', placeholder: 'Secret Key' },
  //     { name: 'isTest', input: 'toggle', label: 'Test account?' },
  //   ],
  // },
  // {
  //   key: 'konnect',
  //   label: 'Konnect (HBL)',
  //   subLable: 'coming soon',
  //   icon: 'https://play-lh.googleusercontent.com/-AGNZ38zv1-j1zqsWHClQ9VWNAYpgpmKnARp0PMT_6FNpVuWP9ze_cqnrvTSMDC2p7o5',
  //   disabled: true,
  //   comingSoon: true,
  //   fields: [],
  // },
];
