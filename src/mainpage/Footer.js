import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12 py-8">
      <div className="container mx-auto px-4 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h4 className="font-bold text-gray-800 mb-2">POPPY</h4>
            <p>대표: 김뽀삐 | 사업자등록번호: 123-45-67890</p>
            <p>주소: 서울특별시 강남구 멍멍이로 1234</p>
          </div>

          <div className="w-full md:w-1/3 text-center md:text-left">
            <h4 className="font-bold text-gray-800 mb-2">고객센터</h4>
            <p className="text-lg font-extrabold text-blue-500 mb-1">
              1588-1234
            </p>
            <p>운영 시간: 평일 10:00 - 18:00 (점심시간 12:00 - 13:00)</p>
            <p>주말 및 공휴일 휴무</p>
          </div>

          <div className="w-full md:w-1/3 text-center md:text-right">
            <h4 className="font-bold text-gray-800 mb-2">링크</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-gray-900">
                  회사소개
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  이용약관
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  자주 묻는 질문
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8 text-xs text-gray-500">
          <p>&copy; 2025 POPPY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
