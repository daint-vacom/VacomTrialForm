import Lottie from 'react-lottie';
import doneAnimationData from '@/components/lotties/Done.json';

export function SignUpSuccess() {
  return (
    <div className="flex flex-col w-full justify-center">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: doneAnimationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={300}
        width={300}
      />
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-green-500">
          ĐÃ GỬI ĐĂNG KÝ
        </h1>
        <p className="text-secondary-foreground">
          Đơn đăng ký sử dụng thử phần mềm Vacom của bạn đã được gửi! Hãy kiểm
          tra email thường xuyên để không bỏ lỡ kết quả và hướng dẫn tiếp theo
          nhé!
        </p>
      </div>
    </div>
  );
}
