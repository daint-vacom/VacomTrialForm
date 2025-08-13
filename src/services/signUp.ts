import serverApiAxios from '@/utilities/axios/server_api';

// Lấy token
export const getTokenApi = async () => {
  const data = {
    client_id: 'StoreMart_App',
    client_secret: 'Vacom@2007',
    grant_type: 'client_credentials',
    scope: 'store',
  };

  const response = await serverApiAxios.post('/connect/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      __tenant: '88f2af16-fc86-093f-09b1-3a0b3f0b8d89',
      'Accept-Language': 'vi',
    },
  });
  return response.data.access_token;
};

// Đăng ký khách hàng doanh nghiệp
export const signUpApi = async (customerData: {
  taxCode?: string | null;
  contact?: string | null;
  customerName: string;
  tel: string;
  address?: string | null;
  email?: string | null;
  content?: string | null;
}) => {
  const token = await getTokenApi();
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
