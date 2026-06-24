import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import ShopManHeader from "./components/shop/ShopManHeader";

import type { Route } from "./+types/root";
import "./app.css";

// حذف لینک‌های خارجی گوگل و سبک‌سازی هدر سایت
export const links: Route.LinksFunction = () => [
  // چون app.css را در بالا import کردیم، نیازی به تکرار آن در اینجا نیست مگر برای موارد خاص
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // تغییر زبان به فارسی و جهت به راست‌چین برای فروشگاه ایرانی
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans mt-32 "> {/* استفاده از فونت دانا که در CSS ست کردیم */}
        <ShopManHeader />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "اوپس!";
  let details = "یک خطای غیرمنتظره رخ داده است.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "۴۰۴" : "خطا";
    details =
      error.status === 404
        ? "صفحه مورد نظر پیدا نشد."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto text-right">
      <h1 className="text-2xl font-bold">{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-gray-100 mt-4 ltr">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}