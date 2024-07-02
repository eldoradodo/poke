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
      <body>{children}</body>
    </html>
  );
}
 // children 렌더링. 레이아웃 컴포넌트가 모든 페이지 컴포넌트를 감싸도록 함.
