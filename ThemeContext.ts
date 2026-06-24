// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

// 1. **CREATOR:** ایجاد Context (مسیر ارتباطی)
// null: مقدار پیش‌فرض Context است.
export const ThemeContext = createContext(null); 

// 2. **PROVIDER:** کامپوننت تأمین‌کننده داده و منطق
export const ThemeProvider = ({ children }) => {
    
    // State داخلی که داده‌های سراسری را نگه می‌دارد.
    const [theme, setTheme] = useState('light'); // 'light' یا 'dark'
    
    // تابع منطقی برای تغییر وضعیت تم
    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };
    
    // بسته داده‌ای که از طریق پراپ 'value' ارسال می‌شود.
    const contextValue = {
        theme,         // داده مورد نیاز
        toggleTheme    // تابع تغییر دهنده داده
    };

    return (
        // تگ Provider که تمام فرزندان را می‌پوشاند
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

// 3. **CONSUMER:** هوک سفارشی برای مصرف ساده داده‌ها
// این هوک، استفاده از useContext را در سایر کامپوننت‌ها آسان می‌کند.
export const useTheme = () => {
    // هوک useContext برای دسترسی به مقدار 'value' نزدیک‌ترین Provider
    return useContext(ThemeContext);
};