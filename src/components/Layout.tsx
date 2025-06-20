import React, { type PropsWithChildren } from 'react';
import Header from './Header';

// type Props = {}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" bg-gradient-to-br from-background to-muted ">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/40 p-6">
        <div className="text-center container mx-auto  text-sm text-muted-foreground p-4">
          &copy; {new Date().getFullYear()} WeatherBee. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
