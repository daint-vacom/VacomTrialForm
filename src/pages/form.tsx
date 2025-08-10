import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { Textarea } from '@/components/ui/textarea';

const options = [
  {
    value: 'vacom-online',
    label: 'Vacom Online',
    fullLabel: 'Phần mềm kế toán Vacom Online',
  },
  {
    value: 'm-invoice',
    label: 'M-Invoice',
    fullLabel: 'Phần mềm hóa đơn điện tử M-Invoice',
  },
  {
    value: 'qlnstl',
    label: 'QL Nhân Sự - Tiền Lương',
    fullLabel: 'Phần mềm quản lý nhân sự - tiền lương',
  },
  {
    value: 'qlthp',
    label: 'QL Thu Học Phí',
    fullLabel: 'Phần mềm quản lý thu học phí',
  },
  {
    value: 'vacom-hkd',
    label: 'Vacom HKD',
    fullLabel: 'Phần mềm kế toán Hộ kinh doanh VACOM HKD',
  },
  {
    value: 'tncn',
    label: 'Chứng từ thuế TNCN',
    fullLabel: 'Chứng từ thuế Thu nhập cá nhân',
  },
];

export const getSigninSchema = () => {
  return z.object({
    products: z.array(z.string(), {
      message: 'Vui lòng chọn ít nhất 1 sản phẩm',
    }),
    businessType: z.string().min(1, { message: 'Không được để trống.' }),
    tax: z.string().min(1, { message: 'Không được để trống.' }),
    business: z.string().min(1, { message: 'Không được để trống.' }),
    fullName: z.string().min(1, { message: 'Không được để trống.' }),
    phone: z.string().min(1, { message: 'Không được để trống.' }),
    email: z
      .string()
      .min(1, { message: 'Không được để trống.' })
      .email({ message: 'Vui lòng nhập email hợp lệ.' }),
    note: z.string().min(1, { message: 'Không được để trống.' }),
  });
};

export type SigninSchemaType = z.infer<ReturnType<typeof getSigninSchema>>;

export function TrialSignUpForm() {
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(getSigninSchema()),
    defaultValues: {
      businessType: 'enterprise',
      tax: '',
      business: '',
      fullName: '',
      phone: '',
      email: '',
      note: '',
    },
  });

  async function onSubmit(values: SigninSchemaType) {
    try {
      setIsProcessing(true);
    } catch (err) {
      console.error('Unexpectederror:', err);
    } finally {
      setIsProcessing(false);
    }
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

          <div className="flex items-center flex-wrap lg:flex-nowrap gap-5 lg:col-span-2">
            <Label className="flex">
              Loại hình doanh nghiệp{' '}
              <span className="ml-1 text-red-500">*</span>
            </Label>
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
                <FormLabel>
                  Mã số thuế <span className="ml-1 text-red-500">*</span>
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
            name="business"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tên công ty / hộ kinh doanh{' '}
                  <span className="ml-1 text-red-500">*</span>
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

        <Button
          type="submit"
          size={'lg'}
          className="w-full"
          disabled={isProcessing}
        >
          {isProcessing ? (
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
