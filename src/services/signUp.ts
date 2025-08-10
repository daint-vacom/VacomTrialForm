import serverApiAxios from '@/utilities/axios/server_api';

// Lấy token
export const getTokenApi = async () => {
  const data = new URLSearchParams({
    client_id: 'StoreMart_App',
    client_secret: 'Vacom@2007',
    grant_type: 'client_credentials',
    scope: 'store',
  });

  return serverApiAxios.post('/connect/token', data.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      __tenant: '88f2af16-fc86-093f-09b1-3a0b3f0b8d89',
      'Accept-Language': 'vi',
    },
  });
};

// Đăng ký khách hàng doanh nghiệp
export const signUpApi = async (customerData: {
  taxCode: string;
  contact: string;
  customerName: string;
  tel: string;
  address: string;
  email: string;
  content: string;
}) => {
  const token = getTokenApi();
  return serverApiAxios.post(
    '/api/app/business-customer/register',
    customerData,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
