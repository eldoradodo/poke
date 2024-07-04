import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POkemon", //웹 사이트 제목
  description: "POkemon book",  //웹 사이트의 기본 설명
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;  //children이 React 노드임을 명시
}) {
  return (
    <html lang="en">
    <body>
      <header className="bg-lime-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">포켓몬 도감</h1>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-lime-600 text-white p-4 text-center">
        <p>&copy; 2024 Pokemon. All rights reserved.</p>
      </footer>
    </body>
  </html>
  );
}
 // children 렌더링. 레이아웃 컴포넌트가 모든 페이지 컴포넌트를 감싸도록 함.
