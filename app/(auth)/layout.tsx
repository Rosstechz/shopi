import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex justify-center items-center bg-gradient-to-br from-gray-400 to-gray-100 p-10">
        <div className="w-full max-w-md">{children}</div>
      </div>

      <div className="w-1/2 relative hidden md:block">
        <Image
          src="/images/ecommerce-login-bg.jpg"
          alt="Authentication Page Image"
          className="min-h-screen w-fit"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black opacity-20" />
      </div>
    </div>
  );
};

export default Layout;
