import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AlertCircle, LoaderCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signUpApi } from '@/services/signUp';
import { getProvinces } from '@/services/utils';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const options = [
  {
    heading: 'Phần mềm kế toán online VACOM',
    options: [
      {
        value: 'vacom-online-dich-vu',
        label: 'VACOM ONLINE - Dịch vụ',
        fullLabel: 'Dịch vụ',
      },
      {
        value: 'vacom-online-thuong-mai',
        label: 'VACOM ONLINE - Thương mại',
        fullLabel: 'Thương mại',
      },
      {
        value: 'vacom-online-xl-du',
        label: 'VACOM ONLINE - Xây lắp/ dự án',
        fullLabel: 'Xây lắp/ dự án',
      },
      {
        value: 'vacom-online-sx-gc',
        label: 'VACOM ONLINE - Sản xuất/ gia công',
        fullLabel: 'Sản xuất/ gia công',
      },
      {
        value: 'vacom-online-tong-hop',
        label: 'VACOM ONLINE - Tổng hợp',
        fullLabel: 'Tổng hợp',
      },
    ],
  },
  {
    heading: 'Phần mềm kế toán, bán hàng HKD VACOM vaShop',
    options: [
      {
        value: 'ban-hang',
        label: 'Bán hàng',
        fullLabel: 'Bán hàng trên điện thoại',
      },
      {
        value: 'vacom-hkd',
        label: 'VACOM HKD',
        fullLabel: 'Kế toán theo TT 88/2021/TT-BTC',
      },
    ],
  },
  {
    heading: 'Kế toán HTX-Theo TT 71/2025/TT-BTC',
    options: [
      {
        value: 'vacom-htx',
        label: 'VACOM HTX',
        fullLabel: 'VACOM HTX',
      },
    ],
  },
  {
    heading: 'Phần mềm khác',
    options: [
      {
        value: 'cks',
        label: 'CKS',
        fullLabel: 'Chữ ký số',
      },
      {
        value: 'mbhxh',
        label: 'mBHXH',
        fullLabel: 'Bảo hiểm xã hội',
      },
      {
        value: 'm-invoice',
        label: 'M-invoice',
        fullLabel: 'Hóa đơn điện tử M-invoice',
      },
      {
        value: 'smi',
        label: 'SMI',
        fullLabel: 'Quản lý hóa đơn',
      },
    ],
  },
];

export const getSignUpSchema = () => {
  return z.object({
    products: z.array(z.string(), {
      message: 'Vui lòng chọn ít nhất 1 sản phẩm',
    }),
    businessType: z.string().optional(),
    tax: z.string().optional(),
    business: z.string().optional(),
    fullName: z.string().min(1, { message: 'Không được để trống.' }),
    phone: z
      .string()
      .min(1, { message: 'Không được để trống.' })
      .regex(
        new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
        {
          message: 'Số điện thoại không hợp lệ.',
        },
      ),
    email: z.string().min(1, { message: 'Không được để trống.' }),
    address: z.string().optional(),
    note: z.string().optional(),
  });
};

export type SignUpSchemaType = z.infer<ReturnType<typeof getSignUpSchema>>;

export function TrialSignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(getSignUpSchema()),
    defaultValues: {
      businessType: 'enterprise',
      tax: '',
      business: '',
      fullName: '',
      phone: '',
      email: '',
      address: '',
      note: '',
    },
  });

  const { data: provinces } = useQuery({
    queryKey: ['positions'],
    queryFn: async () => {
      const response = await getProvinces();
      return response;
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const { mutate: signUp, status: signUpStatus } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      console.log('Mutation Success'); // Log success
      setError(null);
      onSuccess();
    },
    onError: (error) => {
      console.error('Mutation Error:', error); // Log error
      setError('Đã có lỗi xảy ra. Vui lòng thử lại!');
    },
  });

  async function onSubmit(values: SignUpSchemaType) {
    const params = new URLSearchParams(window.location.search);
    const tdn = params.get('tdn');

    const introducer = `Người giới thiệu: ${tdn}\n`;
    const products = `Quan tâm phần mềm: ${values.products.join(', ')}\n`;

    signUp({
      taxCode: values.tax,
      contact: values.business,
      customerName: values.fullName,
      tel: values.phone,
      address: '',
      email: values.email,
      content: introducer + products + values.note,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full space-y-10"
      >
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Đăng ký dùng thử{' '}
            <span className="text-[#ed1c24] font-extrabold">VACOM</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="products"
            render={({ field }) => (
              <FormItem className="lg:col-span-2">
                <FormLabel>
                  Sản phẩm <span className="ml-1 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    className="lg:col-span-2"
                    options={options}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Chọn sản phẩm muốn dùng thử..."
                    searchPlaceholder="Tìm sản phẩm"
                    hideSelectAll={true}
                    emptyIndicator="Không tìm thấy sản phẩm!"
                    hideClearButton={true}
                    hideCloseButton={true}
                    moreText="SP"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Họ tên <span className="ml-1 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Số điện thoại <span className="ml-1 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center flex-wrap lg:flex-nowrap gap-5 lg:col-span-2 my-2.5">
            <Label className="flex">Loại hình doanh nghiệp</Label>
            <div className="flex items-center gap-5">
              <RadioGroup
                defaultValue="enterprise"
                className="flex items-center gap-5"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enterprise" id="1" />
                  <Label
                    htmlFor="1"
                    className="text-foreground text-sm font-normal"
                  >
                    Doanh nghiệp
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="household-business" id="2" />
                  <Label
                    htmlFor="2"
                    className="text-foreground text-sm font-normal"
                  >
                    Hộ kinh doanh
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <FormField
            control={form.control}
            name="tax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã số thuế</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="business"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên công ty / hộ kinh doanh</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="ml-1 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tỉnh thành" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces?.map((pos) => (
                        <SelectItem key={pos.code} value={pos.code.toString()}>
                          {pos.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="lg:col-span-2">
                <FormLabel>Ghi chú</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Bạn muốn yêu cầu thêm gì?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {error && (
          <Alert
            variant="destructive"
            appearance="light"
            onClose={() => setError(null)}
          >
            <AlertIcon>
              <AlertCircle />
            </AlertIcon>
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <Button
          type="submit"
          size={'lg'}
          className="w-full"
          disabled={signUpStatus === 'pending'}
        >
          {signUpStatus === 'pending' ? (
            <span className="flex items-center gap-2">
              <LoaderCircleIcon className="h-4 w-4 animate-spin" /> ĐANG XỬ LÝ
            </span>
          ) : (
            'ĐĂNG KÝ'
          )}
        </Button>
      </form>
    </Form>
  );
}
